import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { Header } from "./components/Header";
import { LoginForm } from "./components/LoginForm";
import { ToDoList } from "./components/ToDoList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogin = () => setIsLoggedIn(true);
  const onLogout = () => setIsLoggedIn(false);

  return (
    <div className="App">
      <CssBaseline />
      <Container>
        {isLoggedIn ? (
          <>
            <Header onLogout={onLogout} />
            <ToDoList />
          </>
        ) : (
          <LoginForm onLogin={onLogin} />
        )}
      </Container>
    </div>
  );
}

export default App;
