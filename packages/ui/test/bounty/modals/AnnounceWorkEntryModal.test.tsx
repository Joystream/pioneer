import { fireEvent, render, RenderResult, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { BalancesContext } from '@/accounts/providers/balances/context'
import { AnnounceWorkEntryModal } from '@/bounty/modals/AnnounceWorkEntryModal'
import { BN_ZERO } from '@/common/constants'
import { formatTokenValue } from '@/common/model/formatters'
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

const [bounty] = bounties

const defaultBalance = {
  total: BN_ZERO,
  locked: BN_ZERO,
  recoverable: BN_ZERO,
  transferable: new BN(1000),
  locks: [],
}

describe('UI: AnnounceWorkEntryModal', () => {
  let renderResult: RenderResult
  const api = stubApi()
  stubBountyConstants(api)
  const fee = 888
  const transaction = stubTransaction(api, 'api.tx.bounty.announceWorkEntry', fee)

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
    stubTransaction(api, 'api.tx.utility.batch', fee)
    stubTransaction(api, 'api.tx.members.addStakingAccountCandidate')
    stubTransaction(api, 'api.tx.members.confirmStakingAccount')

    renderResult = render(<Modal />)
  })

  it('Renders', () => {
    expect(screen.getByText('modals.announceWorkEntry.title')).toBeInTheDocument()
  })

  it('Displays correct bounty title', () => {
    expect(screen.getByDisplayValue(bounty.title)).toBeInTheDocument()
  })

  it('Displays correct member', () => {
    expect(screen.getByText(useMembership.active.handle)).toBeInTheDocument()
  })

  it('Displays correct transaction fee', () => {
    const expected = String(fee)
    const valueContainer = screen.getByText('modals.common.transactionFee.label')?.nextSibling

    expect(valueContainer?.textContent).toBe(expected)
  })

  it('Displays correct contribute amount', () => {
    const expected = formatTokenValue(bounty.entrantStake)
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

      expect(screen.queryByText('modals.announceWorkEntry.error')).toBeDefined()
    })
  })

  const proceedToAuthorization = async () => {
    const button = await getButton('modals.announceWorkEntry.nextButton')
    fireEvent.click(button)

    renderResult.rerender(<Modal />)
  }

  const proceedToTransaction = async () => {
    await proceedToAuthorization()

    const button = await getButton('modals.announceWorkEntry.nextButton')
    fireEvent.click(button)
  }

  const Modal = () => (
    <ModalContext.Provider value={useModal}>
      <MockApolloProvider>
        <MockKeyringProvider>
          <ApiContext.Provider value={api}>
            <MembershipContext.Provider value={useMembership}>
              <AccountsContext.Provider value={useAccounts}>
                <BalancesContext.Provider value={useBalances}>
                  <AnnounceWorkEntryModal />
                </BalancesContext.Provider>
              </AccountsContext.Provider>
            </MembershipContext.Provider>
          </ApiContext.Provider>
        </MockKeyringProvider>
      </MockApolloProvider>
    </ModalContext.Provider>
  )
})
