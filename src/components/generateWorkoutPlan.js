const exerciseRepository = {
  beginner: {
    weightLoss: [
      { exercise: 'Jumping Jacks', sets: 3, reps: '30 seconds', weights: '', rest: '30 seconds' },
      { exercise: 'Bodyweight Squats', sets: 3, reps: 10, weights: '', rest: '45 seconds' },
      { exercise: 'Push-ups', sets: 3, reps: 5, weights: '', rest: '45 seconds' },
      { exercise: 'Lunges', sets: 3, reps: 8, weights: '', rest: '45 seconds' },
      { exercise: 'Plank', sets: 3, reps: '20 seconds', weights: '', rest: '30 seconds' },
    ],
    muscleGain: [
      { exercise: 'Push-ups', sets: 3, reps: 8, weights: '', rest: '60 seconds' },
      { exercise: 'Bodyweight Squats', sets: 3, reps: 12, weights: '', rest: '60 seconds' },
      { exercise: 'Dumbbell Rows', sets: 3, reps: 10, weights: '5 lbs', rest: '60 seconds' },
      { exercise: 'Lunges', sets: 3, reps: 10, weights: '', rest: '60 seconds' },
      { exercise: 'Plank', sets: 3, reps: '30 seconds', weights: '', rest: '45 seconds' },
    ],
    endurance: [
      { exercise: 'Jogging', sets: 1, reps: '15 minutes', weights: '', rest: 'N/A' },
      { exercise: 'Jump Rope', sets: 3, reps: '2 minutes', weights: '', rest: '60 seconds' },
      { exercise: 'Mountain Climbers', sets: 3, reps: '30 seconds', weights: '', rest: '45 seconds' },
      { exercise: 'High Knees', sets: 3, reps: '30 seconds', weights: '', rest: '45 seconds' },
      { exercise: 'Burpees', sets: 3, reps: 5, weights: '', rest: '60 seconds' },
    ],
  },
  intermediate: {
    weightLoss: [
      { exercise: 'Burpees', sets: 4, reps: 12, weights: '', rest: '45 seconds' },
      { exercise: 'Mountain Climbers', sets: 4, reps: '45 seconds', weights: '', rest: '45 seconds' },
      { exercise: 'Jump Squats', sets: 4, reps: 15, weights: '', rest: '45 seconds' },
      { exercise: 'Push-ups', sets: 4, reps: 12, weights: '', rest: '45 seconds' },
      { exercise: 'Russian Twists', sets: 4, reps: 20, weights: '', rest: '45 seconds' },
    ],
    muscleGain: [
      { exercise: 'Dumbbell Bench Press', sets: 4, reps: 10, weights: '15 lbs', rest: '90 seconds' },
      { exercise: 'Dumbbell Squats', sets: 4, reps: 12, weights: '20 lbs', rest: '90 seconds' },
      { exercise: 'Dumbbell Rows', sets: 4, reps: 10, weights: '15 lbs', rest: '90 seconds' },
      { exercise: 'Dumbbell Lunges', sets: 4, reps: 12, weights: '10 lbs', rest: '90 seconds' },
      { exercise: 'Plank', sets: 4, reps: '45 seconds', weights: '', rest: '60 seconds' },
    ],
    endurance: [
      { exercise: 'Running', sets: 1, reps: '25 minutes', weights: '', rest: 'N/A' },
      { exercise: 'Jump Rope', sets: 4, reps: '3 minutes', weights: '', rest: '60 seconds' },
      { exercise: 'Burpees', sets: 4, reps: 15, weights: '', rest: '60 seconds' },
      { exercise: 'Mountain Climbers', sets: 4, reps: '45 seconds', weights: '', rest: '45 seconds' },
      { exercise: 'High Knees', sets: 4, reps: '45 seconds', weights: '', rest: '45 seconds' },
    ],
  },
  advanced: {
    weightLoss: [
      { exercise: 'HIIT Sprints', sets: 10, reps: '30 seconds sprint, 30 seconds rest', weights: '', rest: '30 seconds' },
      { exercise: 'Burpees', sets: 5, reps: 20, weights: '', rest: '30 seconds' },
      { exercise: 'Mountain Climbers', sets: 5, reps: '60 seconds', weights: '', rest: '30 seconds' },
      { exercise: 'Jump Squats', sets: 5, reps: 25, weights: '', rest: '30 seconds' },
      { exercise: 'Kettlebell Swings', sets: 5, reps: 20, weights: '25 lbs', rest: '30 seconds' },
    ],
    muscleGain: [
      { exercise: 'Barbell Bench Press', sets: 5, reps: 8, weights: '50% of 1RM', rest: '120 seconds' },
      { exercise: 'Barbell Squats', sets: 5, reps: 8, weights: '60% of 1RM', rest: '120 seconds' },
      { exercise: 'Deadlifts', sets: 5, reps: 8, weights: '60% of 1RM', rest: '120 seconds' },
      { exercise: 'Pull-ups', sets: 5, reps: 10, weights: 'Bodyweight', rest: '90 seconds' },
      { exercise: 'Dips', sets: 5, reps: 12, weights: 'Bodyweight', rest: '90 seconds' },
    ],
    endurance: [
      { exercise: 'Running', sets: 1, reps: '45 minutes', weights: '', rest: 'N/A' },
      { exercise: 'Jump Rope', sets: 5, reps: '5 minutes', weights: '', rest: '60 seconds' },
      { exercise: 'Burpees', sets: 5, reps: 25, weights: '', rest: '45 seconds' },
      { exercise: 'Mountain Climbers', sets: 5, reps: '60 seconds', weights: '', rest: '30 seconds' },
      { exercise: 'High Knees', sets: 5, reps: '60 seconds', weights: '', rest: '30 seconds' },
    ],
  },
};

const generateWorkoutPlan = (formData) => {
  const { age, gender, level, goals } = formData;

  const plan = {};
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const exercises = exerciseRepository[level][goals];

  daysOfWeek.forEach((day, index) => {
    if (day === 'Saturday' || day === 'Sunday') {
      plan[day] = [{ exercise: 'Rest Day', sets: '-', reps: '-', weights: '-', rest: 'Full Day' }];
    } else {
      // Randomly select 3 exercises for each day
      const dailyExercises = [];
      const shuffled = [...exercises].sort(() => 0.5 - Math.random());
      for (let i = 0; i < 3; i++) {
        dailyExercises.push(shuffled[i]);
      }
      plan[day] = dailyExercises;
    }
  });

  return plan;
};

export { generateWorkoutPlan };