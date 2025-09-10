import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../Services/authService';
import icon from '../Public/icon.png'
import { toast } from 'react-toastify';
import GoogleLoginButton from '../Components/GoogleLoginButton'
// import ThemeToggle from '../Components/ThemeToggle';

const SignupPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(form);
      toast.success('Signup successful. Please Login');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Signup failed');
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
        <button type="submit">Signup</button>
        <div className='link-container'><span>Already have an account?</span><a className="link" href="/login">Login</a>
        </div>

      </form>
      <GoogleLoginButton />
      </div>
      </div>
  );
};

export default SignupPage;
