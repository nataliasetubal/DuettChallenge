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
import EditIcon from "@mui/icons-material/Edit";
import Api from "../Services/Api";
import LoadingSpinner from "../components/LoadingSpinner";
import EditUserModal from "../components/EditUserModal";
import { useUsersContext } from "../context/UsersContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const { users, updateUserList, updateUserBeingEdited } = useUsersContext();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
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

  const handleEdit = (user) => {
    updateUserBeingEdited(user);
    setOpen(true);
  };

  const handleCloseEditModal = () => {
    updateUserBeingEdited(null);
    setOpen(false);
    getUsersApi();
  };
  const returnToLogin = () => {
    navigate("/login");
  };

  const logout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  useEffect(() => {
    getUsersApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <LoadingSpinner />
  ) : (
    <Container>
      {users ? (
        <Paper>
          <Box>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
            <Button variant="contained" color="secondary" onClick={logout}>
              Logout
            </Button>
          </Box>
          <TableContainer>
            <Table>
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
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(user)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <Box>
          <Typography>You are not logged in.</Typography>
          <Button variant="contained" color="secondary" onClick={returnToLogin}>
            Return to Login
          </Button>
        </Box>
      )}
      {/* Modal de Edição */}
      <EditUserModal open={open} handleClose={handleCloseEditModal} />
    </Container>
  );
};

export default AdminPage;
