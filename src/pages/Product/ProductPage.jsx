import React, { useEffect } from 'react';
import MenuComponent from '../../components/MenuComponent/MenuComponent';
import FooterComponent from '../../components/FooterComponent/FooterComponent';
import ProductComponent from '../../components/ProductComponent/ProductComponent';
import { useDispatch } from 'react-redux';
import { createProductAction, editProductAction, infoProductAction, loadProductAction } from '../../components/ProductComponent/ProductComponentActions';
import { useLocation } from 'react-router-dom';

const ProductPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case '/dashboard/products/new':
        dispatch(
          createProductAction({
            createModeProduct: true,
          })
        );
        break;
        case '/dashboard/products/details':
        dispatch(
          loadProductAction({
            createModeProduct: false,
          })
        );
        dispatch(
          editProductAction({
            editModeProduct: false
          })
        )
        break;
        case '/dashboard/products/edit':
        dispatch(
          loadProductAction({
            createModeProduct: false,
          })
        );
        dispatch(
          editProductAction({
            editModeProduct: true
          })
        )
        break;
      default:
        dispatch(
          createProductAction({
            createModeProduct: false,
          })
        );
        break;
    }
  }, [location.pathname, dispatch]);

  return (
    <div className="dashboard-container">
      <MenuComponent />
      <ProductComponent />
      <FooterComponent />
    </div>
  );
};

export default ProductPage;
