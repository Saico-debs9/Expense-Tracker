import React, { useState } from 'react';
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { login } from '../Services/authService';
import icon from '../Public/icon.png';
import { toast } from 'react-toastify';
import GoogleLoginButton from '../Components/GoogleLoginButton';
// import ThemeToggle from '../Components/ThemeToggle';

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
      
      const decoded = jwtDecode(res.data.token);
      const expiryTime = decoded.exp * 1000; 
      const delay = expiryTime - Date.now();

      if (delay > 0) {
        setTimeout(() => {
          localStorage.removeItem('token');
          navigate('/login');
        }, delay);
      } else {
        localStorage.removeItem('token');
        navigate('/login');
      }
      
      navigate('/');
      toast.success('Logged in successfully');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    
    <div className='form-container'>
      {/* <ThemeToggle /> */}
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
          <GoogleLoginButton />
        </form>
        
      </div>
    </div>
  );
};

export default LoginPage;
