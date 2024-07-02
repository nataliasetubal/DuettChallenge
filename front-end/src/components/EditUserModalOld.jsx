import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
} from "@mui/material";
import Api from "../Services/Api";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InputMask from "react-input-mask";

const EditUserModal = ({ user, open, onClose, onSave }) => {
  const [editingUser, setEditingUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    cpf: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (user) {
      setEditingUser({
        id: user.id || "",
        name: user.name || "",
        email: user.email || "",
        password: user.password || "",
        cpf: user.cpf || "",
        role: user.role || "",
      });
    }
  }, [user]);

  const validateUser = (user) => {
    const errors = [];

    if (!user.name || user.name.trim() === "") {
      errors.push("Username is required");
    } else if (user.name.length > 100) {
      errors.push("Username must be at most 100 characters long");
    }

    const emailRegex = /.+@.+\..+/;
    if (!user.email || user.email.trim() === "") {
      errors.push("Email is required");
    } else if (!emailRegex.test(user.email)) {
      errors.push("Please provide a valid email");
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]{8,}$/;
    if (!user.password || user.password.trim() === "") {
      errors.push("The Password field is required.");
    } else if (user.password.length < 8 || user.password.length > 100) {
      errors.push(
        "The Password must be at least 8 and at most 100 characters long."
      );
    } else if (!passwordRegex.test(user.password)) {
      errors.push(
        "The Password must contain at least one uppercase letter, one digit, and one special character."
      );
    }

    const cpfRegex = /^\d{11}$/;
    if (!user.cpf || user.cpf.trim() === "") {
      errors.push("The CPF field is required.");
    } else if (!cpfRegex.test(user.cpf)) {
      errors.push(
        "The CPF must contain only numeric characters and must be exactly 11 digits."
      );
    }

    return errors;
  };

  const handleSaveEdit = async () => {
    const validationErrors = validateUser(editingUser);
    if (validationErrors.length > 0) {
      console.log("Validation Errors:", validationErrors);
      setOpenSnackbar(true);
      setSnackbarMessage("Validation failed: " + validationErrors.join(", "));
      return;
    }

    try {
      await Api.put(`/user/${editingUser.id}`, editingUser);
      onSave(editingUser);
      onClose();
    } catch (error) {
      console.error("Error editing user:", error);
      setOpenSnackbar(true);
      setSnackbarMessage("Failed to save changes. Please try again.");
    }
  };

  if (!open) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <TextField
          id="edit-name"
          label="Name"
          value={editingUser.name}
          onChange={(e) =>
            setEditingUser({ ...editingUser, name: e.target.value })
          }
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          id="edit-email"
          label="Email"
          value={editingUser.email}
          onChange={(e) =>
            setEditingUser({ ...editingUser, email: e.target.value })
          }
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type={showPassword ? "text" : "password"}
          margin="normal"
          value={editingUser.password}
          onChange={(e) =>
            setEditingUser({ ...editingUser, password: e.target.value })
          }
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
          value={editingUser.cpf}
          onChange={(e) =>
            setEditingUser({ ...editingUser, cpf: e.target.value })
          }
        >
          {() => <TextField fullWidth label="CPF" margin="normal" required />}
        </InputMask>

        <TextField
          id="edit-role"
          label="Role"
          value={editingUser.role}
          onChange={(e) =>
            setEditingUser({ ...editingUser, role: e.target.value })
          }
          fullWidth
          variant="outlined"
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={handleSaveEdit}>
          Save
        </Button>
        <Button variant="contained" onClick={onClose}>
          Cancel
        </Button>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      />
    </Modal>
  );
};

export default EditUserModal;
