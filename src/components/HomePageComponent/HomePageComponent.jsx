import React from 'react'
import { useSelector } from 'react-redux'
import HomePage from '../../pages/Home/HomePage'
import DashboardPage from '../../pages/Dashboard/dashboardPage'

const HomePageComponent = () => {

    const userLoggedState = useSelector(
        (state) => state.homePageComponentReducer.isLogged
    )

  return (
    <div className='principal-container'>
        {
            userLoggedState === false ? (
                <HomePage/>
            ) : (
                <DashboardPage/>
            )
        }
    </div>
  )
}

export default HomePageComponent