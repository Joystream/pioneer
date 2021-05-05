import { render, screen } from '@testing-library/react'
import React from 'react'
import { HashRouter } from 'react-router-dom'

import { breadcrumbsOptions } from '../../src/app/constants/breadcrumbs'
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

  it('Path containing an excluded element', () => {
    location.pathname = '/working-groups/grouppreview'
    renderCrumbs()
    expect(screen.getByText('Working Groups')).toBeDefined()
    expect(screen.findAllByText(/preview/i)).toMatchObject({})
  })

  it('With named last crumb', () => {
    location.pathname = '/working-groups/openings/3'
    renderCrumbs('Distribution Leader')
    expect(screen.getByText('Working Groups')).toBeDefined()
    expect(screen.getByText('Openings')).toBeDefined()
    expect(screen.getByText('Distribution Leader')).toBeDefined()
  })

  function renderCrumbs(lastBreadcrumb: string | undefined = undefined) {
    render(
      <HashRouter>
        <Breadcrumbs breadcrumbsOptions={breadcrumbsOptions} lastBreadcrumb={lastBreadcrumb} />
      </HashRouter>
    )
  }
})
