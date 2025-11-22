from sqlalchemy.orm import Session
from app.models.user import User
from app.core.security import get_password_hash

def get(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create(db: Session, *, name: str, email: str, password: str):
    user = User(name=name, email=email, hashed_password=get_password_hash(password))
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
