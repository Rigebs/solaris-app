from sqlalchemy.orm import Session
from app.models.category import Category

class CRUDCategory:
    def get(self, db: Session, id: int):
        return db.query(Category).filter(Category.id == id).first()

    def get_by_slug(self, db: Session, slug: str):
        return db.query(Category).filter(Category.slug == slug).first()

    def get_all(self, db: Session):
        return db.query(Category).order_by(Category.name).all()

    def create(self, db: Session, *, name: str, slug: str):
        category = Category(name=name, slug=slug)
        db.add(category)
        db.commit()
        db.refresh(category)
        return category


category = CRUDCategory()
