import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import backgroundImage from "../assets/images/home-banner-background.png";
import { ReactComponent as CustomIcon } from "../assets/icons/customIcon.svg";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading, userLogged } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await login(email, password);
      navigate(userLogged.role === "Admin" ? "/admin" : "/user");
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

  return (
    <Container
      maxWidth="full"
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "#4146ff",
        minHeight: "100vh",
        mimWidth: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "157px 15px 181px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {loading ? (
        <LoadingSpinner />
      ) : (
        <Box
          sx={{
            p: 4,
            borderRadius: 4,
            boxShadow: "0 0 10px rgba(0,0,0,0.3)",
            textAlign: "center",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
            }}
          >
            <CustomIcon style={{ height: 60 }} />
          </Box>
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "#4146ff", mt: 2 }}
          >
            Sign in
          </Typography>
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 2, mb: 2 }}>
              {error}
            </Typography>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                sx: { color: "#4146ff" },
              }}
              InputLabelProps={{ sx: { color: "#4146ff" } }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                sx: { color: "#4146ff" },
              }}
              InputLabelProps={{ sx: { color: "#4146ff" } }}
            />
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ bgcolor: "#06ecb7", color: "#242322" }}
              >
                Sign In
              </Button>
              <Button
                fullWidth
                onClick={() => navigate("/register")}
                variant="outlined"
                sx={{ color: "#4146ff", borderColor: "#4146ff" }}
              >
                Register
              </Button>
            </Stack>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default LoginPage;
