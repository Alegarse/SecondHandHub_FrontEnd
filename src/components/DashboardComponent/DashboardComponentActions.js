export const USER_DATA_LOGGED = "USER_DATA_LOGGED";
export const IS_AUTHENTICATED = "IS_AUTHENTICATED"
export const LOAD_PRODUCTS = "LOAD_PRODUCTS"

export const dataUserLoggedAction = (payload) => {
  return {
    type: USER_DATA_LOGGED,
    payload,
  };
};

export const isAuthenticatedAction = (payload) => {
  return {
    type: IS_AUTHENTICATED,
    payload,
  };
};

export const loadProductsAction = (payload) => {
  return {
    type: LOAD_PRODUCTS,
    payload,
  };
};


