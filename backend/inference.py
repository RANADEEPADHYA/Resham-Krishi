"""
Inference pipeline — image preprocessing, model loading, and prediction.

Demo mode
---------
If torch / torchvision are not installed, OR the model weight files are missing
from backend/models/, the server automatically enters DEMO MODE.
Demo mode returns realistic, randomly-selected results from the treatment
database so the full frontend experience can be tested without PyTorch.

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
    # No torch → always demo
    if not TORCH_AVAILABLE:
        return None, True

    from model import DualBackboneFusion  # import here — avoids top-level torch usage

    labels = STAGE1_CLASSES if stage == 1 else STAGE2_CLASSES
    path   = STAGE1_MODEL_PATH if stage == 1 else STAGE2_MODEL_PATH
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    model = DualBackboneFusion(num_classes=len(labels))

    if not path.exists():
        logger.warning(
            "Weight file not found at %s — Stage %d running in DEMO MODE. "
            "Download from Kaggle and place in backend/models/.",
            path, stage,
        )
        return None, True

    state = torch.load(path, map_location=device, weights_only=True)

    # Handle common checkpoint wrapper formats
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


# ── Result builder ─────────────────────────────────────────────────────────────

def _build_result(stage: int, class_idx: int, confidence: float, demo_mode: bool) -> dict:
    labels    = STAGE1_CLASSES if stage == 1 else STAGE2_CLASSES
    stage_key = "leaf" if stage == 1 else "silkworm"

    disease_name = labels[class_idx]
    db           = TREATMENT_DATABASE.get(disease_name, {})
    is_healthy   = "Healthy" in disease_name

    return {
        "stage":        stage_key,
        "condition":    "healthy" if is_healthy else "diseased",
        "disease":      None if is_healthy else disease_name,
        "pathogen":     db.get("pathogen"),
        "confidence":   round(confidence, 2),
        "severity":     db.get("severity"),
        "details":      db.get("details", ""),
        "symptoms":     db.get("symptoms", []),
        "affected_area": db.get("typical_affected_area"),
        "demo_mode":    demo_mode,
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

def _demo_result(stage: int) -> dict:
    labels  = STAGE1_CLASSES if stage == 1 else STAGE2_CLASSES
    # 40 % chance healthy, rest split evenly among disease classes
    weights = [0.40 if "Healthy" in c else 0.60 / (len(labels) - 1) for c in labels]
    idx     = random.choices(range(len(labels)), weights=weights, k=1)[0]
    conf    = round(random.uniform(85.5, 97.8), 2)
    return _build_result(stage, idx, conf, demo_mode=True)


# ── Public API ─────────────────────────────────────────────────────────────────

def run_inference(image_bytes: bytes, stage: int) -> dict:
    """Run the full pipeline. Falls back to demo mode gracefully."""
    model, demo_mode = _get_model(stage)

    if demo_mode or model is None:
        return _demo_result(stage)

    # Real inference path (torch available + weights loaded)
    device = next(model.parameters()).device
    img    = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    tensor = _transform(img).unsqueeze(0).to(device)  # type: ignore[union-attr]

    with torch.no_grad():
        probs       = torch.softmax(model(tensor), dim=1)[0]
        conf, idx   = probs.max(0)

    return _build_result(stage, int(idx.item()), float(conf.item()) * 100, demo_mode=False)
