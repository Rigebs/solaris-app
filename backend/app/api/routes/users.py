from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.schemas.user import User as UserSchema, UserUpdate
from app.api.deps import get_current_user
from app import crud

router = APIRouter(prefix="/users", tags=["users"])


@router.get("/me", response_model=UserSchema)
def get_me(
    current_user = Depends(get_current_user),
):
    return current_user


@router.put("/me", response_model=UserSchema)
def update_me(
    update_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    updated_user = crud.user.update(db, current_user, update_data)
    return updated_user
