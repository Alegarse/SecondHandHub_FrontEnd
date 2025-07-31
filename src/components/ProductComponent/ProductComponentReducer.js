import { CREATE_PRODUCT, EDIT_PRODUCT, INFO_PRODUCT, LOAD_PRODUCT } from "./ProductComponentActions";

const initialState = {
  dataProduct: null,
  onProductInfo: false,
  editModeProduct: false,
  createModeProduct: false,
};

const productComponentReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_PRODUCT:
      return {
        ...state,
        dataProduct: payload.dataProduct,
      };
      case EDIT_PRODUCT:
      return {
        ...state,
        editModeProduct: payload.editModeProduct,
      };
      case CREATE_PRODUCT:
      return {
        ...state,
        createModeProduct: payload.createModeProduct,
      };
      case INFO_PRODUCT:
      return {
        ...state,
        onProductInfo: payload.onProductInfo,
      };
    default:
      return state;
  }
};

export default productComponentReducer;