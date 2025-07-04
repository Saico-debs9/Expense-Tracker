import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../Services/authService';
import icon from '../Public/icon.png'

const SignupPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      alert('Signup successful');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className='form-container'>
      <div>
      <div className="logo">
        <img src={icon} alt="logo" />
        <h2>Expense Tracker</h2>
      </div>
      
      
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} />
        <button type="submit">Signup</button>
        <div className='link-container'><span>Already have an account?</span><a className="link" href="/login">Login</a>
        </div>

      </form>
      </div>
      </div>
  );
};

export default SignupPage;
