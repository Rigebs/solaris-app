from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from typing import Optional
import logging
from datetime import datetime, timedelta
from collections import defaultdict

from google.oauth2 import id_token
from google.auth.transport import requests
from jose import jwt, JWTError

from app.db.session import get_db
from app import crud
from app.core.security import get_password_hash, verify_password, create_access_token, create_refresh_token
from app.core.config import settings
from app.schemas.user import UserCreate

logger = logging.getLogger(__name__)

# Rate limiting simple (en producción usar redis)
login_attempts = defaultdict(list)
MAX_ATTEMPTS = 5
ATTEMPT_WINDOW = 900  # 15 minutos

router = APIRouter(prefix="/auth", tags=["auth"])

def check_rate_limit(identifier: str) -> bool:
    """Verifica si se ha excedido el límite de intentos."""
    now = datetime.utcnow()
    # Limpiar intentos antiguos
    login_attempts[identifier] = [
        t for t in login_attempts[identifier]
        if (now - t).total_seconds() < ATTEMPT_WINDOW
    ]
    
    if len(login_attempts[identifier]) >= MAX_ATTEMPTS:
        return False
    
    login_attempts[identifier].append(now)
    return True



@router.post("/token")
def login_for_access_token(
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
):
    """Autentica un usuario y retorna un token JWT."""
    # Rate limiting
    if not check_rate_limit(form_data.username):
        logger.warning(f"Demasiados intentos de login para: {form_data.username}")
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Demasiados intentos de login. Intenta más tarde."
        )
    
    user = crud.user.get_by_email(db, form_data.username)

    if not user or not verify_password(form_data.password, user.hashed_password):
        logger.warning(f"Intento de login fallido para: {form_data.username}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales inválidas"
        )

    access_token = create_access_token(subject=str(user.id))
    refresh_token = create_refresh_token(subject=str(user.id))
    logger.info(f"Login exitoso para usuario: {user.email}")

    return {"access_token": access_token, "token_type": "bearer", "refresh_token": refresh_token}

@router.post("/register")
def register_user(
    user_in: UserCreate,
    db: Session = Depends(get_db)
):
    """Registra un nuevo usuario."""
    user = crud.user.get_by_email(db, user_in.email)
    if user:
        logger.warning(f"Intento de registro con email ya registrado: {user_in.email}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email ya está registrado"
        )

    new_user = crud.user.create(
        db,
        email=user_in.email,
        name=user_in.name,
        password=user_in.password,
        address=user_in.address,
        phone=user_in.phone
    )

    access_token = create_access_token(subject=str(new_user.id))
    refresh_token = create_refresh_token(subject=str(new_user.id))
    logger.info(f"Nuevo usuario registrado: {new_user.email}")

    return {
        "access_token": access_token,
        "token_type": "Bearer",
        "refresh_token": refresh_token,
        "user_id": new_user.id,
        "email": new_user.email
    }


class GoogleToken(BaseModel):
    id_token: str


@router.post("/google")
def google_login(payload: GoogleToken, db: Session = Depends(get_db)):
    """Autentica un usuario con Google OAuth 2.0."""
    try:
        # Validar que se haya configurado Google Client ID
        if not settings.google_client_id:
            logger.error("Google Client ID no configurado")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Google authentication not configured"
            )
        
        # Verificar el token con audience validation
        info = id_token.verify_oauth2_token(
            payload.id_token,
            requests.Request(),
            audience=settings.google_client_id
        )

        email = info.get("email")
        name = info.get("name")

        if not email:
            logger.warning("Google token sin email")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email no encontrado en Google token"
            )

        user = crud.user.get_by_email(db, email)

        if not user:
            user = crud.user.create_google_user(db, name=name, email=email)
            logger.info(f"Nuevo usuario creado vía Google: {email}")
        else:
            logger.info(f"Login Google exitoso para: {email}")

        access_token = create_access_token(subject=str(user.id))
        refresh_token = create_refresh_token(subject=str(user.id))

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "refresh_token": refresh_token,
            "user_id": user.id
        }

    except ValueError as e:
        # Token inválido o expirado
        logger.warning(f"Google OAuth error: {str(e)[:100]}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Google token inválido o expirado"
        )
    except Exception as e:
        logger.error(f"Google authentication error: {str(e)[:100]}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Error en autenticación Google"
        )


class RefreshTokenRequest(BaseModel):
    refresh_token: str


@router.post("/refresh")
def refresh_access_token(
    payload: RefreshTokenRequest,
    db: Session = Depends(get_db),
):
    """Intercambia un refresh token válido por un nuevo access token (y un nuevo refresh token).

    Nota: esta implementación no almacena refresh tokens en BD; rota ambos tokens para
    mejorar seguridad en el cliente. Si necesitas revocar tokens, añade persistencia.
    """
    try:
        data = jwt.decode(payload.refresh_token, settings.secret_key, algorithms=[settings.algorithm])
        if data.get("type") != "refresh":
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token inválido")
        user_id = data.get("sub")
        if not user_id:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token inválido")
    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Refresh token inválido o expirado")

    user = crud.user.get(db, int(user_id))
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Usuario no encontrado")

    new_access = create_access_token(subject=str(user.id))
    new_refresh = create_refresh_token(subject=str(user.id))

    return {"access_token": new_access, "token_type": "bearer", "refresh_token": new_refresh}