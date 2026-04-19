from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.analyze import router as analyze_router

# -----------------------------
# FastAPI App Initialization
# -----------------------------
app = FastAPI(
    title="ATS Resume Analyzer",
    description="AI-based Resume vs Job Description Analyzer",
    version="1.0.0"
)

# -----------------------------
# CORS (IMPORTANT for React)
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # for development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Include API Routes
# -----------------------------
app.include_router(analyze_router)

# -----------------------------
# Basic Test Routes
# -----------------------------
@app.get("/")
def home():
    return {
        "message": "ATS Resume Analyzer API is running"
    }


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "message": "Backend is healthy"
    }