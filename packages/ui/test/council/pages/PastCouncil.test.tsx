import { configure, render, waitForElementToBeRemoved, within } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { generatePath, Route, Switch } from 'react-router-dom'

import { PastCouncil } from '@/app/pages/Council/PastCouncils/PastCouncil'
import { NotFound } from '@/app/pages/NotFound'
import { camelCaseToText } from '@/common/helpers'
import { CouncilRoutes } from '@/council/constants'
import {
  seedApplication,
  seedCouncilMember,
  seedElectedCouncil,
  seedEvent,
  seedMembers,
  seedOpening,
  seedProposal,
  seedWorker,
  seedWorkingGroups,
} from '@/mocks/data'
import { getMember } from '@/mocks/helpers'

import { getButton } from '../../_helpers/getButton'
import { getCouncilor } from '../../_mocks/council'
import { Members } from '../../_mocks/members'
import { testProposals } from '../../_mocks/proposals'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { APPLICATION_DATA, OPENING_DATA, WORKER_DATA } from '../../_mocks/server/seeds'
import { loaderSelector } from '../../setup'

configure({ testIdAttribute: 'id' })

describe('UI: Past Council page', () => {
  const mockServer = setupMockServer()
  let pageCouncilId = 1

  beforeEach(() => {
    pageCouncilId = 1
    seedMembers(mockServer.server, 2)
    seedWorkingGroups(mockServer.server)
    seedElectedCouncil(
      {
        id: '1',
        electedAtBlock: 0,
        endedAtBlock: 10,
        electedAtTime: '2022-01-01',
        electedAtNetwork: 'OLYMPIA',
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
      const { queryByText, findAllByText } = await renderComponent()

      expect(await findAllByText(/Council #1/i)).toHaveLength(2)
      expect(queryByText(/^Past Council$/i)).not.toBeNull()
      expect(queryByText(/Council members/i)).not.toBeNull()
      expect(queryByText(/^Proposals$/i)).not.toBeNull()
      expect(queryByText(/Working Groups/i)).not.toBeNull()
    })

    describe('Stats', () => {
      beforeEach(async () => {
        seedProposal(testProposals[0], mockServer.server)
        seedEvent(
          {
            id: '0',
            inBlock: 5,
            createdAt: '2021-10-07T11:47:39.042Z',
            network: 'OLYMPIA',
            proposalId: testProposals[0].id,
          },
          'ProposalExecutedEvent',
          mockServer.server
        )
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

        expect(getByText(/^Total spent on proposals$/i).parentElement?.nextSibling?.textContent).toBe('5,000')
      })
    })

    describe('Tabs', () => {
      describe('Council members', () => {
        beforeEach(() => {
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
            ?.parentElement
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
            ?.parentElement
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
            ?.parentElement
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
            ?.parentElement
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
            const proposalRow = getByText(/^Go to proposal$/i)?.parentElement?.parentElement

            const proposalTitle = proposalRow?.children?.item(0)?.children?.item(1)?.textContent
            expect(proposalTitle).toBe(testProposals[0].title)

            const proposalType = proposalRow?.children?.item(0)?.children?.item(0)?.children?.item(1)?.textContent
            expect(proposalType).toBe(camelCaseToText(testProposals[0].details.type))

            const proposalStatus = proposalRow?.children?.item(1)?.textContent
            expect(proposalStatus).toBe(camelCaseToText(testProposals[0].status))

            const proposalVoteStatus = proposalRow?.children?.item(3)?.textContent
            expect(proposalVoteStatus).toBe('Abstain')

            expect(await getButton('Go to proposal')).toBeDefined()
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
          const { queryByText } = await renderAndOpenTab('Proposals')

          expect(queryByText(/^Proposal$/i)).not.toBeNull()
          expect(queryByText(/^Stage$/i)).not.toBeNull()
          expect(queryByText(/^Proposer$/i)).not.toBeNull()
        })

        it('Proposals count', async () => {
          const { queryAllByText } = await renderAndOpenTab('Proposals')

          expect(queryAllByText(/Go to proposal/i).length).toBe(2)
        })

        it('Proposal data', async () => {
          const { getAllByText } = await renderAndOpenTab('Proposals')

          const proposalRow = getAllByText(/^Go to proposal$/i)[0].parentElement?.parentElement

          const proposalTitle = proposalRow?.children?.item(0)?.children?.item(1)?.textContent
          expect(proposalTitle).toBe(testProposals[1].title)

          const proposalType = proposalRow?.children?.item(0)?.children?.item(0)?.children?.item(1)?.textContent
          expect(proposalType).toBe(camelCaseToText(testProposals[1].details.type))

          const proposalStatus = proposalRow?.children?.item(1)?.textContent
          expect(proposalStatus).toBe(camelCaseToText(testProposals[1].status))
        })
      })

      describe('Working Groups', () => {
        beforeEach(() => {
          seedOpening(OPENING_DATA, mockServer.server)
          seedApplication({ ...APPLICATION_DATA, applicantId: getMember('alice').id }, mockServer.server)
          seedWorker(WORKER_DATA, mockServer.server)
          seedEvent(
            {
              groupId: WORKER_DATA.groupId,
              workerId: WORKER_DATA.id,
              id: '0-0',
              newMissedRewardAmount: 3145,
              inBlock: 1,
              createdAt: '2021-08-02T17:43:53.321Z',
              network: 'OLYMPIA',
            },
            'NewMissedRewardLevelReachedEvent',
            mockServer.server
          )
          seedEvent(
            {
              inBlock: 1,
              createdAt: '2021-09-14T11:54:56.127Z',
              network: 'OLYMPIA',
              groupId: WORKER_DATA.groupId,
              newBudget: 80000,
            },
            'BudgetSetEvent',
            mockServer.server
          )
          seedEvent(
            {
              id: '0',
              inBlock: 1,
              createdAt: '2021-06-21T21:26:48.549Z',
              network: 'OLYMPIA',
              groupId: WORKER_DATA.groupId,
              workerId: WORKER_DATA.id,
              rewardAccount: '5GNJqTPyNqANBkUVMN1LPPrxXnFouWXoe2wNSmmEoLctxiZY',
              amount: 6050,
              type: 'REGULAR',
            },
            'RewardPaidEvent',
            mockServer.server
          )
        })

        it('Renders table', async () => {
          const { getByTestId } = await renderAndOpenTab('Working Groups')

          const workingGroupsContainer = within(getByTestId('pastCouncil-workingGroups'))
          expect(workingGroupsContainer.queryByText(/^Working group$/i)).not.toBeNull()
          expect(workingGroupsContainer.queryByText(/^Total paid rewards$/i)).not.toBeNull()
          expect(workingGroupsContainer.queryByText(/^Total missed rewards$/i)).not.toBeNull()
          expect(workingGroupsContainer.queryByText(/^% of total budget$/i)).not.toBeNull()
        })

        it('Working group data', async () => {
          const { getAllByTestId } = await renderAndOpenTab('Working Groups')

          const workingGroupItem = getAllByTestId('workingGroups-item')[0]?.children.item(0)

          const workingGroupName = workingGroupItem?.children.item(0)?.textContent
          const workingGroupPaidRewards = workingGroupItem?.children.item(1)?.textContent
          const workingGroupMissedRewards = workingGroupItem?.children.item(2)?.textContent
          const workingGroupTotalBudget = workingGroupItem?.children.item(3)?.textContent
          const workingGroupBudgetPercentage = workingGroupItem?.children.item(4)?.textContent

          expect(workingGroupName).toBe('Forum')
          expect(workingGroupPaidRewards).toBe('6,050')
          expect(workingGroupMissedRewards).toBe('3,145')
          expect(workingGroupTotalBudget).toBe('80,000')
          expect(workingGroupBudgetPercentage).toBe('100%')
        })
      })
    })
  })

  it('Council not found', async () => {
    pageCouncilId = 2
    const { queryByText } = await renderComponent()

    expect(queryByText(/not found/i)).not.toBeNull()
  })

  const renderAndOpenTab = async (tabName: string) => {
    const component = await renderComponent()

    component.getByText(tabName).click()

    await waitForElementToBeRemoved(() => loaderSelector())

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

    await waitForElementToBeRemoved(() => loaderSelector())

    return rendered
  }
})
