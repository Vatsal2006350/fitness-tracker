import React from 'react';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import Logo from '../assets/images/Logo-1.png';

const Footer = () => {
  const theme = useTheme(); // Access the current theme

  const currentYear = new Date().getFullYear();

  return (
    <Box mt="40px" bgcolor={theme.palette.background.default} color={theme.palette.text.primary} py="24px" textAlign="center">
      <Stack gap="5px" alignItems="center">
        <img src={Logo} alt="logo" className="responsive-logo" />
        <Typography variant="body2">
          ©{currentYear} Fitness Freak All Rights Reserved.
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;
