import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Link, Stack, FormControlLabel, Switch, AppBar, Toolbar, IconButton, Drawer, List, ListItem, Box, useMediaQuery } from '@mui/material';
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
  const [showSignUpForm, setShowSignUpForm] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setShowModal(false);
      } else {
        setUser(null);
      }
    });

    const handleScroll = () => {
      setScrollCount((prevCount) => {
        const newCount = prevCount + 1;
        if (newCount === 10 && !user) {
          setShowSignUpForm(true);
          setShowModal(true);
        }
        return newCount;
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      unsubscribe();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [user]);

  useEffect(() => {
    // Scroll to the top whenever the location changes
    window.scrollTo(0, 0);
  }, [location]);

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
    navigate('/');
    setTimeout(() => {
      scroller.scrollTo('exercises', {
        smooth: true,
        duration: 500,
        offset: -70,
      });
    }, 100);
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
    { text: 'Exercises', link: '/#exercises', onClick: handleExercisesClick },
    { text: 'Contact Us', link: '/contact' },
    { text: 'Personalized Workout', link: '/personalized-workout' },
    user ? { text: `Welcome, ${user.displayName || user.email}`, onClick: null } : { text: 'Login', onClick: handleLoginClick },
    user ? { text: 'Logout', onClick: handleLogout } : null,
  ].filter(Boolean);

  const menuItemStyle = (isDrawer, path, text) => ({
    textDecoration: 'none',
    color: isDrawer ? '#000' : '#fff',
    cursor: 'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontWeight: isActive(path) && text !== 'Exercises' ? 'bold' : 'normal',
    fontSize: '16px',
    backgroundColor: isActive(path) && !isDrawer ? '#3A1212' : 'transparent',
    color: isActive(path) && !isDrawer ? '#fff' : isDrawer ? '#000' : '#fff',
    borderRadius: '5px',
    padding: '8px 16px',
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
        onClick={isDrawer ? (user ? item.onClick : null) : (user ? item.onClick : handleSignUpClick)}
        sx={{ padding: isDrawer ? '8px 16px' : 'unset' }}
      >
        {item.text === 'Exercises' && !isDrawer ? (
          <div
            onClick={user ? handleExercisesClick : handleSignUpClick}
            style={menuItemStyle(isDrawer, item.link, item.text)}
          >
            {item.text}
          </div>
        ) : (
          <RouterLink
            to={user ? item.link : '#'}
            style={menuItemStyle(isDrawer, item.link, item.text)}
            onClick={user ? item.onClick : handleSignUpClick}
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
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', mt: 1 }}>
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
              sx={{ color: '#fff', fontSize: '12px' }}
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

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
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
                sx={{ color: '#000', fontSize: '12px' }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {showModal && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1300,
            bgcolor: 'background.paper',
          }}
        >
          {showSignUpForm ? (
            <SignUp
              onClose={() => user && setShowModal(false)}
              onSwitchToLogin={() => setShowSignUpForm(false)}
            />
          ) : (
            <Login
              setUser={setUser}
              onClose={() => user && setShowModal(false)}
              onSwitchToSignUp={() => setShowSignUpForm(true)}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default Navbar;
