import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeHomeViewAction } from '../HomePageComponent/HomePageComponentActions';
import { doLoginFetch } from '../../core/services/api';
import { isAuthenticatedAction } from '../DashboardComponent/DashboardComponentActions';
import './../../css/Login.css';
import { delay, showToast, validateFields } from '../../utils/utils';

const LoginComponent = () => {
  const [dataLogin, setDataLogin] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const inputLoginHandler = (propName, propValue) => {
    setDataLogin({
      ...dataLogin,
      [propName]: propValue,
    });
  };

  const goBack = () => {
    dispatch(
      changeHomeViewAction({
        viewTypeHome: undefined,
      })
    );
  };

  const doLogin = async () => {
    if (validateFields(dataLogin)) {
      const responseLogin = await doLoginFetch(dataLogin);
      if (responseLogin.status === 'Success') {
        localStorage.setItem('access_token', responseLogin.token);
        localStorage.setItem('refresh_token', responseLogin.token_refresh);
        dispatch(
          isAuthenticatedAction({
            isAuthenticated: true,
          })
        );
        showToast('Usuario logeado correctamente');
        await delay(2500);
        navigate('/dashboard/products');
      } else {
        showToast(responseLogin.message, 'error');
      }
    }
  };

  return (
    <div className="login-principal-container">
      <div className="login-container">
        <h3 className="title-login">Acceder a tu cuenta</h3>
        <div className="form-login" id="form-login">
          <label>Email: </label>
          <input
            type="text"
            onChange={(e) => inputLoginHandler('email', e.target.value)}
          />
          <label>Contraseña: </label>
          <input
            type="password"
            onChange={(e) => inputLoginHandler('password', e.target.value)}
          />
          <div className="buttons-login-container">
            <button className="btn-do-login" onClick={doLogin}>
              Entrar
            </button>
            <button className="btn-back" onClick={goBack}>
              Volver
            </button>
          </div>
        </div>
      </div>
      <div className="toast-message" id="toastMessage"></div>
    </div>
  );
};

export default LoginComponent;
