from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt
from app.core.config import settings
from typing import Optional

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain: str, hashed: str) -> bool:
    """Verifica una contraseña contra su hash."""
    return pwd_context.verify(plain, hashed)

def get_password_hash(password: str) -> str:
    """Genera un hash bcrypt de la contraseña."""
    return pwd_context.hash(password)

def create_access_token(subject: str, expires_delta: Optional[int] = None) -> str:
    """Crea un token JWT de acceso.

    `exp` se codifica como entero (timestamp) para compatibilidad y validación
    consistente por parte de librerías de JWT.
    """
    expire = datetime.utcnow() + timedelta(minutes=(expires_delta or settings.access_token_expire_minutes))
    to_encode = {"exp": int(expire.timestamp()), "sub": str(subject), "type": "access"}
    return jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)


def create_refresh_token(subject: str, expires_days: int = 7) -> str:
    """Crea un token JWT de refresh con mayor tiempo de expiración.

    No se almacena en la base de datos en esta implementación simple; el
    frontend puede enviar este token a `/api/auth/refresh` para obtener
    un nuevo access token. Si se necesita revocación, considerar guardar
    tokens en BD o usar una lista de revocación.
    """
    expire = datetime.utcnow() + timedelta(days=expires_days)
    to_encode = {"exp": int(expire.timestamp()), "sub": str(subject), "type": "refresh"}
    return jwt.encode(to_encode, settings.secret_key, algorithm=settings.algorithm)
