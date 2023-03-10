import { FormGroup, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useMutation, useQueryClient } from "react-query";
import { TodoService } from "../client";

export default function AddTodo() {
  const [details, setDetails] = useState("");

  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    async () => {
      await TodoService.todoAddTodo({ details, done: false });
    },
    {
      onSuccess: () => {
        setDetails("");
        queryClient.invalidateQueries(["todos"]);
      },
    }
  );

  const handleAdd = () => {
    mutate();
  };

  return (
    <FormGroup row>
      <TextField
        value={details}
        onChange={(e) => {
          setDetails(e.target.value);
        }}
        label="New Todo"
        variant="standard"
      />
      <IconButton type="button" aria-label="search" onClick={handleAdd}>
        <AddIcon />
      </IconButton>
    </FormGroup>
  );
}
