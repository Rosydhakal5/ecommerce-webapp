import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack'
// import store from './redux/store.js'
import { BrowserRouter } from 'react-router-dom'
import { store } from './redux/store.js'
// import { PersistGate } from 'redux-persist/integration/react'
// import persistStore from 'redux-persist/es/persistStore'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <PersistGate loading={null} persistor={persistStore}> */}
      <Provider store={store}>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </Provider>
      {/* </PersistGate> */}
    </BrowserRouter>
  </React.StrictMode>
)
