from pydantic_settings import BaseSettings
from pydantic import Field, field_validator
from typing import List, Optional, Union

class Settings(BaseSettings):
    app_name: str = "postresval"
    secret_key: str = Field(..., min_length=32, description="Clave secreta para JWT")
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    
    # CORS
    allowed_origins: Union[str, List[str]] = Field(default="http://localhost:3000,http://localhost:8000")
    
    # Database
    db_user: str = Field(..., description="Usuario de la base de datos")
    db_password: str = Field(..., description="Contraseña de la base de datos")
    db_host: str = Field(..., description="Host de la base de datos")
    db_port: int = Field(default=3306)
    db_name: str = Field(..., description="Nombre de la base de datos")
    
    # Google OAuth (Opcional)
    google_client_id: Optional[str] = Field(default=None, description="Google OAuth Client ID")

    @field_validator('allowed_origins', mode='before')
    @classmethod
    def parse_allowed_origins(cls, v):
        """Convierte string separado por comas en lista."""
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(',') if origin.strip()]
        elif isinstance(v, list):
            return v
        return v

    class Config:
        env_file = ".env"

settings = Settings()
