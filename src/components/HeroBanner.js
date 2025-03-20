import React from 'react';
import { Box, Typography, Button, useTheme } from '@mui/material';
import HeroBannerImage from '../assets/images/banner.png';

const HeroBanner = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        px: { xs: 2, sm: 4, md: 8 },
        pt: { xs: 4, md: 0 },
        overflow: 'hidden',
      }}
    >
      {/* Background "Workout" Text */}
      <Typography
        sx={{
          position: 'absolute',
          right: { xs: '-10%', sm: '-5%', md: '0%' },
          bottom: { xs: '8%', md: '-4%' },
          fontSize: { xs: '100px', sm: '140px', md: '220px' },
          fontWeight: 800,
          color: '#DC1414',
          opacity: { xs: 0.06, md: 0.08 },
          display: 'block',
          zIndex: 0,
          letterSpacing: '0.05em',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
          transform: 'rotate(-2deg)',
          fontFamily: '"Inter", sans-serif',
          width: '100%',
          textAlign: 'right',
          paddingRight: { xs: '5%', md: '8%' },
        }}
      >
        Workout
      </Typography>
      
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '600px',
          mt: { xs: 4, md: 0 },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#DC1414',
            fontWeight: 600,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            mb: 2,
          }}
        >
          Fitness Tracker
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
            fontWeight: 800,
            lineHeight: 1.1,
            mb: 3,
            background: 'linear-gradient(45deg, #DC1414 30%, #FF4B4B 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Push, Persevere, <br /> And Achieve
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.text.secondary,
            mb: 4,
            maxWidth: '500px',
          }}
        >
          Discover the most effective exercises tailored just for you
        </Typography>
        <Button
          variant="contained"
          href="#exercises"
          sx={{
            backgroundColor: '#DC1414',
            color: '#fff',
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            '&:hover': {
              backgroundColor: '#B40000',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 16px rgba(220, 20, 20, 0.3)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          Explore Exercises
        </Button>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          right: { xs: '-50px', sm: '-25px', md: '40px', lg: '60px' },
          top: '50%',
          transform: 'translateY(-30%)',
          width: { xs: '100%', md: '45%', lg: '40%' },
          height: '100%',
          display: { xs: 'none', sm: 'block' },
          zIndex: 1,
          overflow: 'visible',
        }}
      >
        <img
          src={HeroBannerImage}
          alt="banner"
          style={{
            width: '100%',
            height: 'auto',
            maxWidth: '600px',
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-30%)',
            objectFit: 'contain',
            borderRadius: '24px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            filter: 'drop-shadow(0 10px 20px rgba(220, 20, 20, 0.1))',
          }}
          className="hero-banner-img"
        />
      </Box>
    </Box>
  );
};

export default HeroBanner;
