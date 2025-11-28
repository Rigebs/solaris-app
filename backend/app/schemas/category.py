from pydantic import BaseModel

class CategoryBase(BaseModel):
    name: str
    slug: str
    is_active: bool = True

class CategoryCreate(CategoryBase):
    pass

class CategoryUpdate(CategoryBase):
    pass

class Category(CategoryBase):
    id: int

    model_config = {
        "from_attributes": True
    }
