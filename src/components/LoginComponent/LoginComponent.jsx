import React from "react";

const LoginComponent = () => {

  const inputLoginHandler = (input) => {

  }

  const doLogin = () => {

  }

  const validateFields = (userData) => {
    let isError = false;
    let errorMessage = ''
    if (!userData.email || userData.email === '') {
      errorMessage = 'El email no puede estar vacío';
      isError = true;
    } else if (!userData.password || userData.password === '') {
      errorMessage = 'La contraseña no puede estar vacía';
      isError = true;
    }
    if (isError) {
      showError(errorMessage);
    } else {
      doLogin();
    }

  }


  return (
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
      <button>Entrar</button>
    </div>
  );
};

export default LoginComponent;
