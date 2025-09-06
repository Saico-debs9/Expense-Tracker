import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const signup = (data) => axios.post(`${API_URL}api/signup`, data);
export const login = (data) => axios.post(`${API_URL}api/login`, data);
