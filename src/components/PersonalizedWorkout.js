import React, { useState } from 'react';
import { TextField, MenuItem, Button, Grid, Box, Typography } from '@mui/material';
import { generateWorkoutPlan } from './generateWorkoutPlan';
import WorkoutPlan from './WorkoutPlan';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import '../App.css';

const goals = ['weightLoss', 'muscleGain', 'endurance'];
const levels = ['beginner', 'intermediate', 'advanced'];
const workoutFrequencies = [1, 2, 3, 4, 5, 6, 7];

const PersonalizedWorkout = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: '',
    goals: '',
    level: '',
    workoutsPerWeek: ''
  });

  const [workoutPlan, setWorkoutPlan] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    const plan = generateWorkoutPlan(formData);
    setWorkoutPlan(plan);
  };

  const handleDownload = () => {
    if (workoutPlan) {
      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text('Your Personalized Workout Plan', 14, 22);
      doc.setFontSize(12);
  
      let yPosition = 40;
      const pageHeight = doc.internal.pageSize.height;
  
      Object.entries(workoutPlan).forEach(([day, exercises], index) => {
        // Check if there's enough space on the current page
        if (yPosition > pageHeight - 60) {
          doc.addPage();
          yPosition = 20;
        }
  
        doc.text(`${day}:`, 14, yPosition);
        yPosition += 10;
  
        if (exercises.length > 0) {
          const tableData = exercises.map(ex => [
            ex.exercise,
            ex.sets,
            ex.reps,
            ex.weights,
            ex.rest
          ]);
  
          doc.autoTable({
            startY: yPosition,
            head: [['Exercise', 'Sets', 'Reps', 'Weights', 'Rest']],
            body: tableData,
            theme: 'grid',
            styles: { fontSize: 8 },
            margin: { top: 45 + index * 10 },
            pageBreak: 'auto',
          });
  
          yPosition = doc.lastAutoTable.finalY + 15;
        } else {
          doc.text('Rest day', 14, yPosition);
          yPosition += 15;
        }
      });
  
      doc.save('workout_plan.pdf');
    }
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
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Workouts per Week"
            name="workoutsPerWeek"
            value={formData.workoutsPerWeek}
            onChange={handleChange}
            InputProps={{ style: { fontFamily: 'Arial', color: darkMode ? 'white' : 'black' } }}
          >
            {workoutFrequencies.map((frequency) => (
              <MenuItem key={frequency} value={frequency}>
                {frequency}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
    <Box display="flex" justifyContent="center" gap={2}>
      <Button 
        variant="contained" 
        className="redButton" 
        color="secondary" 
        onClick={handleSubmit}
      >
        Generate Workout Plan
      </Button>
      
      {workoutPlan && (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleDownload}
        >
          Download Workout Plan (PDF)
        </Button>
      )}
    </Box>
  </Grid>
</Grid>

{workoutPlan && (
  <Box mt={4}>
    <WorkoutPlan plan={workoutPlan} />
  </Box>
)}
    </Box>
  );
};

export default PersonalizedWorkout;