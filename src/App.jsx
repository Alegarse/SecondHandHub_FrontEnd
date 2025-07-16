import { Provider } from 'react-redux'
import './App.css'
import HomePage from './pages/HomePage/HomePage'
import store from './core/redux/store/store'

function App() {

  return (
    <Provider store={store}>
      <HomePage/>
    </Provider>
  )
}

export default App
