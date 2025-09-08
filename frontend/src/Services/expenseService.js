import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}expenses`;

export const getExpenses = () =>
  axios.get(API_URL, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

export const addExpense = (expense) =>
  axios.post(API_URL, expense, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

export const updateExpense = (id, data) =>
  axios.put(`${API_URL}/updateexpenses/${id}`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

export const deleteExpense = (id) =>
  axios.delete(`${API_URL}/deleteexpenses/${id}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

