from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas
from database import SessionLocal

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/approve")
def approve_expense(req: schemas.ApproveRequest, db: Session = Depends(get_db)):
    manager = db.query(models.User).filter(models.User.id == req.manager_id).first()

    if not manager or manager.role != "manager":
        raise HTTPException(status_code=403, detail="Only managers can approve")

    expense = db.query(models.Expense).filter(models.Expense.id == req.expense_id).first()

    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    if expense.status != "pending":
        raise HTTPException(status_code=400, detail="Already processed")

    # 🔥 Multi-level simulation
    if req.status == "approved":
        if expense.amount > 1000:
            expense.status = "pending_second_level"
        else:
            expense.status = "approved"
    else:
        expense.status = "rejected"

    db.commit()

    return {"message": f"Expense {expense.status}"}