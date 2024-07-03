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
  IconButton,
  InputAdornment
} from "@mui/material";
import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
import InputMask from "react-input-mask";
import Api from "../Services/Api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = {
      Name: name,
      Email: email,
      Password: password,
      CPF: cpf.replace(/\D/g, ''), 
      Role: role,
    };
    saveUserApi(userData);
  };

  const validateUser = (user) => {
    const errors = [];

    if (!user.Name || user.Name.trim() === "") {
      errors.push("Username is required");
    } else if (user.Name.length > 100) {
      errors.push("Username must be at most 100 characters long");
    }

    const emailRegex = /.+@.+\..+/;
    if (!user.Email || user.Email.trim() === "") {
      errors.push("Email is required");
    } else if (!emailRegex.test(user.Email)) {
      errors.push("Please provide a valid email");
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]{8,}$/;
    if (!user.Password || user.Password.trim() === "") {
      errors.push("The Password field is required.");
    } else if (user.Password.length < 8 || user.Password.length > 100) {
      errors.push(
        "The Password must be at least 8 and at most 100 characters long."
      );
    } else if (!passwordRegex.test(user.Password)) {
      errors.push(
        "The Password must contain at least one uppercase letter, one digit, and one special character."
      );
    }

    const cpfRegex = /^\d{11}$/;
    if (!user.CPF || user.CPF.trim() === "") {
      errors.push("The CPF field is required.");
    } else if (!cpfRegex.test(user.CPF)) {
      errors.push(
        "The CPF must contain only numeric characters and must be exactly 11 digits."
      );
    }

    return errors;
  };

  const saveUserApi = async (user) => {
    const validationErrors = validateUser(user);
    if (validationErrors.length > 0) {
      console.log("Validation Errors:", validationErrors);
      setOpenSnackbar(true);
      setSnackbarMessage("Validation failed: " + validationErrors.join(", "));
      return;
    }

    try {
      const result = await Api.post("/User", user);
      console.log(result);
      setOpenSnackbar(true);
      setSnackbarMessage("User registered successfully");
      navigate("/login")
    } catch (error) {
      console.log("Error:", error?.response?.data);
      setOpenSnackbar(true);
      if (error?.response?.data?.errors) {
        return setSnackbarMessage("Failed to register User"); 
      }
      return  setSnackbarMessage("Failed to register User " + error.response.data);       
      
      
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
        <IconButton onClick={() => navigate(-1)} aria-label="back">
          <ArrowBack />
        </IconButton>
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
            type={showPassword ? "text" : "password"}
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            helperText="Must contain at least one uppercase letter, one digit, and one special character."
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <InputMask
            mask="999.999.999-99"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          >
            {() => (
              <TextField
                fullWidth
                label="CPF"
                margin="normal"
                required
              />
            )}
          </InputMask>
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
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </Container>
  );
};

export default Register;
