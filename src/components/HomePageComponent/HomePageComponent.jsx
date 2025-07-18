import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from '../../pages/Home/HomePage';
import DashboardPage from '../../pages/Dashboard/DashBoardPage';
import { checkUserToken } from '../../core/services/api';
import { useNavigate } from 'react-router-dom';
import { changeUserLoggedStateActions } from './HomePageComponentActions';

const HomePageComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const userLoggedState = useSelector(
    (state) => state.homePageComponentReducer.isLogged
  );

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await checkUserToken();
        if (res.status === 'Success') {
          dispatch(
            changeUserLoggedStateActions({
              isLogged: true,
            })
          );
        } else {
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
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, []);

  if (loading) return <div>Loading ...</div>;
  return <>{!userLoggedState ? <HomePage /> : <DashboardPage />}</>;
};

export default HomePageComponent;
