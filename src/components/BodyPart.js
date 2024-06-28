import React from 'react';
import { Stack, Typography } from '@mui/material';
import Icon from '../assets/icons/gym.png';

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

export default BodyPart;