import React, { useEffect, useState } from 'react';
import '../../css/Product.css';
import ImageUploader from '../ImageUploader/ImageUploaderComponent';
import { categories, conditions } from '../../utils/data';
import { useDispatch, useSelector } from 'react-redux';
import { delay, showToast, validateFields } from '../../utils/utils';
import { uploadNewProductFetch } from '../../core/services/productFetch';
import { useNavigate } from 'react-router-dom';
import { createProductAction } from '../ProductComponent/ProductComponentActions';
import { checkIntoDashboardAction } from '../MenuComponent/MenuComponentActions';

const MAX_IMAGES = 6;

const NewProductComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    price: '',
    images: [],
    category: '',
    condition: '',
    brand: '',
  });
  const { dataProfile } = useSelector((state) => state.profileComponentReducer);
  const userId = dataProfile._id;

  const inputNewProductHandler = (propName, propValue) => {
    setNewProduct({
      ...newProduct,
      [propName]: propValue,
    });
  };

  const handleImageChange = (newImages) => {
    setNewProduct((prev) => ({ ...prev, images: newImages }));
  };

  const uploadProduct = async () => {
    if (!userId) {
      showToast('Usuario no identificado', 'error');
      return;
    }

    const productToUpload = {
      ...newProduct,
      price: Number(newProduct.price),
      owner: userId,
    };

    if (productToUpload.images?.length === 0) {
      showToast('Mínimo debe agregar al menos una imágen', 'error');
      return;
    }

    if (!validateFields(productToUpload, false, false, true)) {
      return;
    }

    const returnToDashboard = () => {
      dispatch(
        createProductAction({
          createModeProduct: false,
        })
      );
      localStorage.setItem('createMode', false)
      dispatch(
        checkIntoDashboardAction({
          intoDashboard: 0,
        })
      );
      navigate('/dashboard/products');
    };

    try {
      const response = await uploadNewProductFetch(productToUpload);
      if (response.status === 'Success') {
        showToast('Producto publicado correctamente');
        await delay(2000);
        returnToDashboard();
      } else {
        showToast(response.message, 'error');
      }
    } catch (error) {
      console.error(error);
      showToast('Error al publicar el producto.', 'error');
    }
  };

  useEffect(() => {
    dispatch(
      checkIntoDashboardAction({
        intoDashboard: 1,
      })
    );
  }, []);

  return (
    <div className="card-product-container">
      <div className="new-product-card">
        <h1>Publicar nuevo producto</h1>
        <div className="create-product-form">
          <div className="form-data">
            <div className="images-np-upload">
              <label>Imágenes (máx. 6 PNG)</label>
              <ImageUploader
                maxImages={MAX_IMAGES}
                images={newProduct.images}
                onChange={handleImageChange}
                editable={true}
                singleImage={false}
                ubication={1}
              />
            </div>
            <div className="inputs-np-container">
              <div className="input-load">
                <label>
                  Título <span className="red">*</span>
                </label>
                <input
                  type="text"
                  value={newProduct.title}
                  onChange={(e) =>
                    inputNewProductHandler('title', e.target.value)
                  }
                  required
                />
              </div>

              <div className="input-load">
                <label>
                  Descripción <span className="red">*</span>
                </label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) =>
                    inputNewProductHandler('description', e.target.value)
                  }
                  maxLength={500}
                  required
                />
              </div>

              <div className="input-load">
                <label>
                  Precio (€) <span className="red">*</span>
                </label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) =>
                    inputNewProductHandler('price', e.target.value)
                  }
                  required
                  min={0}
                />
              </div>

              <div className="input-load">
                <label>
                  Categoría <span className="red">*</span>
                </label>
                <select
                  value={newProduct.category}
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

              <div className="input-load">
                <label>
                  Estado <span className="red">*</span>
                </label>
                <select
                  value={newProduct.condition}
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

              <div className="input-load">
                <label>Marca</label>
                <input
                  type="text"
                  name="brand"
                  placeholder="Marca"
                  value={newProduct.brand}
                  onChange={(e) =>
                    inputNewProductHandler('brand', e.target.value)
                  }
                />
              </div>
            </div>
          </div>

          <div className="buttons-np-container">
            <button className="btn-np-upload" onClick={uploadProduct}>
              Publicar producto
            </button>
          </div>
        </div>
      </div>
      <div className="toast-message" id="toastMessage"></div>
    </div>
  );
};

export default NewProductComponent;
