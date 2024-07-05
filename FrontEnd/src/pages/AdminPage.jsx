import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Typography,
  Button,
  TableContainer,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Api from "../Services/Api";
import LoadingSpinner from "../components/LoadingSpinner";
import ChangePasswordModal from "../components/ChangePasswordModal"; // Importe a modal de alteração de senha
import { useUsersContext } from "../context/UsersContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/home-banner-background.png";
import { useAuth } from "../context/AuthContext";

const AdminPage = () => {
  const { users, updateUserList } = useUsersContext();
  const [loading, setLoading] = useState(true);
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const getUsersApi = async () => {
    setLoading(true);
    try {
      const tokenCookies = Cookies.get("token");
      if (tokenCookies) {
        const response = await Api.get("/User");
        updateUserList(response.data);
      }
    } catch (error) {
      console.log("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await Api.delete(`/user/${userId}`);
      updateUserList(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleChangePassword = () => {
    setOpenChangePasswordModal(true); 
  };

  const handleCloseChangePasswordModal = () => {
    setOpenChangePasswordModal(false); 
    getUsersApi(); 
  };

  const returnToLogin = () => {
    navigate("/login");
  };

  const logoutButton = () => {
    Cookies.remove("token");
    logout();
    navigate("/login");
  };

  useEffect(() => {
    getUsersApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <Container
      maxWidth="full"
      sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "#4146ff",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "157px 15px 181px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {users ? (
        <Paper
          sx={{ p: 2, width: "60vw", maxHeight: "75vh", overflow: "auto" }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
            <Button variant="contained" color="secondary" onClick={logoutButton}>
              Logout
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleChangePassword} // Chamar função para abrir a modal de alteração de senha
            >
              Change Password
            </Button>
          </Box>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>CPF</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.cpf}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDelete(user.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            borderRadius: 2,
            p: 3,
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            You are not logged in.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={returnToLogin}
            sx={{ mt: 2 }}
          >
            Return to Login
          </Button>
        </Box>
      )}
      {/* Renderizar a modal de alteração de senha */}
      <ChangePasswordModal
        open={openChangePasswordModal}
        handleClose={handleCloseChangePasswordModal}
      />
    </Container>
  );
};

export default AdminPage;
