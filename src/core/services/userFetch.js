import { callApi } from './api';
import apiConfig from './apiConfig';

export async function getUserProfile() {
  const user = await callApi('GET', apiConfig.URL_GET_USR_PROFILEF);
  return user.data;
}

export const updateUserProfile = async (dataUser) => {
  const user = await callApi('PATCH', apiConfig.URL_UPDATE_USR, dataUser);
  return user;
};

