# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.routes import auth, orders, products, categories, users
import logging

logger = logging.getLogger(__name__)

def get_application() -> FastAPI:
    app = FastAPI(
        title=settings.app_name,
        version="1.0.0",
        description="API para la pastelería 🎂",
    )

    app.add_middleware(  
        CORSMiddleware,  
        allow_origins=settings.allowed_origins,
        allow_credentials=True,  
        allow_methods=["*"],  
        allow_headers=["*"],  
    )


    app.include_router(auth.router, prefix="/api")
    app.include_router(products.router, prefix="/api")
    app.include_router(categories.router, prefix="/api")
    app.include_router(orders.router, prefix="/api")
    app.include_router(users.router, prefix="/api")

    @app.get("/health")
    def health():
        return {"status": "ok"}

    logger.info(f"Aplicación iniciada: {settings.app_name}")

    return app

app = get_application()
