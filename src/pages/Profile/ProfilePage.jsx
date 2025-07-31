import React from 'react'
import ProfileComponent from '../../components/ProfileComponent/ProfileComponent'
import MenuComponent from '../../components/MenuComponent/MenuComponent';
import FooterComponent from '../../components/FooterComponent/FooterComponent';

const ProfilePage = () => {
  return (
    <div className='dashboard-container'>
      <MenuComponent />
      <ProfileComponent />
      <FooterComponent/>
    </div>
  )
}

export default ProfilePage