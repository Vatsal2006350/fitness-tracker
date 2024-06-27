// exerciseRepository definition
const exerciseRepository = {
  beginner: {
    weightLoss: [
      { exercise: 'Jumping Jacks', sets: 3, reps: 20, weights: '', rest: '60 seconds' },
      { exercise: 'Bodyweight Squats', sets: 3, reps: 15, weights: '', rest: '60 seconds' },
      { exercise: 'Burpees', sets: 3, reps: 10, weights: '', rest: '60 seconds' },
    ],
    muscleGain: [
      { exercise: 'Push-ups', sets: 3, reps: 10, weights: '', rest: '60 seconds' },
      { exercise: 'Dumbbell Bench Press', sets: 3, reps: 10, weights: '10 lbs', rest: '60 seconds' },
      { exercise: 'Dumbbell Rows', sets: 3, reps: 10, weights: '10 lbs', rest: '60 seconds' },
    ],
    endurance: [
      { exercise: 'Running', sets: 1, reps: '30 minutes', weights: '', rest: 'N/A' },
      { exercise: 'Cycling', sets: 1, reps: '30 minutes', weights: '', rest: 'N/A' },
      { exercise: 'Jump Rope', sets: 3, reps: '5 minutes', weights: '', rest: '60 seconds' },
    ],
  },
  intermediate: {
    weightLoss: [
      { exercise: 'Running', sets: 1, reps: '30 minutes', weights: '', rest: 'N/A' },
      { exercise: 'Burpees', sets: 3, reps: 20, weights: '', rest: '60 seconds' },
      { exercise: 'Mountain Climbers', sets: 3, reps: 20, weights: '', rest: '60 seconds' },
    ],
    muscleGain: [
      { exercise: 'Pull-ups', sets: 3, reps: 10, weights: '', rest: '60 seconds' },
      { exercise: 'Deadlifts', sets: 3, reps: 10, weights: '20 lbs', rest: '60 seconds' },
      { exercise: 'Bench Press', sets: 3, reps: 10, weights: '20 lbs', rest: '60 seconds' },
    ],
    endurance: [
      { exercise: 'Running', sets: 1, reps: '45 minutes', weights: '', rest: 'N/A' },
      { exercise: 'Cycling', sets: 1, reps: '45 minutes', weights: '', rest: 'N/A' },
      { exercise: 'Swimming', sets: 1, reps: '30 minutes', weights: '', rest: 'N/A' },
    ],
  },
  advanced: {
    weightLoss: [
      { exercise: 'HIIT', sets: 1, reps: '30 minutes', weights: '', rest: 'N/A' },
      { exercise: 'Sprint Intervals', sets: 10, reps: '100 meters', weights: '', rest: '60 seconds' },
      { exercise: 'Kettlebell Swings', sets: 3, reps: 20, weights: '15 lbs', rest: '60 seconds' },
    ],
    muscleGain: [
      { exercise: 'Heavy Squats', sets: 3, reps: 5, weights: '50 lbs', rest: '60 seconds' },
      { exercise: 'Deadlifts', sets: 3, reps: 5, weights: '50 lbs', rest: '60 seconds' },
      { exercise: 'Overhead Press', sets: 3, reps: 5, weights: '20 lbs', rest: '60 seconds' },
    ],
    endurance: [
      { exercise: 'Long Distance Running', sets: 1, reps: '60 minutes', weights: '', rest: 'N/A' },
      { exercise: 'Cycling', sets: 1, reps: '60 minutes', weights: '', rest: 'N/A' },
      { exercise: 'Rowing', sets: 1, reps: '30 minutes', weights: '', rest: 'N/A' },
    ],
  },
};

// generateWorkoutPlan function
const generateWorkoutPlan = (formData) => {
  const { age, gender, level, goal } = formData;

  // Define age groups
  let ageGroup;
  if (age <= 20) {
    ageGroup = 'youth';
  } else if (age <= 40) {
    ageGroup = 'adult';
  } else {
    ageGroup = 'senior';
  }

  const plan = {};
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  daysOfWeek.forEach(day => {
    if (day === 'Friday' || day === 'Saturday') {
      plan[day] = [{ exercise: 'Rest', sets: '-', reps: '-', weights: '', rest: 'Full Day' }];
    } else {
      plan[day] = exerciseRepository[level][goal];
    }
  });

  return plan;
};

export { generateWorkoutPlan };
