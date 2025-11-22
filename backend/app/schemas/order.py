from pydantic import BaseModel
from typing import List, Optional

class OrderItemCreate(BaseModel):
    product_id: int
    name: str
    size: Optional[str]
    toppings: List[str] = []
    notes: Optional[str] = None
    unit_price: float
    quantity: int

class OrderCreate(BaseModel):
    items: List[OrderItemCreate]
    total: float
    address: str
    phone: str
