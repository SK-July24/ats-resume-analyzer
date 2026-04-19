import re

def clean_jd(text: str) -> str:
    """
    Clean job description text
    """

    text = text.lower()
    text = re.sub(r'[^a-zA-Z0-9\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()

    return text