from io import TextIOWrapper
from fastapi import HTTPException, status
from app.schemas.todo import AllToDos


def check_if_to_exists(id: str, all_todos: AllToDos):
    if id not in all_todos.todos.keys():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found",
        )


def update_bd_file(file: TextIOWrapper, all_todos: AllToDos):
    file.seek(0)
    file.write(all_todos.json())
    file.truncate()
