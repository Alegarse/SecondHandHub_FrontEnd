import { errorsData } from '../../utils/errors';
import apiConfig from './apiConfig';

// All endpoints call
export async function callApi(method, url, data = null, upload = false) {
  try {
    return await makeAuthorizedRequest(method, url, data, upload);
  } catch (error) {
    if (error.status === 401) {
      try {
        await refreshToken();
        return await makeAuthorizedRequest(method, url, data, upload);
      } catch (refreshError) {
        console.error(refreshError.message);
      }
    }
    throw error;
  }
}

// Verify Authorized petition
async function makeAuthorizedRequest(method, url, data = null, upload) {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('Token no existe');
  }
  let headers = {};
  if (!upload) {
    headers = { 'Content-Type': 'application/json', 'auth-token': token };
  } else {
    headers = { 'auth-token': token };
  }

  const response = await fetch(url, {
    method,
    headers,
    body: data ? (upload ? data : JSON.stringify(data)) : null,
  });

  if (!response.ok) {
    console.error('Error en la petición');
    const error = new Error('Error en la petición');
    error.status = response.status;
    throw error;
  }
  return response.json();
}

// Get Token refresh
async function refreshToken() {
  try {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) throw new Error('Token de resfresco no existe');
    const urlRefreshToken = apiConfig.URL_REF_TOKEN;
    const renoveTokens = await fetch(urlRefreshToken, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'auth-token': refresh },
    });
    const dataTokens = await renoveTokens.json();
    if (dataTokens) {
      // SAVE DATA TO LOCAL STORAGE
      localStorage.setItem('access_token', dataTokens.token);
      localStorage.setItem('refresh_token', dataTokens.token_refresh);
    }
  } catch (error) {
    if (error.status === 401) {
      console.error(error.message);
    }
  }
}

export const doLoginFetch = async (dataLogin) => {
  try {
    const response = await fetch(apiConfig.URL_LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataLogin),
    });
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error();
      error.status = responseData.status;
      error.message = errorsData[error.status];
      throw error;
    }
    return responseData;
  } catch (error) {
    console.error(error.message);
    return error;
  }
};

export const doRegisterFetch = async (dataRegister) => {
  try {
    const response = await fetch(apiConfig.URL_REGISTER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataRegister),
    });
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error();
      error.status = responseData.status;
      error.message = errorsData[error.status];
      throw error;
    }
    return responseData;
  } catch (error) {
    console.error(error.message);
    return error;
  }
};

export const checkUserToken = async () => {
  const response = await callApi('GET', apiConfig.URL_VER_TOKEN);
  return response;
};
