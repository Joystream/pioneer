import { act, fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { ApiContext } from '@/api/providers/context'
import { WithdrawStakeModal } from '@/bounty/modals/WithdrawalStakeModal'
import { formatTokenValue } from '@/common/model/formatters'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import { MembershipContext } from '@/memberships/providers/membership/context'
import bounties from '@/mocks/data/raw/bounties.json'
import { getMember } from '@/mocks/helpers'

import { getButton } from '../../_helpers/getButton'
import { alice, bob } from '../../_mocks/keyring'
import { MockApolloProvider, MockKeyringProvider } from '../../_mocks/providers'
import {
  currentStubErrorMessage,
  stubApi,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'
import { mockTransactionFee } from '../../setup'

const bounty = bounties[0]

describe('UI: WithdrawStakeModal', () => {
  const api = stubApi()
  const fee = 100
  let transaction = stubTransaction(api, 'api.tx.bounty.withdrawWorkEntrantFunds', fee)

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

  beforeEach(() => {
    transaction = stubTransaction(api, 'api.tx.bounty.withdrawWorkEntrantFunds', fee)
    mockTransactionFee({ transaction: transaction as any, feeInfo: { transactionFee: new BN(10), canAfford: true } })
  })

  it('Requirements passed', async () => {
    renderModal()
    expect(await screen.queryByText(`modals.withdraw.stake.description ${formatTokenValue(100)}`)).toBeInTheDocument()
    expect(await screen.queryByText('modals.withdraw.stake.button')).toBeInTheDocument()
  })

  it('Insufficient funds', async () => {
    mockTransactionFee({ feeInfo: { transactionFee: new BN(9999), canAfford: false } })

    const { findByText } = renderModal()

    expect(await findByText('modals.insufficientFunds.title')).toBeDefined()
  })

  describe('Transaction result', () => {
    it('Success', async () => {
      stubTransactionSuccess(transaction, 'bounty', 'WorkEntrantFundsWithdrawn')
      renderModal()

      await proceedToTransaction()

      expect(screen.queryByText('common:success')).toBeDefined()
    })

    it('Transaction failed', async () => {
      stubTransactionFailure(transaction)
      renderModal()

      await act(async () => {
        fireEvent.click(await getButton(/^modals.withdraw.stake.button$/))
      })
      expect(await screen.findByText(currentStubErrorMessage)).toBeDefined()
    })

    it('Requirements failed', async () => {
      mockTransactionFee({ feeInfo: { transactionFee: new BN(99999), canAfford: false } })

      renderModal()

      expect(await screen.findByText('modals.insufficientFunds.title')).toBeDefined()
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
                  <WithdrawStakeModal />
                </AccountsContext.Provider>
              </MembershipContext.Provider>
            </ApiContext.Provider>
          </MockKeyringProvider>
        </ModalContext.Provider>
      </MockApolloProvider>
    )
})
