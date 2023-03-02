import { useState } from "react";
import {
  Divider,
  Paper,
  Box,
  Checkbox,
  Typography,
  IconButton,
  InputBase,
  Skeleton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ToDoOut, TodoService } from "../client";

type ToDoItemProps = { id: string };

export default function ToDoItem({ id }: ToDoItemProps) {
  const [value, setValue] = useState("");

  const [edit, setEdit] = useState(false);

  const queryClient = useQueryClient();

  const { data } = useQuery(
    ["todo", id],
    async ({ queryKey: [_, id] }) => {
      const res = await TodoService.todoGetTodoDetails(id);
      return res;
    },
    {
      onSuccess: (data) => {
        setValue(data.details);
      },
    }
  );

  const updateMutation = useMutation(
    async (params: ToDoOut) => {
      await TodoService.todoUpdateTodo(params.id, params);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todo", id]);
        setEdit(false);
      },
    }
  );

  const deleteMutation = useMutation(
    async () => {
      await TodoService.todoDeleteTodo(id);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["todos"]);
      },
    }
  );

  const handleCheck: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void = (_, checked) => {
    if (!data) {
      return;
    }
    updateMutation.mutate({ ...data, done: checked });
  };

  const handleStartEdit = () => {
    setEdit(true);
  };

  const handleEditEnd = () => {
    if (!data) {
      return;
    }
    updateMutation.mutate({ ...data, details: value });
  };

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <Box padding={1}>
      <Paper elevation={3} sx={{ display: "flex", alignItems: "center" }}>
        {data ? (
          <>
            <Checkbox checked={data.done} onChange={handleCheck} />
            <Divider orientation="vertical" sx={{ height: 28, m: 0.5 }} />
            {edit ? (
              <>
                <InputBase
                  autoFocus
                  value={value}
                  sx={{ flex: 1 }}
                  onChange={(e) => setValue(e.target.value)}
                />
                <IconButton onClick={handleEditEnd}>
                  <CheckIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Typography sx={{ flex: 1 }}>{value}</Typography>
                <IconButton onClick={handleStartEdit}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={handleDelete}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </>
        ) : (
          <Box flex={1} paddingX={1}>
            <Skeleton animation="wave" />
          </Box>
        )}
      </Paper>
    </Box>
  );
}
