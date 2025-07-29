import React from 'react';
import './../../css/ProductCard.css';
import { getValidImg, showToast } from '../../utils/utils';
import favtrue from '../../assets/favtrue.png';
import favfalse from '../../assets/favfalse.png';
import edit from '../../assets/edit.png';
import trash from './../../assets/trash.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  editProductAction,
  loadProductAction,
} from '../ProductComponent/ProductComponentActions';
import { setStateEditProductLayoutAction } from '../ProductComponentLayout/ProductComponentLayoutActions';

const ProductComponentCard = ({
  productInfo,
  isFavorite = null,
  onToggleFavorite = null,
  isOwner = null,
  removeProduct,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeFavState = (event) => {
    event.stopPropagation();
    if (typeof onToggleFavorite === 'function')
      onToggleFavorite(productInfo._id);
  };

  const goToProduct = (productId, isEdit = false) => {
    if (isEdit) {
      dispatch(
        loadProductAction({
          createModeProduct: false,
        })
      );
      dispatch(
        editProductAction({
          editModeProduct: true,
        })
      );
      dispatch(
        setStateEditProductLayoutAction({
          stateEditLayout: true,
        })
      );
      navigate(`/dashboard/products/edit/${productId}`);
    } else {
      dispatch(
        loadProductAction({
          createModeProduct: false,
        })
      );
      dispatch(
        editProductAction({
          editModeProduct: false,
        })
      );
      dispatch(
        setStateEditProductLayoutAction({
          stateEditLayout: false,
        })
      );
      navigate(`/dashboard/products/details/${productId}`);
    }
  };

  return (
    <div className="product-card">
      <img
        className="product-image"
        src={getValidImg(productInfo.images?.[0])}
        alt={productInfo.title || 'Image no available'}
        onClick={() => goToProduct(productInfo._id)}
      />
      <div className="product-info-card">
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
            <div className="buttons-product-actions">
              <img
                className="owner-product-select"
                src={trash}
                title="Eliminar producto"
                onClick={() => removeProduct(productInfo._id)}
              />
              <img
                className="owner-product-select"
                src={edit}
                title="Editar producto"
                onClick={() => goToProduct(productInfo._id, true)}
              />
            </div>
          )}
        </div>
        <p>{productInfo.title}</p>
      </div>
    </div>
  );
};

export default ProductComponentCard;
