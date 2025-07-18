import { callApi } from "./api";
import apiConfig from "./apiConfig";

export async function getAllProducts() {

  const response = await callApi('GET', apiConfig.URL_ADD_GET_PRODUCT);
  return response.data;
}