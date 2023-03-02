import { Box } from "@mui/material";
import { Stack } from "@mui/system";
import { useQuery } from "react-query";
import AddTodo from "./AddTodo";
import ToDoItem from "./ToDoItem";

export function ToDoList() {
  const { data } = useQuery<string[]>(
    "todos",
    async () => {
      const res = await fetch("todos", {
        headers: {
          Authorization: `bearer ${localStorage.getItem(
            import.meta.env.VITE_API_TOKEN_KEY!
          )}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      }
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
