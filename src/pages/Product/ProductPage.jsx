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
      dispatch(
        editProductAction({
          editModeProduct: localStorage.getItem("editMode"),
        })
      );
      dispatch(
        createProductAction({
          createModeProduct: localStorage.getItem("createMode"),
        })
      );
      dispatch(
        infoProductAction({
          onProductInfo: localStorage.getItem("onProductInfo")
        })
      )
    }, []);

  useEffect(() => {
    switch (location.pathname) {
      case '/dashboard/products/new':
        dispatch(
          createProductAction({
            createModeProduct: true,
          })
        );
        localStorage.setItem('createMode', true)
        break;
        case '/dashboard/products/details':
        dispatch(
          loadProductAction({
            createModeProduct: false,
          })
        );
        localStorage.setItem('createMode', false)
        dispatch(
          editProductAction({
            editModeProduct: false
          })
        )
        localStorage.setItem('editMode', false)
        break;
        case '/dashboard/products/edit':
        dispatch(
          loadProductAction({
            createModeProduct: false,
          })
        );
        localStorage.setItem('createMode', false)
        dispatch(
          editProductAction({
            editModeProduct: true
          })
        )
        localStorage.setItem('editMode', true)
        break;
      default:
        dispatch(
          createProductAction({
            createModeProduct: false,
          })
        );
        localStorage.setItem('createMode', false)
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
