import { render } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { OverviewSidebar } from '@/overview/components/OverviewSidebar/OverviewSidebar'
import { OverviewSidebarInformations } from '@/overview/types/Overview'

import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'

const useOverviewSidebarInformationMock: { informations: OverviewSidebarInformations } = {
  informations: {
    threads: [],
    applications: [],
    roles: [],
    proposals: [],
    candidatures: [],
  },
}

jest.mock('@/overview/hooks/useOverviewSidebarInformation', () => ({
  useOverviewSidebarInformation: () => useOverviewSidebarInformationMock,
}))

describe('UI: OverviewSidebar', () => {
  it('Renders', () => {
    renderComponent()

    expect(0).toBe(0)
  })

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <MockKeyringProvider>
          <MockQueryNodeProviders>
            <OverviewSidebar />
          </MockQueryNodeProviders>
        </MockKeyringProvider>
      </MemoryRouter>
    )
})
