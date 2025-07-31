import React, { useEffect } from "react";
import "../../css/Product.css";
import { useDispatch, useSelector } from "react-redux";
import NewProductComponent from "../NewProductComponent/NewProductComponent";
import EditProductComponent from "../EditProductComponent/EditProductComponent";
import DetailsProductComponent from "../DetailsProductComponent/DetailsProductComponent";
import { createProductAction, editProductAction, infoProductAction } from "./ProductComponentActions";

const ProductComponent = () => {
  const { createModeProduct, editModeProduct, onProductInfo } = useSelector(
    (state) => state.productComponentReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      editProductAction({
        editModeProduct: localStorage.getItem("editMode"),
      })
    );
    dispatch(
      createProductAction({
        createModeProduct: localStorage.getItem("createMode"),
      })
    );
    dispatch(
      infoProductAction({
        onProductInfo: localStorage.getItem("onProductInfo")
      })
    )
  }, []);

  return (
    <div className="product-principal-container">
      {createModeProduct && <NewProductComponent />}
      {editModeProduct && onProductInfo && <EditProductComponent />}
      {!createModeProduct && !editModeProduct && onProductInfo && (
        <DetailsProductComponent />
      )}
    </div>
  );
};

export default ProductComponent;
