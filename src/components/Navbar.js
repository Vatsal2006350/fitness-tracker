import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Link, Stack, FormControlLabel, Switch, AppBar, Toolbar, IconButton, Drawer, List, ListItem, Box, useMediaQuery, Modal, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { scroller } from 'react-scroll';
import { useTheme } from '@mui/material/styles';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Logo from '../assets/images/Logo.png';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import { auth } from '../Firebase';

const LoginSignupModal = ({ open, onClose, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (open) {
      setIsLogin(true); // Reset to login form when modal opens
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
      }}>
        {isLogin ? <Login setUser={setUser} onClose={onClose} /> : <SignUp onClose={onClose} />}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Link component="button" variant="body2" onClick={() => {}}>
            Forgot password?
          </Link>
          <Link component="button" variant="body2" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log in"}
          </Link>
        </Box>
        <Button fullWidth variant="contained" onClick={onClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
};

const Navbar = ({ darkMode, setDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [user, setUser] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null);
      navigate('/');
    }).catch((error) => {
      console.error('Error logging out:', error);
    });
  };

  const handleModeChange = () => {
    setDarkMode(!darkMode);
  };

  const handleExercisesClick = () => {
    scroller.scrollTo('exercises', {
      smooth: true,
      duration: 500,
      offset: -70,
    });
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { text: 'Home', link: '/' },
    { text: 'Exercises', link: '/#exercises', onClick: handleExercisesClick }, // Updated link to anchor on home page
    { text: 'Contact Us', link: '/contact' },
    { text: 'Personalized Workout', link: '/personalized-workout' },
    user ? { text: `Welcome, ${user.displayName || user.email}`, onClick: null } : { text: 'Login', onClick: () => setShowLoginForm(true) },
    user ? { text: 'Logout', onClick: handleLogout } : null,
  ].filter(Boolean); // Filter out null items

  const menuItemStyle = (isDrawer, path, text) => ({
    textDecoration: 'none',
    color: isDrawer ? '#000' : '#fff', // Black in drawer, white in navbar
    cursor: 'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', // Updated font stack
    fontWeight: isActive(path) && text !== 'Exercises' ? 'bold' : 'normal', // Bold if active and not Exercises, normal otherwise
    fontSize: '16px', // Reduced font size for a more compact look
    backgroundColor: isActive(path) && !isDrawer ? '#3A1212' : 'transparent', // Background color for active button
    color: isActive(path) && !isDrawer ? '#fff' : '#fff', // Text color for active button
    borderRadius: '5px',
    padding: '8px 16px', // Adjusted padding for a more compact button
    margin: '0 10px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    transition: 'background-color 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: !isActive(path) && !isDrawer ? '#3A1212' : 'rgba(0, 0, 0, 0.1)',
    },
  });

  const renderMenuItems = (isDrawer) =>
    menuItems.map((item) => (
      <ListItem
        button={isDrawer}
        key={item.text}
        onClick={isDrawer ? item.onClick || toggleDrawer : item.onClick}
        sx={{ padding: isDrawer ? '8px 16px' : 'unset' }}
      >
        {item.text === 'Exercises' && !isDrawer ? (
          <div
            onClick={handleExercisesClick}
            style={menuItemStyle(isDrawer, item.link, item.text)}
          >
            {item.text}
          </div>
        ) : (
          <RouterLink
            to={item.link}
            style={menuItemStyle(isDrawer, item.link, item.text)}
            onClick={item.onClick}
          >
            {item.text}
          </RouterLink>
        )}
      </ListItem>
    ));

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: 'rgba(139, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          color: '#fff',
          boxShadow: 'none',
          borderBottom: '1px solid #ddd',
          padding: '0',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: '40px', padding: '0 10px' }}>
          <RouterLink to="/" style={{ textDecoration: 'none' }}>
            <img src={Logo} alt="logo" style={{ width: '50px', height: '50px', margin: '5px' }} />
          </RouterLink>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
            <Stack direction="row" spacing={2} alignItems="center">
              {renderMenuItems(false)}
            </Stack>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mt: 1 }}> {/* Added mt: 1 for slight margin-top */}
            <FormControlLabel
              control={
                <Switch
                  checked={darkMode}
                  onChange={handleModeChange}
                  name="darkModeToggle"
                  color="default"
                />
              }
              label="Dark Mode"
              labelPlacement="start"
              sx={{ color: '#fff' }}
            />
          </Box>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ display: { xs: 'block', md: 'none' } }}
              onClick={toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
            <IconButton onClick={toggleDrawer} sx={{ alignSelf: 'flex-end', m: 2 }}>
              <CloseIcon />
            </IconButton>
            <List>
              {renderMenuItems(true)}
              <ListItem>
                <FormControlLabel
                  control={
                    <Switch
                      checked={darkMode}
                      onChange={handleModeChange}
                      name="darkModeToggle"
                      color="default"
                      sx={{ ml: 1 }} // Added margin-left for alignment
                    />
                  }
                  label="Dark Mode"
                  labelPlacement="start"
                  sx={{ color: '#fff', mt: 1 }} // Added mt: 1 for slight margin-top
                />
              </ListItem>
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
      {showLoginForm &&
        <LoginSignupModal 
          open={showLoginForm} 
          onClose={() => setShowLoginForm(false)} 
          setUser={setUser} 
        />
      }
    </>
  );
};

export default Navbar;
