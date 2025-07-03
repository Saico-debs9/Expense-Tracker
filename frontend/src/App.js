import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import DashboardPage from './Pages/DashboardPage';
import ProtectedRoute from './Components/ProtectedRoute';
import './Styles/App.css'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
    </Routes>
  </BrowserRouter>
);

export default App;
