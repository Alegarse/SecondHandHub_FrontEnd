export const USER_DATA_LOGGED = "USER_DATA_LOGGED";

export const dataUserLoggedAction = (payload) => {
  return {
    type: USER_DATA_LOGGED,
    payload,
  };
};

