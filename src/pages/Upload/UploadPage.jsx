import React from 'react'
import UploadProductComponent from '../../components/UploadProductComponent/UploadProductComponent'
import MenuComponent from '../../components/MenuComponent/MenuComponent';
import FooterComponent from '../../components/FooterComponent/FooterComponent';

const UploadPage = () => {
  return (
    <div className='dashboard-container'>
      <MenuComponent />
      <UploadProductComponent />
      <FooterComponent/>
    </div>
  )
}

export default UploadPage