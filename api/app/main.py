from fastapi import FastAPI
from fastapi.routing import APIRoute

from app.routes import auth_router, todo_router


def custom_generate_unique_id(route: APIRoute):
    return f"{route.tags[0]}-{route.name}"


app = FastAPI(generate_unique_id_function=custom_generate_unique_id)

app.include_router(auth_router)

app.include_router(todo_router)


@app.get("/", tags=["root"])
async def root():
    return {"message": "Hello World"}
