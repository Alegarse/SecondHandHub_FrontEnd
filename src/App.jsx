import { Provider } from 'react-redux'
import './App.css'
import store from './core/redux/store/store'
import HomePage from './pages/homePage/HomePage'

function App() {

  return (
    <Provider store={store}>
      <HomePage/>
    </Provider>
  )
}

export default App
