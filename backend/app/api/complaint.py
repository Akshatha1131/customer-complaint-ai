from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.complaint import ComplaintCreate, ComplaintResponse
from app.services.complaint_service import (
    create_complaint,
    get_all_complaints,
    get_complaint,
    delete_complaint,
)

router = APIRouter(prefix="/complaints", tags=["Complaints"])


@router.post("/", response_model=ComplaintResponse)
def create(data: ComplaintCreate, db: Session = Depends(get_db)):
    return create_complaint(db, data)


@router.get("/", response_model=list[ComplaintResponse])
def list_all(db: Session = Depends(get_db)):
    return get_all_complaints(db)


@router.get("/{complaint_id}", response_model=ComplaintResponse)
def get_one(complaint_id: int, db: Session = Depends(get_db)):
    complaint = get_complaint(db, complaint_id)
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    return complaint


@router.delete("/{complaint_id}")
def delete_one(complaint_id: int, db: Session = Depends(get_db)):
    complaint = delete_complaint(db, complaint_id)
    if not complaint:
        raise HTTPException(status_code=404, detail="Complaint not found")
    return {"message": "Deleted successfully"}