import React, { createContext, useState, useEffect } from 'react';
import { login, register, logout, getCurrentUser } from '../services/auth';

export const AuthContext = createContext();

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
    const userData = await login(credentials);
    setUser(userData);
  };

  const registerUser = async (userData) => {
    const newUser = await register(userData);
    setUser(newUser);
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login: loginUser, register: registerUser, logout: logoutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};