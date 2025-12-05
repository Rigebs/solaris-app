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
        
        # 1. Obtener y aplicar la actualización (Estado y Notas)
        order = db.query(Order).filter(Order.id == order_id).first()
        if not order:
            return None
        
        # Aplicar las actualizaciones básicas
        order.status = order_update.status
        if order_update.admin_notes is not None:
            order.admin_notes = order_update.admin_notes
        
        db.add(order)
        db.commit()
        # No usamos db.refresh(order) aquí. En su lugar, haremos una consulta
        # con selectinload para garantizar que las relaciones se carguen.

        # 2. Cargar el pedido enriquecido con relaciones anidadas
        # Esto asegura que Order.items y OrderItem.product estén cargados 
        # para que la serialización funcione correctamente.
        enriched_order = (
            db.query(Order)
            .options(
                selectinload(Order.items).selectinload(OrderItem.product)
            )
            .filter(Order.id == order_id) 
            .first() 
        )

        if enriched_order:
            # 3. Post-procesamiento: Deserializar los campos JSON del producto
            # Este paso es CRUCIAL y corrige el problema de las imágenes vacías [].
            for item in enriched_order.items:
                if item.product:
                    # Mapear los campos JSON de la DB (e.g., images_json) a los atributos 
                    # de lista de Python (e.g., images) para la serialización.
                    item.product.images = item.product.images_json or []
                    item.product.sizes = item.product.sizes_json or []
                    item.product.toppings = item.product.toppings_json or []
            
        # Opcional: Si tienes una función para enriquecer la orden con información del usuario
        # return self.enrich_order_with_user_info(enriched_order) 
        
        # Devolver el objeto de pedido completamente cargado y procesado
        return enriched_order

    def enrich_order_with_user_info(self, order):
        """Add user name to order object"""
        if order.user:
            order.user_name = order.user.name
        return order

order = CRUDOrder()