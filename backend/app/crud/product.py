import json
from sqlalchemy.orm import Session, joinedload
from app.models.product import Product
from app.models.category import Category

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
            p.category_name = p.category.name


        return p

    def get_multi(self, db: Session, q: str | None = None, category_id: int | None = None):
        query = db.query(Product).options(joinedload(Product.category))

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

    def create(self, db: Session, *, name: str, description: str,
           base_price: float, category_id: int,
           sizes: list, toppings: list, images: list):

        product = Product(
            name=name,
            description=description,
            base_price=base_price,
            category_id=category_id,
            sizes_json=json.dumps(sizes),
            toppings_json=json.dumps(toppings),
            images_json=json.dumps(images),
        )

        db.add(product)
        db.commit()
        db.refresh(product)
        return product

product = CRUDProduct()
