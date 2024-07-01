import React, { useState, useEffect } from "react";
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
import Api from "../Services/Api";
import Cookies from "js-cookie";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const checkLogged = async () => {
    setLoading(true);
    const tokenCookies = Cookies.get("token");    
    if (tokenCookies) {
      const tokenData = JSON.parse(tokenCookies);
      isLogged(tokenData.id);
    } else {
      setLoading(false);
    }
  };

  const isLogged = async (id) => {
    try {
      const responseUser = await Api.get(`/User/by-id/${id}`);
      login(responseUser.data);
      if (responseUser.data.role === "User") {
        navigate("/user");
      } else if (responseUser.data.role === "Admin") {
        navigate("/admin");
      }
    } catch (error) {
      console.log("Failed to check user login status", error);
    } finally {
      setLoading(false);
    }
  };

  const loginApi = async () => {
    const data = {
      Email: email,
      Password: password,
    };
    try {
      setLoading(true);
      const responseToken = await Api.post("/Authentication", data);
      const token = responseToken.data;
      const expiresIn = 1 / 3;
      Cookies.set("token", JSON.stringify(token), { expires: expiresIn });
      isLogged(responseToken.data.id);
    } catch (error) {
      console.log(error);
      setError(
        error?.response?.data + " Login failed. Please check your credentials."
      );
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    loginApi();
  };

  useEffect(() => {
    checkLogged();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
