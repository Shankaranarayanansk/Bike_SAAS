import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import OwnerDashboard from './pages/OwnerDashboard';
import CustomerDashboard from './pages/CustomerDashboard';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = () => {
  const { user, loading, checkAuthStatus } = useAuth();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  if (loading) {
    return <div>Loading...</div>; // Or a proper loading component
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
        path="/login" 
        element={user ? <Navigate to={`/${user.role}-dashboard`} /> : <Login />} 
      />
      <Route 
        path="/register" 
        element={user ? <Navigate to={`/${user.role}-dashboard`} /> : <Register />} 
      />
      <Route
        path="/owner-dashboard"
        element={
          <ProtectedRoute requiredRole="owner">
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer-dashboard"
        element={
          <ProtectedRoute requiredRole="customer">
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </Router>
    </AuthProvider>
  );
};

export default App;