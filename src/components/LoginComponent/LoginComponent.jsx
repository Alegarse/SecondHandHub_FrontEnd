import React, { useState } from "react";
import { validateEmail } from "../../utils/utils";
import { doLoginFetch } from "../../core/services/userFetch";

const LoginComponent = () => {
  const [dataLogin, setDataLogin] = useState({});

  const inputLoginHandler = (propName, propValue) => {
    setDataLogin({
      ...dataLogin,
      [propName]: propValue,
    });
  };

  const doLogin = async () => {
    await doLoginFetch(dataLogin);
  };

  const validateFields = (dataLogin) => {
    let isError = false;
    let countErrors = 0;
    let errorMessage = "";
    if (!dataLogin.email || dataLogin.email === "") {
      errorMessage += "Email";
      countErrors++;
      isError = true;
    }
    if (!dataLogin.password || dataLogin.password === "") {
      errorMessage === ""
        ? (errorMessage += "Contraseña")
        : (errorMessage += " y contraseña");
      countErrors++;
      isError = true;
    }
    if (isError) {
      countErrors > 1
        ? (errorMessage += " deben contener información")
        : (errorMessage += " debe contener información");
      showError(errorMessage);
    } else {
      if (!validateEmail(dataLogin.email)) {
        errorMessage = "Fórmato inválido de email";
        showError(errorMessage);
      } else {
        doLogin();
      }
    }
  };

  const showError = (message) => {
    const error = document.querySelector(".error_message");
    error.style.visibility = "visible";
    error.textContent = message;
    setTimeout(() => {
      error.style.visibility = "hidden";
    }, 2000);
  };

  return (
    <>
      <div className="form-user-login">
        <h3>Acceder a tu cuenta</h3>
        <div className="input-container">
          <span>Email: </span>
          <input
            type="text"
            onChange={(e) => inputLoginHandler("email", e.target.value)}
          />
        </div>
        <div className="input-container">
          <span>Contraseña: </span>
          <input
            type="password"
            onChange={(e) => inputLoginHandler("password", e.target.value)}
          />
        </div>
        <button onClick={() => validateFields(dataLogin)}>Entrar</button>
      </div>
      <div className="error_message"></div>
    </>
  );
};

export default LoginComponent;
