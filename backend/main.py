from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import models, schemas
from database import SessionLocal, engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI()


# ---------------- DB ----------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ---------------- ROOT ----------------
@app.get("/")
def home():
    return {"message": "Backend is running 🚀"}


# ---------------- AUTH ----------------
@app.post("/signup")
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return {"message": "User created", "user_id": db_user.id}


@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()

    if not db_user or db_user.password != user.password:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    return {
        "user_id": db_user.id,
        "role": db_user.role,
        "name": db_user.name
    }


# ---------------- EXPENSE ----------------

# Create Expense
@app.post("/expense")
def create_expense(expense: schemas.ExpenseCreate, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == expense.user_id).first()

    if not user or user.role != "employee":
        raise HTTPException(status_code=403, detail="Only employees can submit expenses")

    db_expense = models.Expense(**expense.dict())
    db.add(db_expense)
    db.commit()
    db.refresh(db_expense)

    return {"message": "Expense submitted", "expense_id": db_expense.id}


# Get Expenses (Role-based)
@app.get("/expenses/{user_id}")
def get_expenses(user_id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == user_id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    if user.role == "employee":
        # Employee sees only their expenses
        expenses = db.query(models.Expense).filter(models.Expense.user_id == user_id).all()
    else:
        # Manager sees all pending expenses
        expenses = db.query(models.Expense).all()

    return expenses


# ---------------- APPROVAL ----------------

@app.post("/approve")
def approve_expense(req: schemas.ApproveRequest, db: Session = Depends(get_db)):
    manager = db.query(models.User).filter(models.User.id == req.manager_id).first()

    if not manager or manager.role != "manager":
        raise HTTPException(status_code=403, detail="Only managers can approve")

    expense = db.query(models.Expense).filter(models.Expense.id == req.expense_id).first()

    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")

    if expense.status != "pending":
        raise HTTPException(status_code=400, detail="Already processed")

    # 🔥 SMART LOGIC HERE
    if req.status == "approved":
        if expense.amount > 1000:
            expense.status = "pending_second_level"
        else:
            expense.status = "approved"
    else:
        expense.status = "rejected"

    db.commit()

    return {"message": f"Expense {expense.status}"}