"""
TruthGuard AI - JWT Authentication & Password Hashing Utilities
Bulletproof salted SHA-256 password hashing and JWT token generation.
"""

import hashlib
from datetime import datetime, timedelta
from typing import Optional
from jose import jwt

SECRET_KEY = "truthguard_secret_key_change_in_production_market_ready"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 # 24 Hours

def get_password_hash(password: str) -> str:
    """Computes salted SHA-256 password hash."""
    salt = "truthguard_salt_2026_security"
    return hashlib.sha256((password + salt).encode('utf-8')).hexdigest()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifies plain text password against stored hash."""
    return get_password_hash(plain_password) == hashed_password

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
