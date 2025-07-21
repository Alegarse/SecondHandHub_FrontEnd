export const LOAD_PROFILE = 'LOAD_PROFILE';
export const EDIT_PROFILE = 'EDIT_PROFILE'

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
