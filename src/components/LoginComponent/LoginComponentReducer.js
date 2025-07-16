import { DATA_USER_LOGGED } from "./LoginComponentActions";

const initialState = {
  dataUserLogged: undefined,
};

const loginComponentReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case DATA_USER_LOGGED:
      return {
        ...state,
        dataUserLogged: payload.dataUserLogged,
      };
    default:
      return state;
  }
};

export default loginComponentReducer;
