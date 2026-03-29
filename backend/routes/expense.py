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


@router.post("/expense")
def create_expense(expense: schemas.ExpenseCreate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == expense.user_id).first()

    if not user or user.role != "employee":
        raise HTTPException(status_code=403, detail="Only employees can submit expenses")

    db_expense = models.Expense(**expense.dict())
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)

    return {"message": "Expense submitted", "expense_id": db_expense.id}


@router.get("/expenses/{user_id}")
def get_expenses(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.role == "employee":
        expenses = db.query(models.Expense).filter(models.Expense.user_id == user_id).all()
    else:
        expenses = db.query(models.Expense).all()

    return expenses