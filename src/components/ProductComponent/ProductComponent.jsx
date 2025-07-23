import React from 'react';
import './../../css/ProductCard.css';
import { getValidImg } from '../../utils/utils';
import favtrue from '../../assets/favtrue.png';
import favfalse from '../../assets/favfalse.png';

const ProductComponent = ({ productInfo, isFavorite, onToggleFavorite }) => {
  const changeFavState = (event) => {
    event.stopPropagation(); // Evita que dispare el onClick del contenedor
    onToggleFavorite(productInfo._id);
  };

  return (
    <div className="product-card">
      <img
        className="product-image"
        src={getValidImg(productInfo.images?.[0])}
        alt={productInfo.title || 'Image no available'}
      />
      <div className="product-info">
        <div className="product-price-fav">
          <h3>{`${productInfo.price}€`}</h3>
          <img
            className="favourite-select"
            src={isFavorite ? favtrue : favfalse}
            title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            onClick={(e) => {changeFavState(e)}}
          />
        </div>
        <p>{productInfo.title}</p>
      </div>
    </div>
  );
};

export default ProductComponent;
