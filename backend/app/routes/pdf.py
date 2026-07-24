from fastapi import APIRouter, UploadFile, File
from pypdf import PdfReader

router = APIRouter(prefix="/pdf", tags=["PDF"])

@router.post("/extract")
async def extract_pdf(file: UploadFile = File(...)):
    reader = PdfReader(file.file)

    text = ""

    for page in reader.pages:
        page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"

    return {
        "text": text
    }