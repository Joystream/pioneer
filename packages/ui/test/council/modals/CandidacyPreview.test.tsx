import { act, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import { CandidacyPreview } from '@/council/modals/CandidacyPreview/CandidacyPreview'
import { seedCouncilCandidate, seedCouncilElection, seedElectedCouncil, seedMember, seedMembers } from '@/mocks/data'

import { MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { MEMBER_ALICE_DATA } from '../../_mocks/server/seeds'

describe('UI: CandidacyPreview', () => {
  const useModal: UseModal<any> = {
    hideModal: jest.fn(),
    showModal: jest.fn(),
    modal: null,
    modalData: {
      id: '0',
      cycleId: 0,
    },
  }
  const server = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(async () => {
    seedMembers(server.server, 2)
    seedMember({ ...MEMBER_ALICE_DATA, id: '2', handle: 'Cindy' }, server.server)
    seedElectedCouncil(
      {
        id: '0',
        endedAtBlock: {
          inBlock: 100,
          createdAt: '2021-10-05T10:12:36.972Z',
          network: 'OLYMPIA',
        },
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
    ;['0', '1', '2'].map((id) =>
      seedCouncilCandidate(
        {
          id,
          memberId: id,
          cycleIdId: '0',
          stake: 1000,
          stakingAccountId: '5ChwAW7ASAaewhQPNK334vSHNUrPFYg2WriY2vDBfEQwkipU',
          rewardAccountId: '5ChwAW7ASAaewhQPNK334vSHNUrPFYg2WriY2vDBfEQwkipU',
          note: 'alias est velit ut expedita aliquam itaque eos eaque aliquid',
        },
        server.server
      )
    )
  })

  describe('Cycle candidates', () => {
    it('First in list', async () => {
      useModal.modalData.id = '0'
      displayModal()
      expect(await screen.findByText(/alice/i)).toBeDefined()
      expect(await screen.findByTitle('Previous candidate')).toBeDisabled()
      const nextButton = await screen.findByTitle('Next candidate')
      expect(nextButton).not.toBeDisabled()
      act(() => {
        fireEvent.click(nextButton)
      })
      expect(await screen.findByText(/bob/i)).toBeDefined()
    })

    it('Second in list', async () => {
      useModal.modalData.id = '1'
      displayModal()
      expect(await screen.findByText(/bob/i)).toBeDefined()
      expect(await screen.findByTitle('Previous candidate')).not.toBeDisabled()
      expect(await screen.findByTitle('Next candidate')).not.toBeDisabled()
    })

    it('Last in list', async () => {
      useModal.modalData.id = '2'
      displayModal()
      expect(await screen.findByText(/cindy/i)).toBeDefined()
      const previousButton = await screen.findByTitle('Previous candidate')
      expect(previousButton).not.toBeDisabled()
      expect(await screen.findByTitle('Next candidate')).toBeDisabled()
      act(() => {
        fireEvent.click(previousButton)
      })
      expect(await screen.findByText(/bob/i)).toBeDefined()
    })
  })

  const displayModal = () =>
    render(
      <ModalContext.Provider value={useModal}>
        <MockQueryNodeProviders>
          <CandidacyPreview />
        </MockQueryNodeProviders>
      </ModalContext.Provider>
    )
})
