import { callApi } from './api';
import apiConfig from './apiConfig';

export async function getUserProfile() {

  const user = await callApi('GET', apiConfig.URL_GET_USR_PROFILEF);
  return user.data;
}
