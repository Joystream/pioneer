import { BrowserRouter } from 'react-router-dom'
import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function Providers(props: Props) {
  return <BrowserRouter>{props.children}</BrowserRouter>
}
