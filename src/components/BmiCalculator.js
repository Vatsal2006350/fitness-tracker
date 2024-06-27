import React, { useState } from 'react'; 
import './BmiCalculator.css'; 
import { Box, Typography, useTheme } from '@mui/material';
import BmiImage from '../assets/images/bmi-info.png'; // Adjust the import path to your image
  
function BmiCalculator() {
    const theme = useTheme();

    const [heightValue, setHeightValue] = useState('');
    const [weightValue, setWeightValue] = useState('');
    const [bmiValue, setBmiValue] = useState('');
    const [bmiMessage, setBmiMessage] = useState('');

    const calculateBmi = () => {
        if (heightValue && weightValue) {
            const heightInMeters = heightValue / 100;
            const bmi = (weightValue / (heightInMeters * heightInMeters)).toFixed(2);
            setBmiValue(bmi);

            let message = '';
            if (bmi < 18.5) {
                message = 'You are Underweight';
            } else if (bmi >= 18.5 && bmi < 25) {
                message = 'You are Normal weight';
            } else if (bmi >= 25 && bmi < 30) {
                message = 'You are Overweight';
            } else {
                message = 'You are Obese';
            }
            setBmiMessage(message);
        } else {
            setBmiValue('');
            setBmiMessage('');
        }
    };

    return (
        <Box className="bmi-container">
            <Box className="bmi-info" sx={{ color: theme.palette.text.primary }}>
                <img src={BmiImage} alt="BMI Information" />
                <Typography variant="h5" sx={{ fontWeight: 'bold', fontFamily: 'Arial' }}>Understanding BMI</Typography>
                <Typography variant="body1">
                    Body Mass Index (BMI) is a simple calculation using a person's height and weight.
                    The formula is BMI = kg/m<sup>2</sup> where kg is a person's weight in kilograms and m<sup>2</sup> is their height in meters squared.
                    A BMI of 25.0 or more is overweight, while the healthy range is 18.5 to 24.9. BMI applies to most adults 18-65 years.
                    Knowing your BMI can help you determine your risk of developing chronic diseases related to obesity, plan your exercise regime, and track your fitness progress.
                </Typography>
            </Box>
            <Box className="bmi-calculator" sx={{ color: theme.palette.text.primary }}>
                <Typography variant="h1" component="h1" sx={{ fontWeight: 'bold', fontFamily: 'Arial' }}>BMI Calculator</Typography>
                <div className="input-container">
                    <label htmlFor="height">Enter Your Height (cm):</label>
                    <input
                        type="number"
                        id="height"
                        value={heightValue}
                        onChange={(e) => setHeightValue(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="weight">Enter Your Weight (kg):</label>
                    <input
                        type="number"
                        id="weight"
                        value={weightValue}
                        onChange={(e) => setWeightValue(e.target.value)}
                    />
                </div>
                <button className="calculate-btn" onClick={calculateBmi}>
                    Click to Calculate BMI
                </button>
                {bmiValue && bmiMessage && (
                    <div className="result">
                        <p>
                            Your BMI: <span className="bmi-value">{bmiValue}</span>
                        </p>
                        <p>
                            Result: <span className="bmi-message">{bmiMessage}</span>
                        </p>
                    </div>
                )}
            </Box>
        </Box>
    );
}

export default BmiCalculator;
