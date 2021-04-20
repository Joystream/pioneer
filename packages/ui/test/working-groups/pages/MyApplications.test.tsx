import { render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'
import { HashRouter } from 'react-router-dom'

import { MyApplications } from '../../../src/app/pages/WorkingGroups/MyApplications'
import { WorkingGroupApplication } from '../../../src/working-groups/types/WorkingGroupApplication'

let mockApplications: { isLoading: boolean; applications: WorkingGroupApplication[] }

jest.mock('../../../src/working-groups/hooks/useMyApplications', () => ({
  useMyApplications: () => mockApplications,
}))

const currentApplication = {
  id: '1',
  opening: {
    type: 'LEADER',
    groupName: 'Storage',
    reward: new BN(200),
  },
  status: 'ApplicationStatusPending',
}

const pastApplication = {
  id: '2',
  opening: {
    type: 'REGULAR',
    groupName: 'Forum',
    reward: new BN(100),
  },
  status: 'ApplicationStatusRejected',
}

describe('UI: MyApplications', () => {
  beforeEach(() => {
    mockApplications = {
      isLoading: false,
      applications: [],
    }
  })

  it('Still loading', () => {
    mockApplications.isLoading = true
    renderPage()

    expect(screen.getByText('Loading...')).toBeDefined
    expect(screen.queryByText(/no applications found/i)).not.toBeDefined

    expect(screen.queryByText(/current applications/i)).not.toBeDefined
    expect(screen.queryByText(/past applications/i)).not.toBeDefined
  })

  it('No applications', async () => {
    renderPage()

    expect(screen.getByText(/no applications found/i)).toBeDefined
    expect(screen.queryByText('Loading...')).not.toBeDefined

    expect(screen.queryByText(/current applications/i)).not.toBeDefined
    expect(screen.queryByText(/past applications/i)).not.toBeDefined
  })

  it('Current applications only', () => {
    mockApplications.applications.push(currentApplication)
    renderPage()

    expect(screen.queryByText('Loading...')).not.toBeDefined
    expect(screen.queryByText(/past applications/i)).not.toBeDefined

    expect(screen.getByText(/current applications/i)).toBeDefined
    expect(screen.getByText(/storage leader/i)).toBeDefined
    expect(screen.queryByText(/past applications/i)).not.toBeDefined
  })

  it('Past applications only', () => {
    mockApplications.applications.push(pastApplication)
    renderPage()

    expect(screen.queryByText('Loading...')).not.toBeDefined
    expect(screen.queryByText(/past applications/i)).not.toBeDefined

    expect(screen.getByText(/past applications/i)).toBeDefined
    expect(screen.getByText(/forum worker/i)).toBeDefined
    expect(screen.queryByText(/current applications/i)).not.toBeDefined
  })

  it('Both current and past applications', () => {
    mockApplications.applications.push(currentApplication)
    mockApplications.applications.push(pastApplication)
    renderPage()

    expect(screen.queryByText('Loading...')).not.toBeDefined
    expect(screen.queryByText(/past applications/i)).not.toBeDefined

    expect(screen.getByText(/current applications/i)).toBeDefined
    expect(screen.getByText(/storage leader/i)).toBeDefined
    expect(screen.getByText(/past applications/i)).toBeDefined
    expect(screen.getByText(/forum worker/i)).toBeDefined
  })

  function renderPage() {
    return render(
      <HashRouter>
        <MyApplications />
      </HashRouter>
    )
  }
})
