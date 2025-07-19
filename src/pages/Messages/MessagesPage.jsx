import React from 'react'
import MessagesComponent from '../../components/MessagesComponent/MessagesComponent'
import MenuComponent from '../../components/MenuComponent/MenuComponent';
import FooterComponent from '../../components/FooterComponent/FooterComponent';

const MessagesPage = () => {
  return (
    <div className='dashboard-container'>
      <MenuComponent />
      <MessagesComponent />
      <FooterComponent/>
    </div>
  )
}

export default MessagesPage