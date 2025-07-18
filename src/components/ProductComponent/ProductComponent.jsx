import React from 'react';
import './../../css/ProductCard.css';
import { getValidImg } from '../../utils/utils';

const ProductComponent = ({ productInfo }) => {
  return (
    <div className="product-card">
      <img
        className="product-image"
        src={getValidImg(productInfo.images?.[0])}
        alt={productInfo.title || 'Image no available'}
      />
      <div className="product-info">
        <h3>{`${productInfo.price}€`}</h3>
        <p>{productInfo.title}</p>
      </div>
    </div>
  );
};

export default ProductComponent;
