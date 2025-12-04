import json
from sqlalchemy.orm import Session
from app.models.order import Order
from app.models.order_item import OrderItem
from app.schemas.order import OrderCreate, OrderUpdate
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

        for it in order_in.items:
            item = OrderItem(
                order_id=order.id,
                product_id=it.product_id,
                name=it.name,
                size=it.size,
                toppings=it.toppings or [],
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
                selectinload(Order.items).selectinload(OrderItem.product)
            )
            .filter(Order.user_id == user_id)
            .order_by(Order.created_at.desc())
            .all()
        )
    
        for order in orders:
            for item in order.items:
                if item.product:
                    # Corrección aplicada aquí
                    item.product.images = item.product.images_json or []
                    item.product.sizes = item.product.sizes_json or []
                    item.product.toppings = item.product.toppings_json or []

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
                    # Corrección aplicada aquí
                    item.product.images = item.product.images_json or []
                    item.product.sizes = item.product.sizes_json or []
                    item.product.toppings = item.product.toppings_json or []

        return orders

    def update_status(self, db: Session, order_id: int, order_update: OrderUpdate):
        """Update order status and admin notes"""
        order = db.query(Order).filter(Order.id == order_id).first()
        if not order:
            return None
        
        order.status = order_update.status
        if order_update.admin_notes is not None:
            order.admin_notes = order_update.admin_notes
        
        db.add(order)
        db.commit()
        db.refresh(order)
        return order

    def enrich_order_with_user_info(self, order):
        """Add user name to order object"""
        if order.user:
            order.user_name = order.user.name
        return order

order = CRUDOrder()