const utilsData = {
    regex_mail: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
}

export const validateEmail = (email) => {
  return utilsData.regex_mail.test(email);
};

