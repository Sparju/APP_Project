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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import Token from '../../common/Token';
import StudentServices from '../../services/StudentServices';
const pages = [
  { name: 'DashBoard', path: '/dashboard' },
  { name: 'Products', path: '/mainpage' },
  { name: 'About', path: '/About' },
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
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const fetchProfilePic = () => {
      StudentServices.getStudents({ email: Token.getUserEmail() })
        .then(res => {
          setProfilePic(res?.data[0]?.profilePicture);
          Token.setProfilePic(res?.data[0]?.profilePicture);
        })
        .catch(err => console.error("Error fetching student data:", err));
    };

    fetchProfilePic();
  }, []); // Fetch once when the component is mounted

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  // Callback to refresh profile picture after update
  const handleProfileUpdate = (updatedProfilePic) => {
    setProfilePic(updatedProfilePic);  // Update profile picture in state
  };

  return (
    <AppBar position="static" className='headerComp'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography variant="h5" noWrap component={Link} to="/" sx={{ mr: 2, flexGrow: 1 }}>
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} >
            {pages.map((page) => (
              <Button key={page.name} component={Link} to={page.path} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white' }}>
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {profilePic && <Avatar alt="Profile Picture" src={profilePic} />}
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
{/* <Profile onProfileUpdate={handleProfileUpdate} /> */}
    </AppBar>

  );
}
export default MainUi;