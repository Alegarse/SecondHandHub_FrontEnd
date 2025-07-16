import React from 'react';
import { useDispatch } from 'react-redux';
import { changeMenuOptionActions } from './MenuComponentActions';
import logo from "../../assets/logo.png"
import "../../css/HeaderMenu.css";

const MenuComponent = () => {
  const dispatch = useDispatch();

  const handlerMenuOption = (option) => {
    dispatch(
      changeMenuOptionActions({
        menuOption: option,
      })
    );
  };

  return (
    <div className="menu-container">
      <img src={logo} alt="Logo de la empresa" title='SecondHand Hub. Donde todo tiene un nuevo hogar' onClick={() => handlerMenuOption(undefined)}/>
      <div className="buttons-menu-container">
        <div>
          <button className="btn-upload" title='Pulse para agregar un nuevo producto' onClick={() => handlerMenuOption(0)}>
            Upload Product
          </button>
        </div>
        <div>
          <button className="btn-profile" title='Pulse para ver su perfil de usuario' onClick={() => {handlerMenuOption(1)}}>
            User Profile
          </button>
        </div>
        <div>
          <button className="btn-chat" title='Pulse para visualizar los mensajes' onClick={() => handlerMenuOption(2)}>
            Mensajes
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuComponent;
