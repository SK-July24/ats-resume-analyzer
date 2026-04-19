from fastapi import APIRouter, UploadFile, File, Form, Request
import os

from app.utils.file_handler import save_file
from app.services.resume_parser import extract_text_from_pdf
from app.services.text_cleaner import clean_text
from app.services.skill_extractor import extract_skills
from app.services.jd_processor import clean_jd
from app.core.keyword_matcher import match_skills
from app.core.ats_score import calculate_ats_score
from app.core.suggestions import generate_suggestions

router = APIRouter()

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/analyze")
async def analyze_resume(
    request: Request,   # ✅ added
    file: UploadFile = File(...),
    job_description: str = Form(...)
):

    # 1. Save uploaded resume file
    content = await file.read()
    file_path = save_file(content, file.filename)

    # ✅ NEW: create public URL
    file_url = f"{request.base_url}uploads/{file.filename}"

    # ---- YOUR EXISTING LOGIC (UNCHANGED) ----
    resume_text = extract_text_from_pdf(file_path)
    resume_text = clean_text(resume_text)
    resume_skills = extract_skills(resume_text)

    jd_text = clean_jd(job_description)
    jd_skills = extract_skills(jd_text)

    matched_skills, missing_skills = match_skills(resume_skills, jd_skills)

    ats_score = calculate_ats_score(
        resume_text,
        resume_skills,
        jd_skills
    )

    suggestions = generate_suggestions(
        ats_score,
        missing_skills,
        resume_skills,
        jd_skills
    )

    # ✅ ONLY ADD THIS FIELD
    return {
        "ats_score": ats_score,
        "resume_url": file_url,   # 👈 NEW (important)
        "summary": {
            "total_resume_skills": len(resume_skills),
            "total_jd_skills": len(jd_skills),
            "matched_skills_count": len(matched_skills),
            "missing_skills_count": len(missing_skills)
        },
        "resume_skills": resume_skills,
        "jd_skills": jd_skills,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "suggestions": suggestions
    }