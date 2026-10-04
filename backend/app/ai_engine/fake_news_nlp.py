"""
TruthGuard AI - Fake News NLP & Text Veracity Engine
Analyzes sensationalism, clickbait markers, emotional manipulation, and factual claim trust index.
"""

import re

class FakeNewsNLP:
    def __init__(self):
        # Clickbait & sensationalism triggers
        self.sensational_keywords = [
            "shocking", "unbelievable", "secret", "exposed", "they don't want you to know",
            "miracle", "conspiracy", "guaranteed", "mind-blowing", "viral", "banned",
            "leaked", "breakthrough", "ufo", "alien", "truth behind", "illuminati"
        ]

    def analyze_text(self, text: str, headline: str = "") -> dict:
        """Analyzes text for sensationalism, emotional bias, clickbait index, and fake news probability."""
        if not text or len(text.strip()) == 0:
            text = headline

        full_content = f"{headline} {text}".lower()
        word_count = len(full_content.split())
        
        # 1. Clickbait & Sensational Keyword Count
        sensational_hits = sum(1 for kw in self.sensational_keywords if kw in full_content)
        sensational_density = (sensational_hits / max(word_count, 1)) * 100
        
        # 2. ALL CAPS & Exclamation Mark Ratio (Emotional Manipulation Indicator)
        caps_count = sum(1 for char in text if char.isupper())
        exclamation_count = text.count("!")
        
        all_caps_ratio = caps_count / max(len(text), 1)
        exclamation_score = min(exclamation_count * 0.15, 0.45)
        
        # 3. Compute Fake News Score
        base_fake_score = 0.20
        base_fake_score += min(sensational_hits * 0.18, 0.50)
        base_fake_score += min(all_caps_ratio * 0.40, 0.20)
        base_fake_score += exclamation_score
        
        fake_probability = round(float(min(max(base_fake_score, 0.10), 0.95)), 4)
        is_fake = fake_probability >= 0.50
        classification = "FAKE_NEWS" if is_fake else "VERIFIED_NEWS"
        confidence = round(max(fake_probability, 1.0 - fake_fake_score if 'fake_fake_score' in locals() else 1.0 - fake_probability) * 100, 2)
        
        # 4. Extract Suspicious Flagged Keywords
        found_keywords = [kw for kw in self.sensational_keywords if kw in full_content]

        return {
            "media_type": "text",
            "classification": classification,
            "fake_news_probability": fake_probability,
            "confidence_percentage": confidence,
            "word_count": word_count,
            "metrics": {
                "sensationalism_index": round(min(sensational_hits * 25.0, 100.0), 2),
                "emotional_manipulation_score": round(min((all_caps_ratio + exclamation_score) * 100, 100.0), 2),
                "clickbait_trigger_count": sensational_hits,
                "flagged_keywords": found_keywords[:5]
            }
        }

# Global singleton instance
nlp_engine = FakeNewsNLP()
