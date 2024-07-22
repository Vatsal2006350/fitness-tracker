import React, { useState } from 'react';
import { Box, Button, Container, CssBaseline, Paper, TextField, Typography, InputAdornment, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import { signInWithEmail, signUpWithEmail, signInWithGoogle } from '../../Firebase'; // Adjust import path

const Login = ({ onSwitchToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      setError(error.message);
    }
  };

  const handlePasswordVisibilityToggle = () => {
    setShowPassword(!showPassword);
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setError(null);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper elevation={3} sx={{ padding: 3, marginTop: 8 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <LockOutlinedIcon />
          <Typography component="h1" variant="h5">
            {isSignUp ? 'Sign Up' : 'Login'}
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
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
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={handlePasswordVisibilityToggle} sx={{ minWidth: 0 }}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              {isSignUp ? 'Sign Up' : 'Login'}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              sx={{ mb: 2 }}
            >
              Sign in with Google
            </Button>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Link component="button" variant="body2" onClick={toggleSignUp}>
                {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign up"}
              </Link>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;