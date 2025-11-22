from app.db.base import Base, engine
from app.models.category import Category
from app.models.product import Product

print("Creando tablas...")
Base.metadata.create_all(bind=engine)
print("Listo!")
