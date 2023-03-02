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

type ToDoItemProps = { id: string };

type TodoDetails = {
  details: string;
  id: string;
  done: boolean;
};

export default function ToDoItem({ id }: ToDoItemProps) {
  const [value, setValue] = useState("");

  const [edit, setEdit] = useState(false);

  const queryClient = useQueryClient();

  const { data } = useQuery<TodoDetails>(
    ["todo", id],
    async ({ queryKey: [_, id] }) => {
      const res = await fetch(`todos/${id}`, {
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
    {
      onSuccess: (data) => {
        setValue(data.details);
      },
    }
  );

  const updateMutation = useMutation(
    async (params: TodoDetails) => {
      const res = await fetch(`todos/${id}`, {
        method: "PUT",
        body: JSON.stringify(params),
        headers: {
          "Content-Type": "application/json",
          Authorization: `bearer ${localStorage.getItem(
            import.meta.env.VITE_API_TOKEN_KEY!
          )}`,
        },
      });
      if (!res.ok) {
        const err = await res.json();
        console.log({ err });
      }
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
      const res = await fetch(`todos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `bearer ${localStorage.getItem(
            import.meta.env.VITE_API_TOKEN_KEY!
          )}`,
        },
      });
      if (!res.ok) {
        const err = await res.json();
        console.log({ err });
      }
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
