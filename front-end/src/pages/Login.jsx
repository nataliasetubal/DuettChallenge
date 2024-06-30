import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Stack, Alert } from '@mui/material';
import Api from "../Services/Api";
import Cookies from 'js-cookie';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Estado para armazenar a mensagem de erro
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginApi = async () => {
    const data = {
      Email: email,
      Password: password
    }
    try {
      const responseToken = await Api.post("/Authentication", data);      
      const token = responseToken.data;
      const expiresIn = 1/3; 
      Cookies.set('token', token, { expires: expiresIn });  
        
      const responseUser = await Api.get(`/User/by-email/${email}`, );
      login(responseUser.data);
      navigate('/dashboard');
      console.log(responseUser)
    } catch (error) {
      console.log(error)
      setError(error?.response?.data + ' Login failed. Please check your credentials.'); // Define a mensagem de erro
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(''); 
    loginApi();
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>} {/* Exibe a mensagem de erro */}
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
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
