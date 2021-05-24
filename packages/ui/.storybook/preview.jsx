import React from 'react'
import { GlobalStyle } from '../src/app/providers/GlobalStyle'
import { Colors } from '../src/common/constants'

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
    default: 'White',
    values: [
      {
        name: 'White',
        value: Colors.White,
      },
      {
        name: 'Black',
        value: Colors.Black[900],
      },
      {
        name: 'Modal',
        value: Colors.Black[50],
      },
      {
        name: 'Disabled',
        value: Colors.Black[75],
      },
      {
        name: 'Around modal glass',
        value: Colors.Black[700.85],
      },
    ],
  },
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Common'],
    },
  },
}
