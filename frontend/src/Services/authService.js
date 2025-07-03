import axios from 'axios';

const API_URL = 'http://192.168.0.7:9099/api/auth';

export const signup = (data) => axios.post(`${API_URL}/signup`, data);
export const login = (data) => axios.post(`${API_URL}/login`, data);
