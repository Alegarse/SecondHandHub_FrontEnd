import {
  IS_AUTHENTICATED,
  LOAD_PRODUCTS,
  SEARCH_BY_TITLE,
  SORT_ORDER_OPTION,
  USER_DATA_LOGGED,
} from "./DashboardComponentActions";

const initialState = {
  userDataLogged: null,
  isAuthenticated: false,
  isSessionChecked: false,
  productsList: null,
  sortOptionOrder: "createdAt_desc",
  searchByTitle: '',
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
        isSessionChecked: payload.isSessionChecked,
      };
    case LOAD_PRODUCTS:
      return {
        ...state,
        productsList: payload.productsList,
      };
    case SORT_ORDER_OPTION:
      return {
        ...state,
        sortOptionOrder: payload.sortOptionOrder,
      };
      case SEARCH_BY_TITLE:
      return {
        ...state,
        searchByTitle: payload.searchByTitle,
      };
    default:
      return state;
  }
};

export default dashboardComponentReducer;
