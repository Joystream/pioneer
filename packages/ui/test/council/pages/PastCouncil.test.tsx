import { render, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { generatePath, Route, Switch } from 'react-router-dom'

import { PastCouncil } from '@/app/pages/Council/PastCouncils/PastCouncil'
import { NotFound } from '@/app/pages/NotFound'
import { camelCaseToText } from '@/common/helpers'
import { CouncilRoutes } from '@/council/constants'
import {
  seedCouncilMember,
  seedElectedCouncil,
  seedEvent,
  seedMembers,
  seedProposal,
  seedWorkingGroups,
} from '@/mocks/data'
import { getMember } from '@/mocks/helpers'

import { getButton } from '../../_helpers/getButton'
import { getCouncilor } from '../../_mocks/council'
import { Members } from '../../_mocks/members'
import { testProposals } from '../../_mocks/proposals'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'

describe('UI: Past Council page', () => {
  const mockServer = setupMockServer()
  let pageCouncilId = 1

  beforeEach(() => {
    pageCouncilId = 1
    seedMembers(mockServer.server, 2)
    seedElectedCouncil(
      {
        id: '1',
        electedAtBlock: 0,
        endedAtBlock: 10,
      },
      mockServer.server
    )
    seedCouncilMember(
      {
        ...getCouncilor({ electedInCouncilId: '1', memberId: getMember('alice').id }),
        unpaidReward: 10,
        accumulatedReward: 15,
      },
      mockServer.server
    )
    seedCouncilMember(
      {
        ...getCouncilor({ electedInCouncilId: '1', memberId: getMember('bob').id }),
        unpaidReward: 20,
        accumulatedReward: 40,
      },
      mockServer.server
    )
  })

  describe('Council found', () => {
    it('Renders', async () => {
      const { queryByText } = await renderComponent()

      expect(queryByText(/Council #1/i)).not.toBeNull()
      expect(queryByText(/^Past Council$/i)).not.toBeNull()
      expect(queryByText(/Council members/i)).not.toBeNull()
      expect(queryByText(/^Proposals$/i)).not.toBeNull()
      expect(queryByText(/Working Groups/i)).not.toBeNull()
    })

    describe('Stats', () => {
      beforeEach(async () => {
        seedEvent(
          {
            id: '0',
            inBlock: 5,
            createdAt: '2021-10-07T11:47:39.042Z',
            network: 'OLYMPIA',
            amount: 100,
          },
          'BudgetSpendingEvent',
          mockServer.server
        )
        seedEvent(
          {
            id: '1',
            inBlock: 6,
            createdAt: '2021-10-07T11:47:39.042Z',
            network: 'OLYMPIA',
            amount: 200,
          },
          'BudgetSpendingEvent',
          mockServer.server
        )
      })

      it('Total spent', async () => {
        const { getByText } = await renderComponent()

        expect(getByText(/^Total spent$/i).parentElement?.nextSibling?.textContent).toBe('300')
      })

      it('Total missed rewards', async () => {
        const { getByText } = await renderComponent()

        expect(getByText(/^Total missed rewards$/i).parentElement?.nextSibling?.textContent).toBe('-30')
      })

      it('Total paid rewards', async () => {
        const { getByText } = await renderComponent()

        expect(getByText(/^Total paid rewards$/i).parentElement?.nextSibling?.textContent).toBe('55')
      })

      it('Total spent on proposals', async () => {
        const { getByText } = await renderComponent()

        expect(getByText(/^Total spent on proposals$/i).parentElement?.nextSibling?.textContent).toBe('0')
      })
    })

    describe('Tabs', () => {
      describe('Council members', () => {
        beforeEach(() => {
          seedWorkingGroups(mockServer.server)
          seedProposal({ ...testProposals[0] }, mockServer.server)
        })

        it('Renders table', async () => {
          const { queryByText } = await renderComponent()

          expect(queryByText(/^Council Members$/i)).not.toBeNull()
          expect(queryByText(/^Proposals approved$/i)).not.toBeNull()
          expect(queryByText(/^Proposals rejected$/i)).not.toBeNull()
          expect(queryByText(/^Proposals slashed$/i)).not.toBeNull()
          expect(queryByText(/^Proposals abstained$/i)).not.toBeNull()
        })

        it('Approved', async () => {
          seedEvent(
            {
              id: '0',
              voterId: getMember('alice').id,
              inBlock: 4,
              createdAt: '2021-06-16T17:21:12.161Z',
              network: 'OLYMPIA',
              proposalId: '0',
              voteKind: 'APPROVE',
            },
            'ProposalVotedEvent',
            mockServer.server
          )

          const { getByText } = await renderComponent()

          const councilMemberRow = getByText(getMember('alice').handle)?.parentElement?.parentElement?.parentElement
          const approvedColumn = councilMemberRow?.children.item(1)?.textContent

          expect(approvedColumn).toBe('1')
        })

        it('Rejected', async () => {
          seedEvent(
            {
              id: '0',
              voterId: getMember('alice').id,
              inBlock: 4,
              createdAt: '2021-06-16T17:21:12.161Z',
              network: 'OLYMPIA',
              proposalId: '0',
              voteKind: 'REJECT',
            },
            'ProposalVotedEvent',
            mockServer.server
          )
          const { getByText } = await renderComponent()

          const councilMemberRow = getByText(getMember('alice').handle)?.parentElement?.parentElement?.parentElement
          const rejectColumn = councilMemberRow?.children.item(2)?.textContent

          expect(rejectColumn).toBe('1')
        })

        it('Slashed', async () => {
          seedEvent(
            {
              id: '0',
              voterId: getMember('alice').id,
              inBlock: 4,
              createdAt: '2021-06-16T17:21:12.161Z',
              network: 'OLYMPIA',
              proposalId: '0',
              voteKind: 'SLASH',
            },
            'ProposalVotedEvent',
            mockServer.server
          )
          const { getByText } = await renderComponent()

          const councilMemberRow = getByText(getMember('alice').handle)?.parentElement?.parentElement?.parentElement
          const slashColumn = councilMemberRow?.children.item(3)?.textContent
          expect(slashColumn).toBe('1')
        })

        it('Abstained', async () => {
          seedEvent(
            {
              id: '0',
              voterId: getMember('alice').id,
              inBlock: 4,
              createdAt: '2021-06-16T17:21:12.161Z',
              network: 'OLYMPIA',
              proposalId: '0',
              voteKind: 'ABSTAIN',
            },
            'ProposalVotedEvent',
            mockServer.server
          )
          const { getByText } = await renderComponent()

          const councilMemberRow = getByText(getMember('alice').handle)?.parentElement?.parentElement?.parentElement
          const abstainColumn = councilMemberRow?.children.item(4)?.textContent
          expect(abstainColumn).toBe('1')
        })

        describe('Proposal votes dropdown', () => {
          beforeEach(() => {
            seedEvent(
              {
                id: '0',
                voterId: getMember('alice').id,
                inBlock: 4,
                createdAt: '2021-06-16T17:21:12.161Z',
                network: 'OLYMPIA',
                proposalId: '0',
                voteKind: 'ABSTAIN',
              },
              'ProposalVotedEvent',
              mockServer.server
            )
          })

          it('Renders table headers', async () => {
            const { queryByText } = await renderAndOpenProposalVotesDropdown('alice')

            expect(queryByText(/^Stage$/i)).not.toBeNull()
            expect(queryByText(/^Vote$/i)).not.toBeNull()
          })

          it('Proposal data', async () => {
            const { getByText } = await renderAndOpenProposalVotesDropdown('alice')
            const proposalRow = getByText(/^Proposal Details$/i)?.parentElement?.parentElement

            const proposalTitle = proposalRow?.children?.item(0)?.children?.item(1)?.textContent
            expect(proposalTitle).toBe(testProposals[0].title)

            const proposalType = proposalRow?.children?.item(0)?.children?.item(0)?.children?.item(1)?.textContent
            expect(proposalType).toBe(camelCaseToText(testProposals[0].details.type))

            const proposalStatus = proposalRow?.children?.item(1)?.textContent
            expect(proposalStatus).toBe(camelCaseToText(testProposals[0].status))

            const proposalVoteStatus = proposalRow?.children?.item(3)?.textContent
            expect(proposalVoteStatus).toBe('Abstain')

            expect(await getButton('Proposal details')).toBeDefined()
          })
        })
      })

      describe('Proposals', () => {
        beforeEach(() => {
          seedProposal({ ...testProposals[0] }, mockServer.server, 5)
          seedProposal({ ...testProposals[1] }, mockServer.server, 6)
          seedProposal({ ...testProposals[2] }, mockServer.server, 14)
        })

        it('Renders table', async () => {
          const { queryByText } = await renderAndOpenProposalsTab()

          expect(queryByText(/^Proposal$/i)).not.toBeNull()
          expect(queryByText(/^Stage$/i)).not.toBeNull()
          expect(queryByText(/^Proposer$/i)).not.toBeNull()
        })

        it('Proposals count', async () => {
          const { queryAllByText } = await renderAndOpenProposalsTab()

          expect(queryAllByText(/proposal details/i).length).toBe(2)
        })

        it('Proposal data', async () => {
          const { getAllByText } = await renderAndOpenProposalsTab()

          const proposalRow = getAllByText(/^Proposal Details$/i)[0].parentElement?.parentElement

          const proposalTitle = proposalRow?.children?.item(0)?.children?.item(1)?.textContent
          expect(proposalTitle).toBe(testProposals[1].title)

          const proposalType = proposalRow?.children?.item(0)?.children?.item(0)?.children?.item(1)?.textContent
          expect(proposalType).toBe(camelCaseToText(testProposals[1].details.type))

          const proposalStatus = proposalRow?.children?.item(1)?.textContent
          expect(proposalStatus).toBe(camelCaseToText(testProposals[1].status))
        })
      })
    })
  })

  it('Council not found', async () => {
    pageCouncilId = 2
    const { queryByText } = await renderComponent()

    expect(queryByText(/not found/i)).not.toBeNull()
  })

  const renderAndOpenProposalsTab = async () => {
    const component = await renderComponent()

    component.getByText(/^Proposals$/i).click()

    await waitForElementToBeRemoved(() => component.getByText('Loading...'))

    return component
  }

  const renderAndOpenProposalVotesDropdown = async (memberName: Members) => {
    const component = await renderComponent()

    const councilMemberRow = component.getByText(getMember(memberName).handle).parentElement?.parentElement
      ?.parentElement?.parentElement

    councilMemberRow?.click()

    return component
  }

  async function renderComponent() {
    const rendered = await render(
      <MemoryRouter initialEntries={[generatePath(CouncilRoutes.pastCouncil, { id: pageCouncilId })]}>
        <MockQueryNodeProviders>
          <MockKeyringProvider>
            <Switch>
              <Route path={CouncilRoutes.pastCouncil} component={PastCouncil} />
              <Route path="/404" component={NotFound} />
            </Switch>
          </MockKeyringProvider>
        </MockQueryNodeProviders>
      </MemoryRouter>
    )

    await waitForElementToBeRemoved(() => rendered.getByText('Loading...'))

    return rendered
  }
})
