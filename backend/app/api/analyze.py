from fastapi import APIRouter, UploadFile, File, Form

from app.utils.file_handler import save_file
from app.services.resume_parser import extract_text_from_pdf
from app.services.text_cleaner import clean_text
from app.services.skill_extractor import extract_skills
from app.services.jd_processor import clean_jd
from app.core.keyword_matcher import match_skills
from app.core.ats_score import calculate_ats_score
from app.core.suggestions import generate_suggestions

router = APIRouter()


@router.post("/analyze")
async def analyze_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    """
    ATS Resume Analyzer:
    - Extract resume text
    - Clean text
    - Extract skills
    - Process job description
    - Match skills
    - Calculate ATS score
    - Generate suggestions
    """

    # 1. Save uploaded resume file
    content = await file.read()
    file_path = save_file(content, file.filename)

    # 2. Extract text from resume PDF
    resume_text = extract_text_from_pdf(file_path)

    # 3. Clean resume text
    resume_text = clean_text(resume_text)

    # 4. Extract skills from resume
    resume_skills = extract_skills(resume_text)

    # 5. Clean job description
    jd_text = clean_jd(job_description)

    # 6. Extract skills from job description
    jd_skills = extract_skills(jd_text)

    # 7. Match skills
    matched_skills, missing_skills = match_skills(resume_skills, jd_skills)

    # 8. Calculate ATS score
    ats_score = calculate_ats_score(
        resume_text,
        resume_skills,
        jd_skills
    )

    # 9. Generate suggestions
    suggestions = generate_suggestions(
        ats_score,
        missing_skills,
        resume_skills,
        jd_skills
    )

    # 10. Final response
    return {
        "ats_score": ats_score,
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