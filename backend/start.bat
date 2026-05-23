@echo off
title Silkworm Disease Detection — Backend Server
echo ================================================
echo   Silkworm Disease Detection Backend (FastAPI)
echo   EfficientNet-B0 + ResNet-50 Dual Backbone
echo ================================================
echo.

cd /d "%~dp0"

echo [1/3] Installing FastAPI and core dependencies...
pip install fastapi uvicorn[standard] python-multipart Pillow numpy --quiet

echo.
echo [2/3] Installing PyTorch (CPU build)...
pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu --quiet

echo.
echo [3/3] Starting server on http://localhost:8000
echo       API docs at  http://localhost:8000/docs
echo.
echo       NOTE: Place your model weights in backend/models/ to use real AI.
echo             Without weights, server runs in DEMO MODE automatically.
echo.

python -m uvicorn main:app --host 0.0.0.0 --port 8000 --reload

pause
