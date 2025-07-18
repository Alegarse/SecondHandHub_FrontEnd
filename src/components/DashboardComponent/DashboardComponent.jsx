import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProductsAction } from './DashboardComponentActions';
import { getAllProducts } from '../../core/services/productFetch';

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
  }, []);

  return (
    <>
      <div>
        {availableProductsList && availableProductsList.length > 0 ? (
          availableProductsList.map((p, idx) => (
            <div key={idx}>
              <div>{JSON.stringify(p)}</div>
            </div>
          ))
        ) : (
          <div>No porductos</div>
        )}
      </div>
      <div className="toast-message" id="toastMessage"></div>
    </>
  );
};

export default DashboardComponent;
