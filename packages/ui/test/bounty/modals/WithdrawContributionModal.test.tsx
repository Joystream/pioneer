import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import {
  BountyWithdrawContributionModalCall,
  WithdrawContributionModal,
} from '@/bounty/modals/WithdrawContributionModal'
import { Bounty, Contributor } from '@/bounty/types/Bounty'
import { BN_ZERO } from '@/common/constants'
import { formatTokenValue } from '@/common/model/formatters'
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

describe('UI: WithdrawContributionModal', () => {
  const contributor: Contributor = {
    actor: getMember('alice'),
    amount: new BN('10000'),
    hasWithdrawn: false,
  }

  const bounty: Bounty = {
    id: 'bounty 1',
    contributors: [contributor],
    totalFunding: new BN('11000'),
  } as Bounty
  const modalData: ModalCallData<BountyWithdrawContributionModalCall> = {
    bounty: {
      ...bounty,
      cherry: new BN(1000),
    },
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
    stubDefaultBalances(api)
    tx = stubTransaction(api, txPath)
  })

  it('Requirements passed', async () => {
    renderModal()

    expect(
      screen.queryByText(`modals.withdraw.contribution.description ${formatTokenValue(contributor.amount)}`)
    ).not.toBeNull()
    expect(screen.queryByText('modals.withdraw.contribution.button')).not.toBeNull()
  })

  it('Bounty failed details', () => {
    const {
      modalData: { bounty },
    } = useModal

    const activeMemberContribute =
      bounty.contributors.find((contribution: Contributor) => contribution.actor?.id === useMyMemberships.active?.id)
        ?.amount ?? BN_ZERO

    const amountFromCherry = bounty.cherry.toNumber() * activeMemberContribute.div(bounty.totalFunding).toNumber()
    const expected = formatTokenValue(activeMemberContribute.toNumber() + amountFromCherry)

    bounty.stage = 'failed'
    renderModal()

    const amountContainer = screen.getByText('modals.common.amount')?.nextSibling
    expect(
      screen.queryByText(
        `modals.withdraw.contribution.description ${formatTokenValue(
          bounty.contributors[0].amount.toNumber()
        )} modals.withdraw.extraDescription ${formatTokenValue(amountFromCherry)}`
      )
    ).toBeInTheDocument()
    expect(amountContainer?.textContent).toBe(expected)
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
      fireEvent.click(await getButton('modals.withdraw.contribution.button'))
    })
    expect(await screen.findByText('modals.withdrawContribution.error')).toBeDefined()
  })

  it('Transaction success', async () => {
    stubTransactionSuccess(tx, 'bounty', 'BountyFundingWithdrawal')
    renderModal()

    await act(async () => {
      fireEvent.click(await getButton('modals.withdraw.contribution.button'))
    })
    expect(await screen.findByText('modals.withdrawContribution.success')).toBeDefined()
  })

  const renderModal = () =>
    render(
      <ModalContext.Provider value={useModal}>
        <MockQueryNodeProviders>
          <MockKeyringProvider>
            <AccountsContext.Provider value={useAccounts}>
              <MembershipContext.Provider value={useMyMemberships}>
                <ApiContext.Provider value={api}>
                  <WithdrawContributionModal />
                </ApiContext.Provider>
              </MembershipContext.Provider>
            </AccountsContext.Provider>
          </MockKeyringProvider>
        </MockQueryNodeProviders>
      </ModalContext.Provider>
    )
})
