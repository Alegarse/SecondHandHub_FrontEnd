import { EDIT_PROFILE, LOAD_PROFILE } from "./ProfileComponentActions";

const initialState = {
  dataProfile: {},
  editMode: false,
};

const profileComponentReducer = (state = initialState, action) => {

  const { type, payload } = action;

  switch (type) {
    case LOAD_PROFILE:
      return {
        ...state,
        dataProfile: payload.dataProfile,
      };
      case EDIT_PROFILE:
        return {
          ...state,
          editMode: payload.editMode
        }
    default:
      return state;
  }
};

export default profileComponentReducer;