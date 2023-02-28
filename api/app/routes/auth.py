from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm

from app.constants import USERNAME, SUPER_SECRET_PASSWORD, SUPER_SECRET_TOKEN
from app.dependencies import validate_token


auth_router = APIRouter(prefix="/auth")


@auth_router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    if form_data.username != USERNAME and form_data.password != SUPER_SECRET_PASSWORD:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    return {"access_token": SUPER_SECRET_TOKEN, "token_type": "bearer"}


@auth_router.post("/logout", dependencies=[Depends(validate_token)])
def logout():
    return
