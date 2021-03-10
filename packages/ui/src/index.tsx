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
export { SelectComponent } from './components/selects/components'
export { EmptyOption } from './components/selects/components'
export { SelectedOption } from './components/selects/components'
export { SelectProps } from './components/selects/types'
