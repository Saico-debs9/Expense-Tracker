import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../Services/authService';
import icon from '../Public/icon.png';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
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
        <button type="submit">Login</button>
        <div className='link-container'><span>New here?</span><a className="link" href="/signup">Signin</a>
        </div>
      </form>
     
      </div>  
    </div>
  );
};

export default LoginPage;
