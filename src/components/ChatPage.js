import React, { useState } from 'react';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
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
      const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: message,
        max_tokens: 150,
        n: 1,
        stop: null,
        temperature: 0.7,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer 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`, // Replace with your OpenAI API key
        },
      });
  
      const botMessage = { text: response.data.choices[0].text.trim(), sender: 'bot' };
      setMessages([...messages, newMessage, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error.response ? error.response.data : error.message);
      const errorMessage = { text: 'Sorry, something went wrong. Please try again later.', sender: 'bot' };
      setMessages([...messages, newMessage, errorMessage]);
    }
  };
  
  

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Chat with us</Typography>
      <List sx={{ maxHeight: '60vh', overflowY: 'auto', marginBottom: '20px' }}>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText 
              primary={msg.text} 
              sx={{ 
                textAlign: msg.sender === 'user' ? 'right' : 'left',
                backgroundColor: msg.sender === 'user' ? '#cceeff' : '#e0e0e0',
                padding: '10px',
                borderRadius: '10px',
                display: 'inline-block',
                maxWidth: '80%',
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
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatPage;
