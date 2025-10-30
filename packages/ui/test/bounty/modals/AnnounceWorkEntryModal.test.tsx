import { fireEvent, render, RenderResult, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { MoveFundsModalCall } from '@/accounts/modals/MoveFundsModal'
import { ApiContext } from '@/api/providers/context'
import { AnnounceWorkEntryModal } from '@/bounty/modals/AnnounceWorkEntryModal'
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
  stubAccounts,
  stubApi,
  stubBalances,
  stubBountyConstants,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'
import { mockTransactionFee } from '../../setup'

const [bountyMock] = bounties
const bounty = { ...bountyMock, entrantStake: new BN(bountyMock.entrantStake) }

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
    stubBalances({ available: +bountyMock.entrantStake + 1000 })
    stubAccounts([alice, bob])
  })

  beforeEach(() => {
    stubTransaction(api, 'api.tx.utility.batch', fee)
    stubTransaction(api, 'api.tx.members.addStakingAccountCandidate')
    stubTransaction(api, 'api.tx.members.confirmStakingAccount')
    mockTransactionFee({ transaction: transaction as any, feeInfo: { transactionFee: new BN(fee), canAfford: true } })

    renderResult = render(<Modal />)
  })

  it('Renders', () => {
    expect(screen.getByText('modals.announceWorkEntry.title')).toBeInTheDocument()
  })

  it('Displays correct bounty title', () => {
    expect(screen.getByDisplayValue(bounty.title)).toBeInTheDocument()
  })

  it('Requirement failed', async () => {
    const highFee = 9999999
    mockTransactionFee({ feeInfo: { transactionFee: new BN(highFee), canAfford: false } })
    stubTransaction(api, 'api.tx.utility.batch', highFee)

    renderResult.unmount()
    render(<Modal />)

    const moveFundsModalCall: MoveFundsModalCall = {
      modal: 'MoveFundsModal',
      data: {
        requiredStake: bounty.entrantStake,
        lock: 'Bounties',
      },
    }

    expect(useModal.showModal).toBeCalledWith({ ...moveFundsModalCall })
    mockTransactionFee({ feeInfo: { transactionFee: new BN(fee), canAfford: true } })
  })

  it('Displays correct member', () => {
    expect(screen.getByText(useMembership.active.handle)).toBeInTheDocument()
  })

  it('Displays correct transaction fee', () => {
    const expected = String(fee)
    const valueContainer = screen.getByText('modals.transactionFee.label')?.nextSibling

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
              <AnnounceWorkEntryModal />
            </MembershipContext.Provider>
          </ApiContext.Provider>
        </MockKeyringProvider>
      </MockApolloProvider>
    </ModalContext.Provider>
  )
})
