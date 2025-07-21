import React, { useEffect } from 'react';
import empty_photo from '/src/assets/empty-photo-profile.png';
import './../../css/Profile.css';
import { loadProfileAction } from './ProfileComponentActions';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../core/services/userFetch';
import { generateMapIframe, getFormattedDate } from '../../utils/utils';

const ProfileComponent = () => {
  const dispatch = useDispatch();

  const { dataProfile, editMode } = useSelector(
    (state) => state.profileComponentReducer
  );

  const loadProfile = async () => {
    try {
      const dataProfileFetch = await getUserProfile();
      dispatch(
        loadProfileAction({
          dataProfile: dataProfileFetch,
        })
      );
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  useEffect(() => {
    loadProfile();
  },[]);
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
                  src={empty_photo}
                />
                {editMode && (
                  <input
                    type="file"
                    id="photo-fileInput"
                    className="hidden-fileInput"
                    accept=".png,.jpg,.jpeg"
                  />
                )}

                <p className="user-lastaccess-label">Ultimo acceso:</p>
                <p className="user-lastaccess">
                  {getFormattedDate(dataProfile.lastAccess, true)}
                </p>
              </div>
              <div className="info-container">
                <div className="data-user-container">
                  <p className="user-name-label">Nombre:</p>
                  <p className="name-user_">{dataProfile.firstName}</p>
                  <p className="user-lastname-label">Apellidos:</p>
                  <p className="lastname-user">{dataProfile.lastName}</p>
                </div>
                <div className="data-user-container">
                  <p className="user-birthdate-label">Fecha de nacimiento:</p>
                  <p className="birthdate-user">16/09/1980</p>
                </div>
                <div className="data-user-container">
                  <p className="user-phone-label">Teléfono:</p>
                  <p className="phone-user">644321368</p>
                  <p className="user-email-label">Email:</p>
                  <p className="email-user">aleboy80@gmail.com</p>
                </div>
              </div>
              <div className="map-container">
                {dataProfile.location && (
                  <>
                    {dataProfile.location && generateMapIframe(dataProfile.location)}
                    <p className="address-user">
                      {dataProfile.location.address &&
                        `${dataProfile.location.address.city} (${dataProfile.location.address.country})`}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="favourites-container">
              <h2>No dispone de ningún producto marcado como favorito
                </h2></div>
          </div>
          <div className="toast-message" id="toastMessage"></div>
        </>
      )}
    </>
  );
};

export default ProfileComponent;
