"""
TruthGuard AI - Database Models
Defines User account and ScanRecord forensic database tables.
"""

from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    scans = relationship("ScanRecord", back_populates="owner")

class ScanRecord(Base):
    __tablename__ = "scan_records"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    media_type = Column(String, nullable=False) # 'image', 'audio', 'text', 'ocr'
    filename = Column(String, nullable=True)
    classification = Column(String, nullable=False) # 'DEEPFAKE', 'AUTHENTIC', 'SYNTHETIC_VOICE', 'FAKE_NEWS'
    deepfake_probability = Column(Float, nullable=False)
    confidence_percentage = Column(Float, nullable=False)
    details_json = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="scans")
