from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.analyze import router as analyze_router

app = FastAPI(
    title="ATS Resume Analyzer",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded files
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Routes
app.include_router(analyze_router)


@app.get("/")
def home():
    return {"message": "API Running"}