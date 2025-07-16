import {
  CHANGE_ERROR_MESSAGE,
  CHANGE_HOME_VIEW,
  CHANGE_USER_LOGGED_STATE,
} from "./HomePageComponentActions";

const initialState = {
  isLogged: false,
  viewTypeHome: "GEN",
  errorMessage: "",
};

const homePageComponentReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANGE_USER_LOGGED_STATE:
      return {
        ...state,
        isLogged: payload.isLogged,
      };
    case CHANGE_HOME_VIEW:
      return {
        ...state,
        viewTypeHome: payload.viewTypeHome,
      };
    case CHANGE_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: payload.errorMessage,
      };
    default:
      return state;
  }
};

export default homePageComponentReducer;
