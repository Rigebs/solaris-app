from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "postresval"
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    db_user: str
    db_password: str
    db_host: str
    db_port: int
    db_name: str

    class Config:
        env_file = ".env"

settings = Settings()
