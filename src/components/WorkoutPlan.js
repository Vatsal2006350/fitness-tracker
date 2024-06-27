import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const WorkoutPlan = ({ plan }) => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>Your Personalized Workout Plan</Typography>
      {Object.keys(plan).map((day) => (
        <TableContainer component={Paper} key={day} sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ p: 2 }}>{day}</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Exercise</TableCell>
                <TableCell>Sets</TableCell>
                <TableCell>Reps</TableCell>
                <TableCell>Weights</TableCell>
                <TableCell>Rest Between Sets</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plan[day].map((exercise, index) => (
                <TableRow key={index}>
                  <TableCell>{exercise.exercise}</TableCell>
                  <TableCell>{exercise.sets}</TableCell>
                  <TableCell>{exercise.reps}</TableCell>
                  <TableCell>{exercise.weights}</TableCell>
                  <TableCell>{exercise.rest}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ))}
    </div>
  );
};

export default WorkoutPlan;
