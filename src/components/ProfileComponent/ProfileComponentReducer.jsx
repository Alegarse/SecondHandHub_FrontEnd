import {
  EDIT_PROFILE,
  IMG_PROFILE,
  LOAD_PROFILE,
  SELECT_ID_PROFILE,
} from './ProfileComponentActions';

const initialState = {
  dataProfile: {},
  editMode: false,
  profileId: undefined,
  profileImg: '',
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
        editMode: payload.editMode,
      };
    case SELECT_ID_PROFILE:
      return {
        ...state,
        profileId: payload.profileId,
      };
    case IMG_PROFILE:
      return {
        ...state,
        profileImg: payload.profileImg,
      };
    default:
      return state;
  }
};

export default profileComponentReducer;
