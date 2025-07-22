import { callApi } from './api';
import apiConfig from './apiConfig';

export async function getUserProfile() {
  const userProfile = await callApi('GET', apiConfig.URL_GET_USR_PROFILEF);
  return userProfile.data;
}

export const updateUserProfile = async (dataUser) => {
  const userUpdated = await callApi('PATCH', apiConfig.URL_UPDATE_USR, dataUser);
  return userUpdated;
};

export const deleteUserProfile = async () => {
  const userDeleted = await callApi('DELETE', apiConfig.URL_DELETE_USR);
  return userDeleted;
}

