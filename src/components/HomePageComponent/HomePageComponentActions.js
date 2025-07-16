export const CHANGE_USER_LOGGED_STATE = "CHANGE_USER_LOGGED_STATE";
export const CHANGE_HOME_VIEW = "CHANGE_HOME_VIEW";

export const changeUserLoggedStateActions = (payload) => {
  return {
    type: CHANGE_USER_LOGGED_STATE,
    payload,
  };
};

export const changeHomeViewAction = (payload) => {
  return {
    type: CHANGE_HOME_VIEW,
    payload,
  };
};
