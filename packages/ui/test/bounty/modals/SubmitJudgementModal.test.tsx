import { cryptoWaitReady } from '@polkadot/util-crypto'
import { configure, fireEvent, render, screen, waitFor } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { BalancesContext } from '@/accounts/providers/balances/context'
import { BalancesContextProvider } from '@/accounts/providers/balances/provider'
import { AddressToBalanceMap } from '@/accounts/types'
import { SubmitJudgementModal } from '@/bounty/modals/SubmitJudgementModal'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { last } from '@/common/utils'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { seedMembers } from '@/mocks/data'
import bounties from '@/mocks/data/raw/bounties.json'
import memberMock from '@/mocks/data/raw/members.json'

import { getButton } from '../../_helpers/getButton'
import { selectFromDropdownWithId } from '../../_helpers/selectFromDropdown'
import { alice, bob } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import {
  stubApi,
  stubBountyConstants,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'

configure({ testIdAttribute: 'id' })

jest.mock('@/common/hooks/useQueryNodeTransactionStatus', () => ({
  useQueryNodeTransactionStatus: () => 'confirmed',
}))

describe('UI: SubmitJudgementModal', () => {
  const modalData = {
    bounty: {
      ...bounties[0],
      totalFunding: new BN(15999),
      entries: [
        {
          id: '1',
          worker: {
            id: '7',
          },
        },
        {
          id: '2',
          worker: {
            id: '8',
          },
        },
      ],
    },
  }

  const useMyAccounts: UseAccounts = {
    isLoading: false,
    hasAccounts: false,
    allAccounts: [alice, bob],
    error: undefined,
  }

  const useMyMemberships = {
    active: getMember('alice'),
    setActive: () => undefined,
    members: [],
    hasMembers: false,
    isLoading: true,
    helpers: {
      getMemberIdByBoundAccountAddress: () => undefined,
    },
  }

  const useMyBalances: AddressToBalanceMap = {
    [useMyAccounts.allAccounts[0].address]: {
      total: new BN(10000),
      locked: new BN(0),
      recoverable: new BN(0),
      transferable: new BN(10000),
      locks: [],
    },
  }

  let transaction: any
  let txMock: jest.Mock

  const server = setupMockServer({ noCleanupAfterEach: true })
  const api = stubApi()
  stubBountyConstants(api)

  beforeAll(async () => {
    await cryptoWaitReady()
    seedMembers(server.server)
  })

  beforeEach(async () => {
    stubDefaultBalances(api)
    stubBountyConstants(api)
    transaction = stubTransaction(api, 'api.tx.bounty.submitOracleJudgment', 100)
    txMock = api.api.tx.bounty.submitOracleJudgment as unknown as jest.Mock
  })

  it('Renders', () => {
    renderModal()

    expect(screen.queryByText('modals.submitJudgement.submitJudgement')).toBeInTheDocument()
    expect(screen.queryByText('modals.submitJudgement.authorizeTransaction')).toBeInTheDocument()
  })

  describe('Valid', () => {
    it('Bounty failed', async () => {
      renderModal()

      const checkbox = screen.getByText('modals.submitJudgement.checkbox.label')?.nextSibling?.childNodes.item(1)
      fireEvent.click(checkbox as Node)

      expect(screen.queryByText('modals.submitJudgement.noWinner.title')).toBeInTheDocument()
      expect(await getButton('modals.submitJudgement.authorizeTransaction')).toBeEnabled()

      const [actor, bountyId, oracleJudgment, rationale] = last(txMock.mock.calls)
      expect(actor?.Member.toJSON()).toBe(0)
      expect(bountyId?.toJSON()).toBe(0)
      expect(rationale).toBe('')
      expect(oracleJudgment.size).toBe(0)
    })

    it('One winner', async () => {
      renderModal()

      await selectWinner(memberMock.find((member) => member.id === modalData.bounty.entries[0].worker.id)?.handle)

      expect(await getButton('modals.submitJudgement.authorizeTransaction')).toBeEnabled()

      const [, , oracleJudgment] = last(txMock.mock.calls)
      expect(oracleJudgment.size).toBe(1)
      const [[winner, reward]] = oracleJudgment.entries()
      expect(winner.toJSON()).toBe(Number(modalData.bounty.entries[0].id))
      expect(reward.toJSON()).toEqual({ winner: { reward: 15999 } })
    })

    it('One winner, one rejected', async () => {
      renderModal()

      await selectWinner(findHandleById(modalData.bounty.entries[0].worker.id))
      await addRejected()
      await selectRejected(findHandleById(modalData.bounty.entries[1].worker.id))

      expect(await getButton('modals.submitJudgement.authorizeTransaction')).toBeEnabled()

      const [, , oracleJudgment] = last(txMock.mock.calls)
      expect(oracleJudgment.size).toBe(2)
      const [[winner, reward], [rejected, judgment]] = oracleJudgment.entries()

      expect(winner.toJSON()).toBe(Number(modalData.bounty.entries[0].id))
      expect(reward.toJSON()).toEqual({ winner: { reward: 15999 } })
      expect(rejected.toJSON()).toBe(Number(modalData.bounty.entries[1].id))
      expect(judgment.toJSON()).toEqual({ rejected: null })
    })

    it('Two winners', async () => {
      renderModal()

      await selectWinner(findHandleById(modalData.bounty.entries[0].worker.id))
      await addWinner()
      await selectWinner(findHandleById(modalData.bounty.entries[1].worker.id), 2)

      expect(await getButton('modals.submitJudgement.authorizeTransaction')).toBeEnabled()

      const [, , oracleJudgment] = last(txMock.mock.calls)
      expect(oracleJudgment.size).toBe(2)
      const [[winner1, reward1], [winner2, reward2]] = oracleJudgment.entries()
      expect(winner1.toJSON()).toBe(Number(modalData.bounty.entries[0].id))
      expect(winner2.toJSON()).toBe(Number(modalData.bounty.entries[1].id))
      expect(reward1.toJSON()).toEqual({ winner: { reward: 8000 } })
      expect(reward2.toJSON()).toEqual({ winner: { reward: 7999 } })
    })

    it('Failed with one rejected', async () => {
      renderModal()

      const checkbox = screen.getByText('modals.submitJudgement.checkbox.label')?.nextSibling?.childNodes.item(1)
      fireEvent.click(checkbox as Node)

      await addRejected()
      await selectRejected(findHandleById(modalData.bounty.entries[1].worker.id))

      expect(screen.queryByText('modals.submitJudgement.noWinner.title')).toBeInTheDocument()
      expect(await getButton('modals.submitJudgement.authorizeTransaction')).toBeEnabled()

      const [, , oracleJudgment] = last(txMock.mock.calls)
      expect(oracleJudgment.size).toBe(1)
      const [[rejected, judgment]] = oracleJudgment.entries()
      expect(rejected.toJSON()).toBe(Number(modalData.bounty.entries[1].id))
      expect(judgment.toJSON()).toEqual({ rejected: null })
    })
  })

  describe('Invalid', () => {
    it('No winner', async () => {
      renderModal()

      expect(await getButton('modals.submitJudgement.authorizeTransaction')).toBeDisabled()
    })

    it('Reward do not match total funding', async () => {
      renderModal()

      await selectWinner(findHandleById(modalData.bounty.entries[0].worker.id))
      editWinnerReward(1)

      const nextButton = await getButton('modals.submitJudgement.authorizeTransaction')

      expect(screen.queryByText('modals.submitJudgement.validation.amountTooLow')).toBeInTheDocument()
      expect(nextButton).toBeDisabled()

      editWinnerReward(99999)

      expect(screen.queryByText('modals.submitJudgement.validation.amountTooHigh')).toBeInTheDocument()
      expect(nextButton).toBeDisabled()

      editWinnerReward(0)

      expect(screen.queryByText('modals.submitJudgement.validation.winnerNoReward')).toBeInTheDocument()
      expect(nextButton).toBeDisabled()
    })
  })

  describe('Authorization Modal', () => {
    it('Renders', async () => {
      renderModal()
      await proceedToAuthorizationModal()

      expect(screen.queryByText('modals.submitJudgement.authorizeModal.description')).toBeInTheDocument()
    })

    it('Transaction successful', async () => {
      stubTransactionSuccess(transaction, 'bounty', 'OracleJudgmentSubmitted')

      renderModal()
      proceedToAuthorizationModal()

      const button = screen.getByText('modals.submitJudgement.authorizeModal.button')
      fireEvent.click(button)

      await waitFor(() => expect(screen.queryByText('modals.submitJudgement.successModal.message')).toBeInTheDocument())
    })

    it('Transaction failure', async () => {
      stubTransactionFailure(transaction)

      renderModal()
      await proceedToAuthorizationModal()

      const button = await getButton('modals.submitJudgement.authorizeModal.button')
      fireEvent.click(button)

      await waitFor(() => expect(screen.queryByText('modals.submitJudgement.failedModal')).toBeInTheDocument())
    })

    it('Disabled when no funds for fee', async () => {
      stubTransaction(api, 'api.tx.bounty.submitOracleJudgment', 999999)

      renderModal()
      await proceedToAuthorizationModal()

      expect(await getButton('modals.submitJudgement.authorizeModal.button')).toBeDisabled()
    })
  })

  const proceedToAuthorizationModal = () => {
    const checkbox = screen.getByText('modals.submitJudgement.checkbox.label')?.nextSibling?.childNodes.item(1)
    fireEvent.click(checkbox as Node)

    const button = screen.getByText('modals.submitJudgement.authorizeTransaction')
    fireEvent.click(button)
  }

  const findHandleById = (id: string) => memberMock.find((member) => member.id === id)?.handle

  const selectWinner = (name?: string, winnerNumber = 1) =>
    selectFromDropdownWithId(`winnerInput${winnerNumber}`, name || '')

  const editWinnerReward = (amount: number, winnerNumber = 1) => {
    const amountInput = screen.getByTestId(`winnerRewardInput${winnerNumber}`)
    fireEvent.change(amountInput, { target: { value: amount } })
  }

  const selectRejected = (name?: string, rejectedNumber = 1) =>
    selectFromDropdownWithId(`slashedInput${rejectedNumber}`, name || '')

  const addWinner = async () => {
    const button = await getButton('modals.submitJudgement.winner.buttons.addWinner')

    fireEvent.click(button)
  }

  const addRejected = async () => {
    const button = await getButton('modals.submitJudgement.slash.worker.addSlashed')

    fireEvent.click(button)
  }

  const renderModal = () =>
    render(
      <ModalContext.Provider
        value={{
          hideModal: () => undefined,
          modal: 'bar',
          showModal: () => undefined,
          modalData,
        }}
      >
        <MockQueryNodeProviders>
          <MockKeyringProvider>
            <ApiContext.Provider value={api}>
              <AccountsContext.Provider value={useMyAccounts}>
                <BalancesContext.Provider value={useMyBalances}>
                  <BalancesContextProvider>
                    <MembershipContext.Provider value={useMyMemberships}>
                      <SubmitJudgementModal />
                    </MembershipContext.Provider>
                  </BalancesContextProvider>
                </BalancesContext.Provider>
              </AccountsContext.Provider>
            </ApiContext.Provider>
          </MockKeyringProvider>
        </MockQueryNodeProviders>
      </ModalContext.Provider>
    )
})
