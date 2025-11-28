from sqlalchemy.orm import Session
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryUpdate

class CRUDCategory:
    def get(self, db: Session, id: int):
        return db.query(Category).filter(Category.id == id).first()

    def get_by_slug(self, db: Session, slug: str):
        return db.query(Category).filter(Category.slug == slug, Category.is_active == True).first()

    def get_all(self, db: Session, include_inactive: bool = False):
        query = db.query(Category)
        if not include_inactive:
            query = query.filter(Category.is_active == True)
        return query.order_by(Category.name).all()

    def create(self, db: Session, *, obj_in: CategoryCreate):
        db_obj = Category(
            name=obj_in.name,
            slug=obj_in.slug,
            is_active=obj_in.is_active
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(self, db: Session, *, db_obj: Category, obj_in: CategoryUpdate):
        update_data = obj_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_obj, field, value)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self, db: Session, *, id: int):
        obj = db.query(Category).get(id)
        if obj:
            obj.is_active = False
            db.add(obj)
            db.commit()
            db.refresh(obj)
        return obj


category = CRUDCategory()
