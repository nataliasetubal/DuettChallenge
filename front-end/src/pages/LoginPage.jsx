// LoginPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Stack,
  Alert,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading, userLogged } = useAuth(); // Adicionando user ao desestruturar o useAuth
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await login(email, password);
      // Redireciona com base no papel (role) do usuário
      //  navigate(userLogged.role === 'Admin' ? '/admin' : '/user');
    } catch (error) {
      setError(error.message || "Login failed. Please check your credentials.");
    }
  };

  const isLogged = () => {
    if (userLogged) {
      navigate(userLogged.role === "Admin" ? "/admin" : "/user");
    }
  };

  useEffect(() => {
    isLogged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLogged]);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
