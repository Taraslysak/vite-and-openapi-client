import { FormGroup, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

export default function AddTodo() {
  const [details, setDetails] = useState("");

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
      <IconButton type="button" aria-label="search">
        <AddIcon />
      </IconButton>
    </FormGroup>
  );
}
