from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str


class UserLogin(BaseModel):
    email: str
    password: str


class ExpenseCreate(BaseModel):
    user_id: int
    amount: int
    description: str


class ApproveRequest(BaseModel):
    expense_id: int
    manager_id: int
    status: str  # approved/rejected