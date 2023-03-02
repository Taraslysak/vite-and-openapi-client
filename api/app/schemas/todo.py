from pydantic import BaseModel


class ToDoIn(BaseModel):
    details: str
    done: bool


class ToDoOut(ToDoIn):
    id: str


class AllToDos(BaseModel):
    todos: dict[str, ToDoOut]
