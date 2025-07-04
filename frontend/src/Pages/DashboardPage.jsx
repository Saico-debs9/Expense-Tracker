import React, { useEffect, useState } from 'react';
import { getExpenses, addExpense } from '../Services/expenseService';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [tab, setTab] = useState('view');
  const [form, setForm] = useState({ title: '', amount: '', category: '', date: '', description: '' });
  const [filter, setFilter] = useState('');

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
    alert("Added expense");
    setForm({ title: '', amount: '', category: '', date: '', description: '' });
    fetchExpenses();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const filteredExpenses = filter
    ? expenses.filter(exp => exp.category === filter)
    : expenses;

  return (
    <div >
      <Navbar setTab={setTab} handleLogout={handleLogout} />

      {tab === 'view' && (
        <div className="table-container">
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Groceries">Groceries</option>
            <option value="Others">Others</option>
          </select>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date(yyyy-mm-dd)</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.length === 0 ? (
                <tr>
                  <td colSpan="5" className='no-data'style={{ textAlign: 'center' }}><span>No data to show. Add your first expense now.</span></td>
                </tr>
              ) : (
                filteredExpenses.map(exp => {
                  const [year, month, day] = exp.date.split('-');
                  const formattedDate = `${day}/${month}/${year}`;
                  return (
                    <tr key={exp.id}>
                      <td>{exp.title}</td>
                      <td>{exp.amount}</td>
                      <td>{exp.category}</td>
                      <td>{exp.date}</td>
                      <td>{exp.description}</td>
                    </tr>
                  );
                })
              )}
            </tbody>


          </table>
        </div>
      )}

      {tab === 'add' && (
        <div className='form-container'>
          <div>
            <form onSubmit={handleSubmit}>
              <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />
              <input name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />
              <select name="category" value={form.category} onChange={handleChange}>
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Groceries">Groceries</option>
                <option value="Others">Others</option>
              </select>
              <input name="date" type="date" value={form.date} onChange={handleChange} />
              <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
              <button type="submit">Add Expense</button>
            </form>
          </div>
        </div>

      )}

      {/* Future implementation: edit, delete, sort tabs */}
    </div>
  );
};

export default DashboardPage;
