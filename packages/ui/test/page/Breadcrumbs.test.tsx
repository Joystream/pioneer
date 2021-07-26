import { render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { breadcrumbsOptions } from '../../src/app/constants/breadcrumbs'
import { Breadcrumbs } from '../../src/common/components/page/Sidebar/Breadcrumbs/Breadcrumbs'

describe('Breadcrumbs', () => {
  it('Short path', () => {
    renderCrumbs('/profile')
    expect(screen.getByText('My Profile')).toBeDefined()
  })

  it('With named last crumb', () => {
    renderCrumbs('/working-groups/openings/3', 'Distribution Lead')
    expect(screen.getByText('Working Groups')).toBeDefined()
    expect(screen.getByText('Openings')).toBeDefined()
    expect(screen.getByText('Distribution Lead')).toBeDefined()
  })

  function renderCrumbs(location: string, lastBreadcrumb: string | undefined = undefined) {
    render(
      <MemoryRouter initialEntries={[location]}>
        <Breadcrumbs breadcrumbsOptions={breadcrumbsOptions} lastBreadcrumb={lastBreadcrumb} />
      </MemoryRouter>
    )
  }
})
