import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import { set } from 'lodash'
import React from 'react'

import { ApiContext } from '@/api/providers/context'
import { GlobalModals } from '@/app/GlobalModals'
import { createType } from '@/common/model/createType'
import { ModalContextProvider } from '@/common/providers/modal/provider'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers } from '@/mocks/data'

import { alice, bob } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import {
  stubAccounts,
  stubApi,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'
import { mockTransactionFee, mockUseModalCall } from '../../setup'

describe('UI: RecoverBalanceModal', () => {
  const api = stubApi()
  const server = setupMockServer({ noCleanupAfterEach: true })
  let tx: any
  const modalData = {
    lock: {
      amount: new BN(300),
      type: 'Council Candidate',
    },
    address: alice.address,
    memberId: '0',
  }

  beforeAll(async () => {
    mockUseModalCall({ modalData, modal: 'RecoverBalance' })
    await cryptoWaitReady()
    seedMembers(server.server, 2)
  })

  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    hasMembers: true,
    helpers: {
      getMemberIdByBoundAccountAddress: () => undefined,
    },
  }

  beforeEach(async () => {
    stubAccounts([alice, bob])
    stubDefaultBalances()
    useMyMemberships.setActive(getMember('alice'))
    tx = stubTransaction(api, 'api.tx.council.releaseCandidacyStake')
    mockTransactionFee({ transaction: tx as any, feeInfo: { transactionFee: new BN(100), canAfford: true } })
  })

  it('Insufficient funds', async () => {
    mockTransactionFee({ feeInfo: { transactionFee: new BN(100), canAfford: false } })

    renderModal()

    expect(await screen.findByText('modals.insufficientFunds.title')).toBeDefined()
  })

  it('Transaction summary', async () => {
    renderModal()
    screen.findByText(/^sign transaction and transfer$/i)
    expect(await screen.findByRole('heading', { name: 'Recover Stake' })).toBeDefined()
  })

  it('Transaction summary for withdraw application', async () => {
    mockUseModalCall({ modalData: { ...modalData, isWithdrawing: true }, modal: 'RecoverBalance' })
    renderModal()
    screen.findByText(/^sign transaction and transfer$/i)
    expect(await screen.findByRole('heading', { name: 'Withdraw Application' })).toBeDefined()
    mockUseModalCall({ modalData, modal: 'RecoverBalance' })
  })

  describe('Transaction for lockType', () => {
    let releaseCandidacyStakeMock: any
    let releaseVoteStake: any

    beforeEach(() => {
      releaseCandidacyStakeMock = jest.fn()
      releaseVoteStake = jest.fn()

      set(api, 'api.tx.council.releaseCandidacyStake', releaseCandidacyStakeMock)
      set(api, 'api.tx.referendum.releaseVoteStake', releaseVoteStake)
    })

    it('Council Candidate', async () => {
      renderModal()

      expect(releaseCandidacyStakeMock).toBeCalled()
      expect(releaseVoteStake).not.toBeCalled()
    })

    it('Voting', async () => {
      modalData.lock = {
        amount: new BN(300),
        type: 'Voting',
      }

      renderModal()

      expect(releaseCandidacyStakeMock).not.toBeCalled()
      expect(releaseVoteStake).toBeCalled()
    })
  })

  it('Success', async () => {
    stubTransactionSuccess(tx, 'council', 'CandidacyStakeRelease', [createType('MemberId', 0)])
    mockUseModalCall({
      modalData: {
        ...modalData,
        lock: {
          amount: new BN(300),
          type: 'Council Candidate',
        },
      },
    })

    renderModal()
    fireEvent.click(await screen.findByText(/^sign transaction and transfer$/i))

    expect(await screen.findByText('Success')).toBeDefined()
  })

  it('Failure', async () => {
    stubTransactionFailure(tx)

    renderModal()
    fireEvent.click(await screen.findByText(/^sign transaction and transfer$/i))

    expect(await screen.findByText('Failure')).toBeDefined()
  })

  function renderModal() {
    render(
      <MockKeyringProvider>
        <ModalContextProvider>
          <MockQueryNodeProviders>
            <MembershipContext.Provider value={useMyMemberships}>
              <ApiContext.Provider value={api}>
                <GlobalModals />
              </ApiContext.Provider>
            </MembershipContext.Provider>
          </MockQueryNodeProviders>
        </ModalContextProvider>
      </MockKeyringProvider>
    )
  }
})
