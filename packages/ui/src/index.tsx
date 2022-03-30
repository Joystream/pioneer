import React from 'react'
import ReactDOM from 'react-dom'

import { App, Mobile } from './app'
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
ReactDOM.render(!isMobile ? <App /> : <Mobile />, document.getElementById('app'))
