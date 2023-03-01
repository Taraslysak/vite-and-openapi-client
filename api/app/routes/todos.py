from io import TextIOWrapper
import os
import json
from fastapi import APIRouter, Depends, HTTPException, status
from uuid import uuid4


from app.dependencies import validate_token
from app.schemas import ToDoOut, ToDoIn, AllToDos
from app.utils import check_if_to_exists, update_bd_file


todo_router = APIRouter(prefix="/todos", dependencies=[Depends(validate_token)])

db_file_path = os.path.join(os.path.dirname(__file__), "db.json")


@todo_router.get("/")
def get_all_todos() -> list[str]:
    with open(db_file_path, "r") as file:
        db_json = json.load(file)
        all_todos = AllToDos.parse_obj(db_json)
        idx = [k for k in all_todos.todos.keys()]
        return idx


@todo_router.get("/{id}")
def get_todo_details(id: str):
    with open(db_file_path, "r") as file:
        db_json = json.load(file)
        all_todos = AllToDos.parse_obj(db_json)
        check_if_to_exists(id, all_todos)
        todo = all_todos.todos[id]
        return todo


@todo_router.post("/")
def add_todo(todo: ToDoIn):
    with open(db_file_path, "r+") as file:
        new_todo = ToDoOut(**todo.dict(), id=uuid4())
        db_json = json.load(file)
        all_todos = AllToDos.parse_obj(db_json)
        all_todos.todos[str(new_todo.id)] = new_todo
        update_bd_file(file, all_todos)
        return new_todo


@todo_router.put("/{id}")
def update_todo(id: str, todo: ToDoOut):
    with open(db_file_path, "r+") as file:
        db_json = json.load(file)
        all_todos = AllToDos.parse_obj(db_json)
        check_if_to_exists(id, all_todos)

        all_todos.todos[id] = todo
        update_bd_file(file, all_todos)
        return todo


@todo_router.delete("/{id}")
def delete_todo(id: str):
    with open(db_file_path, "r+") as file:
        db_json = json.load(file)
        all_todos = AllToDos.parse_obj(db_json)
        check_if_to_exists(id, all_todos)
        del all_todos.todos[id]
        update_bd_file(file, all_todos)
        return
