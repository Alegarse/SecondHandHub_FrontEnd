export const DATA_USER_LOGGED = "DATA_USER_LOGGED";

export const dataUserLoggedAction = (payload) => {
  return {
    type: DATA_USER_LOGGED,
    payload,
  };
};
