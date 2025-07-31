import { callApi } from "./api";
import apiConfig from "./apiConfig";

export async function getAllProducts() {

  const response = await callApi('GET', apiConfig.URL_ADD_GET_PRODUCT);
  return response.data;
}

export async function uploadNewProductFetch(productData) {
  const response = await callApi('POST', apiConfig.URL_ADD_GET_PRODUCT, productData);
  return response;
}

export async function deleteProductFetch(productId) {
  const response = await callApi('DELETE', `${apiConfig.URL_DELETE_PRODUCT}${productId}`);
  return response;
}

export async function getProductByIdFetch(productId) {
  const response = await callApi('GET', `${apiConfig.URL_ADD_GET_PRODUCT}/${productId}`);
  return response.data;
}

export async function updateNewProductFetch(productData) {
  const response = await callApi('PATCH', `${apiConfig.URL_UPDATE_PRODUCT}${productData._id}`, productData);
  return response;
}