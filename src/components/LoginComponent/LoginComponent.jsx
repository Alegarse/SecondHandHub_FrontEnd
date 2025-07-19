import React, { useState } from 'react';
import { delay, showToast, validateFields } from '../../utils/utils';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeHomeViewAction } from '../HomePageComponent/HomePageComponentActions';
import { doLoginFetch } from '../../core/services/api';
import { isAuthenticatedAction } from '../DashboardComponent/DashboardComponentActions';

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
    <>
      <div className="form-user-login">
        <h3>Acceder a tu cuenta</h3>
        <div className="input-container">
          <span>Email: </span>
          <input
            type="text"
            onChange={(e) => inputLoginHandler('email', e.target.value)}
          />
        </div>
        <div className="input-container">
          <span>Contraseña: </span>
          <input
            type="password"
            onChange={(e) => inputLoginHandler('password', e.target.value)}
          />
        </div>
        <button onClick={doLogin}>Entrar</button>
        <button onClick={goBack}>Volver</button>
      </div>
      <div className="toast-message" id="toastMessage"></div>
    </>
  );
};

export default LoginComponent;
