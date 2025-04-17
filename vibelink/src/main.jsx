import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container, TextField, Box } from "@mui/material";
import Navbar from "./Navbar";  
import Login from "./Login";
import Register from "./Register";
import LandingPage from './Landing';
import Dashboard from './Dashboard';
import Profile from './Profile';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './components/ResetPassword';
import PrivateRoute from './components/PrivateRoute';
import Hero from './components/Hero';
import './index.css';
// index.js or main.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import '@coreui/coreui/dist/css/coreui.min.css';

// Create a wrapper component to handle navbar rendering
const AppContent = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated on mount and when location changes
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [location]);

  // Define which routes should show which navbar
  const isAuthRoute = ['/login', '/register', '/dashboard', '/profile', '/forgot-password'].includes(location.pathname);
  const isLandingPage = location.pathname === '/';

  // Show Material UI Navbar for authenticated users on auth routes
  const shouldShowMuiNavbar = isAuthenticated && isAuthRoute;

  // Show simple navbar for unauthenticated users on auth routes
  const shouldShowSimpleNavbar = !isAuthenticated && isAuthRoute;

  return (
    <>
      {/* Show Material UI Navbar for authenticated users */}
      {shouldShowMuiNavbar && <Navbar />}
      
      {/* Show simple navbar for unauthenticated users on auth routes */}
      {shouldShowSimpleNavbar && (
        <AppBar 
          position="static" 
          sx={{ 
            bgcolor: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderBottom: '1px solid rgba(0,0,0,0.1)'
          }}
        >
          <Container>
            <Toolbar>
              <Typography 
                variant="h6" 
                component={Link} 
                to="/" 
                sx={{ 
                  flexGrow: 1, 
                  textDecoration: 'none', 
                  color: 'primary.main',
                  fontWeight: 'bold',
                  fontSize: '1.5rem'
                }}
              >
                VibeLink
              </Typography>
              <Button 
                color="primary" 
                component={Link} 
                to="/login"
                sx={{ 
                  mx: 1,
                  fontWeight: 'medium'
                }}
              >
                Login
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                component={Link} 
                to="/register"
                sx={{ 
                  mx: 1,
                  fontWeight: 'medium'
                }}
              >
                Register
              </Button>
            </Toolbar>
          </Container>
        </AppBar>
      )}

      {/* Main content */}
      <Box sx={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: isLandingPage ? "flex-start" : "center", 
        justifyContent: "center", 
        bgcolor: "#f5f5f5",
        pt: isLandingPage ? 0 : undefined
      }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:resettoken" element={<ResetPassword />} />
          <Route path="/" element={<Hero />} />
        </Routes>
      </Box>
    </>
  );
};

createRoot(document.getElementById('root')).render(
  <Router>
    <AppContent />
  </Router>
)
