export const LOAD_PROFILE = 'LOAD_PROFILE';
export const EDIT_PROFILE = 'EDIT_PROFILE'
export const SELECT_ID_PROFILE = 'SELECT_ID_PROFILE'
export const IMG_PROFILE = 'IMG_PROFILE'
export const LOAD_PRODUCTS_USER = 'LOAD_PRODUCTS_USER'
export const LOAD_FAVORITES_PRODUCTS_USER = 'LOAD_FAVORITES_PRODUCTS_USER'

export const loadProfileAction = (payload) => {
  return {
    type: LOAD_PROFILE,
    payload,
  };
};

export const editProfileAction = (payload) => {
  return {
    type: EDIT_PROFILE,
    payload,
  }
}

export const selectIdProfileAction = (payload) => {
  return {
    type: SELECT_ID_PROFILE,
    payload,
  }
}

export const changeImgProfileAction = (payload) => {
  return {
    type: IMG_PROFILE,
    payload,
  }
}

export const loadProductsUserAction = (payload) => {
  return {
    type: LOAD_PRODUCTS_USER,
    payload,
  }
}

export const loadFavoritesProductsUserAction = (payload) => {
  return {
    type: LOAD_FAVORITES_PRODUCTS_USER,
    payload,
  }
}