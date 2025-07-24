import { callApi } from './api';
import apiConfig from './apiConfig';

export async function getUserProfile() {
  const userProfile = await callApi('GET', apiConfig.URL_GET_USR_PROFILEF);
  return userProfile.data;
}

export const updateUserProfile = async (dataUser) => {
  return await callApi('PATCH', apiConfig.URL_UPDATE_USR, dataUser);
};

export const deleteUserProfile = async () => {
  return await callApi('DELETE', apiConfig.URL_DELETE_USR);
};

export const uploadImgProfile = async (imageData) => {
  return await callApi('POST', apiConfig.URL_UPL_USR_PHOTO, imageData, true);
};

export const addToFavorite = async (productId) => {
  const response = await callApi(
    'PATCH',
    `${apiConfig.URL_USR_SET_FAVORITE}${productId}`
  );
  return response.data;
};

export const removeFromFavorite = async (productId) => {
  const response = await callApi(
    'PATCH',
    `${apiConfig.URL_USR_DEL_FAVORITE}${productId}`
  );
  return response.data;
};
