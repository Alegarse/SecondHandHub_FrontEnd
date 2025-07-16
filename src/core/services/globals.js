const BASE_API_URL = 'http://localhost:3000/api';

const globals = {
  //AUTH URL ENDPOINTS
  URL_LOGIN: `${BASE_API_URL}/auth/login`,
  URL_REGISTER: `${BASE_API_URL}/auth/signup`,
  URL_REF_TOKEN: `${BASE_API_URL}/auth/refresh_token`,
  //USER URL ENDPOINTS
  URL_GET_USR_PROFILEF: `${BASE_API_URL}/user/profile`,
  URL_UPL_USR_PHOTO: `${BASE_API_URL}/user/profile/img`,
  URL_UPDATE_USR: `${BASE_API_URL}/user/update/`,
  URL_DELETE_USR: `${BASE_API_URL}/user/delete/`,
  URL_USR_SET_FAVORITE: `${BASE_API_URL}/user/favorite/`,
  URL_USR_DEL_FAVORITE: `${BASE_API_URL}/user/removefavorite/`,
  //PRODUCT URL ENDPOINTS
  URL_ADD_GET_PRODUCT: `${BASE_API_URL}/product`,
  URL_UPDATE_PRODUCT: `${BASE_API_URL}/product/update/`,
  URL_DELETE_PRODUCT: `${BASE_API_URL}/product/delete/`,
};

export default globals;
