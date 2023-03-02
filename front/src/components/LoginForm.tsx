import {
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useMutation } from "react-query";
import { AuthService } from "../client";

type LoginFormProps = {
  onLogin: () => void;
};

export function LoginForm({ onLogin }: LoginFormProps) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isLoading, error } = useMutation(
    async () => {
      const data = await AuthService.authLogin({
        username: userName,
        password,
      });
      return data;
    },
    {
      onSuccess: (data) => {
        localStorage.setItem(
          import.meta.env.VITE_API_TOKEN_KEY!,
          data.access_token
        );
        onLogin();
      },
    }
  );

  return (
    <Paper elevation={6}>
      <Stack padding={4}>
        <Stack paddingBottom={4} spacing={2}>
          <Typography align="center" variant="h4" marginBottom={4}>
            Welcome
          </Typography>
          <FormControl>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              disabled={isLoading}
              id="username"
              aria-describedby="username-helper-text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <FormHelperText id="username-helper-text">
              Should be 'username'
            </FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input
              disabled={isLoading}
              type="password"
              id="password"
              aria-describedby="password-helper-text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormHelperText id="password-helper-text">
              Should be 'ZAQ!xsw2'
            </FormHelperText>
          </FormControl>
        </Stack>
        {!!error && (
          <Typography paddingBottom={2} align="center" color={"red"}>
            {error.toString()}
          </Typography>
        )}
        <Button
          variant="contained"
          onClick={() => mutate()}
          disabled={isLoading}
        >
          Login
        </Button>
      </Stack>
    </Paper>
  );
}
