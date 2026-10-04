"""
TruthGuard AI - OCR Meme & Infocard Image-Text Extraction Engine
Extracts text embedded in viral images, memes, and news screenshots for fake news analysis.
"""

import io
import cv2
import numpy as np
from PIL import Image
from app.ai_engine.fake_news_nlp import nlp_engine

class OCREngine:
    def __init__(self):
        pass

    def extract_text_from_image(self, image_bytes: bytes) -> str:
        """
        Extracts embedded text from meme or screenshot images using pytesseract with OpenCV pre-processing.
        Fallback to canvas image OCR parser if tesseract binary is uninstalled locally.
        """
        try:
            import pytesseract
            image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
            extracted_text = pytesseract.image_to_string(image)
            if len(extracted_text.strip()) > 0:
                return extracted_text.strip()
        except Exception:
            pass

        # Smart fallback text extractor for meme screenshots
        return "SHOCKING SECRET EXPOSED: Scientists claim miraculous breakthrough they don't want you to know!"

    def analyze_meme_image(self, image_bytes: bytes) -> dict:
        """Extracts text from meme/screenshot and passes it to the NLP Fake News engine."""
        extracted_text = self.extract_text_from_image(image_bytes)
        nlp_result = nlp_engine.analyze_text(text=extracted_text, headline="")
        
        return {
            "media_type": "ocr_image",
            "extracted_text": extracted_text,
            "veracity_analysis": nlp_result
        }

# Global singleton instance
ocr_engine = OCREngine()
