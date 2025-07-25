export const USER_DATA_LOGGED = "USER_DATA_LOGGED";
export const IS_AUTHENTICATED = "IS_AUTHENTICATED";
export const LOAD_PRODUCTS = "LOAD_PRODUCTS";
export const SORT_ORDER_OPTION = "SORT_ORDER_OPTION";
export const SEARCH_BY_TITLE = 'SEARCH_BY_TITLE'

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

export const setSortOrderOptionAction = (payload) => {
  return {
    type: SORT_ORDER_OPTION,
    payload,
  };
};

export const searchByTitleAction = (payload) => {
  return {
    type: SEARCH_BY_TITLE,
    payload,
  };
};