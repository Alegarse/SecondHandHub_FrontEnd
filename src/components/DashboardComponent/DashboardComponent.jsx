import React from 'react'
import { useSelector } from 'react-redux';

const DashboardComponent = () => {

   const userDataLogged = useSelector(
    (state) => state.dashboardComponentReducer.userDataLogged
  );

  return (
    <pre>{JSON.stringify(userDataLogged, null, 2)}</pre>
  )
}

export default DashboardComponent