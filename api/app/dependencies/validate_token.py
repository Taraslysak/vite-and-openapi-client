from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

from app.constants import SUPER_SECRET_TOKEN


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="../auth/login")


def validate_token(token: str = Depends(oauth2_scheme)):
    if token != SUPER_SECRET_TOKEN:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
