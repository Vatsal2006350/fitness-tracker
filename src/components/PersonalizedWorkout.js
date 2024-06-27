import React, { useState } from 'react';
import { TextField, MenuItem, Button, Grid, Box, Typography } from '@mui/material';

const goals = ['Weight Loss', 'Muscle Gain', 'Endurance'];
const levels = ['Beginner', 'Intermediate', 'Advanced'];

const PersonalizedWorkout = () => {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
    goal: '',
    level: ''
  });

  const [workoutPlan, setWorkoutPlan] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const generateWorkoutPlan = () => {
    // Dummy workout plan generation logic
    const plan = {
      Monday: [
        { exercise: 'Push-ups', sets: 3, reps: 10, weights: '', rest: '60 seconds' },
        { exercise: 'Squats', sets: 3, reps: 10, weights: '', rest: '60 seconds' },
        { exercise: 'Plank', sets: 3, reps: '30 seconds', weights: '', rest: '60 seconds' },
      ],
      Tuesday: [
        { exercise: 'Lunges', sets: 3, reps: 10, weights: '', rest: '60 seconds' },
        { exercise: 'Bicep Curls', sets: 3, reps: 10, weights: '10 lbs', rest: '60 seconds' },
        { exercise: 'Mountain Climbers', sets: 3, reps: 10, weights: '', rest: '60 seconds' },
      ],
      // Add more days and exercises as needed
    };

    setWorkoutPlan(plan);
  };

  const handleSubmit = () => {
    generateWorkoutPlan();
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" mb={3}>Personalized Workout Plan</Typography>
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
            name="goal"
            value={formData.goal}
            onChange={handleChange}
          >
            {goals.map((goal) => (
              <MenuItem key={goal} value={goal}>
                {goal}
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
                {level}
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

      {workoutPlan && (
        <Box mt={4}>
          <Typography variant="h5" mb={3}>Your Weekly Exercise Plan</Typography>
          {Object.keys(workoutPlan).map((day) => (
            <Box key={day} mb={3}>
              <Typography variant="h6">{day}</Typography>
              <table>
                <thead>
                  <tr>
                    <th>Exercise</th>
                    <th>Sets</th>
                    <th>Reps</th>
                    <th>Weights</th>
                    <th>Rest Between Sets</th>
                  </tr>
                </thead>
                <tbody>
                  {workoutPlan[day].map((exercise, index) => (
                    <tr key={index}>
                      <td>{exercise.exercise}</td>
                      <td>{exercise.sets}</td>
                      <td>{exercise.reps}</td>
                      <td>{exercise.weights}</td>
                      <td>{exercise.rest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PersonalizedWorkout;
