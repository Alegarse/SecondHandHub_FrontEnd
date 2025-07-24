import {
  EDIT_PROFILE,
  IMG_PROFILE,
  LOAD_FAVORITES_PRODUCTS_USER,
  LOAD_PRODUCTS_USER,
  LOAD_PROFILE,
  SELECT_ID_PROFILE,
} from "./ProfileComponentActions";

const initialState = {
  dataProfile: null,
  editMode: false,
  profileId: undefined,
  profileImg: "",
  dataProductsUser: null,
  dataFavoritesProductsUser: null,
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
    case LOAD_PRODUCTS_USER:
      return {
        ...state,
        dataProductsUser: payload.dataProductsUser,
      };
    case LOAD_FAVORITES_PRODUCTS_USER:
      return {
        ...state,
        dataFavoritesProductsUser: payload.dataFavoritesProductsUser,
      };
    default:
      return state;
  }
};

export default profileComponentReducer;
