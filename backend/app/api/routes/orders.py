from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.api.deps import get_current_user, get_current_active_superuser
from app import crud
from app.schemas.order import OrderCreate, OrderRead
from typing import List

router = APIRouter(prefix="/orders", tags=["orders"])


@router.post("/", response_model=OrderRead)
def create_order(
    order_in: OrderCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return crud.order.create(db, user_id=current_user.id, order_in=order_in)


@router.get("/", response_model=List[OrderRead])
def get_my_orders(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return crud.order.get_by_user(db, user_id=current_user.id)


@router.get("/all", response_model=List[OrderRead])
def get_all_orders(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_active_superuser),
):
    """Admin endpoint to get all orders"""
    return crud.order.get_all(db)


@router.get("/{order_id}", response_model=OrderRead)
def get_order_by_id(
    order_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    order = crud.order.get(db, order_id)
    if not order or order.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Order not found")
    return order