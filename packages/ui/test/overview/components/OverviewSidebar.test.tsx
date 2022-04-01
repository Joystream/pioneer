import { render, screen, waitFor } from '@testing-library/react'
import BN from 'bn.js'
import * as faker from 'faker'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'

import { MembershipContext } from '@/memberships/providers/membership/context'
import { seedMembers, seedProposals } from '@/mocks/data'
import { getMember } from '@/mocks/helpers'
import { OverviewSidebar } from '@/overview/components/OverviewSidebar/OverviewSidebar'
import { OverviewSidebarInformations } from '@/overview/types/Overview'

import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

const useOverviewSidebarInformationMock: { informations: OverviewSidebarInformations } = {
  informations: {
    threads: [],
    applications: [],
    roles: [],
    proposals: [],
    candidatures: [],
    isCouncil: false,
  },
}

jest.mock('@/overview/hooks/useOverviewSidebarInformation', () => ({
  useOverviewSidebarInformation: () => useOverviewSidebarInformationMock,
}))

describe('UI: OverviewSidebar', () => {
  const server = setupMockServer({ noCleanupAfterEach: true })

  const useMyMemberships = {
    active: getMember('alice'),
    setActive: () => undefined,
    members: [getMember('alice')],
    hasMembers: false,
    isLoading: true,
    helpers: {
      getMemberIdByBoundAccountAddress: () => undefined,
    },
  }

  const proposal = {
    title: 'Proposal 1',
    id: '1',
    creatorId: useMyMemberships.active.id,
    details: {
      type: 'setMembershipPrice',
      data: {
        newPrice: 4322,
      },
    },
    discussionThread: { mode: 'ProposalDiscussionThreadModeOpen', discussionPosts: [] },
    votes: [],
  }

  beforeAll(() => {
    seedMembers(server.server, 1)
    seedProposals(server.server, [proposal])
  })

  it('Renders empty states', () => {
    renderComponent()

    expect(screen.queryByText('sidebar.emptyStates.application.title')).toBeInTheDocument()
    expect(screen.queryByText('sidebar.emptyStates.candidacies.title')).toBeInTheDocument()
    expect(screen.queryByText('sidebar.emptyStates.proposals.title')).toBeInTheDocument()
    expect(screen.queryByText('sidebar.emptyStates.forum.title')).toBeInTheDocument()
  })

  it('Renders roles', () => {
    const role = 'Forum'
    const reward = new BN(1000)
    useOverviewSidebarInformationMock.informations.roles = [
      {
        reward,
        role,
        isLead: true,
      },
    ]

    renderComponent()

    expect(screen.queryByText('sidebar.sections.myRoles')).toBeInTheDocument()
    expect(screen.queryByText('sidebar.roles.lead')).toBeInTheDocument()
    expect(screen.queryByText(role)).toBeInTheDocument()
  })

  it('Renders applications', () => {
    const group = 'Forum'
    useOverviewSidebarInformationMock.informations.applications = [
      {
        expectedEndingDate: faker.date.recent(10).toDateString(),
        group,
      },
    ]

    renderComponent()

    expect(screen.queryByText(`${group} Working Group`)).toBeInTheDocument()
    expect(screen.queryByText('sidebar.periodLength')).toBeInTheDocument()
  })

  it('Renders candidacies', () => {
    const id = '1'
    const title = 'Election title'
    useOverviewSidebarInformationMock.informations.candidatures = [
      {
        title,
        id,
      },
    ]
    useOverviewSidebarInformationMock.informations.applications = []

    renderComponent()

    expect(screen.queryByText(title)).toBeInTheDocument()
    expect(screen.queryByText('sidebar.periodLength')).toBeInTheDocument()
  })

  it('Renders proposals', async () => {
    useOverviewSidebarInformationMock.informations.proposals = [proposal.id]

    renderComponent()

    await waitFor(() => expect(screen.queryByText(proposal.title)).toBeInTheDocument())
  })

  it('Renders threads', () => {
    const title = 'Thread title'
    const numberOfPosts = 8
    useOverviewSidebarInformationMock.informations.threads = [
      {
        title,
        numberOfPosts,
      },
    ]

    renderComponent()

    expect(screen.queryByText(title)).toBeInTheDocument()
    expect(screen.queryByText(numberOfPosts)).toBeInTheDocument()
  })

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <MockKeyringProvider>
          <MockQueryNodeProviders>
            <MembershipContext.Provider value={useMyMemberships}>
              <OverviewSidebar />
            </MembershipContext.Provider>
          </MockQueryNodeProviders>
        </MockKeyringProvider>
      </MemoryRouter>
    )
})
