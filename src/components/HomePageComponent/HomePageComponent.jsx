import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from '../../pages/Home/HomePage';
import DashboardPage from '../../pages/Dashboard/DashBoardPage';
import { checkUserToken } from '../../core/services/api';
import { useNavigate } from 'react-router-dom';
import { changeUserLoggedStateActions } from './HomePageComponentActions';

const HomePageComponent = () => {
  const userLoggedState = useSelector(
    (state) => state.homePageComponentReducer.isLogged
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) return;
      try {
        const res = await checkUserToken();
        if (res.status === 'Success') {
          dispatch(
            changeUserLoggedStateActions({
              isLogged: true,
            })
          );
          navigate('/dashboard');
        } else {
          console.error('Invalid or expired token');
          dispatch(
            changeUserLoggedStateActions({
              isLogged: false,
            })
          );
          localStorage.clear();
        }
      } catch (error) {
        console.error('Failed to verify access token', error);
        localStorage.clear();
      }
    };
    verifyToken();
  });

  return <>{userLoggedState === false ? <HomePage /> : <DashboardPage />}</>;
};

export default HomePageComponent;
