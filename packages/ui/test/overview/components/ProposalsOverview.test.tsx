import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import BN from 'bn.js'
import { ProposalMock } from 'dev/query-node-mocks/generators/generateProposals'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { ApiContext } from '@/api/providers/context'
import { seedMembers, seedProposal } from '@/mocks/data'
import { ProposalsOverview } from '@/overview/components/ProposalsOverview/ProposalsOverview'

import { baseMock, testProposals } from '../../_mocks/proposals'
import { MockApolloProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { stubApi, stubProposalConstants } from '../../_mocks/transactions'
import { loaderSelector } from '../../setup'

const decidingProposalMock: ProposalMock = {
  ...baseMock,
  id: '7',
  title: 'Deciding Test Proposal',
  status: 'deciding',
  createdAt: '2021-07-21T10:00:00.000Z',
  statusSetAtTime: '2021-07-24T10:00:00.000Z',
  details: {
    type: 'fundingRequest',
    data: {
      destinationsList: {
        destinations: [
          {
            account: '5GETSBUMwbLJgUTWMQgU8B2CP7E8kDHR8NoNNZh5tqums9AF',
            amount: new BN(5000),
          },
        ],
      },
    },
  },
  votes: [
    {
      id: '0',
      voteKind: 'REJECT',
      network: 'OLYMPIA',
      createdAt: '2021-12-03T07:57:36.653Z',
      voterId: '0',
      inBlock: 1591,
      rationale:
        '# nemo ea est in vitae\n\nAb debitis minima laboriosam velit dolorem omnis et. Ad dolorem inventore qui dolor minus voluptatem facere est modi. Mollitia modi vel sit. Officiis ut reiciendis accusamus. Maxime vel amet enim occaecati architecto maiores. Soluta quaerat saepe est consequuntur odit tempora consequatur ducimus.\n\n## amet architecto et\n\nEst asperiores odit. Et voluptates quae adipisci. Porro accusantium perspiciatis omnis ratione excepturi reprehenderit ipsa quia. Fugit aut et quam voluptate sed sit.\n \rDeleniti ut cum id hic ullam ipsum repudiandae molestiae distinctio. Aut tenetur pariatur voluptas eum aut labore incidunt. Id numquam blanditiis voluptatem ut soluta error consequatur. Labore facere porro tempora. Vitae non aspernatur accusantium voluptas quia pariatur nulla rerum. Ullam enim incidunt ducimus quia.\n \rAnimi iure magnam voluptatem culpa nihil veniam est. Excepturi quod unde et deserunt praesentium nulla repellat quas. Voluptas nam corrupti autem exercitationem. Aspernatur veritatis quia nostrum fugiat aut.',
      votingRound: 1,
    },
    {
      id: '1',
      voteKind: 'APPROVE',
      network: 'OLYMPIA',
      createdAt: '2021-12-04T07:57:36.653Z',
      voterId: '1',
      inBlock: 1592,
      rationale:
        '# nemo ea est in vitae\n\nAb debitis minima laboriosam velit dolorem omnis et. Ad dolorem inventore qui dolor minus voluptatem facere est modi. Mollitia modi vel sit. Officiis ut reiciendis accusamus. Maxime vel amet enim occaecati architecto maiores. Soluta quaerat saepe est consequuntur odit tempora consequatur ducimus.\n\n## amet architecto et\n\nEst asperiores odit. Et voluptates quae adipisci. Porro accusantium perspiciatis omnis ratione excepturi reprehenderit ipsa quia. Fugit aut et quam voluptate sed sit.\n \rDeleniti ut cum id hic ullam ipsum repudiandae molestiae distinctio. Aut tenetur pariatur voluptas eum aut labore incidunt. Id numquam blanditiis voluptatem ut soluta error consequatur. Labore facere porro tempora. Vitae non aspernatur accusantium voluptas quia pariatur nulla rerum. Ullam enim incidunt ducimus quia.\n \rAnimi iure magnam voluptatem culpa nihil veniam est. Excepturi quod unde et deserunt praesentium nulla repellat quas. Voluptas nam corrupti autem exercitationem. Aspernatur veritatis quia nostrum fugiat aut.',
      votingRound: 1,
    },
  ],
}

const dormantProposalMock = {
  ...baseMock,
  id: '7',
  title: 'Dormant Test Proposal',
  status: 'dormant',
  createdAt: '2021-07-21T10:00:00.000Z',
  statusSetAtTime: '2021-07-24T10:00:00.000Z',
  details: {
    type: 'fundingRequest',
    data: {
      destinationsList: {
        destinations: [
          {
            account: '5GETSBUMwbLJgUTWMQgU8B2CP7E8kDHR8NoNNZh5tqums9AF',
            amount: new BN(5000),
          },
        ],
      },
    },
  },
  councilApprovals: 1,
}

describe('UI: Proposals overview', () => {
  const mockServer = setupMockServer({ noCleanupAfterEach: true })
  const api = stubApi()

  beforeEach(() => {
    seedMembers(mockServer.server, 2)
    stubProposalConstants(api)
  })

  it('Displays proper number of proposals', async () => {
    testProposals.forEach((proposal) => seedProposal(proposal, mockServer.server))
    seedProposal(dormantProposalMock, mockServer.server)

    renderComponent()
    await waitForElementToBeRemoved(() => loaderSelector(true))

    expect((await screen.findByText('proposals.new')).previousSibling?.textContent).toBe('1')
    expect((await screen.findByText('proposals.approved')).previousSibling?.textContent).toBe('3')
    expect((await screen.findByText('proposals.rejected')).previousSibling?.textContent).toBe('2')
  })

  describe('Proposal in Deciding stage', () => {
    beforeEach(() => {
      seedProposal(decidingProposalMock, mockServer.server)
      renderComponent()
    })

    it('Displays title', async () => {
      expect(await screen.findByText(decidingProposalMock.title)).toBeDefined()
    })

    it('Displays status', async () => {
      expect(await screen.findByText('deciding')).toBeDefined()
    })

    it('Displays approved votes', async () => {
      expect((await screen.findByText('proposals.approvedVotes')).nextSibling?.firstChild).toBeDefined()
    })

    it('Displays rejected votes', async () => {
      expect((await screen.findByText('proposals.rejectedVotes')).nextSibling?.firstChild?.textContent).toBe('1')
    })
  })

  describe('Proposal in Dormant stage', () => {
    beforeEach(() => {
      seedProposal(dormantProposalMock, mockServer.server)
      renderComponent()
    })

    it('Displays title', async () => {
      expect(await screen.findByText(dormantProposalMock.title)).toBeDefined()
    })

    it('Displays status', async () => {
      expect(await screen.findByText('dormant')).toBeDefined()
    })

    it('Displays 1st round as approved', async () => {
      expect(await screen.findByText('proposals.approvedVotes')).toBeDefined()
    })

    it('Displays 2nd round as waiting', async () => {
      expect(await screen.findByText('...proposals.waiting')).toBeDefined()
    })
  })

  function renderComponent() {
    return render(
      <MemoryRouter>
        <ApiContext.Provider value={api}>
          <MockQueryNodeProviders>
            <MockApolloProvider>
              <ProposalsOverview />
            </MockApolloProvider>
          </MockQueryNodeProviders>
        </ApiContext.Provider>
      </MemoryRouter>
    )
  }
})
