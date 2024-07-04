import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button, Stack } from "@mui/material";
import LoadingSpinner from "../components/LoadingSpinner";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Api from "../Services/Api";
import backgroundImage from "../assets/images/home-banner-background.png";
import { useAuth } from "../context/AuthContext";
import ChangePasswordModal from "../components/ChangePasswordModal";

const UserPage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();
  const { logout } = useAuth();
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);
  const navigate = useNavigate();

  const getUserApi = async () => {
    setLoading(true);
    try {
      const tokenCookies = Cookies.get("token");
      if (tokenCookies) {
        const { id } = JSON.parse(tokenCookies);
        const { data } = await Api.get(`/User/byId/${id}`);
        if (data) {
          setUser(data);
        }
      }
    } catch (error) {
      console.log("Failed to check user login status", error);
    } finally {
      setLoading(false);
    }
  };

  const returnToLogin = () => {
    navigate("/login");
  };

  const logoutButton = () => {
    Cookies.remove("token");
    logout();
    navigate("/login");
  };

  const handleChangePassword = () => {
    setOpenChangePasswordModal(true);
  };

  const handleCloseChangePasswordModal = () => {
    setOpenChangePasswordModal(false);
    getUserApi();
  };

  useEffect(() => {
    getUserApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
            maxWidth: "sm",
            width: "100%",
            mx: "auto",
            mt: 8,
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{ color: "#4146ff" }}
          >
            Welcome!!!
          </Typography>
          {user ? (
            <Box>
              <Typography variant="h6" sx={{ color: "#4146ff" }}>
                Hello World!!!
              </Typography>
              <Typography variant="h6" sx={{ color: "#4146ff" }}>
                Welcome, {user.name}
              </Typography>
              <Typography>Email: {user.email}</Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={logoutButton}
                >
                  Logout
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleChangePassword} // Chamar função para abrir a modal de alteração de senha
                >
                  Change Password
                </Button>
              </Stack>
            </Box>
          ) : (
            <Box>
              <Typography>You are not logged in.</Typography>
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

export default UserPage;
