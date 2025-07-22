import React, { useEffect, useState } from 'react';
import empty_photo from '/src/assets/empty-photo-profile.png';
import './../../css/Profile.css';
import {
  editProfileAction,
  loadProfileAction,
} from './ProfileComponentActions';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteUserProfile,
  getUserProfile,
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
import { changeMenuOptionActions } from '../MenuComponent/MenuComponentActions';
import { isAuthenticatedAction } from '../DashboardComponent/DashboardComponentActions';
import { changeHomeViewAction, changeUserLoggedStateActions } from '../HomePageComponent/HomePageComponentActions';
import { useNavigate } from 'react-router-dom';

const ProfileComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const { dataProfile, editMode } = useSelector(
    (state) => state.profileComponentReducer
  );

  const handleModalConfirm = () => {
    setModalOpen(false);
    deleteAccount()
  };

  const handleModalCancel = () => {
    setModalOpen(false);
  };

  const userHandler = (propName, propValue) => {
    setNewUser({
      ...newUser,
      [propName]: propValue,
    });
  };

  const setEditMode = () => {
    dispatch(
      editProfileAction({
        editMode: !editMode,
      })
    );
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
        await delay(2000);
        setEditMode();
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
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };

  const deleteAccount = async () => {
    try {
      const responseDeleteUser = await deleteUserProfile();
      if (responseDeleteUser.status === 'Success') {
        localStorage.clear();
            showToast('Usuario eliminado correctamente');
            await delay(2500);
            dispatch(
              changeMenuOptionActions({
                menuOption: undefined,
              })
            )
            dispatch(
              isAuthenticatedAction({
                isAuthenticated: false,
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

  }

  useEffect(() => {
    loadProfile();
  }, []);
  return (
    <>
      {!dataProfile ? (
        <div className="principal-profile-container">Cargando perfil...</div>
      ) : (
        <>
          <div className="principal-profile-container">
            <div className="profile-container">
              <div className="photo-container">
                <img
                  className="photo-profile"
                  src={dataProfile.profilePictureUrl || empty_photo}
                />
                {editMode && (
                  <input
                    type="file"
                    id="photo-fileInput"
                    className="hidden-fileInput"
                    accept=".png"
                  />
                )}
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
                <div className="data-user-container">
                  <label className="user-name-label">
                    Nombre:<span className="red-span">*</span>
                  </label>
                  <input
                    type="text"
                    className={editMode ? 'textInput' : 'hidden-textInput'}
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
                    className={editMode ? 'textInput' : 'hidden-textInput'}
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
                    className={editMode ? 'textInput' : 'hidden-textInput'}
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
                    className={editMode ? 'textInput' : 'hidden-textInput'}
                    value={editMode ? newUser?.phone || '' : dataProfile.phone}
                    onChange={(e) => userHandler('phone', e.target.value)}
                  />
                </div>
                <div className="data-user-container">
                  <label className="user-email-label">Dni:</label>
                  <input
                    type="text"
                    className={editMode ? 'textInput' : 'hidden-textInput'}
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
                    className={editMode ? 'textInput' : 'hidden-textInput'}
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
                      onClick={setEditMode}
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
                        onClick={setEditMode}
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
            <div className="favourites-container">
              <h2>No dispone de ningún producto marcado como favorito</h2>
            </div>
          </div>
          <ModalComponent
                isOpen={modalOpen}
                onConfirm={handleModalConfirm}
                onCancel={handleModalCancel}
                message={'¿Está seguro de que desea eliminar la cuenta?'}
              />
          <div className="toast-message" id="toastMessage"></div>
        </>
      )}
    </>
  );
};

export default ProfileComponent;
