import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const LoadingScreen = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        background: '#beacac36',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingScreen;
