# order_item.py
from sqlalchemy import Column, Integer, Float, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class OrderItem(Base):
    __tablename__ = "order_items"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer)
    name = Column(String(200))
    size = Column(String(100), nullable=True)
    toppings_json = Column(String(1000), nullable=True)
    notes = Column(String(500), nullable=True)
    quantity = Column(Integer, default=1)
    unit_price = Column(Float, nullable=False)
    order = relationship("Order", back_populates="items")
