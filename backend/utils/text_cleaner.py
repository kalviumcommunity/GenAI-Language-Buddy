def clean_text(text: str) -> str:
    """
    Simple text cleaning function.
    Removes unwanted whitespace or formatting issues before sending to frontend.
    """
    if not text:
        return ""
    return text.strip().replace("\n", " ")
