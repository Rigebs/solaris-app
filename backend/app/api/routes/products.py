from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.session import get_db
from app import crud
from app.schemas.product import ProductInDB, ProductCreate, ProductUpdate
from app.api.deps import get_current_active_superuser

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/search", response_model=List[ProductInDB])
def search_products(
    q: str,
    db: Session = Depends(get_db),
):
    """Search products by name or description"""
    if len(q) < 2:
        return []
    
    products = crud.product.search(db, query=q)
    return products


@router.get("/", response_model=List[ProductInDB])
def list_products(
    db: Session = Depends(get_db),
    q: str | None = None,
    category_id: int | None = None
):
    return crud.product.get_multi(db, q=q, category_id=category_id)


@router.get("/{product_id}", response_model=ProductInDB)
def get_product(product_id: int, db: Session = Depends(get_db)):
    p = crud.product.get(db, product_id)
    if not p:
        raise HTTPException(status_code=404, detail="Product not found")
    return p

@router.post("/", response_model=ProductInDB)
def create_product(
    *,
    db: Session = Depends(get_db),
    product_in: ProductCreate,
    current_user = Depends(get_current_active_superuser)
):
    return crud.product.create(db, obj_in=product_in)

@router.put("/{product_id}", response_model=ProductInDB)
def update_product(
    *,
    db: Session = Depends(get_db),
    product_id: int,
    product_in: ProductUpdate,
    current_user = Depends(get_current_active_superuser)
):
    product = crud.product.get(db, id=product_id)
    if not product:
        raise HTTPException(404, "Product not found")
    return crud.product.update(db, db_obj=product, obj_in=product_in)

@router.delete("/{product_id}", response_model=ProductInDB)
def delete_product(
    *,
    db: Session = Depends(get_db),
    product_id: int,
    current_user = Depends(get_current_active_superuser)
):
    product = crud.product.get(db, id=product_id)
    if not product:
        raise HTTPException(404, "Product not found")
    return crud.product.remove(db, id=product_id)
