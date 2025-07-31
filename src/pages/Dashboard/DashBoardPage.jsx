import React from 'react';
import DashboardComponent from '../../components/DashboardComponent/DashboardComponent';
import MenuComponent from '../../components/MenuComponent/MenuComponent';
import FooterComponent from '../../components/FooterComponent/FooterComponent';

const DashboardPage = () => {
    
  return (
    <div className='dashboard-container'>
      <MenuComponent />
      <DashboardComponent />
      <FooterComponent/>
    </div>
  );
};

export default DashboardPage;
