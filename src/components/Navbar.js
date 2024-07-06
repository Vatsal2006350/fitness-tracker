import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Link, Stack, FormControlLabel, Switch, AppBar, Toolbar, IconButton, Drawer, List, ListItem, Box, useMediaQuery, Modal, Button, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { scroller } from 'react-scroll';
import { useTheme } from '@mui/material/styles';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Logo from '../assets/images/Logo.png';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import { auth } from '../Firebase';

const Navbar = ({ darkMode, setDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [scrollCount, setScrollCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false); // Track whether to show sign-up form

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setShowModal(false); // Close modal on successful login
      } else {
        setUser(null);
      }
    });

    const handleScroll = () => {
      setScrollCount((prevCount) => {
        const newCount = prevCount + 1;
        if (newCount === 10) { // Adjusted scroll trigger count
          setShowSignUpForm(true); // Show sign-up form after scrolling
          setShowModal(true); // Open modal after scrolling
        }
        return newCount;
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
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

  const handleLoginClick = () => {
    setShowSignUpForm(false);
    setShowModal(true);
  };

  const handleSignUpClick = () => {
    setShowSignUpForm(true);
    setShowModal(true);
  };

  const menuItems = [
    { text: 'Home', link: '/' },
    { text: 'Exercises', link: '/#exercises', onClick: handleExercisesClick }, // Updated link to anchor on home page
    { text: 'Contact Us', link: '/contact' },
    { text: 'Personalized Workout', link: '/personalized-workout' },
    user ? { text: `Welcome, ${user.displayName || user.email}`, onClick: null } : { text: 'Login', onClick: handleLoginClick },
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
              sx={{ color: '#fff', fontSize: '12px' }} // Reduced font size
            />
          </Box>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={toggleDrawer}
            sx={{ display: { xs: 'flex', md: 'none' }, justifySelf: 'flex-end' }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{
            width: 250,
            backgroundColor: '#fff',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
            <RouterLink to="/" style={{ textDecoration: 'none' }} onClick={toggleDrawer}>
              <img src={Logo} alt="logo" style={{ width: '50px', height: '50px', margin: '5px' }} />
            </RouterLink>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
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
                  />
                }
                label="Dark Mode"
                labelPlacement="start"
                sx={{ color: '#000', fontSize: '12px' }} // Reduced font size
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          {showSignUpForm ? (
            <>
              <SignUp onClose={() => setShowModal(false)} />
              <Typography variant="body2" align="center" sx={{ marginTop: '16px' }}>
                Already a member?{' '}
                <Link component="button" variant="body2" onClick={() => setShowSignUpForm(false)} sx={{ color: 'blue', textDecoration: 'underline' }}>
                  Login instead
                </Link>
              </Typography>
            </>
          ) : (
            <>
              <Login onClose={() => setShowModal(false)} />
              <Typography variant="body2" align="center" sx={{ marginTop: '16px' }}>
                Not a member?{' '}
                <Link component="button" variant="body2" onClick={() => setShowSignUpForm(true)} sx={{ color: 'blue', textDecoration: 'underline' }}>
                  Sign up instead
                </Link>
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Navbar;
