import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, useMediaQuery, useTheme, Menu, MenuItem, Drawer, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { alpha } from "@mui/material/styles";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const navItems = [
    { title: "Home", path: "/" },
    { title: "Explore", path: "/explore" },
    { title: "About", path: "/about" }
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        VibeLink
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.title} component={Link} to={item.path} sx={{ textAlign: 'center' }}>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
        <ListItem button component={Link} to="/login" sx={{ textAlign: 'center' }}>
          <ListItemText primary="Login" />
        </ListItem>
        <ListItem button component={Link} to="/register" sx={{ textAlign: 'center' }}>
          <ListItemText primary="Register" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar 
  position="fixed" 
  sx={{
    backgroundColor: scrolled ? '#f8f9fa' : '#4a6da7', // Change this line
    boxShadow: scrolled ? '0px 2px 10px rgba(0, 0, 0, 0.1)' : 'none',
    transition: 'all 0.3s ease',
    color: scrolled ? '#333' : 'white', // Keep this for good text contrast
    backdropFilter: scrolled ? 'blur(10px)' : 'none',
  }}
>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', padding: {xs: '0.5rem 0', md: '0.75rem 0'} }}>
          {/* Logo and Brand */}
          <Typography 
            variant="h5" 
            component={Link} 
            to="/"
            sx={{ 
              fontWeight: 700, 
              textDecoration: 'none', 
              color: 'inherit',
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                color: theme.palette.primary.main,
              }
            }}
          >
            <Box 
              component="span" 
              sx={{ 
                backgroundColor: theme.palette.primary.main, 
                color: 'white', 
                width: '32px', 
                height: '32px', 
                borderRadius: '6px', 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mr: 1
              }}
            >
              V
            </Box>
            VibeLink
          </Typography>

          {/* Navigation for Desktop */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {navItems.map((item) => (
                <Button 
                  key={item.title}
                  component={Link} 
                  to={item.path}
                  sx={{ 
                    color: 'inherit', 
                    marginX: 1,
                    fontSize: '0.95rem',
                    position: 'relative',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      '&::after': {
                        width: '70%',
                      }
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: '5px',
                      left: '15%',
                      width: '0%',
                      height: '2px',
                      backgroundColor: theme.palette.primary.main,
                      transition: 'width 0.3s ease'
                    }
                  }}
                >
                  {item.title}
                </Button>
              ))}
              <Box sx={{ borderLeft: '1px solid', borderColor: alpha(theme.palette.common.black, 0.15), height: '24px', mx: 2 }} />
              <Button 
                color="inherit" 
                component={Link} 
                to="/login"
                sx={{ 
                  marginX: 1,
                  fontSize: '0.95rem',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  }
                }}
              >
                Login
              </Button>
              <Button 
                component={Link} 
                to="/register"
                variant="contained"
                sx={{ 
                  marginX: 1,
                  boxShadow: '0 4px 14px 0 rgba(0,118,255,0.39)',
                  transition: 'all 0.2s ease',
                  fontSize: '0.95rem',
                  '&:hover': {
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 20px rgba(0,118,255,0.23)'
                  }
                }}
              >
                Register
              </Button>
            </Box>
          )}

          {/* Mobile Navigation Menu */}
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ ml: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>
      
      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;