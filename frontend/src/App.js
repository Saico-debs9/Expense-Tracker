import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import DashboardPage from './Pages/DashboardPage';
import ProtectedRoute from './Components/ProtectedRoute';
import './Styles/App.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { ThemeProvider} from './Theme/ThemeContext'

const App = () => (
  // <ThemeProvider>
  <BrowserRouter>
  <ToastContainer position="top-right" autoClose={5000} theme='dark'/>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
    </Routes>
  </BrowserRouter>
  // </ThemeProvider>
);

export default App;
