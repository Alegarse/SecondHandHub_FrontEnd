import React from 'react';
import '../../css/Product.css';
import { useSelector } from 'react-redux';
import NewProductComponent from '../NewProductComponent/NewProductComponent';
import EditProductComponent from '../EditProductComponent/EditProductComponent';
import DetailsProductComponent from '../DetailsProductComponent/DetailsProductComponent';

const ProductComponent = () => {
  const { createModeProduct, editModeProduct } = useSelector(
    (state) => state.productComponentReducer
  );

  return (
    <div className="product-principal-container">
      {createModeProduct && <NewProductComponent />}
      {editModeProduct && <EditProductComponent />}
      {!createModeProduct && !editModeProduct && <DetailsProductComponent />}
    </div>
  );
};

export default ProductComponent;
