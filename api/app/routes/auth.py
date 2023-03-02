from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.constants import USERNAME, SUPER_SECRET_PASSWORD, SUPER_SECRET_TOKEN
from app.dependencies import validate_token
from app.schemas import Token


auth_router = APIRouter(prefix="/auth", tags=["auth"])


@auth_router.post("/login", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    if form_data.username != USERNAME and form_data.password != SUPER_SECRET_PASSWORD:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Incorrect username or password",
        )
    return Token(access_token=SUPER_SECRET_TOKEN, token_type="bearer")


@auth_router.post("/logout", dependencies=[Depends(validate_token)])
def logout():
    return
