from sqlalchemy import Column, Integer, String, Float, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    base_price = Column(Float, nullable=False)
    description = Column(Text)
    category_id = Column(Integer, ForeignKey("categories.id"))
    category = relationship("Category", backref="products")

    sizes_json = Column(String(1000), nullable=True)
    toppings_json = Column(String(1000), nullable=True)

    images_json = Column(Text, nullable=True)