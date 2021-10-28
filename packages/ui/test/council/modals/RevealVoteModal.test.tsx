import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render, screen } from '@testing-library/react'
import React from 'react'

import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { ModalCallData, UseModal } from '@/common/providers/modal/types'
import { RevealVoteModal, RevealVoteModalCall } from '@/council/modals/RevealVote'

import { alice } from '../../_mocks/keyring/signers'
import { MockKeyringProvider } from '../../_mocks/providers'
import { stubApi, stubTransaction } from '../../_mocks/transactions'


describe('UI: RevealVoteModal', () => {
  const api = stubApi()
  const txPath = 'api.tx.referendum.revealVote'
  let tx: any

  stubTransaction(api, txPath)

  const modalData: ModalCallData<RevealVoteModalCall> = {
    vote: {
        salt: '0x7a0c114de774424abcd5d60fc58658a35341c9181b09e94a16dfff7ba2192206',
        accountId: alice.address,
        optionId: '1',
    },
    voteForHandle: 'alice',
  }

  const useModal: UseModal<any> = {
    hideModal: jest.fn(),
    showModal: jest.fn(),
    modal: null,
    modalData,
  }

  beforeAll(async () => {
    await cryptoWaitReady()
  })

  describe('Requirements check', () => {
    it('Cannot afford transaction fee', async () => {
        tx = stubTransaction(api, txPath, 10000)
        renderModal()
        expect(await screen.findByText('Insufficient Funds')).toBeDefined()
    })

    it('Requirements passed', async () => {
      tx = stubTransaction(api, txPath, 10)
      renderModal()
      expect((await screen.findByText(/You intend to reveal your vote for/)).textContent).toEqual('You intend to reveal your vote for alice.')
    })
  })

  const renderModal = () =>
    render(
      <ModalContext.Provider value={useModal}>
        <MockKeyringProvider>
            <ApiContext.Provider value={api}>
                <RevealVoteModal />
            </ApiContext.Provider>
        </MockKeyringProvider>
      </ModalContext.Provider>
    )
})
