"""
Backend configuration — class labels, paths, and server settings.
Edit STAGE1_CLASSES / STAGE2_CLASSES to match your exact Kaggle notebook output.
"""
from pathlib import Path

BASE_DIR   = Path(__file__).parent
MODELS_DIR = BASE_DIR / "models"
MODELS_DIR.mkdir(exist_ok=True)

# ── Model weight files ────────────────────────────────────────────────────────
# Place your exported .pth files here after downloading from Kaggle.
STAGE1_MODEL_PATH = MODELS_DIR / "stage1_leaf.pth"
STAGE2_MODEL_PATH = MODELS_DIR / "stage2_silkworm.pth"

# ── Class labels (must match training order exactly) ─────────────────────────
# Stage 1 — Mulberry Leaf Disease Detection
STAGE1_CLASSES = [
    "Healthy Leaf",
    "Leaf Rust",
    "Powdery Mildew",
    "Leaf Spot",
]

# Stage 2 — Silkworm Disease Detection
STAGE2_CLASSES = [
    "Healthy Silkworm",
    "Muscardine",
    "Flacherie",
    "Grasserie",
    "Pebrine",
]

# ── Image preprocessing (ImageNet standard) ───────────────────────────────────
IMAGE_SIZE     = (224, 224)
IMAGENET_MEAN  = [0.485, 0.456, 0.406]
IMAGENET_STD   = [0.229, 0.224, 0.225]

# ── Server ────────────────────────────────────────────────────────────────────
API_HOST = "0.0.0.0"
API_PORT = 8000
CORS_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:3000",
]
