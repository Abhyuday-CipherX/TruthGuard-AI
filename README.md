<div align="center">

# 🛡️ TruthGuard AI
### **Market-Ready Deepfake & Misinformation Security System**

[![Python 3.10+](https://img.shields.io/badge/Python-3.10%20%7C%203.11%20%7C%203.12-blue?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110.0-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React 18](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.1.6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![OpenCV](https://img.shields.io/badge/OpenCV-Computer%20Vision-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white)](https://opencv.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

*An enterprise-grade, multi-modal artificial intelligence platform engineered to detect facial deepfakes, synthetic voice cloning, article sensationalism, and meme graphic misinformation in real time.*

</div>

---

## 📌 Executive Summary & Problem Statement

### **The Challenge in the Modern Digital Era**
The rapid democratization of Generative AI tools (such as Midjourney, Stable Diffusion, ElevenLabs, and DeepFaceLab) has eliminated the technical barrier to creating **hyper-realistic fake media**. 

Today, synthetic content is so convincing that human visual and auditory perception can no longer reliably distinguish real media from artificial manipulation.

```
       [ Generative AI Tools ]
 (Midjourney / ElevenLabs / DeepFaceLab)
                   │
                   ▼
  ┌─────────────────────────────────┐
  │ Hyper-Realistic Fake Content    │
  └─────────────────────────────────┘
                   │
       ┌───────────┴───────────┐
       ▼                       ▼
[ Optical Media ]      [ Audio Waves ]
(Face Swaps & Avatars)  (Voice Cloning Scams)
```

### 🚨 Real-Life Threat Scenarios:
1. **CEO & Executive Voice Cloning Scams**: Fraudsters clone corporate executives' voices over short audio recordings to execute million-dollar wire transfer fraud.
2. **Political & Election Misinformation**: Manipulated videos of world leaders and political candidates circulating hours before elections to destabilize public opinion.
3. **Viral Meme & Screenshot Infocards**: Fake news quotes embedded inside meme images posted on social media to bypass text-based content moderation filters.
4. **Identity Fraud & KYC Bypassing**: Synthetic biometric face swaps generated to breach automated facial verification systems in banking apps.

---

## ⚔️ Existing Solutions vs. Why TruthGuard AI is Better

Most commercial security solutions operate in **single-modal silos**—scanning *only* images or *only* text—making them easy to bypass with multi-channel disinformation campaigns.

| Feature / Metric | Traditional Tools | Basic NLP / CNN Detectors | 🛡️ **TruthGuard AI Platform** |
| :--- | :---: | :---: | :---: |
| **Multi-Modal Detection** | ❌ Single-mode | ❌ Single-mode | ✅ **Images, Videos, Audio, Text & OCR Memes** |
| **2D FFT Frequency Analysis** | ❌ No | ⚠️ Partial | ✅ **1/f² Optical Power Spectrum Law** |
| **RGB Noise Covariance** | ❌ No | ❌ No | ✅ **CMOS Bayer Filter Noise Correlation** |
| **Group Photo Multi-Face** | ❌ 1 Face Only | ⚠️ Partial | ✅ **YCrCb Skin Segmentation + NMS Bounding Boxes** |
| **Synthetic Audio Analysis** | ❌ No | ❌ No | ✅ **STFT Mel-Spectrogram & Pitch Jitter** |
| **Live Microphone Dynamics** | ❌ No | ❌ No | ✅ **Real-Time Web Speech API Veracity Check** |
| **Visual Evidence Heatmaps** | ❌ No | ❌ No | ✅ **16x16 Grad-CAM Visual Heatmap Grid** |
| **Forensic Database Audit** | ❌ No | ❌ No | ✅ **SQLite Persistence + Telemetry Analytics** |

---

## ✨ Key System Features

### 📷 1. Image & Video Deepfake Studio
- **Multi-Face Recognition**: Automatically detects and isolates **all human faces** in single or group photos using OpenCV Haar Cascades merged with YCrCb/HSV skin contour segmentation and Non-Maximum Suppression (NMS).
- **1/f² Optical Camera Power Law**: Real camera lenses obey natural $1/f^2$ Fourier spectral power decay. AI latent neural decoders leave distinct high-frequency aliasing grid spikes.
- **Bayer RGB Channel Covariance**: Measures noise correlation across Red, Green, and Blue sensor channels. Real camera sensors generate independent noise distributions, whereas AI portraits exhibit artificial inter-channel phase alignment (`avg_corr > 0.76`).
- **Grad-CAM Visual Heatmaps**: Generates a glowing 16x16 spatial intensity grid highlighting flagged artifact regions (eye boundaries, jawline blending, skin smoothing).

### 🎙️ 2. Synthetic Audio & Live Microphone Studio
- **Short-Time Fourier Transform (STFT)**: Converts raw audio waveforms into 2D Mel-Spectrograms to inspect formant resonance curves.
- **Spectral Flux & Pitch Jitter**: Measures energy rate variations and zero-crossing frequency stability to flag artificial Text-to-Speech (TTS) voice cloning.
- **Live Microphone Speech-to-Text**: Utilizes the browser **Web Speech API** to record live speech, transcribe text dynamics in real time, and evaluate veracity.

### 📰 3. Fake News & Article Veracity Engine
- **Sensationalism Index**: Detects clickbait trigger phrases (`shocking secret`, `they don't want you to know`, `banned truth`).
- **Emotional Manipulation Rating**: Computes ALL CAPS density ratios and exclamation mark frequencies to measure artificial hype.

### 🖼️ 4. Meme Graphic OCR Scanner
- **Optical Character Recognition (OCR)**: Preprocesses viral memes, infographics, and news screenshots with OpenCV and extracts embedded text using Tesseract OCR to perform instant veracity classification.

### 🔒 5. Enterprise Security & Audit Logging
- **SQLite Database**: Persists all scan records, confidence scores, and forensic metadata.
- **JWT Authentication**: Built-in user registration, bcrypt/salted SHA-256 password security, and JWT session tokens.

---

## 🏗️ Architecture & Data Flow

```text
[ React 18 + Vite Glassmorphic Dashboard ]
                   │
                   ▼ (HTTP REST API / Proxy)
  ┌─────────────────────────────────┐
  │ Python FastAPI Backend Server   │
  └─────────────────────────────────┘
                   │
       ┌───────────┼───────────┬───────────┐
       ▼           ▼           ▼           ▼
  [ Image AI ] [ Audio AI ] [ NLP Text ] [ OCR Engine ]
   OpenCV/FFT   STFT Mel-    Clickbait   Tesseract OCR
   Bayer Cov.  Spectrogram   Index       Meme Extraction
       │           │           │           │
       └───────────┴─────┬─────┴───────────┘
                         ▼
        [ SQLite3 Database (truthguard.db) ]
        (Scan History, Users & Telemetry)
```

---

## 🛠️ Tech Stack & Prerequisites

### **Recommended Environment**
- **Operating System**: Windows 10/11, macOS, or Linux
- **Python Version**: **Python 3.10, 3.11, or 3.12** *(Recommended for optimal C-extension compatibility)*
- **Node.js Version**: Node.js **v18.0+** or **v20.0+** (with `npm 9+`)

### **Libraries & Frameworks**
- **Backend**: FastAPI, Uvicorn, NumPy, OpenCV (`opencv-python`), Pillow, PyJWT, SQLAlchemy
- **Frontend**: React 18, Vite, Lucide React Icons, HTML5 2D Canvas API, Web Speech API

---

## ⚡ Detailed Step-by-Step Installation & Setup

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/YOUR_USERNAME/TruthGuard-AI.git
cd "TruthGuard AI"
```

---

### **2️⃣ Backend Setup (FastAPI Server)**

Open your terminal in the root directory:

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Create a Python Virtual Environment
# (Windows)
python -m venv venv

# 3. Activate the Virtual Environment
# (Windows PowerShell)
.\venv\Scripts\Activate.ps1
# (Windows CMD)
.\venv\Scripts\activate.bat
# (macOS / Linux)
source venv/bin/activate

# 4. Install Backend Dependencies
pip install -r requirements.txt

# 5. Start the FastAPI Development Server
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

> 🌐 **FastAPI Server Running at**: `http://127.0.0.1:8000`  
> 📑 **Interactive OpenAPI Swagger Docs**: `http://127.0.0.1:8000/docs`

---

### **3️⃣ Frontend Setup (React + Vite Dashboard)**

Open a **second terminal tab** in your project directory:

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install Node Packages
npm install

# 3. Start the Vite Development Server
npm run dev
```

> 💻 **TruthGuard AI Application Live at**: `http://localhost:3000`

---

## 📡 REST API Documentation

TruthGuard AI automatically generates interactive OpenAPI Swagger documentation.

| Endpoint | Method | Description |
| :--- | :---: | :--- |
| `/api/v1/detect/image` | `POST` | Upload image for multi-face detection, 2D FFT, Bayer noise, & Grad-CAM heatmap grid. |
| `/api/v1/detect/audio` | `POST` | Upload audio file for STFT Mel-spectrogram & synthetic voice pitch jitter metrics. |
| `/api/v1/detect/text` | `POST` | Analyze article text/headline for clickbait index & emotional manipulation. |
| `/api/v1/detect/ocr` | `POST` | Extract text from meme screenshot graphics & run veracity classification. |
| `/api/v1/auth/register` | `POST` | Create a new user account with salted password hashing. |
| `/api/v1/auth/login` | `POST` | Authenticate user credentials and issue JWT access token. |
| `/api/v1/history/scans` | `GET` | Retrieve historical forensic scan logs from SQLite database. |
| `/api/v1/history/analytics` | `GET` | Fetch telemetry analytics summary for dashboard charts. |

---

## 📂 Project Directory Structure

```text
TruthGuard AI/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py              # FastAPI server entry point & CORS configuration
│   │   ├── database.py          # SQLite database connection & session setup
│   │   ├── models.py            # SQLAlchemy schemas for User & ScanRecord tables
│   │   ├── auth.py              # Salted SHA-256 hashing & JWT authentication
│   │   ├── ai_engine/
│   │   │   ├── __init__.py
│   │   │   ├── cnn_deepfake.py   # Multi-face detection, 2D FFT, Bayer noise & Grad-CAM
│   │   │   ├── audio_analyzer.py # STFT Mel-spectrogram & pitch jitter synthetic voice detector
│   │   │   ├── fake_news_nlp.py  # Article sensationalism & clickbait scoring
│   │   │   └── ocr_engine.py     # Tesseract meme text extraction engine
│   │   └── routers/
│   │       ├── __init__.py
│   │       ├── detect_router.py # Multi-modal upload endpoints
│   │       ├── auth_router.py   # User registration & login endpoints
│   │       └── history_router.py# Audit logs & telemetry analytics endpoints
│   └── requirements.txt         # Backend Python dependencies
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Top navigation bar with status pulse
│   │   │   ├── Sidebar.jsx      # Navigation sidebar tabs
│   │   │   ├── HeatmapCanvas.jsx# 2D Grad-CAM face heatmap overlay
│   │   │   └── SpectrogramCanvas.jsx # Audio spectral visualizer canvas
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx    # Overview telemetry & studio launchers
│   │   │   ├── DeepfakeScanner.jsx # Image/video deepfake forensic studio
│   │   │   ├── AudioScanner.jsx # Synthetic voice & live mic studio
│   │   │   ├── FakeNewsScanner.jsx # Article & meme OCR veracity studio
│   │   │   └── ScanHistory.jsx  # Searchable forensic scan audit logs
│   │   ├── App.jsx              # Main App wrapper & state routing
│   │   ├── index.css            # Dark Glassmorphism Design System
│   │   └── main.jsx             # React DOM entry point
│   ├── index.html               # HTML5 template with Google Fonts
│   ├── package.json             # Frontend dependencies
│   └── vite.config.js           # Vite dev server & API proxy config
├── .gitignore                   # Excludes venv, node_modules, & database
└── README.md                    # Project documentation
```

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve model detection accuracy, add new spatial transforms, or enhance the dashboard UI:

1. Fork the repository (`https://github.com/YOUR_USERNAME/TruthGuard-AI/fork`)
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

<div align="center">

**Built with ❤️ for digital security and media integrity.**

</div>
