import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { UsersProvider } from './context/UsersContext';
import Register from './pages/Register';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import AdminPage from './pages/AdminPage';
import { AuthProvider } from './context/AuthContext';
import { SnackbarProvider } from 'notistack';



const App = () => {
  return (
    <Router>
      <AuthProvider>
        <UsersProvider>
          <SnackbarProvider maxSnack={5}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
          </SnackbarProvider>
        </UsersProvider>
      </AuthProvider>
    </Router>

  );
};

export default App;
