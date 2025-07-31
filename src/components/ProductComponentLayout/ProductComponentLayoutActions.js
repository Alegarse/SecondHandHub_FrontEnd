export const STATE_EDIT_LAYOUT = 'STATE_EDIT_LAYOUT';
export const ORIGIN_TO_BACK = 'ORIGIN_TO_BACK'
 
export const setStateEditProductLayoutAction = (payload) => {
  return {
    type: STATE_EDIT_LAYOUT,
    payload,
  };
};

export const setOriginToBackProductLayoutAction = (payload) => {
  return {
    type: ORIGIN_TO_BACK,
    payload,
  };
};