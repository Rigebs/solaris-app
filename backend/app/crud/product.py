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
            p.sizes = p.sizes_json or []
            p.toppings = p.toppings_json or []
            p.images = p.images_json or []
            
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
            p.sizes = p.sizes_json or []
            p.toppings = p.toppings_json or []
            p.images = p.images_json or []
            
            p.category_name = p.category.name if p.category else None


        return products

    def search(self, db: Session, query: str):
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
            product.images = product.images_json or []
            product.sizes = product.sizes_json or []
            product.toppings = product.toppings_json or []
        
        return products

    def create(self, db: Session, *, obj_in: ProductCreate):
        db_obj = Product(
            name=obj_in.name,
            description=obj_in.description,
            base_price=obj_in.base_price,
            category_id=obj_in.category_id,
            is_active=obj_in.is_active,
        )

        db_obj.sizes_json = [
            s.model_dump() if hasattr(s, "model_dump") else s
            for s in obj_in.sizes
        ]
        db_obj.toppings_json = obj_in.toppings
        db_obj.images_json = obj_in.images

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj


    def update(self, db: Session, *, db_obj: Product, obj_in: ProductUpdate):
        update_data = obj_in.model_dump(exclude_unset=True)

        # --- sizes ---
        if "sizes" in update_data:
            sizes = update_data.pop("sizes")
            db_obj.sizes_json = [
                s.model_dump() if hasattr(s, "model_dump") else s
                for s in sizes
            ]

        # --- toppings ---
        if "toppings" in update_data:
            db_obj.toppings_json = update_data.pop("toppings")

        # --- images ---
        if "images" in update_data:
            db_obj.images_json = update_data.pop("images")

        # otros campos
        for field, value in update_data.items():
            setattr(db_obj, field, value)

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

        update_data = obj_in.model_dump(exclude_unset=True)
        
        if "sizes" in update_data:
            db_obj.sizes_json = [s.model_dump() for s in update_data.pop("sizes")]
            
        if "toppings" in update_data:
            db_obj.toppings_json = update_data.pop("toppings")
            
        if "images" in update_data:
            db_obj.images_json = update_data.pop("images")


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