"""
TruthGuard AI - Detection Endpoints Router
Handles multi-modal uploads for Image, Video, Audio, OCR, and Text analysis,
and persists scan records into the SQLite database for Forensic Audit Logs.
"""

import json
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

from app.database import get_db
from app.models import ScanRecord
from app.ai_engine.cnn_deepfake import deepfake_engine
from app.ai_engine.audio_analyzer import audio_engine
from app.ai_engine.fake_news_nlp import nlp_engine
from app.ai_engine.ocr_engine import ocr_engine

router = APIRouter(
    prefix="/api/v1/detect",
    tags=["AI Multi-Modal Detection"]
)

class TextAnalysisRequest(BaseModel):
    text: str
    headline: Optional[str] = ""

@router.post("/image")
async def detect_image_deepfake(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """Analyzes image for deepfakes and records scan log into database."""
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File uploaded must be a valid image (JPEG, PNG, WEBP).")

    contents = await file.read()
    if len(contents) == 0:
        raise HTTPException(status_code=400, detail="Uploaded image file is empty.")

    try:
        result = deepfake_engine.analyze_image(contents)
        result["filename"] = file.filename

        # Save to SQLite Database
        scan = ScanRecord(
            media_type="image",
            filename=file.filename,
            classification=result["classification"],
            deepfake_probability=result["deepfake_probability"],
            confidence_percentage=result["confidence_percentage"],
            details_json=json.dumps(result["analysis_details"])
        )
        db.add(scan)
        db.commit()

        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing image: {str(e)}")

@router.post("/audio")
async def detect_audio_deepfake(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """Analyzes audio for synthetic voice and records scan log into database."""
    contents = await file.read()
    if len(contents) == 0:
        raise HTTPException(status_code=400, detail="Uploaded audio file is empty.")

    try:
        result = audio_engine.analyze_audio(contents)
        result["filename"] = file.filename

        # Save to SQLite Database
        scan = ScanRecord(
            media_type="audio",
            filename=file.filename,
            classification=result["classification"],
            deepfake_probability=result["synthetic_voice_probability"],
            confidence_percentage=result["confidence_percentage"],
            details_json=json.dumps(result["analysis_details"])
        )
        db.add(scan)
        db.commit()

        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing audio: {str(e)}")

@router.post("/text")
async def detect_text_fake_news(request: TextAnalysisRequest, db: Session = Depends(get_db)):
    """Analyzes text for fake news veracity and records scan log into database."""
    try:
        result = nlp_engine.analyze_text(text=request.text, headline=request.headline)

        # Save to SQLite Database
        scan = ScanRecord(
            media_type="text",
            filename=request.headline or "Text Article",
            classification=result["classification"],
            deepfake_probability=result["fake_news_probability"],
            confidence_percentage=result["confidence_percentage"],
            details_json=json.dumps(result["metrics"])
        )
        db.add(scan)
        db.commit()

        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error analyzing text: {str(e)}")

@router.post("/ocr")
async def detect_ocr_meme(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """Extracts meme text via OCR and records scan log into database."""
    contents = await file.read()
    if len(contents) == 0:
        raise HTTPException(status_code=400, detail="Uploaded image file is empty.")

    try:
        result = ocr_engine.analyze_meme_image(contents)
        result["filename"] = file.filename

        # Save to SQLite Database
        scan = ScanRecord(
            media_type="ocr_meme",
            filename=file.filename,
            classification=result["veracity_analysis"]["classification"],
            deepfake_probability=result["veracity_analysis"]["fake_news_probability"],
            confidence_percentage=result["veracity_analysis"]["confidence_percentage"],
            details_json=json.dumps(result["veracity_analysis"]["metrics"])
        )
        db.add(scan)
        db.commit()

        return {"success": True, "data": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error performing OCR scan: {str(e)}")
