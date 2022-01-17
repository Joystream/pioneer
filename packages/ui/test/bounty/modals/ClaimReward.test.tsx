import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { ClaimRewardModalCall, ClaimRewardModal } from '@/bounty/modals/ClaimRewardModal'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { ModalCallData, UseModal } from '@/common/providers/modal/types'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'

import { getButton } from '../../_helpers/getButton'
import { alice, bob } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import {
  stubApi,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'

jest.mock('@/common/hooks/useQueryNodeTransactionStatus', () => ({
  useQueryNodeTransactionStatus: () => 'confirmed',
}))

describe('UI: ClaimRewardModal', () => {
  const modalData: ModalCallData<ClaimRewardModalCall> = {
    bountyId: '1',
    reward: 100000,
  }

  const api = stubApi()
  const txPath = 'api.tx.bounty.withdrawFunding'
  let tx = stubTransaction(api, txPath)

  const useModal: UseModal<any> = {
    hideModal: jest.fn(),
    showModal: jest.fn(),
    modal: null,
    modalData,
  }
  const useMyMemberships: MyMemberships = {
    active: getMember('alice'),
    members: [getMember('alice'), getMember('bob')],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    hasMembers: true,
    helpers: {
      getMemberIdByBoundAccountAddress: () => undefined,
    },
  }
  const useAccounts = {
    isLoading: false,
    hasAccounts: true,
    allAccounts: [alice, bob],
  }

  beforeAll(async () => {
    await cryptoWaitReady()
  })

  beforeEach(async () => {
    useMyMemberships.setActive(getMember('alice'))
    stubDefaultBalances(api)
    tx = stubTransaction(api, txPath)
  })

  it('Requirements passed', async () => {
    renderModal()

    expect(screen.queryByText('modals.claimReward.description')).not.toBeNull()
    expect(await getButton('modals.claimReward.title')).toBeDefined()
  })

  it('Requirements failed', async () => {
    tx = stubTransaction(api, txPath, 10000)
    renderModal()

    expect(await screen.findByText('modals.insufficientFunds.title')).toBeDefined()
  })

  it('Transaction failed', async () => {
    stubTransactionFailure(tx)
    renderModal()

    await act(async () => {
      fireEvent.click(await getButton('modals.claimReward.title'))
    })
    expect(await screen.findByText('modals.claimReward.error')).toBeDefined()
  })

  it('Transaction success', async () => {
    stubTransactionSuccess(tx, 'bounty', 'BountyFundingWithdrawal')
    renderModal()

    await act(async () => {
      fireEvent.click(await getButton('modals.claimReward.title'))
    })
    expect(await screen.findByText('modals.claimReward.success')).toBeDefined()
  })

  const renderModal = () =>
    render(
      <ModalContext.Provider value={useModal}>
        <MockQueryNodeProviders>
          <MockKeyringProvider>
            <AccountsContext.Provider value={useAccounts}>
              <MembershipContext.Provider value={useMyMemberships}>
                <ApiContext.Provider value={api}>
                  <ClaimRewardModal />
                </ApiContext.Provider>
              </MembershipContext.Provider>
            </AccountsContext.Provider>
          </MockKeyringProvider>
        </MockQueryNodeProviders>
      </ModalContext.Provider>
    )
})
