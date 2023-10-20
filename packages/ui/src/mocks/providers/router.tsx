import { Decorator } from '@storybook/react'
import React from 'react'
import { MemoryRouter, Redirect, Route, Switch } from 'react-router'

import { NotFound } from '@/app/pages/NotFound'

type MockRouterOptions = {
  href?: string
  path?: string
  enable404?: boolean
  actions?: Record<string, () => any>
}

export const MockRouterDecorator: Decorator = (Story, { parameters }) => {
  const options = (parameters.router ?? {}) as MockRouterOptions
  const storyPath = options.href ?? '/'

  return (
    <>
      <div id="modal-container" />
      <MemoryRouter initialEntries={[storyPath]}>
        <Switch>
          <Route component={Story} path={options.path ?? storyPath} />

          {Object.entries(options.actions ?? {}).map(([path, action]) => (
            <Route
              key={path}
              path={path}
              component={() => {
                action()
                return null
              }}
            />
          ))}

          {options.enable404 && <Route path="*" component={NotFound} />}
          <Redirect from="*" to={storyPath} />
        </Switch>
      </MemoryRouter>
    </>
  )
}
