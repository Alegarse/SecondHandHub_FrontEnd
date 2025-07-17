import { callApi } from "./api";
import apiConfig from "./apiConfig";

export async function getUserProfile() {
  try {
    const user = await callApi("GET", apiConfig.URL_GET_USR_PROFILEF);

    return user.data

  } catch (error) {
    throw error;
  }
}