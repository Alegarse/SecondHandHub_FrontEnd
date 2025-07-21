import React, { useEffect, useState } from "react";
import empty_photo from "/src/assets/empty-photo-profile.png";
import "./../../css/Profile.css";
import {
  editProfileAction,
  loadProfileAction,
} from "./ProfileComponentActions";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../core/services/userFetch";
import { generateMapIframe, getFormattedDate } from "../../utils/utils";
import edit from "./../../assets/edit.png";
import back from "./../../assets/back.png";

const ProfileComponent = () => {
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState({});

  const { dataProfile, editMode } = useSelector(
    (state) => state.profileComponentReducer
  );

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
      console.error("Error loading products:", error);
    }
  };

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
                <img className="photo-profile" src={empty_photo} />
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
                  <label className="user-name-label">Nombre:</label>
                  <input
                    type="text"
                    className={editMode ? "textInput" : "hidden-textInput"}
                    value={
                      editMode
                        ? newUser?.firstName || ""
                        : dataProfile.firstName
                    }
                    onChange={(e) => userHandler("firstName", e.target.value)}
                  />
                </div>
                <div className="data-user-container">
                  <label className="user-lastname-label">Apellidos:</label>
                  <input
                    type="text"
                    className={editMode ? "textInput" : "hidden-textInput"}
                    value={
                      editMode ? newUser?.lastName || "" : dataProfile.lastName
                    }
                    onChange={(e) => userHandler("lastName", e.target.value)}
                  />
                </div>
                <div className="data-user-container">
                  <span className="user-birthdate-label">
                    Fecha de nacimiento:
                  </span>
                  <input
                    type="text"
                    className={editMode ? "textInput" : "hidden-textInput"}
                    value={
                      editMode
                        ? getFormattedDate(newUser?.birthDate, false) || ""
                        : getFormattedDate(dataProfile.birthDate, false)
                    }
                    onChange={(e) => userHandler("birthDate", e.target.value)}
                  />
                </div>
                <div className="data-user-container">
                  <label className="user-phone-label">Teléfono:</label>
                  <input
                    type="text"
                    className={editMode ? "textInput" : "hidden-textInput"}
                    value={editMode ? newUser?.phone || "" : dataProfile.phone}
                    onChange={(e) => userHandler("phone", e.target.value)}
                  />
                </div>
                <div className="data-user-container">
                  <label className="user-email-label">Dni:</label>
                  <input
                    type="text"
                    className={editMode ? "textInput" : "hidden-textInput"}
                    value={editMode ? newUser?.dni || "" : dataProfile.dni}
                    onChange={(e) => userHandler("dni", e.target.value)}
                  />
                </div>
                <div className="data-user-container">
                  <label className="user-email-label">Email:</label>
                  <input
                    type="text"
                    className={editMode ? "textInput" : "hidden-textInput"}
                    value={editMode ? newUser?.email || "" : dataProfile.email}
                    onChange={(e) => userHandler("email", e.target.value)}
                  />
                </div>
                {editMode && (
                  <div className="data-user-btn-container">
                    <button className="change-password-user">
                      Cambiar contraseña
                    </button>
                  </div>
                )}
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
          <div className="toast-message" id="toastMessage"></div>
        </>
      )}
    </>
  );
};

export default ProfileComponent;
