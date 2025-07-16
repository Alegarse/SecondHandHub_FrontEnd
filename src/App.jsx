import { Provider } from 'react-redux'
import './css/App.css'
import store from './core/redux/store/store'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePageComponent from './components/HomePageComponent/HomePageComponent'
import DashboardPage from './pages/Dashboard/dashboardPage';
import NotFoundPage from './pages/NotFound/NotFoundPage';

function App() {

  return (
    <Provider store={store}>
      <Router>
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
