import React from 'react'

import { render } from 'react-dom'
import App from 'client/components/App'

function renderApp() {
  const rootElement = document.getElementById('root')

  render(<App />, rootElement)
}

export default renderApp
