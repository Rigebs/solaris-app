from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app import crud
from app.schemas.category import Category

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
