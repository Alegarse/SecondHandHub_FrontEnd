import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRouteComponent = ({ children }) => {
  const isAuthenticated = useSelector(
    (state) => state.dashboardComponentReducer.isAuthenticated
  );
  const token = localStorage.getItem('access_token')

  return isAuthenticated && token ? children : <Navigate to="/" replace />;
};

export default PrivateRouteComponent;
