import React from 'react';
import '../../css/Product.css';
import { useSelector } from 'react-redux';
import NewProductComponent from '../NewProductComponent/NewProductComponent';
import EditProductComponent from '../EditProductComponent/EditProductComponent';
import DetailsProductComponent from '../DetailsProductComponent/DetailsProductComponent';

const ProductComponent = () => {
  const { createModeProduct, editModeProduct, onProductInfo } = useSelector(
    (state) => state.productComponentReducer
  );

  return (
    <div className="product-principal-container">
      {createModeProduct && <NewProductComponent />}
      {editModeProduct && onProductInfo && <EditProductComponent />}
      {!createModeProduct && !editModeProduct && onProductInfo && <DetailsProductComponent />}
    </div>
  );
};

export default ProductComponent;
