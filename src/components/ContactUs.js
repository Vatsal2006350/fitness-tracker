import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack, Paper } from '@mui/material';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('https://us-central1-your-project-id.cloudfunctions.net/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        alert('Your message has been sent!');  // Handle success as needed
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again later.');  // Handle error as needed
    }
  };

  return (
    <Box sx={{ mt: '50px', p: '20px' }}>
      <Typography 
        variant="h3" 
        mb="20px" 
        textAlign="center"
        sx={{ fontWeight: 'bold', fontFamily: 'Arial' }}  // Customize font and weight here
      >
        Contact Us
      </Typography>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ alignItems: 'flex-start' }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3, 
            border: '2px solid red', 
            flexGrow: 1, 
            maxWidth: '600px',
            mx: 'auto',
            mt: { xs: '0', md: '20px' }
          }}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'red',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'red',
                  },
                }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'red',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'red',
                  },
                }}
              />
              <TextField
                label="Subject"
                variant="outlined"
                fullWidth
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'red',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'red',
                  },
                }}
              />
              <TextField
                label="Message"
                variant="outlined"
                multiline
                rows={4}
                fullWidth
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'red',
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: 'red',
                  },
                }}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
              >
                Send
              </Button>
            </Stack>
          </form>
        </Paper>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3, 
            border: '2px solid red', 
            maxWidth: '300px',
            mt: { xs: '20px', md: '0' },
            textAlign: 'center'
          }}
        >
          <Typography 
            variant="h6" 
            sx={{ fontWeight: 'bold', fontFamily: 'Arial', mb: 2 }}
          >
            Contact Details
          </Typography>
          <Typography variant="body1">
            <strong>Phone:</strong> +971 50 806 2831
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> svatsal64@gmail.com
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
};

export default ContactUs;
