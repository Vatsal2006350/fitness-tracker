import React, { useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

import ExerciseCard from './ExerciseCard';
import BodyPart from './BodyPart';

const HorizontalScrollbar = ({ data, setBodyPart, bodyPart, isBodyParts }) => {
  const scrollContainer = useRef(null);

  const scroll = (direction) => {
    if (scrollContainer.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainer.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <Box position="relative" width="100%" overflow="hidden">
      <Box
        ref={scrollContainer}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          overflowX: 'hidden',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          padding: '20px 0',
        }}
      >
        {data.map((item) => (
          <Box key={item.id || item} m="0 40px">
            {isBodyParts ? (
              <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} />
            ) : (
              <ExerciseCard exercise={item} />
            )}
          </Box>
        ))}
      </Box>

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

export default HorizontalScrollbar;
