import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { login, register, logout, getCurrentUser } from '../services/auth';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const loginUser = async (credentials) => {
    try {
      const userData = await login(credentials);
      setUser(userData);
      toast.success('Login successful!');
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || 'Login failed. Please try again.');
      throw error;
    }
  };

  const registerUser = async (userData) => {
    try {
      const newUser = await register(userData);
      setUser(newUser);
      toast.success('Registration successful!');
      return newUser;
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.message || 'Registration failed. Please try again.');
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
      setUser(null);
      toast.success('Logged out successfully.');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  const checkAuthStatus = async () => {
    try {
      const userData = await getCurrentUser();
      setUser(userData);
      return !!userData;
    } catch (error) {
      console.error('Auth status check error:', error);
      setUser(null);
      return false;
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login: loginUser, 
        register: registerUser, 
        logout: logoutUser, 
        loading,
        checkAuthStatus,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};