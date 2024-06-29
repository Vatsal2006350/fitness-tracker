import React, { useState } from 'react';
import { TextField, MenuItem, Button, Grid, Box, Typography } from '@mui/material';
import { generateWorkoutPlan } from './generateWorkoutPlan';
import WorkoutPlan from './WorkoutPlan';
import '../App.css';

const goals = ['weightLoss', 'muscleGain', 'endurance'];
const levels = ['beginner', 'intermediate', 'advanced'];

const PersonalizedWorkout = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
    goals: '',
    level: ''
  });

  const [workoutPlan, setWorkoutPlan] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    const plan = generateWorkoutPlan(formData);
    setWorkoutPlan(plan);
  };

  return (
    <Box sx={{ padding: 3, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: '44px', xs: '40px' }, fontWeight: 'bold', fontFamily: 'Arial', color: darkMode ? 'white' : 'black' }}
        mb={3}
      >
        PERSONALIZED WORKOUT PLANNER
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Weight (kg)"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            InputProps={{ style: { fontFamily: 'Arial', color: darkMode ? 'white' : 'black' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Height (cm)"
            name="height"
            value={formData.height}
            onChange={handleChange}
            InputProps={{ style: { fontFamily: 'Arial', color: darkMode ? 'white' : 'black' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            InputProps={{ style: { fontFamily: 'Arial', color: darkMode ? 'white' : 'black' } }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            InputProps={{ style: { fontFamily: 'Arial', color: darkMode ? 'white' : 'black' } }}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Goals"
            name="goals"
            value={formData.goals}
            onChange={handleChange}
            InputProps={{ style: { fontFamily: 'Arial', color: darkMode ? 'white' : 'black' } }}
          >
            {goals.map((goal) => (
              <MenuItem key={goal} value={goal}>
                {goal.charAt(0).toUpperCase() + goal.slice(1)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            InputProps={{ style: { fontFamily: 'Arial', color: darkMode ? 'white' : 'black' } }}
          >
            {levels.map((level) => (
              <MenuItem key={level} value={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" className="redButton" color="secondary" onClick={handleSubmit}>
            Generate Workout Plan
          </Button>
        </Grid>
      </Grid>

      {workoutPlan && <WorkoutPlan plan={workoutPlan} />}
    </Box>
  );
};

export default PersonalizedWorkout;
