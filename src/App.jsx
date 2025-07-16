import { Provider } from 'react-redux'
import './css/App.css'
import store from './core/redux/store/store'
import HomePageComponent from './components/HomePageComponent/HomePageComponent'

function App() {

  return (
    <Provider store={store}>
      <HomePageComponent/>
    </Provider>
  )
}

export default App
