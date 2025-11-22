from pydantic import BaseModel
from typing import List, Optional

class Size(BaseModel):
    label: str
    price: float

class ProductBase(BaseModel):
    name: str
    base_price: float
    description: Optional[str] = None
    category_slug: Optional[str] = None

class ProductInDB(ProductBase):
    id: int
    images: List[str] = []
    sizes: List[Size] = []
    toppings: List[str] = []

    class Config:
        orm_mode = True
