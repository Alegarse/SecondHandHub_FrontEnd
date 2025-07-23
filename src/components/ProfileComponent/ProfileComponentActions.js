export const LOAD_PROFILE = 'LOAD_PROFILE';
export const EDIT_PROFILE = 'EDIT_PROFILE'
export const SELECT_ID_PROFILE = 'SELECT_ID_PROFILE'
export const IMG_PROFILE = 'IMG_PROFILE'

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