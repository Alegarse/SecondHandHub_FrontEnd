export const CHANGE_MENU_OPTION = 'CHANGE_MENU_OPTION';
export const INTO_DASHBOARD = 'INTO_DASHBOARD'

export const changeMenuOptionActions = (payload) => {
  return {
    type: CHANGE_MENU_OPTION,
    payload,
  };
};

export const checkIntoDashboardAction = (payload) => {
  return {
    type: INTO_DASHBOARD,
    payload,
  };
};
