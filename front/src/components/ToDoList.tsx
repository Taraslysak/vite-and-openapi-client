import { Box } from "@mui/material";
import { Stack } from "@mui/system";
import { useQuery } from "react-query";
import { TodoService } from "../client";
import AddTodo from "./AddTodo";
import ToDoItem from "./ToDoItem";

export function ToDoList() {
  const { data } = useQuery(
    "todos",
    async () => {
      const res = await TodoService.todoGetAllTodos();
      return res;
    },
    { initialData: [] }
  );
  return (
    <Box padding={2}>
      <AddTodo />
      <Stack>
        {data && data.map((todo) => <ToDoItem id={todo} key={todo} />)}
      </Stack>
    </Box>
  );
}
