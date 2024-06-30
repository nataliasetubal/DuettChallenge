import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  MenuItem,
  Snackbar,
} from "@mui/material";
import Api from '../Services/Api';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [role, setRole] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      Name: name,
      Email: email,
      Password: password,
      CPF: cpf,
      Role: role,
    };
    saveUserApi(userData);
  };

  const saveUserApi = async (user) => {
    try {
      const result = await Api.post('/User', user);
      console.log(result);
      setOpenSnackbar(true);
      setSnackbarMessage("User registered successfully");      
    } catch (error) {
      console.log("Error:", error?.response?.data?.errors);
      setOpenSnackbar(true);
      setSnackbarMessage("Failed to register user");
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>
        <Button variant="outlined" onClick={() => navigate("/login")}>
          Back to Login
        </Button>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            helperText="Must contain at least one uppercase letter, one digit, and one special character."
          />
          <TextField
            fullWidth
            label="CPF"
            margin="normal"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
            inputProps={{ maxLength: 11 }}
          />
          <TextField
            select
            fullWidth
            label="Role"
            margin="normal"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Register
          </Button>
        </form>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default Register;
