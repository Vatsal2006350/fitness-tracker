import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = (name, email, password) => 
  axios.post(`${API_URL}/auth/register`, { name, email, password });

export const login = (email, password) => 
  axios.post(`${API_URL}/auth/login`, { email, password });

export const getUserCount = () => 
  axios.get(`${API_URL}/user/count`);

export const getAllUsers = () => 
  axios.get(`${API_URL}/user/all`);