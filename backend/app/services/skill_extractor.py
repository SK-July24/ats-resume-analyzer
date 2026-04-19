SKILLS = [
    "python", "java", "c++", "javascript",
    "react", "node", "fastapi", "django",
    "sql", "mongodb", "postgresql",
    "aws", "docker", "kubernetes",
    "git", "machine learning", "nlp"
]

def extract_skills(text: str):
    found_skills = []

    for skill in SKILLS:
        if skill in text:
            found_skills.append(skill)

    return found_skills

def extract_jd_skills(text: str):
    found_skills = []

    for skill in SKILLS:
        if skill in text:
            found_skills.append(skill)

    return found_skills