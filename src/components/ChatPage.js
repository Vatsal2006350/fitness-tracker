import React, { useState } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography, Paper } from '@mui/material';
import axios from 'axios';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = { text: message, sender: 'user' };
    setMessages([...messages, newMessage]);
    setMessage('');

    try {
      const prompt = `You are a fitness AI bot with over 50 years of training and coaching experience in the health and fitness industry. Provide a comprehensive and detailed response to the following user query: "${message}"`;

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a highly experienced fitness coach providing detailed and comprehensive fitness advice.' },
            { role: 'user', content: prompt }
          ],
          max_tokens: 1000, // Increased to allow for longer responses
          n: 1,
          stop: null,
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.REACT_APP_OPEN_API_KEY}`,
          },
        }
      );

      const botMessage = { text: response.data.choices[0].message.content.trim(), sender: 'bot' };
      setMessages([...messages, newMessage, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error.response ? error.response.data : error.message);
      const errorMessage = { text: 'Sorry, something went wrong. Please try again later.', sender: 'bot' };
      setMessages([...messages, newMessage, errorMessage]);
    }
  };

  const formatMessage = (text) => {
    // Replace **text** with <strong>text</strong> for bold formatting
    const formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Add line breaks for paragraphs
    return formattedText.split('\n').map((paragraph, index) => (
      <React.Fragment key={index}>
        <span dangerouslySetInnerHTML={{ __html: paragraph }} />
        {index < formattedText.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <Box
      sx={{
        padding: '20px',
        backgroundColor: '#1e1e1e',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        color: '#ffffff',
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Roboto, sans-serif', color: '#ffffff' }}>
        Chat with our Fitness Bot
      </Typography>
      <Paper
        sx={{
          width: '100%',
          maxWidth: '600px',
          backgroundColor: '#2a2a2a',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
        }}
      >
        <List sx={{ maxHeight: '60vh', overflowY: 'auto', marginBottom: '20px' }}>
          {messages.map((msg, index) => (
            <ListItem key={index} sx={{ justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
              <ListItemText
                primary={formatMessage(msg.text)}
                sx={{
                  textAlign: msg.sender === 'user' ? 'right' : 'left',
                  backgroundColor: msg.sender === 'user' ? '#0078d4' : '#4a4a4a',
                  padding: '10px',
                  borderRadius: '10px',
                  color: '#ffffff',
                  maxWidth: '80%',
                  '& .MuiTypography-root': {
                    whiteSpace: 'pre-wrap',
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{
              backgroundColor: '#3a3a3a',
              borderRadius: '5px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#0078d4',
                },
                '&:hover fieldset': {
                  borderColor: '#005bb5',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#0078d4',
                },
                '& input': {
                  color: '#ffffff',
                },
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendMessage}
            sx={{
              backgroundColor: '#0078d4',
              '&:hover': {
                backgroundColor: '#005bb5',
              },
            }}
          >
            Send
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatPage;