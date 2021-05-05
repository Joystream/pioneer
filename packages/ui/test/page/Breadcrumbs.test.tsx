import { render, screen } from '@testing-library/react'
import React from 'react'
import { HashRouter } from 'react-router-dom'

import { Breadcrumbs } from '../../src/common/components/page/Sidebar/Breadcrumbs/Breadcrumbs'


const location = {
  key: '',
  pathname: '/',
  search: '',
  hash: '#',
  state: {},
}

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: () => location,
}))

describe('Breadcrumbs', () => {
  it('Short path', () => {
    location.pathname = '/profile'
    renderCrumbs()
    expect(screen.getByText('My Profile')).toBeDefined()
  })

  function renderCrumbs() {
    render(
      <HashRouter>
        <Breadcrumbs />
      </HashRouter>
    )
  }
})
