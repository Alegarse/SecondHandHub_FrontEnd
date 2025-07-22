import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRouteComponent = ({ children }) => {
  const { isAuthenticated, isSessionChecked } = useSelector(
    (state) => state.dashboardComponentReducer
  );
  const token = localStorage.getItem('access_token');

  if (!isSessionChecked) {
    return <div>Loading session...</div>
  }

  return isAuthenticated && token ? children : <Navigate to="/" replace />;
};

export default PrivateRouteComponent;
