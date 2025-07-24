import React from 'react';
import './../../css/ProductCard.css';
import { getValidImg, showToast } from '../../utils/utils';
import favtrue from '../../assets/favtrue.png';
import favfalse from '../../assets/favfalse.png';
import edit from '../../assets/edit.png';

const ProductComponentCard = ({
  productInfo,
  isFavorite = null,
  onToggleFavorite = null,
  isOwner = null,
}) => {
  const changeFavState = (event) => {
    event.stopPropagation();
    if (typeof onToggleFavorite === 'function')
      onToggleFavorite(productInfo._id);
  };

  const goToEditProduct = (productId) => {
    showToast(`A editar producto ${productId}`);
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
          {onToggleFavorite && (
            <img
              className="favourite-select"
              src={isFavorite ? favtrue : favfalse}
              title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              onClick={(e) => {
                changeFavState(e);
              }}
            />
          )}
          {isOwner && (
            <img
              className="owner-product-select"
              src={edit}
              title="Editar producto"
              onClick={() => goToEditProduct(productInfo._id)}
            />
          )}
        </div>
        <p>{productInfo.title}</p>
      </div>
    </div>
  );
};

export default ProductComponentCard;
