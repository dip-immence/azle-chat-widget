import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ProfileForm from '../../sections/settings/ProfileForm';

const HelloHome = () => {
  const theme = useTheme();
  return (
    <>
      <Stack direction="row" sx={{ width: '100vh', backgroundColor: '#7d7d7d14' }}>
        <Box
          sx={{
            height: '100vh',
            width: '100vw',
            borderRadius: '1rem',
          }}
        >
          <Stack sx={{ p: 7, color: theme.palette.common.black }}>
            <Box sx={{ mb: 7 }}>
              <Typography variant="h2">Hi there 👋</Typography>
              <Typography variant="h2">How can we help?</Typography>
            </Box>
            <ProfileForm />
          </Stack>
        </Box>
      </Stack>
    </>
  );
};

export default HelloHome;
