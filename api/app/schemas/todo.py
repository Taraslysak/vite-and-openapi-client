from pydantic import BaseModel
from uuid import UUID


class ToDoIn(BaseModel):
    details: str
    done: bool


class ToDoOut(ToDoIn):
    id: UUID


class AllToDos(BaseModel):
    todos: dict[str, ToDoOut]
