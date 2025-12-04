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


class OrderUpdate(BaseModel):
    status: str
    admin_notes: Optional[str] = None


class OrderRead(BaseModel):
    id: int
    user_id: int
    user_name: str | None = None
    total: float
    status: str
    created_at: datetime
    updated_at: Optional[datetime] = None
    admin_notes: Optional[str] = None
    items: List[OrderItemRead] = []

    class Config:
        from_attributes = True
