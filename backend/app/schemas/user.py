from pydantic import BaseModel
from typing import Optional

class UserBase(BaseModel):
    email: str
    name: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None

class User(BaseModel):
    id: int
    email: str
    name: Optional[str]
    address: Optional[str]
    phone: Optional[str]

    model_config = {
        "from_attributes": True
    }
