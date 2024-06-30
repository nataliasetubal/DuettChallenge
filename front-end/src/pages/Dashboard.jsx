import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Container, Typography, Box, Button } from '@mui/material';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        {user ? (
          <Box>
            <Typography variant="h6">Hello World!!!</Typography>
            <Typography variant="h6">Welcome, {user.name}</Typography>
            <Typography>Email: {user.email}</Typography>
            <Button variant="contained" color="secondary" onClick={logout}>
              Logout
            </Button>
          </Box>
        ) : (
          <Typography>You are not logged in.</Typography>
        )}
      </Box>
    </Container>
  );
};

export default Dashboard;
