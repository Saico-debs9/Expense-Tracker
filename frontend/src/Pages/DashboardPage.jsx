import React, { useEffect, useState } from 'react';
import { getExpenses, addExpense } from '../Services/expenseService';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ title: '', amount: '', category: '', date: '', description: '' });
  const navigate = useNavigate();

  const fetchExpenses = async () => {
    const res = await getExpenses();
    setExpenses(res.data);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addExpense(form);
    setForm({ title: '', amount: '', category: '', date: '', description: '' });
    fetchExpenses();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button className='logout-btn' onClick={handleLogout}>Logout</button>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
        <input name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />
        <input name="category" placeholder="Category" value={form.category} onChange={handleChange} />
        <input name="date" type="date" value={form.date} onChange={handleChange} />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <button type="submit">Add Expense</button>
      </form>
      <ul>
        {expenses.map((exp) => (
          <li key={exp.id}>
            {exp.title} - {exp.amount} - {exp.category} - {exp.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;
