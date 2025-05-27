import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../features/auth/authThunks';
import { TextField, Button, Box, Typography, Alert, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { clearAuthState } from '../../features/auth/authSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, isRegistered } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  useEffect(() => {
    if (isRegistered) {
      toast.success('User registered successfully!');
      dispatch(clearAuthState());
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }
  }, [isRegistered, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  return (
    <Box maxWidth={400} mx="auto" mt={10} p={3} boxShadow={3} borderRadius={2}>
      <Typography variant="h5" mb={2}>Register</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label="Name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          name="email"
          label="Email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </form>

      <Typography mt={2} variant="body2" align="center">
        Already have an account?{' '}
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate('/login')}
          sx={{ color: 'blue', textTransform: 'none' }}
        >
          Login
        </Link>
      </Typography>

      <ToastContainer />
    </Box>
  );
};

export default Register;
