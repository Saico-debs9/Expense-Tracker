import axios from 'axios';

const API_URL = 'http://192.168.0.7:9099/api/expenses';

export const getExpenses = () =>
  axios.get(API_URL, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

export const addExpense = (expense) =>
  axios.post(API_URL, expense, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });

export const updateExpense = (id, data) =>
  axios.put(`${API_URL}/updateexpenses/${id}`, data);

export const deleteExpense = (id) =>
  axios.delete(`${API_URL}/deleteexpenses/${id}`);

