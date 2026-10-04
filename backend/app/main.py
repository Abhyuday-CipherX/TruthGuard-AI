"""
TruthGuard AI - Deepfake & Fake News Detection System Backend
FastAPI Main Entry Point
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import detect_router, auth_router, history_router

# Create database tables automatically on startup
Base.metadata.create_all(bind=engine)

# Initialize FastAPI app with metadata
app = FastAPI(
    title="TruthGuard AI API",
    description="Market-ready Deepfake & Fake News Detection Engine using CNN, OpenCV, Audio Spectral Analysis & OCR NLP.",
    version="1.0.0"
)

# Enable CORS (Cross-Origin Resource Sharing) for React frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(detect_router.router)
app.include_router(auth_router.router)
app.include_router(history_router.router)

@app.get("/")
def read_root():
    """Root Endpoint - Health Check"""
    return {
        "system": "TruthGuard AI Engine",
        "status": "online",
        "version": "1.0.0",
        "endpoints": {
            "docs": "/docs",
            "detect_image": "/api/v1/detect/image",
            "detect_audio": "/api/v1/detect/audio",
            "detect_text": "/api/v1/detect/text",
            "detect_ocr": "/api/v1/detect/ocr",
            "auth_login": "/api/v1/auth/login",
            "auth_register": "/api/v1/auth/register",
            "history_scans": "/api/v1/history/scans",
            "analytics": "/api/v1/history/analytics"
        }
    }

@app.get("/api/v1/health")
def health_check():
    return {"status": "healthy", "database": "sqlite_connected"}
