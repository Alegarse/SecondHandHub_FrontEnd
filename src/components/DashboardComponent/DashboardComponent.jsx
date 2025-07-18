import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProductsAction } from './DashboardComponentActions';
import { getAllProducts } from '../../core/services/productFetch';
import ProductComponent from '../ProductComponent/ProductComponent';
import './../../css/DashBoard.css';

const DashboardComponent = () => {
  const dispatch = useDispatch();

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

  useEffect(() => {
    loadAvailableProducts();
  });

  return (
    <>
      <div className="dashboard-list-products-container">
        {availableProductsList && availableProductsList.length > 0 ? (
          availableProductsList.map((product) => (
            <ProductComponent
              key={product._id}
              productInfo={product}
              onClick={() =>
                alert(
                  `Clickado: ${product._id}, ${product.title} a ${product.price}€`
                )
              }
            />
          ))
        ) : (
          <div>No hay productos</div>
        )}
      </div>
      <div className="toast-message" id="toastMessage"></div>
    </>
  );
};

export default DashboardComponent;
