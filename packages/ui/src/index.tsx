import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import { Providers } from './providers/'

ReactDOM.render(
  <Providers>
    <App />
  </Providers>,
  document.getElementById('app')
)
export { SelectComponent } from './components/selects/selects'
export { EmptyOption } from './components/selects/selects'
export { SelectedOption } from './components/selects/selects'
