import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('portfolio_token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      axios.get('/api/auth/verify')
        .then(res => setAdmin(res.data.admin))
        .catch(() => { localStorage.removeItem('portfolio_token'); delete axios.defaults.headers.common['Authorization']; })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password });
    const { token } = res.data;
    localStorage.setItem('portfolio_token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setAdmin(res.data);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('portfolio_token');
    delete axios.defaults.headers.common['Authorization'];
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading, isAdmin: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
};
