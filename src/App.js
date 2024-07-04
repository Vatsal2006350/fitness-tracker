import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box, CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import { Analytics } from '@vercel/analytics/react';

import './App.css';
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ContactUs from './components/ContactUs';
import PersonalizedWorkout from './components/PersonalizedWorkout';
import ChatPage from './components/ChatPage'; // Import ChatPage

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

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

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Box className="App">
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercise/:id" element={<ExerciseDetail />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/personalized-workout" element={<PersonalizedWorkout />} />
          <Route path="/chat" element={<ChatPage />} /> {/* Add route for ChatPage */}
        </Routes>
        <Footer />
      </Box>
      <Analytics />
    </ThemeProvider>
  );
};

export default App;
