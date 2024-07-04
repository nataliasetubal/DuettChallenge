import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  DialogContent,
  DialogActions,
  FormControl,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "notistack";
import { useAuth } from "../context/AuthContext";
import Api from "../Services/Api";

const ChangePasswordModal = ({ open, handleClose }) => {
  const [loading, setLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const { userLogged, updateUserLogged } = useAuth();

  /**
   * Utiliza o `enqueueSnackbar` para exibir notificações usando o hook `useSnackbar`.
   * @param {string} message - A mensagem a ser exibida na notificação.
   * @param {string} variant - O tipo de variante da notificação (success, error, warning, info, default).
   * enqueueSnackbar("message", { variant: "variant" });
   */
  const { enqueueSnackbar } = useSnackbar();

  const checkPassword = () => {
    if (oldPassword !== userLogged.password) {
      enqueueSnackbar("Incorrect old password!", { variant: "error" });
      setError((prevState) => ({
        ...prevState,
        oldPassword: true,
      }));
    }
    if (newPassword !== confirmPassword) {
      enqueueSnackbar("Passwords do not match.", { variant: "error" });
      setError((prevState) => ({
        ...prevState,
        confirmPassword: true,
      }));
    }
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]{8,}$/;
    if (newPassword.length < 8 || newPassword.length > 100) {
      enqueueSnackbar(
        "The Password must be at least 8 and at most 100 characters long.",
        { variant: "error" }
      );
      setError((prevState) => ({
        ...prevState,
        newPassword: true,
      }));
    } else if (!passwordRegex.test(newPassword)) {
      enqueueSnackbar(
        "The Password must contain at least one uppercase letter, one digit, and one special character.",
        { variant: "error" }
      );
      setError((prevState) => ({
        ...prevState,
        newPassword: true,
      }));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    checkPassword();
    if (
      error.oldPassword === false &&
      error.newPassword === false &&
      error.confirmPassword === false
    ) {
      try {
        userLogged.password = newPassword;
        await Api.put(`/User/${userLogged.id}`, userLogged);
        enqueueSnackbar("Password updated successfully!", {
          variant: "success",
        });
        updateUserLogged(userLogged);
        handleClose();
      } catch (error) {
        enqueueSnackbar("Error updating password.", { variant: "error" });
        console.log(error);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const isFormValid = () => {
    return oldPassword !== "" && newPassword !== "" && confirmPassword !== "";
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {loading ? (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: 400,
            maxWidth: "90vw",
            borderRadius: 4,
          }}
        >
          <CircularProgress color="secondary" />
        </Box>
      ) : (
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            width: 400,
            maxWidth: "90vw",
            borderRadius: 4,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" id="modal-title" component="h2">
              Change Password
            </Typography>
            <IconButton onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
          <DialogContent dividers>
            <FormControl fullWidth margin="normal" error={!isFormValid()}>
              <TextField
                fullWidth
                label="Old Password"
                type="password"
                value={oldPassword}
                onChange={(e) => handleInputChange(e, setOldPassword)}
                error={error.oldPassword}
                required
              />
            </FormControl>
            <FormControl fullWidth margin="normal" error={!isFormValid()}>
              <TextField
                fullWidth
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => handleInputChange(e, setNewPassword)}
                helperText={
                  "Must contain at least one uppercase letter, one digit, and one special character."
                }
                error={error.newPassword}
                required
              />
            </FormControl>
            <FormControl fullWidth margin="normal" error={!isFormValid()}>
              <TextField
                fullWidth
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => handleInputChange(e, setConfirmPassword)}
                error={error.confirmPassword}
                required
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              variant="contained"
              color="primary"
              disabled={!isFormValid()}
            >
              Save
            </Button>
          </DialogActions>
        </Box>
      )}
    </Modal>
  );
};

export default ChangePasswordModal;
