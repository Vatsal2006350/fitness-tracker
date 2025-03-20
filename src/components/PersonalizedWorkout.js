import React, { useState, useEffect } from 'react';
import { TextField, MenuItem, Button, Grid, Box, Typography, CircularProgress, Paper, Fade, Alert } from '@mui/material';
import WorkoutPlan from './WorkoutPlan';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import '../App.css';
import PageTitle from './PageTitle';

const goals = ['Weight Loss', 'Muscle Gain', 'Endurance', 'General Fitness', 'Flexibility'];
const levels = ['Beginner', 'Intermediate', 'Advanced'];
const workoutFrequencies = [1, 2, 3, 4, 5, 6, 7];

const PersonalizedWorkout = () => {
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState(process.env.REACT_APP_OPEN_AI_API_KEY);

  useEffect(() => {
    // Log that we have the API key (without revealing the key)
    if (apiKey) {
      console.log("API key found in environment variables");
    } else {
      console.log("API key not found in environment variables");
      setApiKey('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');
    }
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const prompt = `
        Create a detailed personalized workout plan based on the following information:
        - Weight: ${formData.weight} kg
        - Height: ${formData.height} cm
        - Age: ${formData.age}
        - Gender: ${formData.gender}
        - Fitness Goal: ${formData.goals}
        - Fitness Level: ${formData.level}
        - Workouts Per Week: ${formData.workoutsPerWeek}

        Please create a workout schedule for each day of the week. For each workout day, include 5-8 exercises with the following details:
        - Exercise name
        - Number of sets
        - Number of reps or duration
        - Recommended weights or resistance level (if applicable)
        - Rest period between sets

        Format the response as a JSON object with days of the week as keys, and an array of exercise objects as values. 
        For rest days, include an array with a single object indicating it's a rest day.
        Example format:
        {
          "Monday": [
            {"exercise": "Squats", "sets": 3, "reps": 12, "weights": "60kg", "rest": "60 seconds"},
            ...
          ],
          "Tuesday": [
            {"exercise": "Rest Day", "sets": "-", "reps": "-", "weights": "-", "rest": "Full Day"}
          ],
          ...
        }
      `;

      console.log("Sending request to OpenAI API...");
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'You are a professional fitness trainer and nutritionist.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 3000
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to generate workout plan');
      }

      console.log("Response received from OpenAI API");
      
      const planContent = data.choices[0].message.content;
      let parsedPlan;
      
      try {
        // Extract JSON from the response if it's wrapped in markdown code blocks
        const jsonMatch = planContent.match(/```json\s*([\s\S]*?)\s*```/) || planContent.match(/```\s*([\s\S]*?)\s*```/);
        const jsonString = jsonMatch ? jsonMatch[1] : planContent;
        
        console.log("Attempting to parse JSON response");
        parsedPlan = JSON.parse(jsonString);
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError);
        try {
          // Fallback: try to parse the entire response as JSON
          parsedPlan = JSON.parse(planContent);
        } catch (fallbackError) {
          throw new Error('Unable to parse workout plan response. Please try again.');
        }
      }

      setWorkoutPlan(parsedPlan);
    } catch (err) {
      console.error('Error generating workout plan:', err);
      setError(err.message || 'Failed to generate workout plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
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

  const formIsValid = () => {
    return formData.weight && formData.height && formData.age && 
      formData.gender && formData.goals && formData.level && 
      formData.workoutsPerWeek;
  };

  return (
    <Box sx={{ padding: 3, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <PageTitle title="Personalized Workout Planner" />
      
      <Paper 
        elevation={3} 
        sx={{
          maxWidth: 1000,
          margin: '0 auto 40px',
          padding: 4,
          borderRadius: 3,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Weight (kg)"
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Height (cm)"
              name="height"
              type="number"
              value={formData.height}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
            >
              {levels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              select
              label="Workouts per Week"
              name="workoutsPerWeek"
              value={formData.workoutsPerWeek}
              onChange={handleChange}
              variant="outlined"
            >
              {workoutFrequencies.map((frequency) => (
                <MenuItem key={frequency} value={frequency}>
                  {frequency}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" gap={2} mt={2}>
              <Button 
                variant="contained" 
                sx={{
                  backgroundColor: '#DC1414',
                  '&:hover': { backgroundColor: '#B40000' },
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: 600,
                  borderRadius: '30px',
                }}
                onClick={handleSubmit}
                disabled={isLoading || !formIsValid()}
              >
                {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Generate Workout Plan'}
              </Button>
              {workoutPlan && (
                <Button 
                  variant="outlined" 
                  sx={{
                    borderColor: '#DC1414',
                    color: '#DC1414',
                    '&:hover': { borderColor: '#B40000', color: '#B40000' },
                    padding: '12px 24px',
                    fontSize: '16px',
                    fontWeight: 600,
                    borderRadius: '30px',
                  }}
                  onClick={handleDownload}
                >
                  Download Workout Plan (PDF)
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            maxWidth: 1000, 
            margin: '0 auto 20px',
            borderRadius: 2,
          }}
        >
          {error}
        </Alert>
      )}

      {isLoading && (
        <Box display="flex" flexDirection="column" alignItems="center" mt={6} mb={6}>
          <CircularProgress size={60} sx={{ color: '#DC1414' }} />
          <Typography variant="h6" mt={3} fontWeight={500}>
            Crafting your personalized workout plan...
          </Typography>
          <Typography variant="body1" mt={1} color="text.secondary">
            Our AI trainer is analyzing your data to create the perfect plan for your goals.
          </Typography>
        </Box>
      )}

      {workoutPlan && !isLoading && (
        <Fade in={!!workoutPlan}>
          <Box mt={4}>
            <WorkoutPlan plan={workoutPlan} />
          </Box>
        </Fade>
      )}
    </Box>
  );
};

export default PersonalizedWorkout;
