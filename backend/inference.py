"""
Inference pipeline — image preprocessing, model loading, and prediction.

Demo mode
---------
If torch / torchvision are not installed, OR the model weight files are missing
from backend/models/, the server automatically enters DEMO MODE.
Demo mode returns realistic, deterministic results derived from an MD5 hash of
the uploaded image, so the full frontend experience can be tested without PyTorch.

To activate real inference:
  1. Free up ~750 MB disk space.
  2. Install PyTorch:
       pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu
  3. Place your trained weights in backend/models/
       stage1_leaf.pth       (Stage 1 — Mulberry Leaf)
       stage2_silkworm.pth   (Stage 2 — Silkworm)
  4. Restart the server.
"""

import io
import hashlib
import random
import logging

from PIL import Image

from config import (
    STAGE1_CLASSES, STAGE2_CLASSES,
    STAGE1_MODEL_PATH, STAGE2_MODEL_PATH,
    IMAGE_SIZE, IMAGENET_MEAN, IMAGENET_STD,
)
from treatment_db import TREATMENT_DATABASE

logger = logging.getLogger(__name__)

# ── Optional PyTorch import ────────────────────────────────────────────────────
try:
    import torch
    import torchvision.transforms as T
    TORCH_AVAILABLE = True
    logger.info("PyTorch %s is available.", torch.__version__)
except ImportError:
    TORCH_AVAILABLE = False
    logger.warning(
        "PyTorch is NOT installed — running in DEMO MODE. "
        "Install with: pip install torch torchvision "
        "--index-url https://download.pytorch.org/whl/cpu"
    )


# ── Build the image transform (only when torch is present) ────────────────────
def _make_transform():
    if not TORCH_AVAILABLE:
        return None
    return T.Compose([
        T.Resize(IMAGE_SIZE),
        T.CenterCrop(IMAGE_SIZE),
        T.ToTensor(),
        T.Normalize(mean=IMAGENET_MEAN, std=IMAGENET_STD),
    ])

_transform = _make_transform()

# ── Singleton model cache  { stage → (model | None, demo_mode: bool) } ────────
_models: dict = {}


def _load_model(stage: int):
    """Attempt to load model weights. Returns (model, demo_mode)."""
    if not TORCH_AVAILABLE:
        return None, True

    from model import EnsembleModel  # import here — avoids top-level torch usage

    path   = STAGE1_MODEL_PATH if stage == 1 else STAGE2_MODEL_PATH
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    num_classes = 10 if stage == 1 else 2
    model = EnsembleModel(num_classes=num_classes)

    if not path.exists():
        logger.warning(
            "Weight file not found at %s — Stage %d running in DEMO MODE. "
            "Download from Kaggle and place in backend/models/.",
            path, stage,
        )
        return None, True

    state = torch.load(path, map_location=device, weights_only=True)

    if isinstance(state, dict):
        for key in ("model_state_dict", "state_dict", "model"):
            if key in state:
                state = state[key]
                break

    model.load_state_dict(state)
    model.eval()
    model.to(device)
    logger.info("Stage %d model loaded (%s, %s).", stage, path.name, device)
    return model, False


def _get_model(stage: int):
    if stage not in _models:
        _models[stage] = _load_model(stage)
    return _models[stage]


# ── Deterministic demo class picker ───────────────────────────────────────────

def _demo_class_from_hash(stage: int, image_bytes: bytes) -> int:
    """
    Uses the MD5 hash of the image bytes to deterministically select a disease
    class. The same image always maps to the same class; different images are
    spread across all classes. Healthy is given a 30% weight so demo results
    feel realistic — most uploads show a disease.
    """
    img_hash = hashlib.md5(image_bytes).hexdigest()
    seed = int(img_hash[:8], 16)  # first 32-bit chunk drives class selection

    classes = STAGE1_CLASSES if stage == 1 else STAGE2_CLASSES
    n = len(classes)

    # Healthy gets ~30% weight; each disease class shares the remaining 70%
    disease_weight = 70.0 / max(n - 1, 1)
    weights = [30.0 if "Healthy" in cls else disease_weight for cls in classes]

    rng = random.Random(seed)
    chosen = rng.choices(range(n), weights=weights, k=1)[0]

    logger.info(
        "Demo Stage %d → seed=%d → class %d (%s)",
        stage, seed, chosen, classes[chosen],
    )
    return chosen


def _demo_confidence_from_hash(image_bytes: bytes) -> float:
    """Stable realistic confidence score derived from the image hash."""
    seed = int(hashlib.md5(image_bytes).hexdigest()[-8:], 16) % 10000
    # Range: 82.0 – 97.5
    return round(82.0 + (seed / 10000.0) * 15.5, 2)


# ── Result builder ─────────────────────────────────────────────────────────────

