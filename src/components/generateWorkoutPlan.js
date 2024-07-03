const exerciseRepository = {
  beginner: {
    weightLoss: [
      { exercise: 'Jumping Jacks', sets: 3, reps: '30 seconds', weights: '', rest: '30 seconds' },
      { exercise: 'Bodyweight Squats', sets: 3, reps: 12, weights: '', rest: '45 seconds' },
      { exercise: 'Push-ups (or Knee Push-ups)', sets: 3, reps: 8, weights: '', rest: '45 seconds' },
      { exercise: 'Lunges', sets: 3, reps: 10, weights: '', rest: '45 seconds' },
      { exercise: 'Plank', sets: 3, reps: '30 seconds', weights: '', rest: '30 seconds' },
      { exercise: 'Mountain Climbers', sets: 3, reps: '30 seconds', weights: '', rest: '30 seconds' },
      { exercise: 'Bicycle Crunches', sets: 3, reps: 15, weights: '', rest: '30 seconds' },
      { exercise: 'Glute Bridges', sets: 3, reps: 12, weights: '', rest: '30 seconds' },
      { exercise: 'Step-ups', sets: 3, reps: 10, weights: '', rest: '45 seconds' },
      { exercise: 'Burpees', sets: 3, reps: 8, weights: '', rest: '45 seconds' },
    ],
    muscleGain: [
      { exercise: 'Push-ups', sets: 3, reps: 10, weights: '', rest: '60 seconds' },
      { exercise: 'Bodyweight Squats', sets: 3, reps: 15, weights: '', rest: '60 seconds' },
      { exercise: 'Dumbbell Rows', sets: 3, reps: 12, weights: '10 lbs', rest: '60 seconds' },
      { exercise: 'Lunges', sets: 3, reps: 12, weights: '', rest: '60 seconds' },
      { exercise: 'Plank', sets: 3, reps: '45 seconds', weights: '', rest: '45 seconds' },
      { exercise: 'Dumbbell Shoulder Press', sets: 3, reps: 10, weights: '5-10 lbs', rest: '60 seconds' },
      { exercise: 'Dumbbell Bicep Curls', sets: 3, reps: 12, weights: '5-10 lbs', rest: '45 seconds' },
      { exercise: 'Tricep Dips', sets: 3, reps: 10, weights: '', rest: '45 seconds' },
      { exercise: 'Calf Raises', sets: 3, reps: 15, weights: '', rest: '30 seconds' },
      { exercise: 'Russian Twists', sets: 3, reps: 20, weights: '', rest: '30 seconds' },
    ],
    endurance: [
      { exercise: 'Jogging', sets: 1, reps: '20 minutes', weights: '', rest: 'N/A' },
      { exercise: 'Jump Rope', sets: 3, reps: '3 minutes', weights: '', rest: '60 seconds' },
      { exercise: 'Mountain Climbers', sets: 3, reps: '45 seconds', weights: '', rest: '45 seconds' },
      { exercise: 'High Knees', sets: 3, reps: '45 seconds', weights: '', rest: '45 seconds' },
      { exercise: 'Burpees', sets: 3, reps: 8, weights: '', rest: '60 seconds' },
      { exercise: 'Jumping Jacks', sets: 3, reps: '45 seconds', weights: '', rest: '30 seconds' },
      { exercise: 'Bodyweight Squats', sets: 3, reps: 20, weights: '', rest: '45 seconds' },
      { exercise: 'Push-ups', sets: 3, reps: 10, weights: '', rest: '45 seconds' },
      { exercise: 'Lunges', sets: 3, reps: 15, weights: '', rest: '45 seconds' },
      { exercise: 'Plank', sets: 3, reps: '45 seconds', weights: '', rest: '30 seconds' },
    ],
  },
  intermediate: {
    weightLoss: [
      { exercise: 'Burpees', sets: 4, reps: 15, weights: '', rest: '45 seconds' },
      { exercise: 'Jump Squats', sets: 4, reps: 20, weights: '', rest: '45 seconds' },
      { exercise: 'Mountain Climbers', sets: 4, reps: '45 seconds', weights: '', rest: '30 seconds' },
      { exercise: 'Push-ups', sets: 4, reps: 15, weights: '', rest: '45 seconds' },
      { exercise: 'Kettlebell Swings', sets: 4, reps: 20, weights: '15-20 lbs', rest: '45 seconds' },
      { exercise: 'Dumbbell Renegade Rows', sets: 3, reps: 10, weights: '10-15 lbs', rest: '45 seconds' },
      { exercise: 'Alternating Reverse Lunges', sets: 3, reps: 16, weights: '', rest: '45 seconds' },
      { exercise: 'Plank to Downward Dog', sets: 3, reps: 12, weights: '', rest: '30 seconds' },
      { exercise: 'Russian Twists', sets: 3, reps: 30, weights: '5-10 lbs', rest: '45 seconds' },
      { exercise: 'Box Jumps', sets: 3, reps: 12, weights: '', rest: '60 seconds' },
    ],
    muscleGain: [
      { exercise: 'Barbell Bench Press', sets: 4, reps: 10, weights: '60% 1RM', rest: '90 seconds' },
      { exercise: 'Barbell Squats', sets: 4, reps: 10, weights: '70% 1RM', rest: '90 seconds' },
      { exercise: 'Bent-Over Rows', sets: 4, reps: 10, weights: '50% 1RM', rest: '90 seconds' },
      { exercise: 'Overhead Press', sets: 3, reps: 10, weights: '40% 1RM', rest: '90 seconds' },
      { exercise: 'Romanian Deadlifts', sets: 3, reps: 12, weights: '50% 1RM', rest: '90 seconds' },
      { exercise: 'Pull-ups (or Lat Pulldowns)', sets: 3, reps: 8, weights: 'BW or 70% BW', rest: '90 seconds' },
      { exercise: 'Dips', sets: 3, reps: 10, weights: 'BW', rest: '60 seconds' },
      { exercise: 'Dumbbell Lunges', sets: 3, reps: 12, weights: '20-30 lbs', rest: '60 seconds' },
      { exercise: 'Face Pulls', sets: 3, reps: 15, weights: '20-30 lbs', rest: '60 seconds' },
      { exercise: 'Plank', sets: 3, reps: '60 seconds', weights: '', rest: '45 seconds' },
    ],
    endurance: [
      { exercise: 'Running', sets: 1, reps: '30 minutes', weights: '', rest: 'N/A' },
      { exercise: 'Jump Rope', sets: 4, reps: '4 minutes', weights: '', rest: '60 seconds' },
      { exercise: 'Burpees', sets: 4, reps: 20, weights: '', rest: '45 seconds' },
      { exercise: 'Mountain Climbers', sets: 4, reps: '60 seconds', weights: '', rest: '30 seconds' },
      { exercise: 'High Knees', sets: 4, reps: '60 seconds', weights: '', rest: '30 seconds' },
      { exercise: 'Jumping Lunges', sets: 3, reps: 20, weights: '', rest: '45 seconds' },
      { exercise: 'Squat Jumps', sets: 3, reps: 15, weights: '', rest: '45 seconds' },
      { exercise: 'Push-up to Renegade Row', sets: 3, reps: 10, weights: '10 lbs', rest: '60 seconds' },
      { exercise: 'Bear Crawl', sets: 3, reps: '30 seconds', weights: '', rest: '30 seconds' },
      { exercise: 'Battle Ropes', sets: 3, reps: '30 seconds', weights: '', rest: '45 seconds' },
    ],
  },
  advanced: {
    weightLoss: [
      { exercise: 'Barbell Thrusters', sets: 4, reps: 15, weights: '30% 1RM', rest: '60 seconds' },
      { exercise: 'Burpee Box Jumps', sets: 4, reps: 12, weights: '', rest: '60 seconds' },
      { exercise: 'Turkish Get-ups', sets: 3, reps: 5, weights: '20-30 lbs', rest: '60 seconds' },
      { exercise: 'Kettlebell Swings', sets: 4, reps: 20, weights: '35-50 lbs', rest: '45 seconds' },
      { exercise: 'Battle Rope Slams', sets: 4, reps: '30 seconds', weights: '', rest: '30 seconds' },
      { exercise: 'Sled Push', sets: 3, reps: '30 meters', weights: 'Heavy', rest: '90 seconds' },
      { exercise: 'Jumping Lunges', sets: 4, reps: 20, weights: '', rest: '45 seconds' },
      { exercise: 'Medicine Ball Slams', sets: 4, reps: 15, weights: '15-20 lbs', rest: '45 seconds' },
      { exercise: 'Rowing Machine', sets: 3, reps: '500 meters', weights: '', rest: '90 seconds' },
      { exercise: 'Plank with Alternating Shoulder Taps', sets: 3, reps: '45 seconds', weights: '', rest: '30 seconds' },
    ],
    muscleGain: [
      { exercise: 'Barbell Back Squats', sets: 5, reps: 5, weights: '85% 1RM', rest: '180 seconds' },
      { exercise: 'Deadlifts', sets: 5, reps: 5, weights: '85% 1RM', rest: '180 seconds' },
      { exercise: 'Bench Press', sets: 5, reps: 5, weights: '85% 1RM', rest: '180 seconds' },
      { exercise: 'Weighted Pull-ups', sets: 4, reps: 8, weights: '25-45 lbs', rest: '120 seconds' },
      { exercise: 'Standing Overhead Press', sets: 4, reps: 8, weights: '70% 1RM', rest: '120 seconds' },
      { exercise: 'Barbell Rows', sets: 4, reps: 8, weights: '70% 1RM', rest: '120 seconds' },
      { exercise: 'Front Squats', sets: 3, reps: 8, weights: '75% 1RM', rest: '120 seconds' },
      { exercise: 'Weighted Dips', sets: 3, reps: 8, weights: '45-70 lbs', rest: '90 seconds' },
      { exercise: 'Romanian Deadlifts', sets: 3, reps: 10, weights: '70% 1RM', rest: '90 seconds' },
      { exercise: 'Farmer\'s Walks', sets: 3, reps: '30 meters', weights: 'Heavy', rest: '90 seconds' },
    ],
    endurance: [
      { exercise: 'Running', sets: 1, reps: '45 minutes', weights: '', rest: 'N/A' },
      { exercise: 'Rowing Machine', sets: 1, reps: '5000 meters', weights: '', rest: 'N/A' },
      { exercise: 'Burpee Box Jumps', sets: 5, reps: 15, weights: '', rest: '45 seconds' },
      { exercise: 'Kettlebell Swings', sets: 5, reps: 30, weights: '35-50 lbs', rest: '45 seconds' },
      { exercise: 'Battle Rope Waves', sets: 5, reps: '45 seconds', weights: '', rest: '30 seconds' },
      { exercise: 'Assault Bike', sets: 5, reps: '1 minute', weights: '', rest: '30 seconds' },
      { exercise: 'Mountain Climbers', sets: 5, reps: '60 seconds', weights: '', rest: '30 seconds' },
      { exercise: 'Jumping Lunges', sets: 4, reps: 30, weights: '', rest: '45 seconds' },
      { exercise: 'Plyo Push-ups', sets: 4, reps: 15, weights: '', rest: '45 seconds' },
      { exercise: 'Wall Balls', sets: 4, reps: 20, weights: '14-20 lbs', rest: '45 seconds' },
    ],
  },
};

const generateWorkoutPlan = (formData) => {
  const { age, gender, level, goals, workoutsPerWeek } = formData;

  const plan = {};
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const exercises = exerciseRepository[level][goals];

  // Determine workout days based on workoutsPerWeek
  const workoutDays = daysOfWeek.slice(0, workoutsPerWeek);
  const restDays = daysOfWeek.slice(workoutsPerWeek);

  workoutDays.forEach((day) => {
    // Select 6-8 exercises for each workout day
    const dailyExercises = [];
    const shuffled = [...exercises].sort(() => 0.5 - Math.random());
    const exerciseCount = Math.floor(Math.random() * 3) + 6; // 6 to 8 exercises
    for (let i = 0; i < exerciseCount; i++) {
      dailyExercises.push(shuffled[i]);
    }
    plan[day] = dailyExercises;
  });

  restDays.forEach((day) => {
    plan[day] = [{ exercise: 'Rest Day', sets: '-', reps: '-', weights: '-', rest: 'Full Day' }];
  });

  return plan;
};

export { generateWorkoutPlan };