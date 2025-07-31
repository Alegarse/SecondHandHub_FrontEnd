import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/logo.png';
import '../../css/HeaderMenu.css';
import to_dashboard from '../../assets/to_dashboard.png';
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
import { checkIntoDashboardAction } from './MenuComponentActions';
import {
  createProductAction,
  infoProductAction,
} from '../ProductComponent/ProductComponentActions';

const MenuComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const MENU_VIEW = {
    DASHBOARD: 0,
    UPLOAD: 1,
    MESSAGES: 2,
    PROFILE: 3,
  };

  const intoDashboard = useSelector(
    (state) => state.menuComponentReducer.intoDashboard
  );

  const logoutUser = async () => {
    localStorage.clear();
    showToast('Usuario deslogeado correctamente');
    await delay(2500);
    handlerMenuOption(MENU_VIEW.DASHBOARD);
    dispatch(
      checkIntoDashboardAction({
        intoDashboard: MENU_VIEW.DASHBOARD,
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
  };

  const handlerMenuOption = (option) => {
    if (intoDashboard === option) {
      navigate('/dashboard/products');
      dispatch(
        checkIntoDashboardAction({
          intoDashboard: MENU_VIEW.DASHBOARD,
        })
      );
    } else {
      dispatch(
        infoProductAction({
          onProductInfo: false,
        })
      );
      localStorage.setItem('onProductInfo', false)
      switch (option) {
        case MENU_VIEW.UPLOAD:
          dispatch(
            createProductAction({
              createModeProduct: true,
            })
          );
          localStorage.setItem('createMode', true)
          navigate('/dashboard/products/new');
          break;
        case MENU_VIEW.MESSAGES:
          navigate('/dashboard/messages');
          break;
        case MENU_VIEW.PROFILE:
          navigate('/dashboard/profile');
          break;
        default:
          navigate('/dashboard/products');
          break;
      }
      dispatch(
        checkIntoDashboardAction({
          intoDashboard: option,
        })
      );
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="menu-container">
      <img
        className="logo-menu"
        src={logo}
        alt="Logo de la empresa"
        title="SecondHand Hub. Donde todo tiene un nuevo hogar"
        onClick={() => handlerMenuOption(MENU_VIEW.DASHBOARD)}
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
            title={
              intoDashboard === MENU_VIEW.UPLOAD
                ? 'Pulse para volver al listado'
                : 'Pulse para agregar un nuevo producto'
            }
            onClick={() => handlerMenuOption(MENU_VIEW.UPLOAD)}
          >
            <img
              src={intoDashboard === MENU_VIEW.UPLOAD ? to_dashboard : upload}
            />
          </button>
        </div>
        <div>
          <button
            className="btn-chat"
            title={
              intoDashboard === MENU_VIEW.MESSAGES
                ? 'Pulse para volver al listado'
                : 'Pulse para visualizar los mensajes'
            }
            onClick={() => handlerMenuOption(MENU_VIEW.MESSAGES)}
          >
            <img
              src={
                intoDashboard === MENU_VIEW.MESSAGES ? to_dashboard : messages
              }
            />
          </button>
        </div>
        <div>
          <button
            className="btn-profile"
            title={
              intoDashboard === MENU_VIEW.PROFILE
                ? 'Pulse para volver al listado'
                : 'Pulse para ver su perfil de usuario'
            }
            onClick={() => {
              handlerMenuOption(MENU_VIEW.PROFILE);
            }}
          >
            <img
              src={intoDashboard === MENU_VIEW.PROFILE ? to_dashboard : profile}
            />
          </button>
        </div>
        <div>
          <button
            className="btn-logout"
            title="Pulse para cerrar su sesión"
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
