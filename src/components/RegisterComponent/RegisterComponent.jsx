import React, { useState } from 'react';
import { changeHomeViewAction } from '../HomePageComponent/HomePageComponentActions';
import { useDispatch } from 'react-redux';
import { doRegisterFetch } from '../../core/services/api';
import './../../css/Register.css';
import {
  buildLocationObject,
  delay,
  showToast,
  validateFields,
} from '../../utils/utils';

const RegisterComponent = () => {
  const [dataRegister, setDataRegister] = useState({});
  const [isRegistering, setIsRegistering] = useState(false);

  const dispatch = useDispatch();

  const inputRegisterHandler = (propName, propValue) => {
    setDataRegister({
      ...dataRegister,
      [propName]: propName === 'birthDate' ? new Date(propValue) : propValue,
    });
  };

  const doRegister = async () => {
    if (validateFields(dataRegister, true)) {
      setIsRegistering(true);

      try {
        const location = await buildLocationObject();
        dataRegister['location'] = location;
        const responseRegister = await doRegisterFetch(dataRegister);
        if (responseRegister.status === 'Success') {
          showToast(responseRegister.message);
          await delay(2000);
          dispatch(
            changeHomeViewAction({
              viewTypeHome: 'LOG',
            })
          );
        } else {
          showToast(responseRegister.message, 'error');
        }
      } catch (error) {
        console.error(error)
        showToast("Error al registrarse. Intentelo de nuevo.", 'error')
      } finally {
        setIsRegistering(false)
      }
    }
  };

  const goBack = () => {
    dispatch(
      changeHomeViewAction({
        viewTypeHome: undefined,
      })
    );
  };

  return (
    <div className="register-principal-container">
      <div className="register-container">
        <h3 className="title-register">Registro de nuevo usuario</h3>
        <div className="form-register" id="form-register">
          <label>Nombre: </label>
          <input
            type="text"
            onChange={(e) => inputRegisterHandler('firstName', e.target.value)}
          />
          <label>Apellidos: </label>
          <input
            type="text"
            onChange={(e) => inputRegisterHandler('lastName', e.target.value)}
          />
          <label>Fecha de nacimiento: </label>
          <input
            type="date"
            onChange={(e) => inputRegisterHandler('birthDate', e.target.value)}
          />
          <label>Email: </label>
          <input
            type="text"
            onChange={(e) => inputRegisterHandler('email', e.target.value)}
          />
          <label>Contraseña: </label>
          <input
            type="password"
            onChange={(e) => inputRegisterHandler('password', e.target.value)}
          />
          <div className="buttons-register-container">
            <button className="btn-do-register" onClick={doRegister} disabled={isRegistering}>
              Registrarse
            </button>
            <button className="btn-back" onClick={goBack} disabled={isRegistering}>
              Volver
            </button>
          </div>
        </div>
      </div>
      <div className="toast-message" id="toastMessage"></div>
    </div>
  );
};

export default RegisterComponent;
