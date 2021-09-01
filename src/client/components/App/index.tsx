import React from 'react'
import { renderRoutes } from 'react-router-config'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import GlobalStyle from 'core/style/GlobalStyle'
import rootRoute from 'modules/root/routes'

const App = () => (
  <BrowserRouter>
    <GlobalStyle />

    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable={false}
      pauseOnHover
    />

    {renderRoutes(rootRoute)}
  </BrowserRouter>
)

export default App
