from pydantic import BaseModel
from datetime import date


class ComplaintCreate(BaseModel):

    customer_name: str

    email: str

    phone: str

    product_name: str

    batch_number: str

    manufacturing_date: date

    expiry_date: date

    description: str

    priority: str


class ComplaintResponse(ComplaintCreate):

    id: int

    category: str | None = None

    severity: str | None = None

    risk_score: str | None = None

    summary: str | None = None

    capa: str | None = None

    status: str

    class Config:
        from_attributes = True