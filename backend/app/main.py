from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.ai import router as ai_router
from app.routes import pdf

from app.database.database import Base, engine
from app.api.complaint import router as complaint_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Customer Complaint AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(complaint_router)
app.include_router(ai_router)
app.include_router(pdf.router)

@app.get("/")
def root():
    return {"message": "API Running"}