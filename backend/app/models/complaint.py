from sqlalchemy import Column, Integer, String, Text, Date
from app.database.database import Base


class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)

    customer_name = Column(String)

    email = Column(String)

    phone = Column(String)

    product_name = Column(String)

    batch_number = Column(String)

    manufacturing_date = Column(Date)

    expiry_date = Column(Date)

    description = Column(Text)

    priority = Column(String)

    category = Column(String)

    severity = Column(String)

    risk_score = Column(String)

    summary = Column(Text)

    capa = Column(Text)

    status = Column(String, default="Open")