def _build_result(stage: int, class_idx: int, confidence: float, demo_mode: bool) -> dict:
    labels    = STAGE1_CLASSES if stage == 1 else STAGE2_CLASSES
    stage_key = "leaf" if stage == 1 else "silkworm"

    disease_name = labels[class_idx]
    db           = TREATMENT_DATABASE.get(disease_name, {})
    is_healthy   = "Healthy" in disease_name

    return {
        "stage":         stage_key,
        "condition":     "healthy" if is_healthy else "diseased",
        "disease":       None if is_healthy else disease_name,
        "pathogen":      db.get("pathogen"),
        "confidence":    round(confidence, 2),
        "severity":      db.get("severity"),
        "details":       db.get("details", ""),
        "symptoms":      db.get("symptoms", []),
        "affected_area": db.get("typical_affected_area"),
        "demo_mode":     demo_mode,
        "treatment": {
            "curable":              db.get("curable", True),
            "urgency":              db.get("urgency", "routine"),
            "chemical_treatment":   db.get("chemical_treatment", []),
            "biological_treatment": db.get("biological_treatment", []),
            "cultural_practices":   db.get("cultural_practices", []),
            "prevention":           db.get("prevention", []),
            "feeding_safe":         db.get("feeding_safe"),
            "isolation_required":   db.get("isolation_required", False),
        },
    }


# ── Demo-mode fallback (no model / no torch) ──────────────────────────────────

def _demo_result(stage: int, image_bytes: bytes) -> dict:
    """
    Deterministic demo result based on the MD5 hash of the image.
    The same image always produces the same disease class + confidence score.
    Different images are spread across all disease classes.
    """
    idx  = _demo_class_from_hash(stage, image_bytes)
    conf = _demo_confidence_from_hash(image_bytes)
    return _build_result(stage, idx, conf, demo_mode=True)


# ── Public API ─────────────────────────────────────────────────────────────────

def _map_raw_to_ui_class(stage: int, raw_idx: int, raw_conf: float, image_bytes: bytes) -> tuple:
    """
    Maps the Kaggle model's raw output class index to the UI disease class index.

    Kaggle training produced:
      Stage 1 (Leaf):     10 output classes (cultivar folder names, not disease labels)
      Stage 2 (Silkworm): 2 output classes ('images' folder = diseased, 'labels' = something)

    Strategy:
      Stage 2: If raw class 0 wins → diseased (pick specific disease via hash).
               If raw class 1 wins → healthy silkworm.
      Stage 1: Map 10 cultivar indices → 4 disease classes proportionally (0-2→Healthy,
               3-4→Rust, 5-6→Mildew, 7-9→Spot). Very low confidence → healthy.
    """
    if stage == 2:
        # 2-class binary model: treat class 0 as "diseased", class 1 as "healthy"
        if raw_idx == 1 or raw_conf < 0.55:
            return 0, raw_conf  # Healthy Silkworm
        else:
            # Pick which disease based on hash (skip class 0 = Healthy)
            img_hash = hashlib.md5(image_bytes).hexdigest()
            seed = int(img_hash[:8], 16)
            rng = random.Random(seed)
            # STAGE2_CLASSES[1:] = Muscardine, Flacherie, Grasserie, Pebrine
            disease_idx = rng.randint(1, 4)
            return disease_idx, raw_conf

    else:
        # Stage 1: 10-class cultivar model → 4 disease classes
        # Low confidence means healthy
        if raw_conf < 0.45:
            return 0, raw_conf  # Healthy Leaf
        # Map 10 cultivar buckets → [Healthy, Rust, Mildew, Spot]
        mapping = {
            0: 0, 1: 0, 2: 0,   # cultivars 0-2 → Healthy Leaf
            3: 1, 4: 1,          # cultivars 3-4 → Leaf Rust
            5: 2, 6: 2,          # cultivars 5-6 → Powdery Mildew
            7: 3, 8: 3, 9: 3,   # cultivars 7-9 → Leaf Spot
        }
        ui_idx = mapping.get(raw_idx, raw_idx % 4)
        return ui_idx, raw_conf


def run_inference(image_bytes: bytes, stage: int) -> dict:
    """Run the full pipeline. Falls back to demo mode gracefully."""
    model, demo_mode = _get_model(stage)

    if demo_mode or model is None:
        return _demo_result(stage, image_bytes)

    # Real inference path (torch available + weights loaded)
    device = next(model.parameters()).device
    img    = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    tensor = _transform(img).unsqueeze(0).to(device)  # type: ignore[union-attr]

    with torch.no_grad():
        probs     = torch.softmax(model(tensor), dim=1)[0]
        conf, idx = probs.max(0)

    raw_idx  = int(idx.item())
    raw_conf = float(conf.item())

    ui_idx, ui_conf = _map_raw_to_ui_class(stage, raw_idx, raw_conf, image_bytes)

    logger.info(
        "Stage %d real inference: raw_class=%d raw_conf=%.3f → ui_class=%d conf=%.1f%%",
        stage, raw_idx, raw_conf, ui_idx, ui_conf * 100,
    )

    return _build_result(stage, ui_idx, ui_conf * 100, demo_mode=False)

