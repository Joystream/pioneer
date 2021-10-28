import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { ModalCallData, UseModal } from '@/common/providers/modal/types'
import { RevealVoteModal, RevealVoteModalCall } from '@/council/modals/RevealVote'

import { getButton } from '../../_helpers/getButton'
import { alice } from '../../_mocks/keyring/signers'
import { MockKeyringProvider } from '../../_mocks/providers'
import { stubApi, stubTransaction, stubTransactionFailure, stubTransactionSuccess } from '../../_mocks/transactions'

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
      expect((await screen.findByText(/You intend to reveal your vote for/)).textContent).toEqual(
        'You intend to reveal your vote for alice.'
      )
    })
  })

  it('Transaction success', async () => {
    stubTransactionSuccess(tx, 'referendum', 'VoteRevealed')
    renderModal()

    fireEvent.click(await getButton('Sign and reveal'))

    expect(await screen.findByText('You have just successfully revelead your vote for alice.')).toBeDefined()
  })

  it('Transaction error', async () => {
    stubTransactionFailure(tx)
    renderModal()

    fireEvent.click(await getButton('Sign and reveal'))

    expect(await screen.findByText(/^There was a problem revealing your vote./i)).toBeDefined()
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
