import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import LoadingSpinner from "../components/LoadingSpinner";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Api from "../Services/Api";

const UserPage = () => {
  const [ loading, setLoading ] = useState(true);
  const [ user, setUser ] = useState();
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

  const logout = () => {
    Cookies.remove("token");
    navigate("/login");
  };

  useEffect(() => {
    getUserApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading ? (
    <LoadingSpinner />
  ) : (
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
          <Box>
            <Typography>You are not logged in.</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={returnToLogin}
            >
              Return to Login
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default UserPage;
