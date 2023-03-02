import { AppBar, Button, Toolbar } from "@mui/material";

type HeaderProps = { onLogout: () => void };

export function Header({ onLogout }: HeaderProps) {
  const handleLogout = () => {
    localStorage.removeItem(import.meta.env.VITE_API_TOKEN_KEY!);
    onLogout();
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <div style={{ flex: 1 }}></div>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
