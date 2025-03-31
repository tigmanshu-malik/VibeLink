import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container, TextField, Box } from "@mui/material";


const Login = () => {
    return (
      <Container maxWidth="xs">
        <Box mt={8} p={3} bgcolor="white" boxShadow={3} borderRadius={2}>
          <Typography variant="h5" gutterBottom>Login</Typography>
          <TextField label="Email" fullWidth margin="normal" variant="outlined" />
          <TextField label="Password" fullWidth margin="normal" type="password" variant="outlined" />
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </Box>
      </Container>
    );
  };

  export default Login;