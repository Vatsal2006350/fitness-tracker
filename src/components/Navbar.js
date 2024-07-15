import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Stack, AppBar, Toolbar, IconButton, Drawer, List, ListItem, Box, useMediaQuery, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { scroller } from 'react-scroll';
import { useTheme } from '@mui/material/styles';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Logo from '../assets/images/Logo.png';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import { auth } from '../Firebase';
import '../assets/css/Navbar.css'

const Navbar = ({ onManageSubscription }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [user, setUser] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [scrollCount, setScrollCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

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

  const getFirstName = (fullName) => {
    return fullName.split(' ')[0];
  };

  const menuItems = [
    { text: 'Home', link: '/' },
    { text: 'Chat', link: '/chat' },
    { text: 'Personalized Workout', link: '/personalized-workout' },
    { text: 'Pricing', link: '/pricing' },
    { text: 'Contact Us', link: '/contact' },
  ];

  const menuItemStyle = (isDrawer, path, text) => ({
    textDecoration: 'none',
    color: isDrawer ? '#000' : '#fff',
    cursor: 'pointer',
    fontFamily: 'Roboto, sans-serif',
    fontWeight: isActive(path) && text !== 'Exercises' ? 'bold' : 'normal',
    fontSize: '16px',
    backgroundColor: isActive(path) && !isDrawer ? '#3A1212' : 'transparent',
    color: isActive(path) && !isDrawer ? '#fff' : isDrawer ? '#000' : '#fff',
    borderRadius: '5px',
    padding: '8px 16px',
    margin: '0 10px',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
    // Remove the transition and transform properties from here
  });
  

  const renderMenuItems = (isDrawer) =>
    menuItems.map((item) => (
      <ListItem
        button={isDrawer}
        key={item.text}
        onClick={isDrawer ? null : null}
        sx={{ padding: isDrawer ? '8px 16px' : 'unset' }}
      >
        {item.text === 'Exercises' && !isDrawer ? (
          <div
            onClick={user ? handleExercisesClick : handleSignUpClick}
            style={menuItemStyle(isDrawer, item.link, item.text)}
            className="nav-link" // Add this class
          >
            {item.text}
          </div>
        ) : (
          <RouterLink
            to={user ? item.link : '#'}
            style={menuItemStyle(isDrawer, item.link, item.text)}
            onClick={user ? null : handleSignUpClick}
            className="nav-link" // Add this class
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
          backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(139, 0, 0, 0.8)',
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
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {!user ? (
              <>
                <Button
                  onClick={handleLoginClick}
                  variant="outlined"
                  sx={{ 
                    color: '#fff', 
                    borderColor: '#fff', 
                    borderRadius: '20px', 
                    marginRight: '10px', 
                    fontFamily: 'Roboto, sans-serif',
                    '&:hover': {
                      borderColor: '#fff',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  Login
                </Button>
                <Button
                  onClick={handleSignUpClick}
                  variant="contained"
                  sx={{ 
                    backgroundColor: '#3A1212', 
                    color: '#fff', // Ensure the text color remains white
                    borderRadius: '20px', 
                    fontFamily: 'Roboto, sans-serif',
                    '&:hover': {
                      backgroundColor: '#561818',
                    }
                  }}
                >
                  Sign up
                </Button>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    padding: '8px 16px',
                    fontFamily: 'Roboto, sans-serif',
                    color: '#fff',
                    marginRight: '10px',
                  }}
                >
                  Welcome, {getFirstName(user.displayName || user.email)}
                </Box>
                <Button
                  onClick={onManageSubscription}
                  variant="contained"
                  sx={{ 
                    backgroundColor: '#3A1212', 
                    borderRadius: '20px', 
                    fontFamily: 'Roboto, sans-serif',
                    marginRight: '10px',
                    '&:hover': {
                      backgroundColor: '#561818',
                    }
                  }}
                >
                  Manage Subscription
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outlined"
                  sx={{ 
                    color: '#fff', 
                    borderColor: '#fff', 
                    borderRadius: '20px', 
                    fontFamily: 'Roboto, sans-serif',
                    '&:hover': {
                      borderColor: '#fff',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    }
                  }}
                >
                  Logout
                </Button>
              </>
            )}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={toggleDrawer}
              sx={{ display: { xs: 'flex', md: 'none' }, justifySelf: 'flex-end' }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{
            width: 250,
            backgroundColor: '#f0f0f0',
            height: '100%',
          }}
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {renderMenuItems(true)}
          </List>
        </Box>
      </Drawer>
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          zIndex: 1000,
          paddingTop: '0px',
        }}>
          <div style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: 'calc(100% - 120px)',
            overflowY: 'auto',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.25)',
            position: 'relative',
            marginTop: '60px',
          }}>
            <span style={{
              position: 'absolute',
              top: '10px',
              right: '20px',
              fontSize: '30px',
              fontWeight: 'bold',
              color: '#aaa',
              cursor: 'pointer',
            }} onClick={() => setShowModal(false)}>
              &times;
            </span>
            {showSignUpForm 
              ? <SignUp onSwitchToLogin={() => setShowSignUpForm(false)} /> 
              : <Login onSwitchToSignUp={() => setShowSignUpForm(true)} />}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
