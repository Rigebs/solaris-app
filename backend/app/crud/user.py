from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserUpdate
from app.core.security import get_password_hash

def get(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def get_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create(db: Session, *, email: str, name: str, password: str, address=None, phone=None):
    user = User(
        email=email,
        name=name,
        address=address,
        phone=phone,
        hashed_password=get_password_hash(password)
    )

    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def create_google_user(db: Session, *, email: str, name: str = None):
    user = User(
        email=email,
        name=name,
        hashed_password="google_oauth_user"
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def update(db: Session, user: User, obj_in: UserUpdate):
    for field, value in obj_in.dict(exclude_unset=True).items():
        setattr(user, field, value)

    db.add(user)
    db.commit()
    db.refresh(user)
    return user
