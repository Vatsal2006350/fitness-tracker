import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import HeroBannerImage from '../assets/images/banner.png';

const HeroBanner = () => {
  return (
    <Box
      sx={{
        mt: { lg: '212px', xs: '70px' },
        ml: { sm: '50px' },
        position: 'relative',
        p: '20px',
      }}
    >
      <Typography color="#FF2625" fontWeight="600" fontSize="26px">
        Fitness Tracker
      </Typography>
      <Typography fontWeight={700} sx={{ fontSize: { lg: '44px', xs: '40px' }, fontWeight: 'bold', fontFamily: 'Arial' }} mb="15px" mt="20px">
        Push, Persevere, <br /> And Achieve
      </Typography>
      <Typography fontSize="22px" lineHeight="35px" mb={8}>
        Discover the most effective exercises <br /> tailored just for you
      </Typography>
      <Button variant="contained" color="error" href="#exercises" sx={{ backgroundColor: '#FF2625', padding: '12px 20px' }}>
        Explore Exercises
      </Button>
      <Typography fontWeight={600} color="#FF2625"  sx={{ opacity: 0.1, display: { lg: 'block', xs: 'none' } }} fontSize="200px">
        Workout
      </Typography>
      <img
        src={HeroBannerImage}
        alt="banner"
        className='hero-banner-img'
        style={{
          width: '80%',
          maxWidth: '600px',
          height: 'auto',
          position: 'absolute',
          right: '20px',
          bottom: '-50px',
          top: '130px',
          border: '2px solid #000000',
          borderRadius: '8px',
        }}
      />
    </Box>
  );
};

export default HeroBanner;
