const utilsData = {
  regex_mail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
};

const validateEmail = (email) => {
  return utilsData.regex_mail.test(email);
};

export const validateFields = (data) => {
  let isError = false;
  let countErrors = 0;
  let errorMessage = "";
  if (!data.email || data.email === "") {
    errorMessage += "Email";
    countErrors++;
    isError = true;
  }
  if (!data.password || data.password === "") {
    errorMessage === ""
      ? errorMessage += "Contraseña"
      : errorMessage += ", contraseña";
    countErrors++;
    isError = true;
  }
  if (isError) {
    countErrors > 1
      ? errorMessage += " deben contener información"
      : errorMessage += " debe contener información";
    showError(errorMessage);
  } else {
    if (!validateEmail(data.email)) {
      errorMessage = "Fórmato inválido de email";
      showError(errorMessage);
    } else {
      return true;
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
  return false;
};
