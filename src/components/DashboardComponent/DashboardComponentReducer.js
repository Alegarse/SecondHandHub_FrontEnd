import {
  IS_AUTHENTICATED,
  LOAD_PRODUCTS,
  USER_DATA_LOGGED,
} from './DashboardComponentActions';

const initialState = {
  userDataLogged: null,
  isAuthenticated: false,
  isSessionChecked: false,
  productsList: null,
};

const dashboardComponentReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_DATA_LOGGED:
      return {
        ...state,
        userDataLogged: payload.userDataLogged,
      };
    case IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: payload.isAuthenticated,
        isSessionChecked: payload.isSessionChecked
      };
    case LOAD_PRODUCTS:
      return {
        ...state,
        productsList: payload.productsList,
      };
    default:
      return state;
  }
};

export default dashboardComponentReducer;
