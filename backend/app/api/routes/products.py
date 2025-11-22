from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.session import get_db
from app import crud

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/")
def list_products(
    db: Session = Depends(get_db),
    q: str | None = None,
    category_id: int | None = None
):
    return crud.product.get_multi(db, q=q, category_id=category_id)


@router.get("/{product_id}")
def get_product(product_id: int, db: Session = Depends(get_db)):
    p = crud.product.get(db, product_id)
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    return p
