import { CHANGE_MENU_OPTION, INTO_DASHBOARD } from './MenuComponentActions';

const initialState = {
  menuOption: undefined,
  intoDashboard: 0,
};

const menuComponentReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_MENU_OPTION:
      return {
        ...state,
        menuOption: payload.menuOption,
      };
    case INTO_DASHBOARD:
      return {
        ...state,
        intoDashboard: payload.intoDashboard,
      };
    default:
      return state;
  }
};

export default menuComponentReducer;
