import React, { useState } from "react";
import { buildLocationObject, delay, showToast, validateFields } from "../../utils/utils";
import { changeHomeViewAction } from "../HomePageComponent/HomePageComponentActions";
import { useDispatch } from "react-redux";
import { doRegisterFetch } from "../../core/services/api";

const RegisterComponent = () => {
  const [dataRegister, setDataRegister] = useState({});

  const dispatch = useDispatch();

  const inputRegisterHandler = (propName, propValue) => {
    setDataRegister({
      ...dataRegister,
      [propName]: propName === 'birthDate'? new Date(propValue): propValue,
    });
  };

  const doRegister = async () => {

    if (validateFields(dataRegister, true)) {
      const location = await buildLocationObject();
      dataRegister['location'] = location
      const responseRegister = await doRegisterFetch(dataRegister);
      if (responseRegister.status === "Success") {
        showToast(responseRegister.message)
        await delay(2000)
        dispatch(
          changeHomeViewAction({
            viewTypeHome: "LOG",
          })
        );
      } else {
        showToast(responseRegister.message, 'error')
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
            type="date"
            onChange={(e) => inputRegisterHandler("birthDate", e.target.value)}
          />
        </div>
        <button onClick={doRegister}>Registrarse</button>
        <button onClick={goBack}>Volver</button>
      </div>
      <div className="toast-message" id="toastMessage"></div>
    </>
  );
};

export default RegisterComponent;
