"""
FastAPI application — two-stage silkworm disease detection API.

Endpoints
---------
GET  /health              — liveness probe
POST /api/predict/leaf    — Stage 1: Mulberry Leaf Disease Detection
POST /api/predict/silkworm — Stage 2: Silkworm Disease Detection
"""

import logging
from contextlib import asynccontextmanager

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from config import API_HOST, API_PORT, CORS_ORIGINS
from inference import _get_model, run_inference

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

ALLOWED_CONTENT_TYPES = {"image/jpeg", "image/png", "image/webp", "image/jpg"}
MAX_FILE_BYTES = 10 * 1024 * 1024  # 10 MB


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Pre-warm both models on startup so the first request is fast."""
    logger.info("Pre-warming Stage 1 (Leaf) model …")
    _get_model(1)
    logger.info("Pre-warming Stage 2 (Silkworm) model …")
    _get_model(2)
    yield


app = FastAPI(
    title="Silkworm Disease Detection API",
    description=(
        "Two-stage AI disease detection using EfficientNet-B0 + ResNet-50 "
        "feature fusion.\n\n"
        "**Stage 1** — Mulberry Leaf Disease Detection\n"
        "**Stage 2** — Silkworm Disease Detection"
    ),
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Helpers ────────────────────────────────────────────────────────────────────

async def _read_validated_image(file: UploadFile) -> bytes:
    if file.content_type not in ALLOWED_CONTENT_TYPES:
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported file type '{file.content_type}'. "
                   "Please upload a JPEG, PNG, or WEBP image.",
        )
    data = await file.read()
    if len(data) > MAX_FILE_BYTES:
        raise HTTPException(
            status_code=413,
            detail="File too large. Maximum allowed size is 10 MB.",
        )
    return data


# ── Routes ─────────────────────────────────────────────────────────────────────

@app.get("/health", tags=["System"])
async def health():
    return {"status": "ok", "message": "Silkworm Disease Detection API is running"}


@app.post("/api/predict/leaf", tags=["Stage 1 — Mulberry Leaf"])
async def predict_leaf(file: UploadFile = File(..., description="Mulberry leaf image")):
    """
    **Stage 1 — Mulberry Leaf Disease Detection**

    Upload a clear photo of a mulberry leaf. The model detects:
    - Healthy Leaf
    - Leaf Rust (*Cerotelium fici*)
    - Powdery Mildew (*Phyllactinia corylea*)
    - Leaf Spot (*Cercospora moricola*)
    """
    image_bytes = await _read_validated_image(file)
    return run_inference(image_bytes, stage=1)


@app.post("/api/predict/silkworm", tags=["Stage 2 — Silkworm"])
async def predict_silkworm(file: UploadFile = File(..., description="Silkworm larva image")):
    """
    **Stage 2 — Silkworm Disease Detection**

    Upload a clear photo of a silkworm larva. The model detects:
    - Healthy Silkworm
    - Muscardine (*Beauveria bassiana*)
    - Flacherie (NPV / IFV + bacterial)
    - Grasserie (BmNPV)
    - Pebrine (*Nosema bombycis*)
    """
    image_bytes = await _read_validated_image(file)
    return run_inference(image_bytes, stage=2)


# ── Entry point ────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host=API_HOST, port=API_PORT, reload=True)
