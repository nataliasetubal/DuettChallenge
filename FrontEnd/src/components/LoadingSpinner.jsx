import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const LoadingSpinner = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#4146ff"
    >
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default LoadingSpinner;
