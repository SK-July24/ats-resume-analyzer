# backend/app/core/keyword_matcher.py

def match_skills(resume_skills, jd_skills):
    matched = []
    missing = []

    for skill in jd_skills:
        if skill in resume_skills:
            matched.append(skill)
        else:
            missing.append(skill)

    return matched, missing