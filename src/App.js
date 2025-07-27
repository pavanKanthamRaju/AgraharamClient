import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom';
import LoginPage from './features/auth/pages/LoginPage';
import AuthLayout from './layouts/AuthLayout';
import DashboardPage from './pages/Dashboardpage';
import MainLayout from './layouts/MainLayout';
import SignUpPage from './features/auth/pages/SignUpPage';
import ProtectedRoute from './routes/ProtectedRoute';
import PoojaDetailsPage from './pages/PoojaDetailsPage';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
      <Route path="/signup" element={<AuthLayout><SignUpPage /></AuthLayout>}/>
      <Route path="/dashboard" element={<MainLayout><DashboardPage /></MainLayout>} />
      <Route path="/pooja/:id" element={<MainLayout> <PoojaDetailsPage /></MainLayout>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
