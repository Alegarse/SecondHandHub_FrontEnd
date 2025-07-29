import {
  ORIGIN_TO_BACK,
  STATE_EDIT_LAYOUT,
} from './ProductComponentLayoutActions';

export const origins = {
  PROFILE: 'PROFILE',
  DASHBOARD: 'DASHBOARD',
};

const initialState = {
  stateEditLayout: false,
  originToBack: origins.DASHBOARD,
};

const productComponentLayoutReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case STATE_EDIT_LAYOUT:
      return {
        ...state,
        stateEditLayout: payload.stateEditLayout,
      };
    case ORIGIN_TO_BACK:
      return {
        ...state,
        originToBack: payload.originToBack,
      };
    default:
      return state;
  }
};

export default productComponentLayoutReducer;
