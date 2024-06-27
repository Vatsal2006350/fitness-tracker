import React, { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Stack, FormControlLabel, Switch, AppBar, Toolbar, IconButton, Drawer, List, ListItem, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link as ScrollLink, scroller } from 'react-scroll';
import Logo from '../assets/images/Logo.png';
import { useTheme } from '@mui/material/styles';

const Navbar = ({ darkMode, setDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
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

  const isActive = (path, hash) => {
    if (hash) {
      return location.pathname === path && location.hash === hash;
    }
    return location.pathname === path;
  };

  const menuItems = [
    { text: 'Home', link: '/' },
    { text: 'Exercises', link: '/', onClick: handleExercisesClick },
    { text: 'Contact Us', link: '/contact' },
    { text: 'Personalized Workout', link: '/personalized-workout' },
  ];

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
            style={{
              textDecoration: 'none',
              color: darkMode ? '#fff' : '#3A1212',
              cursor: 'pointer',
              fontFamily: 'Josefin Sans',
              fontWeight: 'bold',
              fontSize: '24px',
              borderBottom: isActive(item.link, '#exercises') ? '3px solid #3A1212' : 'none',
              padding: '0 20px',
              whiteSpace: 'nowrap',
            }}
          >
            {item.text}
          </div>
        ) : (
          <RouterLink
            to={item.link}
            style={{
              textDecoration: 'none',
              color: darkMode ? '#fff' : '#3A1212',
              borderBottom: isActive(item.link) ? '3px solid #3A1212' : 'none',
              fontFamily: 'Josefin Sans',
              fontWeight: 'bold',
              fontSize: '24px',
              display: 'inline-block',
              padding: '0 20px',
              whiteSpace: 'nowrap',
            }}
            onClick={item.onClick}
          >
            {item.text}
          </RouterLink>
        )}
      </ListItem>
    ));

  return (
    <AppBar position="static" sx={{ backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#3A1212' }}>
      <Toolbar>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: '100%' }}
          px="20px"
        >
          <RouterLink to="/">
            <img src={Logo} alt="logo" style={{ width: '100px', height: '100px', margin: '5px' }} />
          </RouterLink>
          <Stack direction="row" alignItems="center" gap="40px" sx={{ display: { xs: 'none', md: 'flex' } }}>
            {renderMenuItems(false)}
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
              sx={{ marginLeft: 'auto' }}
            />
          </Stack>
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
                />
              </ListItem>
            </List>
          </Drawer>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
