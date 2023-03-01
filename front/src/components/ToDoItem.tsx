import { useRef, useState } from "react";
import {
  Divider,
  Paper,
  Box,
  Checkbox,
  Typography,
  IconButton,
  InputBase,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";

type ToDoItemProps = { id: string };

export default function ToDoItem({ id }: ToDoItemProps) {
  const value = "Lorem ipsum, dolor sit amet consectetur adipisicing elit.";

  const [edit, setEdit] = useState(false);

  const handleChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void = ({ target }, checked) => {
    console.log({ target, checked });
  };

  const handleStartEdit = () => {
    setEdit(true);
  };

  const handleEditEnd = () => {
    setEdit(false);
  };

  const handleDelete = () => {
    console.log("DELETED", id);
  };

  return (
    <Box padding={1}>
      <Paper elevation={3} sx={{ display: "flex", alignItems: "center" }}>
        <Checkbox onChange={handleChange} />
        <Divider orientation="vertical" sx={{ height: 28, m: 0.5 }} />
        {edit ? (
          <>
            <InputBase autoFocus value={value} sx={{ flex: 1 }} />
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
      </Paper>
    </Box>
  );
}
