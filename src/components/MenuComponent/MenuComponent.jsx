import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeMenuOptionActions } from './MenuComponentActions';
import logo from "../../assets/logo.png"
import "../../css/HeaderMenu.css";
import upload from "../../assets/upload.png"
import profile from "../../assets/profile.png"
import messages from "../../assets/messages.png"

const MenuComponent = () => {
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handlerMenuOption = (option) => {
    dispatch(
      changeMenuOptionActions({
        menuOption: option,
      })
    );
    setIsMenuOpen(false)
  };

  return (
    <div className="menu-container">
      <img className="logo-menu" src={logo} alt="Logo de la empresa" title='SecondHand Hub. Donde todo tiene un nuevo hogar' onClick={() => handlerMenuOption(undefined)}/>
      <button className='btn-burguer-menu' onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
      <div className={`buttons-menu-container ${isMenuOpen ? 'open' : ''}`}>
        <div>
          <button className="btn-upload" title='Pulse para agregar un nuevo producto' onClick={() => handlerMenuOption(0)}>
            <img src={upload}/>
          </button>
        </div>
        <div>
          <button className="btn-chat" title='Pulse para visualizar los mensajes' onClick={() => handlerMenuOption(2)}>
            <img src={messages}/>
          </button>
        </div>
        <div>
          <button className="btn-profile" title='Pulse para ver su perfil de usuario' onClick={() => {handlerMenuOption(1)}}>
            <img src={profile}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuComponent;
