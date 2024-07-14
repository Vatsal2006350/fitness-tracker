import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Box, CssBaseline, createTheme, ThemeProvider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
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

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectMonthly, setSelectMonthly] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
    },
  });

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
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
          <Route path="/chat" element={<ChatPage headers={headers} />} />
          <Route path="/pricing" element={
            <div className="PricingApp">
              <div className="app-container">
                <header>
                  <h1 className="header-topic">Our Pricing Plans</h1>
                  <p className="header-description">
                    Fitness Freak's free plan gives you a taste of fitness with access to exercises for just two body parts and three uses of the workout planner per week. Want more? Check out our premium options below to support this awesome initiative and level up your health.
                    <br /><br />
                    <strong>Early Bird Offer:</strong> Subscribe to our Premium Plan by August 15 and get it for just $1/month! Don't miss this chance to transform your fitness journey at an unbeatable price!
                  </p>
                  <div className="header-row">
                    <button
                      className={`toggle-button ${selectMonthly ? 'selected' : ''}`}
                      onClick={() => setSelectMonthly(true)}>
                      Monthly
                    </button>
                    <button
                      className={`toggle-button ${!selectMonthly ? 'selected' : ''}`}
                      onClick={() => setSelectMonthly(false)}>
                      Yearly
                    </button>
                  </div>
                </header>
                <div className="pricing-cards">
                  <PricingCard
                    title="Basic Plan"
                    price={selectMonthly ? "$0" : "$0"}
                    storage="Limited access to workout poses (access to only 2 body part categories)"
                    users="No access to workout planner"
                    sendUp="No access to AI Fitness Chat bot"
                    isMonthly={selectMonthly}
                    isLoggedIn={isLoggedIn}
                    handleGetStarted={handleGetStarted}
                  />
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
                </div>
              </div>
            </div>
          } />
        </Routes>
        <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        <Footer />
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