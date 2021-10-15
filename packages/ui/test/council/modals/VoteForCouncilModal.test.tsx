import { cryptoWaitReady } from '@polkadot/util-crypto'
import { configure, fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { BalancesContextProvider } from '@/accounts/providers/balances/provider'
import { CKEditorProps } from '@/common/components/CKEditor'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import { VoteForCouncilModal } from '@/council/modals/VoteForCouncil'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers } from '@/mocks/data'

import { getButton } from '../../_helpers/getButton'
import { selectFromDropdown } from '../../_helpers/selectFromDropdown'
import { mockCKEditor } from '../../_mocks/components/CKEditor'
import { alice, bob } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import {
  stubApi,
  stubCouncilConstants,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'

configure({ testIdAttribute: 'id' })

jest.mock('@/common/components/CKEditor', () => ({
  CKEditor: (props: CKEditorProps) => mockCKEditor(props),
}))

describe('UI: Vote for Council Modal', () => {
  const api = stubApi()
  const useModal: UseModal<any> = {
    hideModal: jest.fn(),
    showModal: jest.fn(),
    modal: null,
    modalData: { id: '0-0' },
  }
  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
    hasMembers: true,
  }

  let useAccounts: UseAccounts
  let tx: any

  const server = setupMockServer({ noCleanupAfterEach: true })

  const fillStakeStep = async (value: number) => {
    await selectFromDropdown('Select account for Staking', 'alice')
    const input = await screen.findByLabelText(/Select amount for staking/i)
    fireEvent.change(input, { target: { value } })
  }
  const getNextStepButton = () => getButton(/Next step/i)

  beforeAll(async () => {
    await cryptoWaitReady()
    seedMembers(server.server, 2)

    useAccounts = {
      hasAccounts: true,
      allAccounts: [alice, bob],
    }
  })

  beforeEach(async () => {
    useMyMemberships.members = [getMember('alice'), getMember('bob')]
    useMyMemberships.setActive(getMember('alice'))

    stubDefaultBalances(api)
    stubCouncilConstants(api, { minStake: 500 })
    tx = stubTransaction(api, 'api.tx.referendum.vote', 25)
  })

  describe('Requirements', () => {
    it('No active member', async () => {
      useMyMemberships.active = undefined

      renderModal()

      expect(useModal.showModal).toBeCalledWith({ modal: 'SwitchMember' })
    })

    it('Insufficient funds', async () => {
      stubTransaction(api, 'api.tx.referendum.vote', 10_000)

      renderModal()

      expect(await screen.findByText('Insufficient Funds')).toBeDefined()
    })
  })

  it('Renders a modal', async () => {
    renderModal()

    expect(await screen.findByText('Vote for council')).toBeDefined()
  })

  describe('Stake step', () => {
    it('Empty fields', async () => {
      renderModal()

      const button = await getNextStepButton()
      expect(button).toBeDisabled()
    })

    it('Too low stake', async () => {
      renderModal()

      fillStakeStep(50)
      const button = await getNextStepButton()
      expect(button).toBeDisabled()
    })

    it('Valid fields', async () => {
      renderModal()

      await fillStakeStep(2000)
      const button = await getNextStepButton()
      expect(button).not.toBeDisabled()
    })
  })

  it('Transaction sign', async () => {
    renderModal()

    await fillStakeStep(2000)
    fireEvent.click(await getNextStepButton())

    expect(await screen.findByText(/^You intend to Vote and stake/i)).toBeDefined()
    expect(screen.getByText(/^Stake:/i)?.nextSibling?.textContent).toBe('2,000')
    expect(screen.getByText(/^Transaction fee:/i)?.nextSibling?.textContent).toBe('25')
    expect(await getButton('Sign and send')).toBeDefined()
  })

  it('Transaction success', async () => {
    stubTransactionSuccess(tx, 'referendum', 'VoteCast')
    renderModal()

    await fillStakeStep(2000)
    fireEvent.click(await getNextStepButton())
    fireEvent.click(await getButton('Sign and send'))

    expect(await screen.findByText(/^You have just successfully voted for the Candidate/i)).toBeDefined()
    expect(await getButton('See my Vote')).toBeDefined()
  })

  it('Transaction error', async () => {
    stubTransactionFailure(tx)
    renderModal()

    await fillStakeStep(2000)
    fireEvent.click(await getNextStepButton())
    fireEvent.click(await getButton('Sign and send'))

    expect(await screen.findByText(/^There was a problem casting your vote./i)).toBeDefined()
  })

  function renderModal() {
    return render(
      <MemoryRouter>
        <ModalContext.Provider value={useModal}>
          <MockQueryNodeProviders>
            <MockKeyringProvider>
              <AccountsContext.Provider value={useAccounts}>
                <ApiContext.Provider value={api}>
                  <BalancesContextProvider>
                    <MembershipContext.Provider value={useMyMemberships}>
                      <VoteForCouncilModal />
                    </MembershipContext.Provider>
                  </BalancesContextProvider>
                </ApiContext.Provider>
              </AccountsContext.Provider>
            </MockKeyringProvider>
          </MockQueryNodeProviders>
        </ModalContext.Provider>
      </MemoryRouter>
    )
  }
})
