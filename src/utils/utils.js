const utilsData = {
  regex_mail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

const validateEmail = (email) => {
  return utilsData.regex_mail.test(email);
};

export const validateFields = (data, inReg = false) => {
  let isError = false;
  let countErrors = 0;
  let errorMessage = '';
  if (!data.email || data.email === '') {
    errorMessage += 'Email';
    countErrors++;
    isError = true;
  }
  if (!data.password || data.password === '') {
    errorMessage === ''
      ? (errorMessage += 'Contraseña')
      : (errorMessage += ', contraseña');
    countErrors++;
    isError = true;
  }
  if (inReg) {
    if (!data.firstName || data.firstName === '') {
      errorMessage === ''
        ? (errorMessage += 'Nombre')
        : (errorMessage += ', nombre');
      countErrors++;
      isError = true;
    }
    if (!data.lastName || data.lastName === '') {
      errorMessage === ''
        ? (errorMessage += 'Apellidos')
        : (errorMessage += ', apellidos');
      countErrors++;
      isError = true;
    }
    if (!data.birthDate || data.birthDate === '') {
      errorMessage === ''
        ? (errorMessage += 'Fecha de nacimiento')
        : (errorMessage += ', fecha de nacimiento');
      countErrors++;
      isError = true;
    }
    if (!data.location || data.location === '') {
      errorMessage === ''
        ? (errorMessage += 'Ubicacion')
        : (errorMessage += ', ubicacion');
      countErrors++;
      isError = true;
    }
  }
  if (isError) {
    countErrors > 1
      ? (errorMessage += ' deben contener información')
      : (errorMessage += ' debe contener información');
    showError(errorMessage);
  } else {
    if (!validateEmail(data.email)) {
      errorMessage = 'Fórmato inválido de email';
      showError(errorMessage);
    } else {
      return true;
    }
  }
};

const showError = (message) => {
  const error = document.querySelector('.error_message');
  error.style.visibility = 'visible';
  error.textContent = message;
  setTimeout(() => {
    error.style.visibility = 'hidden';
  }, 2000);
  return false;
};
