import React from 'react'
import { GlobalStyle } from '../src/app/providers/GlobalStyle'
import { Colors } from '../src/common/constants'
import { I18nextProvider } from "react-i18next";
import { i18next } from "../src/services/i18n";

const stylesWrapperDecorator = (styleFn) => (
  <div>
    <GlobalStyle />
    {styleFn()}
  </div>
)

const i18nextDecorator = (Story) => (
  <React.Suspense fallback="Missing i18next config">
    <I18nextProvider i18n={i18next}>
      <Story />
    </I18nextProvider>
  </React.Suspense>
)

export const decorators = [stylesWrapperDecorator, i18nextDecorator]

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
