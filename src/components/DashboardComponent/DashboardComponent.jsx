import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProductsAction } from './DashboardComponentActions';
import { getAllProducts } from '../../core/services/productFetch';
import ProductComponent from '../ProductComponent/ProductComponent';
import './../../css/DashBoard.css';

const PRODUCTS_LOAD = 20;

const DashboardComponent = () => {
  const dispatch = useDispatch();
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_LOAD);

  const availableProductsList = useSelector(
    (state) => state.dashboardComponentReducer.productsList
  );

  const loadAvailableProducts = async () => {
    try {
      const productsAvailables = await getAllProducts();
      dispatch(
        loadProductsAction({
          productsList: productsAvailables,
        })
      );
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const selectProductHandler = (productId) => {
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + PRODUCTS_LOAD);
  };

  const visibleProducts = availableProductsList?.slice(0, visibleCount) || [];

  const hasMoreToShow = availableProductsList?.length > visibleCount;

  useEffect(() => {
    loadAvailableProducts();
  });

  return (
    <>
      <div className="dashboard-list-products-container">
        {visibleProducts.length > 0 ? (
          visibleProducts.map((product) => (
            <ProductComponent
              key={product._id}
              productInfo={product}
              onClick={() => selectProductHandler(product._id)}
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
