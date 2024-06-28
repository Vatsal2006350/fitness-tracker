import React, { useState, useRef } from 'react';
import { Box, Typography, TextField, Button, Stack, Paper, Container, Grid } from '@mui/material';
import emailjs from 'emailjs-com'; 
import '../assets/css/ContactUs.css';
import '../App.css'

const ContactUs = () => {
  const formInitialDetails = {
    from_name: '',
    from_email: '',
    subject: '',
    message: ''
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState('Send');
  const [status, setStatus] = useState({});

  const form = useRef();

  const onFormUpdate = (key, value) => {
    setFormDetails({
      ...formDetails,
      [key]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonText('Sending...');

    try {
      const result = await emailjs.sendForm(
        'service_rbtsw68',
        'template_v158ado',
        form.current,
        'hTBYd6aOdPZpStIVU'
      );

      console.log(result.text);
      setStatus({
        success: true,
        message: 'Message sent successfully!'
      });
      setButtonText('Send');
      setFormDetails(formInitialDetails);
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus({
        success: false,
        message: `Failed to send message: ${error.text}`
      });
      setButtonText('Send');
    }
  };

  return (
    <Box className="outerWrapper">
      <Container className="wrapper">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper className="contacts" elevation={3}>
              <Typography variant="h3" align="center" gutterBottom fontWeight="bold" style={{ fontFamily: 'Arial', color: 'black' }}>
                LET'S CONNECT
              </Typography>
              <Typography variant="body1" className="description" align="center">
              Feel free to connect with me for collaborations focused on promoting health awareness, providing personalized tips, and sharing my experiences. I'm always open to engage with you on these topics! 
              </Typography>
              <Box className="info">
                <br></br>
                <Typography fontWeight='bold' variant="body1" align="center">Email: svatsal@umich.edu</Typography>
                <Typography fontWeight='bold' variant="body1" align="center">Phone: (+971) 50-806-2831</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className="form" elevation={3}>
              <Typography variant="h3" align="center" fontWeight={700} gutterBottom sx={{  fontWeight: 'bold', fontFamily: 'Arial' , color: 'black'}} >
                CONTACT US
              </Typography>
              <form ref={form} onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    required
                    name="from_name"
                    value={formDetails.from_name}
                    onChange={(e) => onFormUpdate('from_name', e.target.value)}
                    InputProps={{ style: { fontFamily: 'Arial' } }}
                  />
                  <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    required
                    name="from_email"
                    value={formDetails.from_email}
                    onChange={(e) => onFormUpdate('from_email', e.target.value)}
                    InputProps={{ style: { fontFamily: 'Arial' } }}
                  />
                  <TextField
                    label="Subject"
                    variant="outlined"
                    fullWidth
                    required
                    name="subject"
                    value={formDetails.subject}
                    onChange={(e) => onFormUpdate('subject', e.target.value)}
                    InputProps={{ style: { fontFamily: 'Arial' } }}
                  />
                  <TextField
                    label="Message"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    required
                    name="message"
                    value={formDetails.message}
                    onChange={(e) => onFormUpdate('message', e.target.value)}
                    InputProps={{ style: { fontFamily: 'Arial' } }}
                  />
                  <Button
                    variant="contained"
                    type="submit"
                    className="control"
                  >
                    <span>{buttonText}</span>
                  </Button>
                </Stack>
              </form>
              {status.message && 
                <Typography className={status.success ? 'success' : 'danger'}>
                  {status.message}
                </Typography>
              }
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactUs;