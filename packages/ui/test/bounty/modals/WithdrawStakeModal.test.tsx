import { act, configure, fireEvent, getByText, render, RenderResult, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { BalancesContext } from '@/accounts/providers/balances/context'
import { WithdrawStakeModal } from '@/bounty/modals/WithdrawalStakeModal'
import { Bounty, Contributor } from '@/bounty/types/Bounty'
import { BN_ZERO } from '@/common/constants'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import { MembershipContext } from '@/memberships/providers/membership/context'
import bounties from '@/mocks/data/raw/bounties.json'
import { getMember } from '@/mocks/helpers'

import { getButton } from '../../_helpers/getButton'
import { alice, bob } from '../../_mocks/keyring'
import { MockApolloProvider, MockKeyringProvider } from '../../_mocks/providers'
import {
  stubApi,
  stubBountyConstants,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'

const bounty = bounties[0]

const defaultBalance = {
  total: BN_ZERO,
  locked: BN_ZERO,
  recoverable: BN_ZERO,
  transferable: new BN(1000),
  locks: [],
}

describe('UI: WithdrawStakeModal', () => {
  const api = stubApi()
  const fee = 100
  const transaction = stubTransaction(api, 'api.tx.bounty.withdrawFunding', fee)

  const useModal: UseModal<any> = {
    hideModal: jest.fn(),
    showModal: jest.fn(),
    modal: 'foo',
    modalData: {
      bounty: {
        ...bounty,
        entries: [
          {
            worker: getMember('alice'),
            stake: 100,
          },
        ],
      },
    },
  }

  const useBalances = {
    [getMember('bob').controllerAccount]: defaultBalance,
    [getMember('alice').controllerAccount]: { ...defaultBalance },
  }

  const useMembership = {
    isLoading: false,
    active: getMember('alice'),
    hasMembers: true,
    setActive: () => null,
    members: [],
    helpers: {
      getMemberIdByBoundAccountAddress: () => undefined,
    },
  }

  const useAccounts = {
    isLoading: false,
    hasAccounts: true,
    allAccounts: [alice, bob],
  }

  beforeEach(() => renderModal())

  it('Requirements passed', async () => {
    expect(await screen.queryByText('modals.withdraw.stake.description')).toBeInTheDocument()
    expect(await screen.queryByText('modals.withdraw.stake.button')).toBeInTheDocument()
  })

  it('Requirements failed', async () => {
    // defaultBalance.transferable = new BN(10000)
    stubTransaction(api, 'api.tx.bounty.withdrawFunding', 3000)
    expect(await screen.findByText('Insufficient Funds')).toBeDefined()
  })

  it('Transaction failed', async () => {
    stubTransactionFailure(transaction)

    await act(async () => {
      fireEvent.click(await getButton(/^modals.withdraw.stake.button$/))
    })
    expect(await screen.findByText('common:modals.failed.description')).toBeDefined()
  })

  describe('Transaction result', () => {
    it('Success', async () => {
      stubTransactionSuccess(transaction, 'bounty', 'WorkEntrantFundsWithdrawn')

      await proceedToTransaction()

      expect(screen.queryByText('common:success')).toBeDefined()
    })
  })

  const proceedToAuthorization = async () => {
    const button = await getButton(/^modals.withdraw.stake.button$/)
    fireEvent.click(button)
  }

  const proceedToTransaction = async () => {
    await proceedToAuthorization()

    const button = await getButton('modals.withdrawContribution.successButton')
    fireEvent.click(button)
  }

  const renderModal = () =>
    render(
      <MockApolloProvider>
        <ModalContext.Provider value={useModal}>
          <MockKeyringProvider>
            <ApiContext.Provider value={api}>
              <MembershipContext.Provider value={useMembership}>
                <AccountsContext.Provider value={useAccounts}>
                  <BalancesContext.Provider value={useBalances}>
                    <WithdrawStakeModal />
                  </BalancesContext.Provider>
                </AccountsContext.Provider>
              </MembershipContext.Provider>
            </ApiContext.Provider>
          </MockKeyringProvider>
        </ModalContext.Provider>
      </MockApolloProvider>
    )
})
