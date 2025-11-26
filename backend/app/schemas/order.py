from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

from app.schemas.product import ProductInDB

class OrderItemBase(BaseModel):
    product_id: int
    name: str
    size: Optional[str] = None
    toppings: List[str] = []
    notes: Optional[str] = None
    unit_price: float
    quantity: int

class OrderItemRead(OrderItemBase):
    id: int
    product: Optional[ProductInDB] = None

    model_config = {
        "from_attributes": True
    }


class OrderCreate(BaseModel):
    items: List[OrderItemBase]
    total: float

class OrderRead(BaseModel):
    id: int
    user_id: int
    total: float
    status: str
    created_at: datetime
    items: List[OrderItemRead]

    model_config = {
        "from_attributes": True
    }
