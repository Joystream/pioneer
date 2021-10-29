import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import { RecoverVoteStakeModal } from '@/council/modals/RecoverVoteStake'

import { getButton } from '../../_helpers/getButton'
import { alice, bob } from '../../_mocks/keyring/signers'
import { MockKeyringProvider } from '../../_mocks/providers'
import { stubApi, stubTransaction, stubTransactionFailure, stubTransactionSuccess } from '../../_mocks/transactions'

describe('UI: RecoverVoteStakeModal', () => {
  const api = stubApi()
  const txPath = 'api.tx.referendum.releaseVoteStake'
  let tx: any

  stubTransaction(api, txPath)

  const modalData = {
    address: alice.address,
  }

  const useModal: UseModal<any> = {
    hideModal: jest.fn(),
    showModal: jest.fn(),
    modal: null,
    modalData,
  }

  const useAccounts = {
    allAccounts: [
      { ...alice, name: 'Alice Account' },
      { ...bob, name: 'Bob Account' },
    ],
    hasAccounts: true,
  }

  beforeAll(async () => {
    await cryptoWaitReady()
  })

  beforeEach(() => {
    tx = stubTransaction(api, txPath, 10)
  })

  it('Requirements check failed', async () => {
    tx = stubTransaction(api, txPath, 10000)
    renderModal()
    expect(await screen.findByText('Insufficient Funds')).toBeDefined()
  })

  it('Display transaction step', async () => {
    renderModal()
    expect(await screen.findByText('You intend to recover your stake.')).toBeDefined()
  })

  it('Transaction failure', async () => {
    stubTransactionFailure(tx)
    renderModal()

    fireEvent.click(await getButton('Sign and recover stake'))
    expect(await screen.findByText('There was a problem recovering the vote stake.'))
  })

  it('Transaction success', async () => {
    stubTransactionSuccess(tx, 'referendum', 'StakeReleased')
    renderModal()

    fireEvent.click(await getButton('Sign and recover stake'))
    expect(await screen.findByText('Your stake amount was recovered successfully.'))
  })

  const renderModal = () =>
    render(
      <ModalContext.Provider value={useModal}>
        <MockKeyringProvider>
          <AccountsContext.Provider value={useAccounts}>
            <ApiContext.Provider value={api}>
              <RecoverVoteStakeModal />
            </ApiContext.Provider>
          </AccountsContext.Provider>
        </MockKeyringProvider>
      </ModalContext.Provider>
    )
})
