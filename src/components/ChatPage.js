import React, { useState, useCallback, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Spinner, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/ChatPage.css';

const ChatPage = ({ darkMode }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCards, setShowCards] = useState(true);

  const formatMessage = (text) => {
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formattedText = formattedText.replace(/###\s*(.*?)$/gm, (match, p1) => 
      `<h3 style="font-size: 1.25em; font-weight: bold; margin: 0.5em 0;">${p1}</h3>`
    );
    return formattedText.split('\n').map((paragraph, index) => (
      <React.Fragment key={index}>
        <span dangerouslySetInnerHTML={{ __html: paragraph }} />
        {index < formattedText.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  const handleSendMessage = useCallback(async (promptMessage = message) => {
    if (!promptMessage.trim()) return;

    const newMessage = { text: promptMessage, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setMessage('');
    setIsLoading(true);
    setShowCards(false);

    try {
      const prompt = `You are a fitness AI bot with over 50 years of training and coaching experience in the health and fitness industry. Provide a comprehensive and detailed response to the following user query: "${promptMessage}"`;

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

      const botMessage = { text: response.data.choices[0].message.content.trim(), sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      const errorMessage = { text: 'Sorry, something went wrong. Please try again later.', sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  }, [message]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const startNewConversation = () => {
    setMessages([]);
    setShowCards(true);
  };

  useEffect(() => {
    if (messages.length === 0) {
      setShowCards(true);
    }
  }, [messages]);

  return (
    <Container fluid className={`min-vh-100 d-flex flex-column align-items-center py-4 ${darkMode ? 'dark-mode' : ''}`}>
      <h1 className="mb-4">Chat with our Fitness Bot</h1>
      <Button variant="primary" onClick={startNewConversation} className="mb-4">Start New Conversation</Button>
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6}>
          {showCards && (
            <Row className="mb-4">
              <Col>
                <Card className="suggestion-card" onClick={() => handleSendMessage('What are some good exercises for beginners?')}>
                  <Card.Body>
                    <Card.Title>Beginner Exercises</Card.Title>
                    <Card.Text>What are some good exercises for beginners?</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="suggestion-card" onClick={() => handleSendMessage('Can you suggest a diet plan for weight loss?')}>
                  <Card.Body>
                    <Card.Title>Diet Plan</Card.Title>
                    <Card.Text>Can you suggest a diet plan for weight loss?</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="suggestion-card" onClick={() => handleSendMessage('How can I improve my running endurance?')}>
                  <Card.Body>
                    <Card.Title>Running Endurance</Card.Title>
                    <Card.Text>How can I improve my running endurance?</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
          <Card className="mb-4" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            <ListGroup variant="flush">
              {messages.map((msg, index) => (
                <ListGroup.Item 
                  key={index} 
                  className={`d-flex justify-content-${msg.sender === 'user' ? 'end' : 'start'} ${msg.sender === 'user' ? 'bg-primary' : 'bg-light'} ${darkMode ? 'dark-mode-message' : ''}`}
                >
                  <div className="p-2 rounded" style={{ maxWidth: '80%' }}>
                    {formatMessage(msg.text)}
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
          {isLoading && (
            <Alert variant="info" className="d-flex align-items-center mb-4">
              <Spinner animation="border" size="sm" className="me-2" />
              Processing your question...
            </Alert>
          )}
          <Form className="d-flex gap-2">
            <Form.Control
              type="text"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className={`${darkMode ? 'bg-dark text-light' : ''}`}
            />
            <Button variant="primary" onClick={handleSendMessage} disabled={isLoading}>
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
