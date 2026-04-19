def generate_suggestions(ats_score, missing_skills, resume_skills, jd_skills):

    suggestions = []

    # 1. Missing skills suggestions
    if missing_skills:
        suggestions.append(
            f"Add these missing skills: {', '.join(missing_skills)}"
        )

    # 2. Low score suggestions
    if ats_score < 50:
        suggestions.append(
            "Your resume has low ATS compatibility. Improve keyword matching and add relevant skills."
        )

    elif ats_score < 75:
        suggestions.append(
            "Good match, but you can improve by adding more job-specific keywords and experience details."
        )

    else:
        suggestions.append(
            "Strong match! Fine-tune keywords and improve formatting for better ranking."
        )

    # 3. Resume improvement tips
    if "project" not in [s.lower() for s in resume_skills]:
        suggestions.append("Add project section with real-world examples.")

    if len(resume_skills) < len(jd_skills) / 2:
        suggestions.append("Increase skill coverage based on job description.")

    return suggestions