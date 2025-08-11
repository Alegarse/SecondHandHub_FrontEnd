import React, { useEffect, useState } from 'react';
import {
  getFormattedDate,
  showToast,
  validateFields,
} from '../../utils/utils';
import {
  categories,
  conditions,
  configGeneral,
  situations,
} from '../../utils/data';
import { useDispatch, useSelector } from 'react-redux';
import { origins } from './ProductComponentLayoutReducer';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../ImageUploader/ImageUploaderComponent';
import {
  getProductByIdFetch,
  updateNewProductFetch,
} from '../../core/services/productFetch';
import { setStateEditProductLayoutAction } from './ProductComponentLayoutActions';
import { loadProductAction } from '../ProductComponent/ProductComponentActions';

const ProductComponentLayout = ({ product }) => {
  const { stateEditLayout, originToBack } = useSelector(
    (state) => state.productComponentLayoutReducer
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updatedProduct, setUpdatedProduct] = useState({
    ...product,
  });

  const { dataProfile } = useSelector((state) => state.profileComponentReducer);
  const userId = dataProfile._id;

  const inputNewProductHandler = (propName, propValue) => {
    setUpdatedProduct({
      ...updatedProduct,
      [propName]: propValue,
    });
  };

  const handleImageChange = (newImages) => {
    setUpdatedProduct((prev) => ({ ...prev, images: newImages }));
  };

  const goBack = () => {
    switch (originToBack) {
      case origins.PROFILE:
        navigate('/dashboard/profile');
        break;
      default:
      case origins.DASHBOARD:
        navigate('/dashboard/products');
        break;
    }
  };

  const updateProduct = async () => {
    if (!userId) {
      showToast('Usuario no identificado', 'error');
      return;
    }

    const productToUpdate = {
      ...updatedProduct,
      price: Number(updatedProduct.price),
      owner: userId,
    };

    if (productToUpdate.images?.length === 0) {
      showToast('Mínimo debe tener al menos una imágen', 'error');
      return;
    }

    if (!validateFields(productToUpdate, false, false, true)) {
      return;
    }

    try {
      const response = await updateNewProductFetch(productToUpdate);
      if (response.status === 'Success') {
        showToast('Producto publicado correctamente');
        dispatch(
          setStateEditProductLayoutAction({
            stateEditLayout: false,
          })
        );
      } else {
        showToast(response.message, 'error');
      }
    } catch (error) {
      console.error(error);
      showToast('Error al publicar el producto.', 'error');
    }
  };

  useEffect(() => {
    const reloadData = async () => {
      const productDataReload = await getProductByIdFetch(product._id);
      dispatch(
        loadProductAction({
          dataProduct: productDataReload,
        })
      );
    };
    reloadData();
  }, [stateEditLayout]);

  return (
    <>
      <div className="layout-product-container">
        <div className="button-back-container">
          <img
            className="btn-back-from-product"
            src="/back_grey.png"
            title="Volver atrás"
            onClick={goBack}
          />
        </div>
        {!stateEditLayout ? (
          <>
            <div className="product-gallery">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Imagen ${idx + 1} del producto`}
                  className="product-image"
                />
              ))}
            </div>
            <div className="product-details">
              <h1 className="product-title">{product.title}</h1>
              <p className="product-price">{product.price?.toFixed(2)}€</p>

              <div className="product-info">
                <span>Categoría: {categories[product.category]}</span>
                <span>Estado: {conditions[product.condition]}</span>
                <span>Marca: {product.brand}</span>
                <span>Situación: {situations[product.status]}</span>
              </div>

              <div className="product-description">
                <p>{product.description}</p>
              </div>

              <div className="product-date">
                Última activación: {getFormattedDate(product.lastActivatedAt)}
              </div>
            </div>
          </>
        ) : (
          <>
          <div className='layout-product-container-int'>
<div className="product-gallery-edit">
              <label>Imágenes (máx. {configGeneral.MAX_IMAGES} PNG)</label>
              <ImageUploader
                maxImages={configGeneral.MAX_IMAGES}
                images={updatedProduct.images}
                onChange={handleImageChange}
                editable={true}
                singleImage={false}
                ubication={1}
              />
            </div>
            <div className="product-details-edit">
              <div className="first-data-product-container">
                <div className="input-edit">
                  <label>
                    Título <span className="red">*</span>
                  </label>
                  <input
                    className="title-edit"
                    type="text"
                    value={updatedProduct.title}
                    onChange={(e) =>
                      inputNewProductHandler('title', e.target.value)
                    }
                    required
                  />
                </div>
                <div className="input-edit">
                  <label>
                    Precio (€) <span className="red">*</span>
                  </label>
                  <input
                    type="number"
                    value={updatedProduct.price}
                    onChange={(e) =>
                      inputNewProductHandler('price', e.target.value)
                    }
                    required
                    min={0}
                  />
                </div>
              </div>
              <div className="second-data-product-container">
                <div className="input-edit">
                  <label>
                    Descripción <span className="red">*</span>
                  </label>
                  <textarea
                    className="description-edit"
                    value={updatedProduct.description}
                    onChange={(e) =>
                      inputNewProductHandler('description', e.target.value)
                    }
                    maxLength={500}
                    required
                  />
                </div>
              </div>

              <div className="first-selects-editp">
                <div className="input-edit">
                  <label>
                    Categoría <span className="red">*</span>
                  </label>
                  <select
                    value={updatedProduct.category}
                    onChange={(e) =>
                      inputNewProductHandler('category', e.target.value)
                    }
                    required
                  >
                    {Object.entries(categories).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-edit">
                  <label>
                    Estado <span className="red">*</span>
                  </label>
                  <select
                    value={updatedProduct.condition}
                    onChange={(e) =>
                      inputNewProductHandler('condition', e.target.value)
                    }
                    required
                  >
                    {Object.entries(conditions).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="second-selects-editp">
                <div className="input-edit">
                  <label>Marca</label>
                  <input
                    type="text"
                    name="brand"
                    placeholder="Marca"
                    value={updatedProduct.brand}
                    onChange={(e) =>
                      inputNewProductHandler('brand', e.target.value)
                    }
                  />
                </div>
                <div className="input-edit">
                  <label>
                    Situación <span className="red">*</span>
                  </label>
                  <select
                    value={updatedProduct.status}
                    onChange={(e) =>
                      inputNewProductHandler('status', e.target.value)
                    }
                    required
                  >
                    {Object.entries(situations).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
            <div className="buttons-ep-container">
              <button className="btn-np-upload" onClick={updateProduct}>
                Actualizar producto
              </button>
            </div>
          </>
        )}
      </div>
      <div className="toast-message" id="toastMessage"></div>
    </>
  );
};

export default ProductComponentLayout;
