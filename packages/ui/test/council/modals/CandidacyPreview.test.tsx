import { act, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { ModalContextProvider } from '@/common/providers/modal/provider'
import { CandidacyPreview } from '@/council/modals/CandidacyPreview/CandidacyPreview'
import { seedCouncilCandidate, seedCouncilElection, seedElectedCouncil, seedMember, seedMembers } from '@/mocks/data'

import { CANDIDATE_DATA } from '../../_mocks/council'
import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { MEMBER_ALICE_DATA } from '../../_mocks/server/seeds'
import { mockUseModalCall } from '../../setup'

describe('UI: CandidacyPreview', () => {
  const server = setupMockServer({ noCleanupAfterEach: true })
  const modalData = {
    id: '0',
  }
  beforeAll(async () => {
    mockUseModalCall({
      modalData,
    })
    seedMembers(server.server, 2)
    seedMember({ ...MEMBER_ALICE_DATA, id: '2', handle: 'Cindy' }, server.server)
    seedElectedCouncil(
      {
        id: '0',
        endedAtBlock: 100,
        electedAtBlock: 90,
        electedAtTime: '2022-01-01',
        electedAtNetwork: 'OLYMPIA',
      },
      server.server
    )
    seedCouncilElection(
      {
        id: '0',
        cycleId: 0,
        isFinished: false,
        electedCouncilId: '0',
      },
      server.server
    )
    ;['0', '1', '2'].forEach((id) =>
      seedCouncilCandidate(
        {
          ...CANDIDATE_DATA,
          id,
          memberId: id,
        },
        server.server
      )
    )
  })

  describe('Cycle candidates', () => {
    it('First in list', async () => {
      modalData.id = '0'
      displayModal()
      expect(await screen.findByText(/alice/i)).toBeDefined()
      expect(await screen.findByText(/candidate 1 of 3/i)).toBeDefined()
      expect(await screen.findByTitle('Previous candidate')).toBeDisabled()
      const nextButton = await screen.findByTitle('Next candidate')
      expect(nextButton).not.toBeDisabled()
      act(() => {
        fireEvent.click(nextButton)
      })
      expect(await screen.findByText(/bob/i)).toBeDefined()
      expect(await screen.findByText(/candidate 2 of 3/i)).toBeDefined()
    })

    it('Second in list', async () => {
      modalData.id = '1'
      displayModal()
      expect(await screen.findByText(/bob/i)).toBeDefined()
      expect(await screen.findByText(/candidate 2 of 3/i)).toBeDefined()
      expect(await screen.findByTitle('Previous candidate')).not.toBeDisabled()
      expect(await screen.findByTitle('Next candidate')).not.toBeDisabled()
    })

    it('Last in list', async () => {
      modalData.id = '2'
      displayModal()
      expect(await screen.findByText(/cindy/i)).toBeDefined()
      expect(await screen.findByText(/candidate 3 of 3/i)).toBeDefined()
      const previousButton = await screen.findByTitle('Previous candidate')
      expect(previousButton).not.toBeDisabled()
      expect(await screen.findByTitle('Next candidate')).toBeDisabled()
      act(() => {
        fireEvent.click(previousButton)
      })
      expect(await screen.findByText(/bob/i)).toBeDefined()
      expect(await screen.findByText(/candidate 2 of 3/i)).toBeDefined()
    })
  })

  const displayModal = () =>
    render(
      <ModalContextProvider>
        <MockQueryNodeProviders>
          <CandidacyPreview />
        </MockQueryNodeProviders>
      </ModalContextProvider>
    )
})
