from sqlalchemy.orm import Session
import models

def create_user(db: Session, user_data):
    user = models.User(**user_data)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def create_expense(db: Session, expense_data):
    exp = models.Expense(**expense_data)
    db.add(exp)
    db.commit()
    db.refresh(exp)
    return exp


def get_all_expenses(db: Session):
    return db.query(models.Expense).all()


def get_user_expenses(db: Session, user_id: int):
    return db.query(models.Expense).filter(models.Expense.user_id == user_id).all()


def update_expense_status(db: Session, expense_id: int, status: str):
    exp = db.query(models.Expense).filter(models.Expense.id == expense_id).first()
    if exp:
        exp.status = status
        db.commit()
    return exp