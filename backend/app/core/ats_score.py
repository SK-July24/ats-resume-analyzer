# backend/app/core/ats_score.py

def calculate_skill_score(resume_skills, jd_skills):
    if len(jd_skills) == 0:
        return 0

    matched = set(resume_skills) & set(jd_skills)
    return (len(matched) / len(jd_skills)) * 100


def calculate_keyword_score(resume_skills, jd_skills):
    if len(jd_skills) == 0:
        return 0

    matched = set(resume_skills).intersection(set(jd_skills))
    return (len(matched) / len(jd_skills)) * 100


def calculate_format_score(resume_text):
    score = 50

    text = resume_text.lower()

    if "skills" in text:
        score += 15
    if "experience" in text:
        score += 15
    if "project" in text:
        score += 10
    if len(text) > 1000:
        score += 10

    return min(score, 100)


def calculate_section_score(resume_text):
    text = resume_text.lower()

    sections = ["skills", "experience", "education", "project"]

    found = 0
    for section in sections:
        if section in text:
            found += 1

    return (found / len(sections)) * 100


def calculate_ats_score(resume_text, resume_skills, jd_skills):

    keyword_score = calculate_keyword_score(resume_skills, jd_skills)
    skill_score = calculate_skill_score(resume_skills, jd_skills)
    format_score = calculate_format_score(resume_text)
    section_score = calculate_section_score(resume_text)

    final_score = (
        keyword_score * 0.4 +
        skill_score * 0.3 +
        format_score * 0.15 +
        section_score * 0.15
    )

    return round(final_score, 2)