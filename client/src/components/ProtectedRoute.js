import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();
  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', background:'#07070f' }}>
      <div className="spinner" style={{ width:40, height:40 }} />
    </div>
  );
  return isAdmin ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
