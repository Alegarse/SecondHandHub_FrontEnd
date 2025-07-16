import { errorsData } from '../../utils/errors';
import globals from './globals';

export const doLoginFetch = async (dataLogin) => {
  try {
    const response = await fetch(globals.URL_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataLogin),
    });
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error();
      error.status = 'ERR_LOGIN';
      error.message = errorsData[responseData.status];
      throw error;
    }
    return responseData;
  } catch (error) {
    if (error.status === 'ERR_LOGIN') {
      console.error(error.message);
    }
    return null;
  }
};

export const doRegisterFetch = async (dataRegister) => {};
