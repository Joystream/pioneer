import { fireEvent, render, RenderResult, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { BalancesContext } from '@/accounts/providers/balances/context'
import { ContributeFundsModal } from '@/bounty/modals/ContributeFundsModal'
import { FundingLimited } from '@/bounty/types/Bounty'
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

const [baseBounty] = bounties
const bounty = {
  ...baseBounty,
  totalFunding: new BN(baseBounty.totalFunding),
  fundingType: {
    ...baseBounty.fundingType,
    maxAmount: new BN((baseBounty.fundingType as unknown as FundingLimited).maxAmount ?? 0),
    minAmount: new BN((baseBounty.fundingType as unknown as FundingLimited).minAmount ?? 0),
  },
}

const defaultBalance = {
  total: BN_ZERO,
  locked: BN_ZERO,
  recoverable: BN_ZERO,
  transferable: new BN(1000),
  locks: [],
}

describe('UI: ContributeFundsModal', () => {
  let renderResult: RenderResult
  const api = stubApi()
  stubBountyConstants(api)
  const fee = 888
  const transaction = stubTransaction(api, 'api.tx.bounty.fundBounty', fee)

  const useModal: UseModal<any> = {
    hideModal: jest.fn(),
    showModal: jest.fn(),
    modal: 'foo',
    modalData: {
      bounty: { ...bounty },
    },
  }

  const useBalances = {
    [getMember('bob').controllerAccount]: { ...defaultBalance },
    [getMember('alice').controllerAccount]: defaultBalance,
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
    allAccounts: [bob, alice],
  }

  beforeEach(() => {
    renderResult = render(<Modal />)
  })

  it('Renders', () => {
    expect(screen.getByText('modals.contribute.title')).toBeInTheDocument()
  })

  it('Displays correct bounty id', () => {
    expect(screen.getByDisplayValue(bounty.id)).toBeInTheDocument()
  })

  it('Displays correct transaction fee', () => {
    const expected = String(fee)
    const valueContainer = screen.getByText('modals.common.transactionFee.label')?.nextSibling

    expect(valueContainer?.textContent).toBe(expected)
  })

  it('Displays correct contribute amount', () => {
    const value = 555
    const expected = String(value)
    const input = screen.getByLabelText('modals.contribute.selectAmount')
    fireEvent.input(input, { target: { value } })

    const valueContainer = screen.getByText('modals.common.contributeAmount')?.nextSibling

    expect(valueContainer?.textContent).toBe(expected)
  })

  describe('Transaction result', () => {
    it('Success', async () => {
      stubTransactionSuccess(transaction, 'bounty', 'BountyCanceled')

      await proceedToTransaction()

      expect(screen.queryByText('common:success')).toBeDefined()
    })

    it('Error', async () => {
      stubTransactionFailure(transaction)

      await proceedToTransaction()

      expect(screen.queryByText('modals.contribute.error')).toBeDefined()
    })
  })

  const proceedToAuthorization = async () => {
    const button = await getButton('modals.contribute.nextButton')
    fireEvent.click(button)

    renderResult.rerender(<Modal />)
  }

  const proceedToTransaction = async () => {
    await proceedToAuthorization()

    const button = await getButton('modals.contribute.nextButton')
    fireEvent.click(button)
  }

  const Modal = () => (
    <MockApolloProvider>
      <ModalContext.Provider value={useModal}>
        <MockKeyringProvider>
          <ApiContext.Provider value={api}>
            <MembershipContext.Provider value={useMembership}>
              <AccountsContext.Provider value={useAccounts}>
                <BalancesContext.Provider value={useBalances}>
                  <ContributeFundsModal />
                </BalancesContext.Provider>
              </AccountsContext.Provider>
            </MembershipContext.Provider>
          </ApiContext.Provider>
        </MockKeyringProvider>
      </ModalContext.Provider>
    </MockApolloProvider>
  )
})
