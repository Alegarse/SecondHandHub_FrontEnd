import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProductsAction } from './DashboardComponentActions';
import { getAllProducts } from '../../core/services/productFetch';
import ProductComponent from '../ProductComponent/ProductComponent';
import './../../css/DashBoard.css';
import {
  addToFavorite,
  getUserProfile,
  removeFromFavorite,
} from '../../core/services/userFetch';
import { showToast } from '../../utils/utils';
import { loadProfileAction } from '../ProfileComponent/ProfileComponentActions';

const PRODUCTS_LOAD = 20;

const DashboardComponent = () => {
  const dispatch = useDispatch();
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_LOAD);

  const availableProductsList = useSelector(
    (state) => state.dashboardComponentReducer.productsList
  );

  const userData = useSelector(
    (state) => state.profileComponentReducer.dataProfile
  );

  const isProductFavorite = (productId) => {
    return userData?.favorites?.includes(productId);
  };

  const handleToggleFavorite = async (productId) => {
    try {
      const alreadyFavorite = isProductFavorite(productId);

      if (alreadyFavorite) {
        await removeFromFavorite(productId);
      } else {
        await addToFavorite(productId);
      }

      const updatedProfile = await getUserProfile();
      dispatch(loadProfileAction({ dataProfile: updatedProfile }));
    } catch (error) {
      console.error(error.message);
      showToast('Error al cambiar el estado del favorito', 'error');
    }
  };

  const loadAvailableProducts = async () => {
    try {
      const productsAvailables = await getAllProducts();
      const productsAvailablesNoOwner = productsAvailables.filter(
        (product) => userData._id !== product.owner
      );
      dispatch(
        loadProductsAction({
          productsList: productsAvailablesNoOwner,
        })
      );
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + PRODUCTS_LOAD);
  };

  const visibleProducts = availableProductsList?.slice(0, visibleCount) || [];

  const hasMoreToShow = availableProductsList?.length > visibleCount;

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        loadAvailableProducts();
        const profile = await getUserProfile();
        dispatch(loadProfileAction({ dataProfile: profile }));
      } catch (error) {
        showToast('Error al inicilizar el componente', 'error');
        console.log(error.message);
      }
    };
    loadInitialData();
  }, []);

  return (
    <>
      <div className="dashboard-list-products-container">
        {visibleProducts.length > 0 ? (
          visibleProducts.map((product) => (
            <ProductComponent
              key={product._id}
              productInfo={product}
              isFavorite={isProductFavorite(product._id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))
        ) : (
          <div className="products-list-empty">
            No hay productos disponibles
          </div>
        )}
        {hasMoreToShow && (
          <div className="load-more-wrapper">
            <button onClick={loadMore}>Cargar más resultados</button>
          </div>
        )}
      </div>

      <div className="toast-message" id="toastMessage"></div>
    </>
  );
};

export default DashboardComponent;
