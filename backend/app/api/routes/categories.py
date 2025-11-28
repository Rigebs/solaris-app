from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app import crud
from app.schemas.category import Category, CategoryCreate, CategoryUpdate
from app.api.deps import get_current_active_superuser

router = APIRouter(prefix="/categories", tags=["categories"])

@router.get("/", response_model=list[Category])
def list_categories(db: Session = Depends(get_db)):
    return crud.category.get_all(db)

@router.get("/{slug}", response_model=Category)
def get_category(slug: str, db: Session = Depends(get_db)):
    cat = crud.category.get_by_slug(db, slug)
    if not cat:
        raise HTTPException(404, "Category not found")
    return cat

@router.post("/", response_model=Category)
def create_category(
    *,
    db: Session = Depends(get_db),
    category_in: CategoryCreate,
    current_user = Depends(get_current_active_superuser)
):
    return crud.category.create(db, obj_in=category_in)

@router.put("/{category_id}", response_model=Category)
def update_category(
    *,
    db: Session = Depends(get_db),
    category_id: int,
    category_in: CategoryUpdate,
    current_user = Depends(get_current_active_superuser)
):
    category = crud.category.get(db, id=category_id)
    if not category:
        raise HTTPException(404, "Category not found")
    return crud.category.update(db, db_obj=category, obj_in=category_in)

@router.delete("/{category_id}", response_model=Category)
def delete_category(
    *,
    db: Session = Depends(get_db),
    category_id: int,
    current_user = Depends(get_current_active_superuser)
):
    category = crud.category.get(db, id=category_id)
    if not category:
        raise HTTPException(404, "Category not found")
    return crud.category.remove(db, id=category_id)
