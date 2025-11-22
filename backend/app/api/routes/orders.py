from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app import crud
from app.api.deps import get_current_user
from app.schemas.order import OrderCreate

router = APIRouter(prefix="/orders", tags=["orders"])

@router.post("/")
def create_order(
    order_in: OrderCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    order = crud.order.create(db, user_id=current_user.id, order_in=order_in)
    return order
