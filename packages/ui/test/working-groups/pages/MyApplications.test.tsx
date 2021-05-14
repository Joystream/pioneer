import { render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'
import { HashRouter } from 'react-router-dom'

import { MyApplications } from '../../../src/app/pages/WorkingGroups/MyApplications'
import { Block } from '../../../src/common/types'
import { WorkingGroupApplication } from '../../../src/working-groups/types/WorkingGroupApplication'

let mockApplications: { isLoading: boolean; applications: WorkingGroupApplication[] }

jest.mock('../../../src/working-groups/hooks/useMyApplications', () => ({
  useMyApplications: () => mockApplications,
}))

const block: Block = {
  id: 'block-1',
  number: 1,
  network: 'BABYLON',
  timestamp: '2021-03-09T10:38:04.155Z',
}

const currentApplication = {
  id: '1',
  opening: {
    type: 'LEADER',
    groupName: 'Storage',
    reward: new BN(200),
  },
  createdAtBlock: block,
  createdAt: '2021-03-09T10:38:04.155Z',
  status: 'ApplicationStatusPending',
  stakingAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
}

const pastApplication = {
  id: '2',
  opening: {
    type: 'REGULAR',
    groupName: 'Forum',
    reward: new BN(100),
  },
  createdAtBlock: block,
  createdAt: '2021-03-09T10:38:04.155Z',
  status: 'ApplicationStatusRejected',
  stakingAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
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

    expect(screen.getByText('Loading...')).toBeDefined()
    expect(screen.queryByText(/no applications found/i)).toBeNull()

    expect(screen.queryByText(/current applications/i)).toBeNull()
    expect(screen.queryByText(/past applications/i)).toBeNull()
  })

  it('No applications', async () => {
    renderPage()

    expect(screen.getByText(/no applications found/i)).toBeDefined()
    expect(screen.queryByText('Loading...')).toBeNull()

    expect(screen.queryByText(/current applications/i)).toBeNull()
    expect(screen.queryByText(/past applications/i)).toBeNull()
  })

  it('Current applications only', () => {
    mockApplications.applications.push(currentApplication)
    renderPage()

    expect(screen.queryByText('Loading...')).toBeNull()
    expect(screen.queryByText(/no applications found/i)).toBeNull()

    expect(screen.getByText(/current applications/i)).toBeDefined()
    expect(screen.getByText(/storage leader/i)).toBeDefined()
    expect(screen.queryByText(/past applications/i)).toBeNull()
  })

  it('Past applications only', () => {
    mockApplications.applications.push(pastApplication)
    renderPage()

    expect(screen.queryByText('Loading...')).toBeNull()
    expect(screen.queryByText(/no applications found/i)).toBeNull()

    expect(screen.getByText(/past applications/i)).toBeDefined()
    expect(screen.getByText(/forum worker/i)).toBeDefined()
    expect(screen.queryByText(/current applications/i)).toBeNull()
  })

  it('Both current and past applications', () => {
    mockApplications.applications.push(currentApplication)
    mockApplications.applications.push(pastApplication)
    renderPage()

    expect(screen.queryByText('Loading...')).toBeNull()
    expect(screen.queryByText(/no applications found/i)).toBeNull()

    expect(screen.getByText(/current applications/i)).toBeDefined()
    expect(screen.getByText(/storage leader/i)).toBeDefined()
    expect(screen.getByText(/past applications/i)).toBeDefined()
    expect(screen.getByText(/forum worker/i)).toBeDefined()
  })

  function renderPage() {
    return render(
      <HashRouter>
        <MyApplications />
      </HashRouter>
    )
  }
})
