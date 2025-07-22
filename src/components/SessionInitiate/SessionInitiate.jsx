import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { isAuthenticatedAction } from '../DashboardComponent/DashboardComponentActions';
import { changeUserLoggedStateActions } from '../HomePageComponent/HomePageComponentActions';
import { loadProfileAction } from '../ProfileComponent/ProfileComponentActions';

const SessionInitiate = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const userStored = localStorage.getItem('user_data');
    const token = localStorage.getItem('access_token');

    if (userStored && token) {
      const userData = JSON.parse(userStored);
      dispatch(
        isAuthenticatedAction({
          isAuthenticated: true,
          isSessionChecked: true,
        })
      );
      dispatch(changeUserLoggedStateActions({ isLogged: true }));
      dispatch(loadProfileAction({ dataProfile: userData }));
    } else {
      dispatch(
        isAuthenticatedAction({
          isAuthenticated: false,
          isSessionChecked: false,
        })
      );
    }
  });
  return null;
};

export default SessionInitiate;
