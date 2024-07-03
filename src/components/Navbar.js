import React, { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Link, Stack, FormControlLabel, Switch, AppBar, Toolbar, IconButton, Drawer, List, ListItem, Box, useMediaQuery, Modal, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { scroller } from 'react-scroll';
import { useTheme } from '@mui/material/styles';
import Logo from '../assets/images/Logo.png';
// import Login from './Login';
// import SignUp from './SignUp';

/*
const LoginSignupModal = ({ open, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

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
        {isLogin ? <Login /> : <SignUp />}
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
*/

const Navbar = ({ darkMode, setDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  // const [showLoginForm, setShowLoginForm] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleModeChange = () => {
    setDarkMode(!darkMode);
  };

  const handleExercisesClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        scroller.scrollTo('exercises', {
          smooth: true,
          duration: 500,
          offset: -70,
        });
      }, 100);
    } else {
      scroller.scrollTo('exercises', {
        smooth: true,
        duration: 500,
        offset: -70,
      });
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { text: 'Home', link: '/' },
    { text: 'Exercises', link: '/', onClick: handleExercisesClick },
    { text: 'Contact Us', link: '/contact' },
    { text: 'Personalized Workout', link: '/personalized-workout' },
    // { text: 'Login', onClick: () => setShowLoginForm(true) },
  ];

  const menuItemStyle = (isDrawer, path, text) => ({
    textDecoration: 'none',
    color: isDrawer ? '#000' : '#fff', // Black in drawer, white in navbar
    cursor: 'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', // Updated font stack
    fontWeight: isActive(path) && text !== 'Exercises' ? 'bold' : 'normal', // Bold if active and not Exercises, normal otherwise
    fontSize: '18px',
    borderBottom: isActive(path) && !isDrawer && text !== 'Exercises' ? '3px solid #3A1212' : 'none',
    margin: '0 10px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
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
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
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
                    />
                  }
                  label="Dark Mode"
                  labelPlacement="start"
                  sx={{ color: '#fff' }}
                />
              </ListItem>
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
      {/*
      <LoginSignupModal 
        open={showLoginForm} 
        onClose={() => setShowLoginForm(false)} 
      />
      */}
    </>
  );
};

export default Navbar;
