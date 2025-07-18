import { CHANGE_MENU_OPTION } from './MenuComponentActions';

const initialState = {
  menuOption: undefined,
};

const menuComponentReducer = (state = initialState, action) => {

  const { type, payload } = action;

  switch (type) {
    case CHANGE_MENU_OPTION:
      return {
        ...state,
        menuOption: payload.menuOption,
      };
    default:
      return state;
  }
};

export default menuComponentReducer;