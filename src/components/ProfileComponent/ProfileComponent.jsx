import React, { useEffect, useState } from 'react';
import empty_photo from '/src/assets/empty-photo-profile.png';
import './../../css/Profile.css';
import {
  editProfileAction,
  loadFavoritesProductsUserAction,
  loadProductsUserAction,
  loadProfileAction,
} from './ProfileComponentActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToFavorite,
  deleteUserProfile,
  getUserProfile,
  removeFromFavorite,
  updateUserProfile,
} from '../../core/services/userFetch';
import {
  delay,
  generateMapIframe,
  getFormattedDate,
  showToast,
  validateFields,
} from '../../utils/utils';
import edit from './../../assets/edit.png';
import back from './../../assets/back.png';
import save from './../../assets/save.png';
import ModalComponent from '../ModalComponent/ModalComponent';
import {
  changeMenuOptionActions,
  checkIntoDashboardAction,
} from '../MenuComponent/MenuComponentActions';
import { isAuthenticatedAction } from '../DashboardComponent/DashboardComponentActions';
import {
  changeHomeViewAction,
  changeUserLoggedStateActions,
} from '../HomePageComponent/HomePageComponentActions';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../ImageUploader/ImageUploaderComponent';
import {
  deleteProductFetch,
  getAllProducts,
} from '../../core/services/productFetch';
import ProductComponentCard from '../ProductComponentCard/ProductComponentCard';
import { setOriginToBackProductLayoutAction } from '../ProductComponentLayout/ProductComponentLayoutActions';
import { origins } from '../ProductComponentLayout/ProductComponentLayoutReducer';

const MODAL_TYPES = {
  USER: 'USER',
  PRODUCT: 'PRODUCT',
};

const ProfileComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showUploader, setShowUploader] = useState(false);
  const [modalUseType, setModalUseType] = useState(MODAL_TYPES.USER);
  const [productToDelete, setProductToDelete] = useState(null);

  const { dataProfile } = useSelector((state) => state.profileComponentReducer);

  const { dataProductsUser, dataFavoritesProductsUser } = useSelector(
    (state) => state.profileComponentReducer
  );

  const isProductFavorite = (productId) => {
    return dataProfile?.favorites?.includes(productId);
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

      await loadFavoritesUser(updatedProfile);
    } catch (error) {
      console.error(error.message);
      showToast('Error al cambiar el estado del favorito', 'error');
    }
  };

  const loadProductsUser = async (profileData = dataProfile) => {
    try {
      const productsAvailables = await getAllProducts();
      const allUserProducts = productsAvailables.filter(
        (product) => profileData._id === product.owner
      );
      dispatch(
        loadProductsUserAction({
          dataProductsUser: allUserProducts,
        })
      );
    } catch (error) {
      console.error('Error loading products user data:', error);
    }
  };

  const loadFavoritesUser = async (profileData = dataProfile) => {
    try {
      const productsAvailables = await getAllProducts();
      const favoriteProductIds = profileData.favorites;
      const allFavoritesProductsUser = productsAvailables.filter((product) =>
        favoriteProductIds.includes(product._id)
      );
      dispatch(
        loadFavoritesProductsUserAction({
          dataFavoritesProductsUser: allFavoritesProductsUser,
        })
      );
    } catch (error) {
      console.error('Error loading favorites products user data:', error);
    }
  };

  const handleModalConfirm = () => {
    setModalOpen(false);
    if (modalUseType === MODAL_TYPES.USER) {
      deleteAccount();
    } else {
      deleteProduct();
    }
  };

  const handleModalCancel = () => {
    setModalUseType(MODAL_TYPES.USER);
    setProductToDelete(null);
    setModalOpen(false);
  };

  const userHandler = (propName, propValue) => {
    setNewUser({
      ...newUser,
      [propName]: propValue,
    });
  };

  const enterEditMode = () => {
    setEditMode(true);
    setNewUser({ ...dataProfile });
  };

  const closeEditMode = () => {
    setEditMode(false);
    setNewUser({ ...dataProfile });
  };

  const saveChanges = async () => {
    if (validateFields(newUser, false, true)) {
      const responseUpdate = await updateUserProfile(newUser);
      if (responseUpdate.status === 'Success') {
        showToast(responseUpdate.message);
        dispatch(
          loadProfileAction({
            dataProfile: { ...newUser },
          })
        );
        closeEditMode();
      } else {
        showToast(responseUpdate.message, 'error');
      }
    }
  };

  const loadProfile = async () => {
    try {
      const dataProfileFetch = await getUserProfile();
      dispatch(
        loadProfileAction({
          dataProfile: dataProfileFetch,
        })
      );
      return dataProfileFetch;
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };

  const deleteAccount = async () => {
    try {
      const responseDeleteUser = await deleteUserProfile();
      if (responseDeleteUser.status === 'Success') {
        localStorage.clear();
        showToast('Usuario eliminado correctamente. Cerrando sesión...');
        await delay(2500);
        dispatch(
          changeMenuOptionActions({
            menuOption: undefined,
          })
        );
        dispatch(
          isAuthenticatedAction({
            isAuthenticated: false,
            isSessionChecked: true,
          })
        );
        dispatch(
          changeUserLoggedStateActions({
            isLogged: false,
          })
        );
        dispatch(
          changeHomeViewAction({
            viewTypeHome: undefined,
          })
        );
        navigate('/');
      } else {
        showToast(responseDeleteUser.message, 'error');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const uploadImage = async (imageUrls) => {
    const imageUrl = imageUrls[0];

    userHandler('profilePictureUrl', imageUrl);

    dispatch(
      loadProfileAction({
        dataProfile: {
          ...dataProfile,
          profilePictureUrl: imageUrl,
        },
      })
    );
    setShowUploader(!showUploader);
    closeEditMode();
    showToast('Imagen de perfil actualizada correctamente');
  };

  const preDeleteProduct = (productId) => {
    setProductToDelete(productId);
    setModalUseType(MODAL_TYPES.PRODUCT);
    setModalOpen(true);
  };

  const deleteProduct = async () => {
    try {
      const responseDeleteProduct = await deleteProductFetch(productToDelete);
      if (responseDeleteProduct.status === 'Success') {
        showToast('Producto eliminado correctamente.');
        setProductToDelete(null);
        await loadProductsUser();
      } else {
        showToast(responseDeleteProduct.message, 'error');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await loadProfile();
        dispatch(
          editProfileAction({
            editMode: false,
          })
        );
        await loadProductsUser();
        await loadFavoritesUser();
      } catch (error) {
        showToast('Error al inicilizar el componente', 'error');
        console.error(error.message);
      }
    };
    loadInitialData();
    dispatch(
      checkIntoDashboardAction({
        intoDashboard: 3,
      })
    );
    dispatch(
      setOriginToBackProductLayoutAction({
        originToBack: origins.PROFILE,
      })
    );
  }, []);
  return (
    <>
      {!dataProfile || !dataProfile.firstName ? (
        <div className="principal-profile-container">Cargando perfil...</div>
      ) : (
        <>
          <div className="principal-profile-container">
            <div className="profile-container">
              <div className="photo-container">
                <div className="photo-and-upload-container">
                  {!showUploader && (
                    <img
                      className="photo-profile"
                      src={dataProfile.profilePictureUrl || empty_photo}
                      alt="Fotgrafia de perfil"
                      title="Haga click para editar la imagen de perfil"
                      onClick={() => {
                        if (editMode) setShowUploader(!showUploader);
                      }}
                    />
                  )}

                  {editMode && showUploader && (
                    <div className="upload-image-container">
                      <h3>Haga click para agregar una imagen</h3>
                      <ImageUploader
                        onChange={(imageUrl) => uploadImage(imageUrl)}
                        singleImage={true}
                      />
                      <div className="button-close">
                        <img
                          src={back}
                          title="Cancelar subida de imagen"
                          onClick={() => setShowUploader(!showUploader)}
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div className="lastaccess-container">
                  <p className="user-lastaccess-label">Ultimo acceso:</p>
                  <p className="user-lastaccess">
                    {getFormattedDate(dataProfile.lastAccess, true)}
                  </p>
                </div>
                {editMode && (
                  <div className="data-user-btn-container">
                    <button
                      className="delete-account-user"
                      onClick={() => setModalOpen(true)}
                    >
                      Eliminar cuenta
                    </button>
                  </div>
                )}
              </div>
              <div className="info-container">
                <h2>Mi perfil</h2>
                <div className="data-user-container">
                  <label className="user-name-label">
                    Nombre:<span className="red-span">*</span>
                  </label>
                  <input
                    type="text"
                    className={`${
                      editMode ? 'textInput' : 'hidden-textInput'
                    } name-user_`}
                    value={
                      editMode
                        ? newUser?.firstName || ''
                        : dataProfile.firstName
                    }
                    onChange={(e) => userHandler('firstName', e.target.value)}
                  />
                </div>
                <div className="data-user-container">
                  <label className="user-lastname-label">
                    Apellidos:<span className="red-span">*</span>
                  </label>
                  <input
                    type="text"
                    className={`${
                      editMode ? 'textInput' : 'hidden-textInput'
                    } lastname-user`}
                    value={
                      editMode ? newUser?.lastName || '' : dataProfile.lastName
                    }
                    onChange={(e) => userHandler('lastName', e.target.value)}
                  />
                </div>
                <div className="data-user-container">
                  <span className="user-birthdate-label">
                    Fecha de nacimiento:<span className="red-span">*</span>
                  </span>
                  <input
                    type="date"
                    className={`${
                      editMode ? 'textInput' : 'hidden-textInput'
                    } lastname-user`}
                    value={
                      editMode
                        ? getFormattedDate(newUser?.birthDate, false, true) ||
                          ''
                        : getFormattedDate(dataProfile.birthDate, false, true)
                    }
                    onChange={(e) => userHandler('birthDate', e.target.value)}
                  />
                </div>
                <div className="data-user-container">
                  <label className="user-phone-label">Teléfono:</label>
                  <input
                    type="text"
                    className={`${
                      editMode ? 'textInput' : 'hidden-textInput'
                    } lastname-user`}
                    value={editMode ? newUser?.phone || '' : dataProfile.phone}
                    onChange={(e) => userHandler('phone', e.target.value)}
                  />
                </div>
                <div className="data-user-container">
                  <label className="user-email-label">Dni:</label>
                  <input
                    type="text"
                    className={`${
                      editMode ? 'textInput' : 'hidden-textInput'
                    } lastname-user`}
                    value={editMode ? newUser?.dni || '' : dataProfile.dni}
                    onChange={(e) => userHandler('dni', e.target.value)}
                  />
                </div>
                <div className="data-user-container">
                  <label className="user-email-label">
                    Email:<span className="red-span">*</span>
                  </label>
                  <input
                    type="text"
                    className={`${
                      editMode ? 'textInput' : 'hidden-textInput'
                    } email-user`}
                    value={editMode ? newUser?.email || '' : dataProfile.email}
                    onChange={(e) => userHandler('email', e.target.value)}
                  />
                </div>
              </div>
              <div className="tools-container">
                <div className="profile-options-container">
                  {!editMode ? (
                    <button
                      className="btn-change-password-user"
                      onClick={enterEditMode}
                    >
                      <img
                        src={edit}
                        alt="Boton para entrar en modo edición de usuario"
                        title="Pulse para entrar en el modo de edición del usuario"
                      />
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn-save-changes"
                        onClick={saveChanges}
                      >
                        <img
                          src={save}
                          alt="Guardar cambios del usuario"
                          title="Pulse para guardar los cambios realizados"
                        />
                      </button>
                      <button
                        className="btn-back-to-info-user"
                        onClick={() => setEditMode(false)}
                      >
                        <img
                          src={back}
                          alt="Boton para volver a info de usuario"
                          title="Pulse para salir del modo de edición del usuario"
                        />
                      </button>
                    </>
                  )}
                </div>
                <div className="map-container">
                  {editMode && (
                    <div className="forbidden-edit">
                      Ubicación no modificable!
                    </div>
                  )}
                  {dataProfile.location && (
                    <>
                      {dataProfile.location &&
                        generateMapIframe(dataProfile.location)}
                      <p className="address-user">
                        {dataProfile.location.address &&
                          `${dataProfile.location.address.city} (${dataProfile.location.address.country})`}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="products-user-container">
              <div className="owner-products">
                <h2>Mis productos</h2>
                <div className={`owner-products-list ${dataProductsUser?.length <= 0 ? ' centered' : ''}`}>
                  {dataProductsUser?.length > 0 ? (
                    dataProductsUser.map((product,idx) => (
                      <div key={idx} className='product-card-profile'>
                        <ProductComponentCard
                          key={product._id}
                          productInfo={product}
                          isOwner
                          removeProduct={preDeleteProduct}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="products-list-empty">
                      <h3>No hay productos disponibles</h3>
                    </div>
                  )}
                </div>
              </div>
              <div className="favorite-products">
                <h2>Mis favoritos</h2>
                <div className={`favorite-products-list ${dataFavoritesProductsUser?.length <= 0 ? ' centered' : ''}`}>
                  {dataFavoritesProductsUser?.length > 0 ? (
                    dataFavoritesProductsUser.map((product,idx) => (
                      <div key={idx} className='product-card-profile'>
                      <ProductComponentCard
                        key={product._id}
                        productInfo={product}
                        isFavorite={() => isProductFavorite(product._id)}
                        onToggleFavorite={handleToggleFavorite}
                      />
                      </div>
                    ))
                  ) : (
                    <div className="products-list-empty">
                      <h3>No ha marcado ningún producto como favorito</h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <ModalComponent
            isOpen={modalOpen}
            onConfirm={handleModalConfirm}
            onCancel={handleModalCancel}
            message={`¿Está seguro de que desea eliminar ${
              modalUseType === 'USER' ? 'la cuenta' : 'el producto'
            }?`}
          />
          <div className="toast-message" id="toastMessage"></div>
        </>
      )}
    </>
  );
};

export default ProfileComponent;
