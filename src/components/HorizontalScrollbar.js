import React, { useRef } from 'react';
import { Stack, Typography, Box, IconButton } from '@mui/material';
import Icon from '../assets/icons/gym.png';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

const BodyPart = ({ item, setBodyPart, bodyPart }) => (
  <Stack
    type="button"
    alignItems="center"
    justifyContent="center"
    className="bodyPart-card"
    sx={{
      borderTop: bodyPart === item ? '4px solid #FF2625' : '1px solid black',
      borderRight: '1px solid black',
      borderBottom: '1px solid black',
      borderLeft: '1px solid black',
      background: '#fff',
      borderRadius: '0 0 20px 20px',
      width: '270px',
      height: '282px',
      cursor: 'pointer',
      gap: '47px',
      margin: '0 10px',
      flexShrink: 0,
      '&:hover': {
        borderTop: '4px solid #FF2625',
      }
    }}
    onClick={() => {
      setBodyPart(item);
      window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
    }}
  >
    <img src={Icon} alt="dumbbell" style={{ width: '40px', height: '40px' }} />
    <Typography fontSize="24px" fontWeight="bold" fontFamily="Alegreya" color="#3A1212" textTransform="capitalize">
      {item}
    </Typography>
  </Stack>
);

const BodyPartList = ({ data, bodyPart, setBodyPart }) => {
  const scrollContainer = useRef(null);

  const scroll = (direction) => {
    if (scrollContainer.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainer.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Box position="relative" width="100%" overflow="hidden">
      <Stack
        ref={scrollContainer}
        direction="row"
        sx={{
          overflowX: 'auto',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          padding: '20px 40px',
        }}
      >
        {data.map((item) => (
          <BodyPart key={item.id || item} item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} />
        ))}
      </Stack>
      <IconButton
  onClick={() => scroll('left')}
  sx={{
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
  }}
>
  <ArrowBackIos sx={{ color: '#FF0000' }} />
</IconButton>

<IconButton
  onClick={() => scroll('right')}
  sx={{
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' },
  }}
>
  <ArrowForwardIos sx={{ color: '#FF0000' }} />
</IconButton>
    </Box>
  );
};

export default BodyPartList;