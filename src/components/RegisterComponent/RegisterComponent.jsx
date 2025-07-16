import React, { useState } from 'react'
import { doRegisterFetch } from '../../core/services/userFetch';
import { validateFields } from '../../utils/utils';
import { changeHomeViewAction } from '../HomePageComponent/HomePageComponentActions';
import { useDispatch } from 'react-redux';

const RegisterComponent = () => {
  const [dataRegister, setDataRegister] = useState({});

  const dispatch = useDispatch();
  
    const inputRegisterHandler = (propName, propValue) => {
      setDataRegister({
        ...dataRegister,
        [propName]: propValue,
      });
    };
  
    const doRegister = async () => {
      if (validateFields(dataRegister, true)) {
        await doRegisterFetch(dataRegister);
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
      <>
        <div className="form-user-register">
          <h3>Registro de nuevo usuario</h3>
          <br />
          <h5>¿Aún no tienes cuenta?</h5>
          <h5>¡Rellena los campos y entra a la revolución de SecondHand Hub!</h5>
          <div className="input-container">
            <div className="input-container">
            <span>Email: </span>
            <input
              type="text"
              onChange={(e) => inputRegisterHandler("email", e.target.value)}
            />
          </div>
          <div className="input-container">
            <span>Contraseña: </span>
            <input
              type="password"
              onChange={(e) => inputRegisterHandler("password", e.target.value)}
            />
          </div>
          <br />
            <span>Nombre: </span>
            <input
              type="text"
              onChange={(e) => inputRegisterHandler("firstName", e.target.value)}
            />
          </div>
          <div className="input-container">
            <span>Apellidos: </span>
            <input
              type="text"
              onChange={(e) => inputRegisterHandler("lastName", e.target.value)}
            />
          </div>
          <div className="input-container">
            <span>Fecha de nacimiento: </span>
            <input
              type="text"
              onChange={(e) => inputRegisterHandler("birthDate", e.target.value)}
            />
          </div>
          <div className="input-container">
            <span>Ubicación: </span>
            <input
              type="text"
              onChange={(e) => inputRegisterHandler("location", e.target.value)}
            />
          </div>
          <button onClick={doRegister}>Registrarse</button>
          <button onClick={goBack}>Volver</button>
        </div>
        <div className="error_message"></div>
      </>
    );
}

export default RegisterComponent