import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { Box, CssBaseline, createTheme, ThemeProvider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Container, Paper, Typography } from '@mui/material';
import { Analytics } from '@vercel/analytics/react';
import PricingCard from "./components/PricingCard";
import "./assets/css/PricingApp.css";
import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactUs from './components/ContactUs';
import PersonalizedWorkout from './components/PersonalizedWorkout';
import ChatPage from './components/ChatPage';
import DarkModeToggle from './components/DarkModeToggle';
import { auth } from './Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageTitle from './components/PageTitle';


const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectMonthly, setSelectMonthly] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoggedIn(!!currentUser);
    });

    return () => unsubscribe();
  }, []);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#DC1414',
        light: '#FF4B4B',
        dark: '#B40000',
      },
      background: {
        default: '#121212',
        paper: '#1E1E1E',
      },
      text: {
        primary: '#FFFFFF',
        secondary: 'rgba(255, 255, 255, 0.7)',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 800,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontWeight: 600,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 30,
            padding: '10px 20px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#DC1414',
        light: '#FF4B4B',
        dark: '#B40000',
      },
      background: {
        default: '#FFFFFF',
        paper: '#F8F9FA',
      },
      text: {
        primary: '#1A1A1A',
        secondary: 'rgba(0, 0, 0, 0.6)',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 800,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontWeight: 700,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontWeight: 600,
      },
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 30,
            padding: '10px 20px',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
          },
        },
      },
    },
  });

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.REACT_APP_OPEN_AI_API_KEY}`,
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleGetStarted = () => {
    navigate('/');
    setShowPopup(true);
  };

  const handleManageSubscription = () => {
    window.location.href = 'https://billing.stripe.com/p/login/14k3dfaXYePY8i4aEE';
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box className="App">
        <Navbar 
          darkMode={darkMode} 
          setDarkMode={setDarkMode} 
          onManageSubscription={handleManageSubscription}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise/:id" element={<ExerciseDetail />} />
          <Route path="/contact" element={<ContactUs darkMode={darkMode} />} />
          <Route path="/personalized-workout" element={<PersonalizedWorkout />} />
          <Route path="/chat" element={<ChatPage darkMode={darkMode} />} />
          <Route path="/pricing" element={
            <Box sx={{ 
              padding: 4, 
              backgroundColor: darkMode ? 'rgba(18, 18, 18, 0.8)' : 'rgba(248, 249, 250, 0.8)',
              minHeight: 'calc(100vh - 200px)'
            }}>
              <Container maxWidth="lg">
                <PageTitle title="Our Pricing Plans" />
                <Paper 
                  elevation={3} 
                  sx={{
                    p: 4,
                    mb: 5,
                    borderRadius: 3,
                    maxWidth: '800px',
                    margin: '0 auto',
                    backgroundColor: darkMode ? 'rgba(30,30,30,0.9)' : 'white',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  }}
                >
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="body1" sx={{ mb: 3, fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                      Fitness Freak's free plan gives you limited access to exercises for just two body parts and three uses of the workout planner per week. Want more? Check out our premium options below to support this awesome initiative and level up your health.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
                      <Button
                        variant={selectMonthly ? "contained" : "outlined"}
                        onClick={() => setSelectMonthly(true)}
                        sx={{
                          borderRadius: '30px',
                          padding: '10px 24px',
                          fontWeight: 600,
                          backgroundColor: selectMonthly ? '#DC1414' : 'transparent',
                          color: selectMonthly ? 'white' : '#DC1414',
                          borderColor: '#DC1414',
                          '&:hover': {
                            backgroundColor: selectMonthly ? '#B40000' : 'rgba(220, 20, 20, 0.1)',
                            transform: selectMonthly ? 'translateY(-2px)' : 'none',
                            boxShadow: selectMonthly ? '0 4px 12px rgba(220, 20, 20, 0.3)' : 'none'
                          }
                        }}
                      >
                        Monthly
                      </Button>
                      <Button
                        variant={!selectMonthly ? "contained" : "outlined"}
                        onClick={() => setSelectMonthly(false)}
                        sx={{
                          borderRadius: '30px',
                          padding: '10px 24px',
                          fontWeight: 600,
                          backgroundColor: !selectMonthly ? '#DC1414' : 'transparent',
                          color: !selectMonthly ? 'white' : '#DC1414',
                          borderColor: '#DC1414',
                          '&:hover': {
                            backgroundColor: !selectMonthly ? '#B40000' : 'rgba(220, 20, 20, 0.1)',
                            transform: !selectMonthly ? 'translateY(-2px)' : 'none',
                            boxShadow: !selectMonthly ? '0 4px 12px rgba(220, 20, 20, 0.3)' : 'none'
                          }
                        }}
                      >
                        Yearly
                      </Button>
                    </Box>
                  </Box>
                </Paper>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <PricingCard
                    title="Premium Plan"
                    price={selectMonthly ? "$1" : "$10.99"}
                    monthlyPrice="$1"
                    annualPrice="$10.99"
                    storage="Unlimited access to workout poses and exercise videos (access to 100+ workout exercises)"
                    users="Unlimited access to workout planner"
                    sendUp="Unlimited chats with AI chatbot"
                    isMonthly={selectMonthly}
                    isLoggedIn={isLoggedIn}
                  />
                </Box>
              </Container>
            </Box>
          } />
        </Routes>
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        {location.pathname !== '/chat' && (
          <Footer darkMode={darkMode} />
        )}
      </Box>
      <Analytics />

      <Dialog
        open={showPopup}
        onClose={handleClosePopup}
      >
        <DialogTitle>Welcome to Fitness Freak!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You have access to limited resources with the free plan. Consider subscribing for exclusive features like a personalized workout planner, fitness AI bot, and more.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default App;