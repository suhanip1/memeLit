import fitz

def extract_text_from_pdf(pdf_path):
    """
    Extract text from a PDF file.
    
    :param pdf_path: Path to the PDF file
    :return: Extracted text from the PDF or an error message
    """
    try:
        # Try to open the PDF file
        document = fitz.open(pdf_path)
    except Exception as e:
        return f"Error opening file: {e}"
    
    transcript = ""

    try:
        # Iterate through each page in the PDF
        for page_number in range(document.page_count):
            page = document.load_page(page_number)
            text = page.get_text()
            transcript += text
    finally:
        # Close the PDF document
        document.close()
    
    return transcript


