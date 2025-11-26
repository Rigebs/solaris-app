from pydantic import BaseModel

class CategoryBase(BaseModel):
    name: str
    slug: str

class Category(CategoryBase):
    id: int

    model_config = {
        "from_attributes": True
    }
