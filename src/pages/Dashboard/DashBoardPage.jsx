import React from 'react';
import DashboardComponent from '../../components/DashboardComponent/DashboardComponent';
import MenuComponent from '../../components/MenuComponent/MenuComponent';

const DashboardPage = () => {
  return (
    <div className='dashboard-container'>
      <MenuComponent />
      <DashboardComponent />
    </div>
  );
};

export default DashboardPage;
