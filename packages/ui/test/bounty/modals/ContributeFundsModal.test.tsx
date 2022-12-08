import { fireEvent, render, RenderResult, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { ApiContext } from '@/api/providers/context'
import { ContributeFundsModal } from '@/bounty/modals/ContributeFundsModal'
import { FundingLimited } from '@/bounty/types/Bounty'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import { MembershipContext } from '@/memberships/providers/membership/context'
import bounties from '@/mocks/data/raw/bounties.json'
import { getMember } from '@/mocks/helpers'

import { getButton } from '../../_helpers/getButton'
import { alice, bob } from '../../_mocks/keyring'
import { MockApolloProvider, MockKeyringProvider } from '../../_mocks/providers'
import {
  stubAccounts,
  stubApi,
  stubBountyConstants,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'
import { mockTransactionFee } from '../../setup'

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

describe('UI: ContributeFundsModal', () => {
  let renderResult: RenderResult
  const api = stubApi()
  stubBountyConstants(api)
  const fee = 888
  let transaction = stubTransaction(api, 'api.tx.bounty.fundBounty', fee)

  const useModal: UseModal<any> = {
    hideModal: jest.fn(),
    showModal: jest.fn(),
    modal: 'foo',
    modalData: {
      bounty: { ...bounty },
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

  beforeAll(() => {
    stubDefaultBalances()
    stubAccounts([bob, alice])
  })

  beforeEach(() => {
    transaction = stubTransaction(api, 'api.tx.bounty.fundBounty', fee)
    mockTransactionFee({ transaction: transaction as any, feeInfo: { transactionFee: new BN(fee), canAfford: true } })
    renderResult = render(<Modal />)
  })

  it('Renders', () => {
    expect(screen.getByText('modals.contribute.title')).toBeInTheDocument()
  })

  it('Insufficient funds', async () => {
    mockTransactionFee({ feeInfo: { transactionFee: new BN(100), canAfford: false } })

    renderResult.unmount()
    render(<Modal />)

    expect(await screen.findByText('modals.insufficientFunds.title')).toBeDefined()
  })

  it('Displays correct bounty title', () => {
    expect(screen.getByDisplayValue(bounty.title)).toBeInTheDocument()
  })

  it('Displays correct transaction fee', () => {
    const expected = String(fee)
    const valueContainer = screen.getByText('modals.transactionFee.label')?.nextSibling

    expect(valueContainer?.textContent).toBe(expected)
  })

  it('Displays correct contribute amount', () => {
    const value = '555'
    const input = screen.getByLabelText('modals.contribute.selectAmount')
    fireEvent.input(input, { target: { value } })

    const valueContainer = screen.getByText('modals.common.contributeAmount')?.nextSibling

    expect(valueContainer?.textContent).toBe(value)
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
              <ContributeFundsModal />
            </MembershipContext.Provider>
          </ApiContext.Provider>
        </MockKeyringProvider>
      </ModalContext.Provider>
    </MockApolloProvider>
  )
})
