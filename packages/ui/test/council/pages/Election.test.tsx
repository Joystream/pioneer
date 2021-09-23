import { prettyDOM, render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { Election } from '@/app/pages/Council/Election'
import { ApiContext } from '@/common/providers/api/context'
import {
  seedCouncilCandidate,
  seedCouncilCandidates,
  seedCouncilElection,
  seedElectedCouncil,
  seedMembers,
} from '@/mocks/data'
import { getMember } from '@/mocks/helpers'

import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { stubApi, stubCouncilAndReferendum } from '../../_mocks/transactions'

describe('UI: Election page', () => {
  const mockServer = setupMockServer()
  const api = stubApi()

  beforeEach(() => {
    seedMembers(mockServer.server)
    seedElectedCouncil(
      {
        id: '1',
        councilMemberIds: [],
        endedAtBlock: null,
      },
      mockServer.server
    )
    seedCouncilElection({ id: '1', cycleId: 1, isFinished: false, electedCouncilId: '1' }, mockServer.server)
  })

  it('Inactive', async () => {
    stubCouncilAndReferendum(api, 'Idle', 'Inactive')

    await renderComponent()

    expect(screen.queryByText('Stage')).toBeNull()
  })

  describe('Active', () => {
    it('Displays election round', async () => {
      stubCouncilAndReferendum(api, 'Announcing', 'Inactive')

      await renderComponent()

      expect(screen.queryByText(/1 round/i)).not.toBeNull()
    })

    describe('Announcing stage', () => {
      beforeEach(() => {
        stubCouncilAndReferendum(api, 'Announcing', 'Inactive')
      })

      it('Displays stage', async () => {
        await renderComponent()

        expect(screen.queryByText(/Announcing period/i)).not.toBeNull()
      })

      it('No candidates', async () => {
        await renderComponent()

        expect(screen.queryByText(/There are no candidates yet/i)).not.toBeNull()
      })

      it('Has candidates', async () => {
        seedCouncilCandidate(
          {
            id: '1',
            cycleIdId: '1',
            memberId: getMember('alice').id,
            stake: 1000,
          },
          mockServer.server
        )
        seedCouncilCandidate(
          {
            id: '2',
            cycleIdId: '1',
            memberId: getMember('bob').id,
            stake: 1000,
          },
          mockServer.server
        )

        await renderComponent()

        expect(screen.queryAllByText(/newcomer/i).length).toBe(2)
      })
    })

    it('Voting stage', async () => {
      stubCouncilAndReferendum(api, 'Election', 'Voting')

      await renderComponent()

      expect(screen.queryByText(/Voting period/i)).not.toBeNull()
    })

    it('Revealing stage', async () => {
      stubCouncilAndReferendum(api, 'Election', 'Revealing')

      await renderComponent()

      expect(screen.queryByText(/Revealing period/i)).not.toBeNull()
    })
  })

  async function renderComponent() {
    const rendered = await render(
      <ApiContext.Provider value={api}>
        <MockQueryNodeProviders>
          <MemoryRouter>
            <Election />
          </MemoryRouter>
        </MockQueryNodeProviders>
      </ApiContext.Provider>
    )

    await waitForElementToBeRemoved(() => rendered.getByText('Loading...'))
    return rendered
  }
})
