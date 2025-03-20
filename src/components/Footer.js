import React, { useState } from 'react';
import { Box, Container, Grid, Typography, IconButton, TextField, Button, Divider, useTheme, Alert, Fade } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../assets/images/Logo-1.png';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';

const Footer = ({ darkMode }) => {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();

  // Colors based on dark mode
  const bgColor = darkMode ? '#1A1A1A' : '#ffffff';
  const textColor = darkMode ? '#fff' : '#333333';
  const subtextColor = darkMode ? '#ABABAB' : '#666666';
  const accentColor = '#DC1414'; // Keep the red accent color in both modes
  const dividerColor = darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  const fieldBgColor = darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)';

  // State for newsletter subscription
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  // Handle newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      // Reset the subscription message after 5 seconds
      setTimeout(() => {
        setSubscribed(false);
      }, 5000);
    }
  };

  return (
    <Box 
      sx={{ 
        width: '100%',
        backgroundColor: bgColor,
        color: textColor,
        pt: 6,
        pb: 3,
        mt: 8,
        fontFamily: 'Roboto, sans-serif',
        borderTop: `1px solid ${dividerColor}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and about section */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
              <img 
                src={Logo} 
                alt="Fitness Freak" 
                style={{ 
                  width: '100%',
                  maxWidth: '220px',
                  height: 'auto',
                  marginBottom: '1rem'
                }} 
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  color: subtextColor,
                  mb: 2,
                  textAlign: { xs: 'center', md: 'left' },
                  maxWidth: '300px',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '16px',
                }}
              >
                Transform your body and mind with our comprehensive fitness solutions. Join the community of fitness enthusiasts today.
              </Typography>
              <Box sx={{ mt: 1, mb: 3 }}>
                <IconButton 
                  aria-label="linkedin" 
                  sx={{ color: accentColor, '&:hover': { color: textColor }, mr: 1 }}
                  component="a"
                  href="https://www.linkedin.com/in/vatsal-shah0914/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton 
                  aria-label="instagram" 
                  sx={{ color: accentColor, '&:hover': { color: textColor }, mr: 1 }}
                  component="a"
                  href="https://www.instagram.com/fitness_freak_/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton 
                  aria-label="youtube" 
                  sx={{ color: accentColor, '&:hover': { color: textColor }, mr: 1 }}
                  component="a"
                  href="https://www.youtube.com/@fitnessfreak3075"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <YouTubeIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>

          {/* Quick Links - matching navbar links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              mb: 3, 
              color: textColor, 
              textAlign: { xs: 'center', md: 'left' },
              fontFamily: 'Roboto, sans-serif',
              fontSize: '18px'
            }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
              <Box sx={{ mb: 1.2 }}>
                <RouterLink to="/" style={{ color: subtextColor, textDecoration: 'none', fontFamily: 'Roboto, sans-serif', fontSize: '16px' }} className="footer-link">
                  Home
                </RouterLink>
              </Box>
              <Box sx={{ mb: 1.2 }}>
                <RouterLink to="/chat" style={{ color: subtextColor, textDecoration: 'none', fontFamily: 'Roboto, sans-serif', fontSize: '16px' }} className="footer-link">
                  Chat
                </RouterLink>
              </Box>
              <Box sx={{ mb: 1.2 }}>
                <RouterLink to="/personalized-workout" style={{ color: subtextColor, textDecoration: 'none', fontFamily: 'Roboto, sans-serif', fontSize: '16px' }} className="footer-link">
                  Personalized Workout
                </RouterLink>
              </Box>
              <Box sx={{ mb: 1.2 }}>
                <RouterLink to="/pricing" style={{ color: subtextColor, textDecoration: 'none', fontFamily: 'Roboto, sans-serif', fontSize: '16px' }} className="footer-link">
                  Pricing
                </RouterLink>
              </Box>
              <Box>
                <RouterLink to="/contact" style={{ color: subtextColor, textDecoration: 'none', fontFamily: 'Roboto, sans-serif', fontSize: '16px' }} className="footer-link">
                  Contact Us
                </RouterLink>
              </Box>
            </Box>
          </Grid>

          {/* Programs */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              mb: 3, 
              color: textColor, 
              textAlign: { xs: 'center', md: 'left' },
              fontFamily: 'Roboto, sans-serif',
              fontSize: '18px'
            }}>
              Programs
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
              <Typography sx={{ 
                color: subtextColor, 
                mb: 1.5, 
                fontFamily: 'Roboto, sans-serif',
                fontSize: '16px'
              }}>
                Weight Loss
              </Typography>
              <Typography sx={{ 
                color: subtextColor, 
                mb: 1.5, 
                fontFamily: 'Roboto, sans-serif',
                fontSize: '16px'
              }}>
                Muscle Building
              </Typography>
              <Typography sx={{ 
                color: subtextColor, 
                mb: 1.5, 
                fontFamily: 'Roboto, sans-serif',
                fontSize: '16px'
              }}>
                Strength Training
              </Typography>
              <Typography sx={{ 
                color: subtextColor, 
                mb: 1.5, 
                fontFamily: 'Roboto, sans-serif',
                fontSize: '16px'
              }}>
                HIIT Workouts
              </Typography>
              <Typography sx={{ 
                color: subtextColor, 
                fontFamily: 'Roboto, sans-serif',
                fontSize: '16px'
              }}>
                Yoga & Flexibility
              </Typography>
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ 
              fontWeight: 600, 
              mb: 2, 
              color: textColor, 
              textAlign: { xs: 'center', md: 'left' },
              fontFamily: 'Roboto, sans-serif',
              fontSize: '18px'
            }}>
              Join Our Newsletter
            </Typography>
            <Typography variant="body2" sx={{ 
              color: subtextColor, 
              mb: 2, 
              textAlign: { xs: 'center', md: 'left' },
              fontFamily: 'Roboto, sans-serif',
              fontSize: '16px'
            }}>
              Subscribe to get exclusive updates, workout tips, and special offers!
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
              <form onSubmit={handleSubscribe} style={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: '10px' }}>
                <TextField
                  fullWidth
                  placeholder="Your email address"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="small"
                  sx={{
                    backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '4px',
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: dividerColor,
                      },
                      '&:hover fieldset': {
                        borderColor: accentColor,
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: textColor,
                      fontFamily: 'Roboto, sans-serif',
                    }
                  }}
                />
                <Button 
                  type="submit"
                  variant="contained" 
                  startIcon={<FitnessCenterIcon />} 
                  sx={{ 
                    height: '40px',
                    borderRadius: '4px',
                    boxShadow: 'none',
                    background: accentColor,
                    minWidth: '120px',
                    '&:hover': {
                      background: '#b40000',
                      transform: 'translateY(-2px)'
                    },
                    fontFamily: 'Roboto, sans-serif',
                  }}
                >
                  Subscribe
                </Button>
              </form>
              
              {/* Newsletter subscription confirmation */}
              {subscribed && (
                <Fade in={subscribed}>
                  <Alert 
                    severity="success" 
                    sx={{ 
                      mt: 2, 
                      width: '100%',
                      borderRadius: '4px',
                      fontFamily: 'Roboto, sans-serif'
                    }}
                  >
                    Thanks for subscribing! You'll receive our latest fitness tips and updates.
                  </Alert>
                </Fade>
              )}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: dividerColor, my: 3 }} />
        
        {/* Bottom section */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: subtextColor,
                textAlign: { xs: 'center', md: 'left' },
                fontSize: '0.875rem',
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              ©{currentYear} Fitness Freak. All Rights Reserved.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
              <Box>
                <RouterLink to="/contact" style={{ color: subtextColor, fontSize: '0.875rem', textDecoration: 'none', fontFamily: 'Roboto, sans-serif' }} className="footer-link">
                  Contact Us
                </RouterLink>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
