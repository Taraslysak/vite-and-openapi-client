from fastapi import FastAPI

from app.routes import auth_router, todo_router

app = FastAPI()

app.include_router(auth_router)

app.include_router(todo_router)


@app.get("/")
async def root():
    return {"message": "Hello World"}
