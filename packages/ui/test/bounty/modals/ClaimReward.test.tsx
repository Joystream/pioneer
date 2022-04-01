import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { ClaimRewardModalCall, ClaimRewardModal } from '@/bounty/modals/ClaimRewardModal'
import { formatTokenValue } from '@/common/model/formatters'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { ModalCallData, UseModal } from '@/common/providers/modal/types'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'

import { getButton } from '../../_helpers/getButton'
import { baseBounty, baseEntry } from '../../_mocks/bounty'
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
  const reward = new BN(100_000)
  const modalData: ModalCallData<ClaimRewardModalCall> = {
    bounty: { ...baseBounty, entries: [{ ...baseEntry, status: { reward } }] },
  }

  const api = stubApi()
  const txPath = 'api.tx.bounty.withdrawWorkEntrantFunds'
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

    expect(screen.queryByText(`modals.withdraw.reward.description ${formatTokenValue(reward)}`)).not.toBeNull()
    expect(await getButton('modals.withdraw.reward.button')).toBeDefined()
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
      fireEvent.click(await getButton('modals.withdraw.reward.button'))
    })
    expect(await screen.findByText('modals.withdraw.reward.error')).toBeDefined()
  })

  it('Transaction success', async () => {
    stubTransactionSuccess(tx, 'bounty', 'BountyFundingWithdrawal')
    renderModal()

    await act(async () => {
      fireEvent.click(await getButton('modals.withdraw.reward.button'))
    })
    expect(await screen.findByText('modals.withdraw.reward.success')).toBeDefined()
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
