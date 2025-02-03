import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { signup } from '../redux/features/auth/authSlice';
import {
  TextField,
  Button,
  Typography,
  Container,
  CircularProgress,
  Alert,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import loginImage from '/images/loginImage.png';
import logo from '/images/headerlogo.png';
const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#EB5A3C',
    },
  },
  '& .MuiInputLabel-root': {
    '&.Mui-focused': {
      color: '#EB5A3C',
    },
  },
});

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [access, setAccess] = useState('');
  const [account, setAccount] = useState('');
  const dispatch = useDispatch();
  const { error, user, isAuthenticated, loading } = useSelector(
    (state) => state.auth
  ); // Assuming you store user data in state.auth
  const navigate = useNavigate(); // Get the navigate function

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signup({ email, name, password, access, account }))
    .then(() => {
      // The navigate will be handled by the useEffect
    })
    .catch((error) => {
      console.error("Login failed:", error);
    });
};

   useEffect(() => {
    if (isAuthenticated) {
      navigate('/user/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: '100vh', display: 'flex' }}
    >
      {/* Left Container (Login Form) */}
      <Container
        sx={{
          width: { xs: '100%', md: '50%' },
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            width: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: 3,
            borderRadius: 2,
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Logo and "Farben" Text */}
          <div className="flex items-center mb-4">
            <img
              src={logo}
              alt="Logo"
              style={{
                width: '70px',
                height: '70px',
                marginRight: '8px',
                marginTop: '-10px',
              }}
            />
            <Typography
              variant="h2"
              component="span"
              fontWeight={500}
              fontSize="2rem"
              sx={{
                display: 'flex',
                alignItems: 'center',
                lineHeight: 1,
              }}
            >
              <span style={{ marginLeft: '-30px' }}>arben</span>
            </Typography>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mt: 2, width: '100%' }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: '100%' }}
          >
            <StyledTextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <StyledTextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <StyledTextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <StyledTextField
              margin="normal"
              required
              fullWidth
              id="access"
              label="Access"
              name="access"
              autoComplete="access"
              autoFocus
              value={access}
              onChange={(e) => setAccess(e.target.value)}
              className="bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <StyledTextField
              margin="normal"
              required
              fullWidth
              id="account"
              label="Account"
              name="account"
              autoComplete="account"
              autoFocus
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="bg-gray-100 border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <button
              type="submit"
              fullWidth
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
              className="w-full px-4 py-2 text-white bg-primary hover:bg-primary/50 rounded-lg transition-colors duration-300"
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
            </button>
          </Box>
        </Box>
      </Container>

      {/* Right Container (Image) */}
      <Container
        sx={{
          width: { xs: '0%', md: '50%' },
          height: '100%',
          display: { xs: 'none', md: 'block' },
        }}
      >
        <img
          src={loginImage}
          alt="Login"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Container>
    </Container>
  );
    };

export default Signup;  