from fastapi import APIRouter
from pydantic import BaseModel
from langchain_groq import ChatGroq
from dotenv import load_dotenv
import os
import json

load_dotenv()

router = APIRouter(prefix="/ai", tags=["AI"])

llm = ChatGroq(
    model=os.getenv("MODEL_NAME"),
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0,
)


class ChatRequest(BaseModel):
    complaint: str


@router.post("/extract")
def extract_complaint(data: ChatRequest):
    prompt = f"""
Extract the following complaint into JSON.

Return ONLY JSON.
Do not use markdown.
Do not use ```.

Fields:
customer_name
email
phone
product_name
batch_number
manufacturing_date
expiry_date
description
priority

Complaint:
{data.complaint}
"""

    response = llm.invoke(prompt)

    content = response.content.strip()

    # Remove markdown code fences if present
    if content.startswith("```"):
        content = content.replace("```json", "")
        content = content.replace("```", "")
        content = content.strip()

    return json.loads(content)

@router.post("/analyze")
def analyze_complaint(data: ChatRequest):

    prompt = f"""
You are a Pharmaceutical Quality Assurance AI.

Analyze this customer complaint.

Return ONLY valid JSON.

Fields:

category
severity
risk_score
summary
capa

Complaint:

{data.complaint}

Rules:

Category examples:
- Product Defect
- Packaging Issue
- Labeling Error
- Adverse Event
- Storage Issue

Severity:
- Low
- Medium
- High
- Critical

Risk Score:
Give one short sentence explaining the risk.

Summary:
Write 2 concise sentences.

CAPA:
Suggest corrective and preventive action.
"""

    response = llm.invoke(prompt)

    content = response.content.strip()

    # Remove markdown if AI wraps JSON in ```json
    if content.startswith("```"):
        content = content.replace("```json", "")
        content = content.replace("```", "")
        content = content.strip()

    try:
        return json.loads(content)
    except Exception:
        return {
            "raw_response": content
        }