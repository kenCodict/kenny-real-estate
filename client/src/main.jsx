import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {store,persistor} from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import Loader from './Components/Loader.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>

  <App />
    </PersistGate>
  </Provider>
  </StrictMode>,
)
