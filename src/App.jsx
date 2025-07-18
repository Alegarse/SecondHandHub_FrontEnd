import { Provider } from 'react-redux';
import './css/App.css';
import store from './core/redux/store/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePageComponent from './components/HomePageComponent/HomePageComponent';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import DashboardPage from './pages/Dashboard/DashBoardPage';
import BackgroundComponent from './components/BackgroundComponent/BackgroundComponent';
import PrivateRouteComponent from './components/PrivateRouteComponent/PrivateRouteComponent';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <BackgroundComponent />
        <Routes>
          <Route path="/" element={<HomePageComponent />} />
          <Route path="/*" element={<NotFoundPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRouteComponent>
                <DashboardPage />
              </PrivateRouteComponent>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
