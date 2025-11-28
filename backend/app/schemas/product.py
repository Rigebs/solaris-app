from pydantic import BaseModel
from typing import List, Optional

class Size(BaseModel):
    label: str
    price: float

class ProductBase(BaseModel):
    name: str
    base_price: float
    description: Optional[str] = None
    category_id: int
    is_active: bool = True

class ProductCreate(ProductBase):
    sizes: List[Size] = []
    toppings: List[str] = []
    images: List[str] = []

class ProductUpdate(ProductBase):
    sizes: List[Size] = []
    toppings: List[str] = []
    images: List[str] = []

class ProductInDB(ProductBase):
    id: int
    images: List[str] = []
    sizes: List[Size] = []
    toppings: List[str] = []
    category_slug: Optional[str] = None # Helper for frontend

    model_config = {
        "from_attributes": True
    }
