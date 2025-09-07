import React, { useEffect, useState } from 'react';
import { getExpenses, addExpense, updateExpense, deleteExpense } from '../Services/expenseService';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';


const DashboardPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [tab, setTab] = useState('view');
  const [form, setForm] = useState({ title: '', amount: '', category: '', date: '', description: '' });
  const [filter, setFilter] = useState('');
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '', amount: '', category: '', date: '', description: ''
  });
  const [sortedExpenses, setSortedExpenses] = useState([]);


  const navigate = useNavigate();

  const fetchExpenses = async () => {
    const res = await getExpenses();
    setExpenses(res.data);
    setSortedExpenses(res.data);
  };


  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
    ...form,
    amount: parseFloat(form.amount),  // ensure number
  };
    await addExpense(payload);
    toast.success("Added expense");
    setForm({ title: '', amount: '', category: '', date: '', description: '' });
    fetchExpenses();
  };
  const handleEdit = (exp) => {
    setEditId(exp.id);
    setEditForm({
      title: exp.title,
      amount: exp.amount,
      category: exp.category,
      date: exp.date,
      description: exp.description
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = async (id) => {
    await updateExpense(id, editForm);
    setEditId(null);
    fetchExpenses();
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      await deleteExpense(id);
      fetchExpenses();
    }
  };

  const sortBy = (type) => {
    let sorted = [...expenses];
    if (type === 'amount') {
      sorted.sort((a, b) => a.amount - b.amount);
    } else if (type === 'date') {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (type === 'category') {
      sorted.sort((a, b) => a.category.localeCompare(b.category));
    }
    setSortedExpenses(sorted);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const filteredExpenses = filter
    ? expenses.filter(exp => exp.category === filter)
    : expenses;
  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);


  return (
    <div >
      <Navbar setTab={setTab} handleLogout={handleLogout} />
      {tab === 'view' && (
        <div className="table-container">
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="">All Categories</option>
            <option value="Food">Food</option>
            <option value="Groceries">Groceries</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="EMIs">EMIs</option>
            <option value="Investments">Investments</option>
            <option value="Rent">Rent</option>
            <option value="Utilities">Utilities</option>
            <option value="Health & Medical">Health & Medical</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Education">Education</option>
            <option value="Savings">Savings</option>
            <option value="Gifts & Donations">Gifts & Donations</option>
            <option value="Insurance">Insurance</option>
            <option value="Fuel / Transport">Fuel / Transport</option>
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
                  <td colSpan="5" style={{ textAlign: 'center' }}>No data to show</td>
                </tr>
              ) : (
                <>
                  {filteredExpenses.map(exp => {
                    const [year, month, day] = exp.date.split('-');
                    const formattedDate = `${day}/${month}/${year}`;
                    return (
                      <tr key={exp.id}>
                        <td>{exp.title}</td>
                        <td>{exp.amount}</td>
                        <td>{exp.category}</td>
                        <td>{formattedDate}</td>
                        <td>{exp.description}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td><strong>Total</strong></td>
                    <td><strong>{totalAmount.toFixed(2)}</strong></td>
                    <td colSpan="3"></td>
                  </tr>
                </>
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
                <option value="Groceries">Groceries</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value="EMIs">EMIs</option>
                <option value="Investments">Investments</option>
                <option value="Rent">Rent</option>
                <option value="Utilities">Utilities</option>
                <option value="Health & Medical">Health & Medical</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Education">Education</option>
                <option value="Savings">Savings</option>
                <option value="Gifts & Donations">Gifts & Donations</option>
                <option value="Insurance">Insurance</option>
                <option value="Fuel / Transport">Fuel / Transport</option>
                <option value="Others">Others</option>
              </select>

              <input name="date" type="date" value={form.date} onChange={handleChange} />
              <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
              <button type="submit">Add Expense</button>
            </form>
          </div>
        </div>

      )}
      {tab === 'edit' && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Description</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(exp => (
                editId === exp.id ? (
                  <tr key={exp.id}>
                    <td><input name="title" value={editForm.title} onChange={handleEditChange} /></td>
                    <td><input name="amount" value={editForm.amount} onChange={handleEditChange} /></td>
                    <td>
                      <select name="category" value={editForm.category} onChange={handleEditChange}>
                        <option value="Food">Food</option>
                        <option value="Travel">Travel</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Others">Others</option>
                      </select>
                    </td>
                    <td><input name="date" value={editForm.date} onChange={handleEditChange} /></td>
                    <td><input name="description" value={editForm.description} onChange={handleEditChange} /></td>
                    <td>
                      <button onClick={() => handleSave(exp.id)}>Save</button>
                    </td>
                  </tr>
                ) : (
                  <tr key={exp.id}>
                    <td>{exp.title}</td>
                    <td>{exp.amount}</td>
                    <td>{exp.category}</td>
                    <td>{exp.date}</td>
                    <td>{exp.description}</td>
                    <td className='edit-icon' onClick={() => handleEdit(exp)}>✏️
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>
        </div>
      )}
      {tab === 'delete' && (
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Description</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(exp => (
                <tr key={exp.id}>
                  <td>{exp.title}</td>
                  <td>{exp.amount}</td>
                  <td>{exp.category}</td>
                  <td>{exp.date}</td>
                  <td>{exp.description}</td>
                  <td onClick={() => handleDelete(exp.id)} className='delete-icon'> 🗑️
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'sort' && (
        <div className="table-container">
          <div className="sort-options">
            <button onClick={() => sortBy('amount')}>Sort by Amount</button>
            <button onClick={() => sortBy('date')}>Sort by Date</button>
            <button onClick={() => sortBy('category')}>Sort by Category</button>
          </div>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {sortedExpenses.map(exp => {
                const [year, month, day] = exp.date.split('-');
                const formattedDate = `${day}/${month}/${year}`;
                return (
                  <tr key={exp.id}>
                    <td>{exp.title}</td>
                    <td>{exp.amount}</td>
                    <td>{exp.category}</td>
                    <td>{formattedDate}</td>
                    <td>{exp.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default DashboardPage;
