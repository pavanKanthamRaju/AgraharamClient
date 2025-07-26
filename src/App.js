import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import LoginPage from './features/auth/pages/LoginPage';
import AuthLayout from './layouts/AuthLayout';
import DashboardPage from './features/auth/pages/DashboardPage';
import MainLayout from './layouts/MainLayout';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
      <Route path="/dashboard" element={<MainLayout><DashboardPage /></MainLayout>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
