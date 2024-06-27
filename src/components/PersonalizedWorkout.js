import React, { useState } from 'react';
import { TextField, MenuItem, Button, Grid, Box, Typography } from '@mui/material';
import { generateWorkoutPlan } from './generateWorkoutPlan';
import WorkoutPlan from './WorkoutPlan';

const goals = ['weightLoss', 'muscleGain', 'endurance'];
const levels = ['beginner', 'intermediate', 'advanced'];

const PersonalizedWorkout = () => {
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
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" mb={3} sx={{ fontWeight: 'bold', fontFamily: 'Arial' }} >Personalized Workout Plan</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Weight (kg)"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Height (cm)"
            name="height"
            value={formData.height}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Age"
            name="age"
            value={formData.age}
            onChange={handleChange}
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
          >
            {levels.map((level) => (
              <MenuItem key={level} value={level}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Generate Workout Plan
          </Button>
        </Grid>
      </Grid>

      {workoutPlan && <WorkoutPlan plan={workoutPlan} />}
    </Box>
  );
};

export default PersonalizedWorkout;