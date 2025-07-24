import React from 'react';
import '../../css/Product.css';
import { useSelector } from 'react-redux';
import NewProductComponent from '../NewProductComponent/NewProductComponent';

const ProductComponent = () => {
  const { createModeProduct } = useSelector(
    (state) => state.productComponentReducer
  );

  return (
    <div className="product-principal-container">
      {createModeProduct && <NewProductComponent />}
    </div>
  );
};

export default ProductComponent;
