import React, { useState, useCallback } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';

const ChatPage = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const formatMessage = (text) => {
    // Replace **text** with <strong>text</strong> for bold formatting
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace ### headings with larger, styled headings
    formattedText = formattedText.replace(/###\s*(.*?)$/gm, (match, p1) => 
      `<h3 style="font-size: 1.25em; font-weight: bold; margin: 0.5em 0;">${p1}</h3>`
    );
    
    // Add line breaks for paragraphs
    return formattedText.split('\n').map((paragraph, index) => (
      <React.Fragment key={index}>
        <span dangerouslySetInnerHTML={{ __html: paragraph }} />
        {index < formattedText.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const handleSendMessage = useCallback(async () => {
    if (!message.trim()) return;

    const newMessage = { text: message, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setMessage('');
    setIsLoading(true);
    console.log('Set loading to true'); // Debug log

    try {
      console.log('Sending request to API'); // Debug log
      const prompt = `You are a fitness AI bot with over 50 years of training and coaching experience in the health and fitness industry. Provide a comprehensive and detailed response to the following user query: "${message}"`;

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a highly experienced fitness coach providing detailed and comprehensive fitness advice.' },
            { role: 'user', content: prompt }
          ],
          max_tokens: 2000,
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
      console.log('Received response from API'); // Debug log

      const botMessage = { text: response.data.choices[0].message.content.trim(), sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error.response ? error.response.data : error.message);
      const errorMessage = { text: 'Sorry, something went wrong. Please try again later.', sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      // Introduce a slight delay before setting isLoading to false
      setTimeout(() => {
        setIsLoading(false);
        console.log('Set loading to false'); // Debug log
      }, 500); // 500ms delay
    }
  }, [message]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
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
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
            <CircularProgress size={30} sx={{ color: '#0078d4' }} />
            <Typography variant="body1" sx={{ marginLeft: '10px', color: '#ffffff' }}>
              Processing your question...
            </Typography>
          </Box>
        )}
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
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
            disabled={isLoading}
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
