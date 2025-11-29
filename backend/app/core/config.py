from pydantic_settings import BaseSettings
from pydantic import Field, field_validator
from typing import List, Optional, Union

class Settings(BaseSettings):
    app_name: str = "postresval"
    secret_key: str = Field(..., min_length=32, description="Clave secreta para JWT")
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    
    allowed_origins: Union[str, List[str]] = Field(default="http://localhost:3000,http://localhost:8000")
    
    db_user: str = Field(..., description="Usuario de la base de datos")
    db_password: str = Field(..., description="Contraseña de la base de datos")
    db_host: str = Field(..., description="Host de la base de datos")
    db_port: int = Field(default=3306)
    db_name: str = Field(..., description="Nombre de la base de datos")
    
    CLOUDINARY_CLOUD_NAME: str = Field(..., description="Cloudinary cloud name")
    CLOUDINARY_API_KEY: str = Field(..., description="Cloudinary API key")
    CLOUDINARY_API_SECRET: str = Field(..., description="Cloudinary API secret")
    
    @property
    def database_url(self) -> str:
        """Genera la URL de conexión completa con el dialecto y el driver (mysql+pymysql)."""
        return f"mysql+pymysql://{self.db_user}:{self.db_password}@{self.db_host}:{self.db_port}/{self.db_name}"

    google_client_id: Optional[str] = Field(default=None, description="Google OAuth Client ID")

    @field_validator('allowed_origins', mode='before')
    @classmethod
    def parse_allowed_origins(cls, v):
        if isinstance(v, str):
            return [origin.strip() for origin in v.split(',') if origin.strip()]
        elif isinstance(v, list):
            return v
        return v

    class Config:
        env_file = ".env"

settings = Settings()