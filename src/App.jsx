import { Provider } from 'react-redux'
import './css/App.css'
import store from './core/redux/store/store'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePageComponent from './components/HomePageComponent/HomePageComponent'
import NotFoundPage from './pages/NotFound/NotFoundPage';
import DashboardPage from './pages/Dashboard/DashBoardPage';
import BackgroundComponent from './components/BackgroundComponent/BackgroundComponent';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <BackgroundComponent/>
        <Routes>
          <Route path='/' element={<HomePageComponent/>}/>
          <Route path='/dashboard' element={<DashboardPage/>}/>
          <Route path='/*' element={<NotFoundPage/>}/>
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
