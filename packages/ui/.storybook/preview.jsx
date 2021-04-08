import React from 'react'
import { GlobalStyle } from '../src/app/providers/GlobalStyle'

const stylesWrapperDecorator = (styleFn) => (
  <div>
    <GlobalStyle />
    {styleFn()}
  </div>
)

export const decorators = [stylesWrapperDecorator]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'black',
    values: [
      {
        name: 'black',
        value: '#000000',
      },
      {
        name: 'gray',
        value: '#272D33',
      },
    ],
  },
}
