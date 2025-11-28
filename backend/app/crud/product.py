import json
from sqlalchemy.orm import Session, joinedload
from app.models.product import Product
from app.models.category import Category
from app.schemas.product import ProductCreate, ProductUpdate

class CRUDProduct:
    def get(self, db: Session, id: int):
        p = (
            db.query(Product)
            .options(joinedload(Product.category))
            .filter(Product.id == id)
            .first()
        )

        if p:
            p.sizes = json.loads(p.sizes_json or "[]")
            p.toppings = json.loads(p.toppings_json or "[]")
            p.images = json.loads(p.images_json or "[]")
            p.category_name = p.category.name if p.category else None


        return p

    def get_multi(self, db: Session, q: str | None = None, category_id: int | None = None, include_inactive: bool = False):
        query = db.query(Product).options(joinedload(Product.category))

        if not include_inactive:
            query = query.filter(Product.is_active == True)

        if q:
            query = query.filter(Product.name.ilike(f"%{q}%"))

        if category_id:
            query = query.filter(Product.category_id == category_id)

        products = query.all()

        for p in products:
            p.sizes = json.loads(p.sizes_json or "[]")
            p.toppings = json.loads(p.toppings_json or "[]")
            p.images = json.loads(p.images_json or "[]")
            p.category_name = p.category.name if p.category else None


        return products

    def search(self, db: Session, query: str):
        """Search products by name or description"""
        products = (
            db.query(Product)
            .filter(
                Product.is_active == True,
                (Product.name.ilike(f"%{query}%") | Product.description.ilike(f"%{query}%"))
            )
            .limit(10)
            .all()
        )
        
        for product in products:
            product.images = json.loads(product.images_json or "[]")
            product.sizes = json.loads(product.sizes_json or "[]")
            product.toppings = json.loads(product.toppings_json or "[]")
        
        return products

    def create(self, db: Session, *, obj_in: ProductCreate):
        db_obj = Product(
            name=obj_in.name,
            description=obj_in.description,
            base_price=obj_in.base_price,
            category_id=obj_in.category_id,
            sizes_json=json.dumps([s.dict() for s in obj_in.sizes]),
            toppings_json=json.dumps(obj_in.toppings),
            images_json=json.dumps(obj_in.images),
            is_active=obj_in.is_active
        )

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(self, db: Session, *, db_obj: Product, obj_in: ProductUpdate):
        update_data = obj_in.model_dump(exclude_unset=True)
        
        # Handle JSON fields
        if "sizes" in update_data:
            db_obj.sizes_json = json.dumps([s.dict() for s in update_data.pop("sizes")])
        if "toppings" in update_data:
            db_obj.toppings_json = json.dumps(update_data.pop("toppings"))
        if "images" in update_data:
            db_obj.images_json = json.dumps(update_data.pop("images"))

        for field, value in update_data.items():
            setattr(db_obj, field, value)

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self, db: Session, *, id: int):
        obj = db.query(Product).get(id)
        if obj:
            obj.is_active = False
            db.add(obj)
            db.commit()
            db.refresh(obj)
        return obj

product = CRUDProduct()
