import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box, CssBaseline, createTheme, ThemeProvider } from '@mui/material';
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

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectMonthly, setSelectMonthly] = useState(true);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

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

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box className="App">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
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
                    users="Limited access to workout planner (3 plans per week)"
                    sendUp="No access to AI Fitness Chat bot"
                    isMonthly={selectMonthly}
                  />
                  <PricingCard
                    title="Premium Plan"
                    price={selectMonthly ? "$1" : "$28.99"}
                    monthlyPrice="$1"
                    annualPrice="$28.99"
                    storage="Access to workout poses and exercise videos (access to 5 body part categories)"
                    users="Enhanced access to workout planner (15 plans per week)"
                    sendUp="10 chats with AI chatbot per day"
                    isMonthly={selectMonthly}
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
    </ThemeProvider>
  );
};

export default App;
