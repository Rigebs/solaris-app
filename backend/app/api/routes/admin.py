from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.db.session import get_db
from app.api.deps import get_current_active_superuser
from app.models.product import Product
from app.models.category import Category
from app.models.order import Order

router = APIRouter(prefix="/admin", tags=["admin"])


@router.get("/stats")
def get_admin_stats(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_active_superuser),
):
    """Get dashboard statistics for admin"""
    products_count = db.query(func.count(Product.id)).filter(Product.is_active == True).scalar()
    categories_count = db.query(func.count(Category.id)).filter(Category.is_active == True).scalar()
    orders_count = db.query(func.count(Order.id)).scalar()
    
    return {
        "products": products_count,
        "categories": categories_count,
        "orders": orders_count,
    }
