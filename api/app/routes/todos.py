from fastapi import APIRouter, Depends

from app.dependencies import validate_token


todo_router = APIRouter(prefix="/todos", dependencies=[Depends(validate_token)])


@todo_router.get("/")
def get_all_todos():
    pass


@todo_router.get("/{id}")
def get_todo_details(id: str):
    pass


@todo_router.post("/")
def add_todo():
    pass


@todo_router.put("/{id}")
def update_todo(id: str):
    pass


@todo_router.delete("/{id}")
def delete_todo(id: str):
    pass
