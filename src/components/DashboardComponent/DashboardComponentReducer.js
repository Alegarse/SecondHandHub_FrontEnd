import { USER_DATA_LOGGED } from "./DashboardComponentActions";

const initialState = {
  userDataLogged: undefined,
};

const dashboardComponentReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_DATA_LOGGED:
      return {
        ...state,
        userDataLogged: payload.userDataLogged,
      };
    default:
      return state;
  }
};

export default dashboardComponentReducer;
