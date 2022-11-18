import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { ApiContext } from '@/api/providers/context'
import { WithdrawWorkEntryModal } from '@/bounty/modals/WithdrawWorkEntryModal'
import { formatTokenValue } from '@/common/model/formatters'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import bounties from '@/mocks/data/raw/bounties.json'
import entries from '@/mocks/data/raw/bountyEntries.json'
import { getMember } from '@/mocks/helpers'

import { generateWork } from '../../../dev/query-node-mocks/generators/generateBounties'
import { getButton } from '../../_helpers/getButton'
import { alice, bob } from '../../_mocks/keyring'
import { MockApolloProvider, MockKeyringProvider } from '../../_mocks/providers'
import {
  stubAccounts,
  stubApi,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'
import { mockTransactionFee } from '../../setup'

const bounty = bounties[0]
const baseEntry = entries[1]
const entry = { ...baseEntry, worker: getMember('bob'), works: [generateWork()] }

describe('UI: WithdrawWorkEntryModal', () => {
  const useModal: UseModal<any> = {
    hideModal: jest.fn(),
    showModal: jest.fn(),
    modal: null,
    modalData: {
      bounty: { ...bounty, entries: [entry] },
    },
  }

  const api = stubApi()
  const txPath = 'api.tx.bounty.withdrawWorkEntry'
  let tx = stubTransaction(api, txPath)

  const useMyMemberships: MyMemberships = {
    active: getMember('bob'),
    members: [getMember('alice'), getMember('bob')],
    setActive: (member) => (useMyMemberships.active = member),

    isLoading: false,
    hasMembers: true,
    helpers: {
      getMemberIdByBoundAccountAddress: () => undefined,
    },
  }

  beforeAll(async () => {
    stubDefaultBalances()
    stubAccounts([bob, alice])
    await cryptoWaitReady()
  })

  beforeEach(async () => {
    stubDefaultBalances()
    tx = stubTransaction(api, txPath)
    mockTransactionFee({ transaction: tx as any, feeInfo: { transactionFee: new BN(100), canAfford: true } })
  })

  it('Renders', async () => {
    renderModal()

    expect(screen.getByText('modals.withdrawWorkEntry.title')).not.toBeNull()
    expect(await getButton('modals.withdrawWorkEntry.submitButton')).not.toBeNull()
  })

  it('Insufficient funds', async () => {
    mockTransactionFee({ feeInfo: { transactionFee: new BN(100), canAfford: false } })

    renderModal()

    expect(await screen.findByText('modals.insufficientFunds.title')).toBeDefined()
  })

  it('Displays correct bounty', () => {
    renderModal()

    expect(screen.queryByText(useModal.modalData.bounty.title)).not.toBeNull()
  })

  it('Displays correct member', () => {
    renderModal()

    expect(screen.queryByText(entry.worker.handle)).not.toBeNull()
  })

  it('Displays correct works', () => {
    renderModal()

    entry.works.map((work: { title: string }) => expect(screen.queryByText(work.title)).not.toBeNull())
  })

  it('Displays correct stake amount', () => {
    renderModal()

    expect(screen.queryByText(formatTokenValue(entry.stake))).not.toBeNull()
  })

  describe('Transaction result', () => {
    beforeAll(() => {
      tx = stubTransaction(api, 'api.tx.bounty.withdrawWorkEntry', 20)
    })

    it('Success', async () => {
      stubTransactionSuccess(tx, 'bounty', 'WorkEntryWithdrawn')

      await renderModalAndProceedToTransaction()

      expect(screen.queryByText('common:success')).toBeDefined()
    })

    it('Error', async () => {
      stubTransactionFailure(tx)

      await renderModalAndProceedToTransaction()

      expect(screen.queryByText('modals.withdrawWorkEntry.error')).toBeDefined()
    })
  })

  const renderModalAndProceedToAuthorization = async () => {
    renderModal()

    const button = await getButton('modals.withdrawWorkEntry.submitButton')
    fireEvent.click(button)
  }

  const renderModalAndProceedToTransaction = async () => {
    await renderModalAndProceedToAuthorization()

    const button = await getButton('modals.withdrawWorkEntry.submitButton')
    fireEvent.click(button)
  }

  const renderModal = () => {
    render(
      <MockApolloProvider>
        <ModalContext.Provider value={useModal}>
          <MockKeyringProvider>
            <MembershipContext.Provider value={useMyMemberships}>
              <ApiContext.Provider value={api}>
                <WithdrawWorkEntryModal />
              </ApiContext.Provider>
            </MembershipContext.Provider>
          </MockKeyringProvider>
        </ModalContext.Provider>
      </MockApolloProvider>
    )
  }
})
