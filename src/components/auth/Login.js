import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Paper,
  Link,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import { Visibility, VisibilityOff, Email } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const Login = ({ setUser, onClose, onSwitchToSignUp }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetEmailError, setResetEmailError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = formData;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        onClose();
        navigate('/');
      })
      .catch((error) => {
        setError('Incorrect email or password. Please try again.');
      });
  };

  const handleForgotPasswordOpen = () => {
    setOpenForgotPassword(true);
    setResetEmail(formData.email);
  };

  const handleForgotPasswordClose = () => {
    setOpenForgotPassword(false);
    setResetEmail('');
    setResetEmailError('');
  };

  const handleResetEmailChange = (event) => {
    setResetEmail(event.target.value);
    setResetEmailError('');
  };

  const handleSendResetEmail = () => {
    if (!resetEmail) {
      setResetEmailError('Please enter your email address.');
      return;
    }

    sendPasswordResetEmail(auth, resetEmail)
      .then(() => {
        alert('Password reset email sent. Please check your inbox.');
        handleForgotPasswordClose();
      })
      .catch((error) => {
        setResetEmailError('Error sending password reset email. Please try again.');
      });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper elevation={6} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <LockOutlinedIcon sx={{ m: 1, bgcolor: 'secondary.main', p: 2, borderRadius: '50%', color: 'white' }} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            error={!!error}
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
            value={formData.password}
            onChange={handleChange}
            error={!!error}
            helperText={error}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link component="button" variant="body2" onClick={handleForgotPasswordOpen}>
              Forgot password?
            </Link>
          </Box>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link component="button" variant="body2" onClick={onSwitchToSignUp}>
              Don't have an account? Sign Up
            </Link>
          </Box>
        </Box>
      </Paper>

      <Dialog 
        open={openForgotPassword} 
        onClose={handleForgotPasswordClose} 
        PaperProps={{ 
          style: { borderRadius: 15, padding: '20px' } 
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: 'primary.main' }}>
          Reset Your Password
        </DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center" mb={3}>
            <Email sx={{ fontSize: 50, color: 'primary.main' }} />
          </Box>
          <DialogContentText sx={{ mb: 3, textAlign: 'center' }}>
            Enter your email address and we'll send you a link to reset your password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="resetEmail"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={resetEmail}
            onChange={handleResetEmailChange}
            error={!!resetEmailError}
            helperText={resetEmailError}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', flexDirection: 'column', gap: 1 }}>
          <Button 
            onClick={handleSendResetEmail} 
            variant="contained" 
            fullWidth
            sx={{ borderRadius: 20, textTransform: 'none' }}
          >
            Send Reset Email
          </Button>
          <Button 
            onClick={handleForgotPasswordClose} 
            color="inherit"
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Login;