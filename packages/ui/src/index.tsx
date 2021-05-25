import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './app'

ReactDOM.render(<App />, document.getElementById('app'))
export { AppPage } from './app/components/AppPage'
export { toMemberTransactionParams } from '@/memberships/modals/utils'
