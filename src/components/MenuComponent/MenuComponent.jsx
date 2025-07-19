import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import logo from '../../assets/logo.png';
import '../../css/HeaderMenu.css';
import upload from '../../assets/upload.png';
import profile from '../../assets/profile.png';
import messages from '../../assets/messages.png';
import logout from '../../assets/logout.png';
import { useNavigate } from 'react-router-dom';
import {
  changeHomeViewAction,
  changeUserLoggedStateActions,
} from '../HomePageComponent/HomePageComponentActions';
import { isAuthenticatedAction } from '../DashboardComponent/DashboardComponentActions';
import { delay, showToast } from '../../utils/utils';

const MenuComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoutUser = async () => {
    localStorage.clear();
    showToast('Usuario deslogeado correctamente');
    await delay(2500);
    handlerMenuOption(undefined);
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
  };

  const handlerMenuOption = (option) => {
    console.log("A Perfil")
    navigate('/dashboard/profile')
    setIsMenuOpen(false);
  };

  return (
    <div className="menu-container">
      <img
        className="logo-menu"
        src={logo}
        alt="Logo de la empresa"
        title="SecondHand Hub. Donde todo tiene un nuevo hogar"
        onClick={() => handlerMenuOption(undefined)}
      />
      <button
        className="btn-burguer-menu"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>
      <div className={`buttons-menu-container ${isMenuOpen ? 'open' : ''}`}>
        <div>
          <button
            className="btn-upload"
            title="Pulse para agregar un nuevo producto"
            onClick={() => handlerMenuOption(0)}
          >
            <img src={upload} />
          </button>
        </div>
        <div>
          <button
            className="btn-chat"
            title="Pulse para visualizar los mensajes"
            onClick={() => handlerMenuOption(1)}
          >
            <img src={messages} />
          </button>
        </div>
        <div>
          <button
            className="btn-profile"
            title="Pulse para ver su perfil de usuario"
            onClick={() => {
              handlerMenuOption(2);
            }}
          >
            <img src={profile} />
          </button>
        </div>
        <div>
          <button
            className="btn-logout"
            title="Pulse para cerras su sesión"
            onClick={logoutUser}
          >
            <img src={logout} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuComponent;
