import Profile from "../Profile/Profile";
import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import Token from '../../common/Token';
import { createTheme, ThemeProvider } from "@mui/material";
import DarkModeIcon from '@mui/icons-material/DarkMode';

const pages = [
  { name: 'DashBoard', path: '/dashboard' },
  { name: 'Products', path: '/mainpage' },
  { name: 'About', path: '/About' },
  { name: 'Todos', path: '/dailtTodos' },
  { name: 'Topics', path: '/topics' },
  { name: 'Contact', path: '/Contact' }
];

const settings = [
  { name: 'Profile', path: '/Profile' },
  { name: 'Account', path: '/Account' },
  { name: 'Dashboard', path: '/Dashboard' },
  { name: 'Logout', path: '/Logout' }
];

function MainUi() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#212121' : '#1976d2', // dark mode: black, light mode: blue
      },
      background: {
        default: darkMode ? '#121212' : '#ffffff', // dark mode: black, light mode: white
      },
    },
  });

  const handleDarkModeToggle = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ bgcolor: theme.palette.primary.main }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Mobile Menu Icon */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} >
              <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                {pages.map((page) => (
                  <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                    <Typography component={Link} to={page.path} sx={{ textAlign: 'center' }}>
                      {page.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Logo */}
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography variant="h5" noWrap component={Link} to="/" sx={{ mr: 2, flexGrow: 1, color: 'white' }}>
              LOGO
            </Typography>

            {/* Desktop Menu Links */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >
              {pages.map((page) => (
                <Button key={page.name} component={Link} to={page.path} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white' }}>
                  {page.name}
                </Button>
              ))}
            </Box>

            {/* Dark Mode Toggle Button */}
            <IconButton
              color="inherit"
              onClick={handleDarkModeToggle}
              aria-label="Toggle dark mode"
              sx={{ mx: 2 }}
            >
              <DarkModeIcon style={{ width: "20px", backgroundColor: theme.palette.primary.main }} />
            </IconButton>

            {/* Current Time Display */}
            <Typography variant="h6" sx={{ mx: 2 }}>
              {time}
            </Typography>

            {/* User Profile Avatar */}
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Profile Picture" src={Token.getProfilePic()} />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                    <Typography component={Link} to={setting.path}>
                      {setting.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default MainUi;
