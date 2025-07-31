export const LOAD_PRODUCT = 'LOAD_PRODUCT';
export const INFO_PRODUCT = 'INFO_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';

export const loadProductAction = (payload) => {
  return {
    type: LOAD_PRODUCT,
    payload,
  };
};

export const editProductAction = (payload) => {
  return {
    type: EDIT_PRODUCT,
    payload,
  };
};

export const createProductAction = (payload) => {
  return {
    type: CREATE_PRODUCT,
    payload,
  };
};

export const infoProductAction = (payload) => {
  return {
    type: INFO_PRODUCT,
    payload,
  };
};
