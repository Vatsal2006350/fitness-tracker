import React from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { Stack, FormControlLabel, Switch, AppBar, Toolbar } from '@mui/material';
import { Link as ScrollLink, scroller } from 'react-scroll';
import Logo from '../assets/images/Logo.png';

const Navbar = ({ darkMode, setDarkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();

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
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#3A1212' }}>
      <Toolbar>
        <Stack
          direction="row"
          justifyContent="space-around"
          sx={{ gap: { sm: '122px', xs: '40px' }, mt: { sm: '32px', xs: '20px' }, justifyContent: 'none' }}
          px="20px"
          style={{ width: '100%' }}
        >
          <RouterLink to="/">
            <img src={Logo} alt="logo" style={{ width: '100px', height: '100px', margin: '5px' }} />
          </RouterLink>
          <Stack alignItems="center" direction="row" gap="40px" fontSize="24px">
            <RouterLink
              to="/"
              style={{
                textDecoration: 'none',
                color: darkMode ? '#fff' : '#3A1212',
                borderBottom: location.pathname === '/' ? '3px solid #3A1212' : 'none',
                fontFamily: 'Josefin Sans',
                fontWeight: 'bold'
              }}
            >
              Home
            </RouterLink>
            {location.pathname === '/' ? (
              <ScrollLink
                to="exercises"
                smooth={true}
                duration={500}
                style={{
                  textDecoration: 'none',
                  color: darkMode ? '#fff' : '#3A1212',
                  cursor: 'pointer',
                  fontFamily: 'Josefin Sans',
                  fontWeight: 'bold',
                }}
                activeClass="none"
              >
                Exercises
              </ScrollLink>
            ) : (
              <div
                onClick={handleExercisesClick}
                style={{
                  textDecoration: 'none',
                  color: darkMode ? '#fff' : '#3A1212',
                  cursor: 'pointer',
                  fontFamily: 'Josefin Sans',
                  fontWeight: 'bold',
                }}
              >
                Exercises
              </div>
            )}
            <RouterLink
              to="/contact"
              style={{
                textDecoration: 'none',
                color: darkMode ? '#fff' : '#3A1212',
                borderBottom: location.pathname === '/contact' ? '3px solid #3A1212' : 'none',
                fontFamily: 'Josefin Sans',
                fontWeight: 'bold'
              }}
            >
              Contact Us
            </RouterLink>
            <RouterLink
              to="/personalized-workout"
              style={{
                textDecoration: 'none',
                color: darkMode ? '#fff' : '#3A1212',
                borderBottom: location.pathname === '/personalized-workout' ? '3px solid #3A1212' : 'none',
                fontFamily: 'Josefin Sans',
                fontWeight: 'bold'
              }}
            >
              Personalized Workout
            </RouterLink>
          </Stack>
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
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;