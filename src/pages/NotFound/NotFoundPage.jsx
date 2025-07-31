import React from 'react';
import './../../css/404Page.css';
import img404 from './../../assets/error-404.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isAuthenticatedAction } from '../../components/DashboardComponent/DashboardComponentActions';
import {
  changeHomeViewAction,
  changeUserLoggedStateActions,
} from '../../components/HomePageComponent/HomePageComponentActions';
import { changeMenuOptionActions } from '../../components/MenuComponent/MenuComponentActions';
import { delay, showToast } from '../../utils/utils';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closeSession = async () => {
    localStorage.clear();
    showToast('Volviendo a la home...');
    await delay(2500);
    dispatch(
      changeMenuOptionActions({
        menuOption: undefined,
      })
    );
    dispatch(
      isAuthenticatedAction({
        isAuthenticated: false,
        isSessionChecked: true,
      })
    );
    dispatch(
      changeUserLoggedStateActions({
        isLogged: false,
      })
    );
    dispatch(
      changeHomeViewAction({
        viewTypeHome: undefined,
      })
    );
    navigate('/');
  };

  return (
    <>
      <div className="body-404-container">
        <div className="page-404-container">
          <img className="" src={img404} alt="" />
          <div className="info-404-container">
            <h2 className="title-error-404">Error code: 404</h2>
            <h2>
              Ups! Parece que al que creaba las páginas de este sitio se le ha
              agotado la batería y ahora no encuentras lo que estabas
              buscando...
            </h2>
            <button className="btn-to-home" onClick={closeSession}>
              Volver a la home
            </button>
          </div>
        </div>
      </div>
      <div className="toast-message" id="toastMessage"></div>
    </>
  );
};

export default NotFoundPage;
