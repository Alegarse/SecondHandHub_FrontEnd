import React, { useState } from 'react';
import { validateFields } from '../../utils/utils';
import { doLoginFetch } from '../../core/services/userFetch';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dataUserLoggedAction } from './LoginComponentActions';
import { changeHomeViewAction } from '../HomePageComponent/HomePageComponentActions';

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
      console.log(responseLogin);
      if (responseLogin.status === 'Success') {
        localStorage.setItem('access_token', responseLogin.token);
        localStorage.setItem('refresh_token', responseLogin.token_refresh);
        dispatch(
          dataUserLoggedAction({
            dataUserLogged: responseLogin.data,
          })
        );
        navigate('/dashboard');
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
      <div className="error_message"></div>
    </>
  );
};

export default LoginComponent;
