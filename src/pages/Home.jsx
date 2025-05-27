import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f5f5f7"
    >
      <Typography variant="h2" gutterBottom>
        Welcome to TaskQue
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Manage your tasks efficiently with our intuitive tool
      </Typography>
      <Box mt={4}>
        <Button variant="contained" color="primary" onClick={() => navigate('/login')} sx={{ mr: 2 }}>
          Login
        </Button>
        <Button variant="outlined" color="primary" onClick={() => navigate('/register')}>
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
