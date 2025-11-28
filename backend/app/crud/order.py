import json
from sqlalchemy.orm import Session
from app.models.order import Order
from app.models.order_item import OrderItem
from app.schemas.order import OrderCreate
from sqlalchemy.orm import selectinload

class CRUDOrder:
    def create(self, db: Session, user_id: int, order_in: OrderCreate):
        order = Order(
            user_id=user_id,
            total=order_in.total,
            status="pending",
        )
        db.add(order)
        db.commit()
        db.refresh(order)

        # Add order items
        for it in order_in.items:
            item = OrderItem(
                order_id=order.id,
                product_id=it.product_id,
                name=it.name,
                size=it.size,
                toppings=it.toppings or [],  # ya es lista
                notes=it.notes,
                unit_price=it.unit_price,
                quantity=it.quantity,
            )
            db.add(item)

        db.commit()
        db.refresh(order)
        return order

    def get(self, db: Session, order_id: int):
        return db.query(Order).filter(Order.id == order_id).first()

    def get_by_user(self, db: Session, user_id: int):
        orders = (
            db.query(Order)
            .options(
                selectinload(Order.items).selectinload(OrderItem.product)  # carga los productos
            )
            .filter(Order.user_id == user_id)
            .order_by(Order.created_at.desc())
            .all()
        )
    
        for order in orders:
            for item in order.items:
                if item.product:
                    item.product.images = json.loads(item.product.images_json or "[]")
                    item.product.sizes = json.loads(item.product.sizes_json or "[]")
                    item.product.toppings = json.loads(item.product.toppings_json or "[]")

        return orders

    def get_all(self, db: Session):
        """Get all orders (admin only)"""
        orders = (
            db.query(Order)
            .options(
                selectinload(Order.items).selectinload(OrderItem.product)
            )
            .order_by(Order.created_at.desc())
            .all()
        )
        
        for order in orders:
            for item in order.items:
                if item.product:
                    item.product.images = json.loads(item.product.images_json or "[]")
                    item.product.sizes = json.loads(item.product.sizes_json or "[]")
                    item.product.toppings = json.loads(item.product.toppings_json or "[]")

        return orders

order = CRUDOrder()
