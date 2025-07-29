import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductByIdFetch } from '../../core/services/productFetch';
import { loadProductAction } from '../ProductComponent/ProductComponentActions';
import { showToast } from '../../utils/utils';
import ProductComponentLayout from '../ProductComponentLayout/ProductComponentLayout';

const EditProductComponent = () => {

    const { productId } = useParams()
  const dispatch = useDispatch()

    const { dataProduct } = useSelector(
    (state) => state.productComponentReducer
  );

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const productInfo = await getProductByIdFetch(productId)
        dispatch(
          loadProductAction({
            dataProduct: productInfo
          })
        )
      } catch (error) {
        showToast("Error al cargar detalles del producto", "error");
        console.log(error.message);
      }
    };
    loadInitialData();
  },[productId])
  return (
    <>
      <div className="details-product-container">
        {!dataProduct ? (
          <div>Cargando producto...</div>
        ) : (
          <ProductComponentLayout product={dataProduct} />
        )}
      </div>
      <div className="toast-message" id="toastMessage"></div>
    </>
  )
}

export default EditProductComponent