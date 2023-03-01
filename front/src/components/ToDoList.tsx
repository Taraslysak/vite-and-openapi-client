import { Box, Paper } from "@mui/material";
import { Stack } from "@mui/system";
import { useState } from "react";
import AddTodo from "./AddTodo";
import ToDoItem from "./ToDoItem";

export function ToDoList() {
  const [todos, setTodos] = useState(["1", "2", "3"]);
  return (
    <Box padding={2}>
      <AddTodo />
      <Stack>
        {todos.map((todo) => (
          <ToDoItem id={todo} key={todo} />
        ))}
      </Stack>
    </Box>
  );
}
