import { createType } from '@joystream/types'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { configure, findByText, fireEvent, queryByText, render, screen, waitFor } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router'

import { MoveFundsModalCall } from '@/accounts/modals/MoveFoundsModal'
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
import {
  seedCouncilCandidates,
  seedCouncilElections,
  seedCouncilVotes,
  seedElectedCouncils,
  seedMembers,
} from '@/mocks/data'

import { getButton } from '../../_helpers/getButton'
import { mockCKEditor } from '../../_mocks/components/CKEditor'
import { alice, bob } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import {
  currentStubErrorMessage,
  stubApi,
  stubCouncilConstants,
  stubDefaultBalances,
  stubQuery,
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
    helpers: {
      getMemberIdByBoundAccountAddress: () => undefined,
    },
  }

  let useAccounts: UseAccounts
  let tx: any

  const server = setupMockServer({ noCleanupAfterEach: true })

  const openAccountSelector = async () => {
    const accountSelector = await screen.findByTestId('account-select')
    act(() => {
      fireEvent.click(accountSelector.children[0])
    })
    return accountSelector
  }

  const selectAlice = async () => {
    const accountSelector = await openAccountSelector()
    const alice = await waitFor(() => findByText(accountSelector, 'alice'))
    act(() => {
      fireEvent.click(alice)
    })
  }
  const fillStakeStep = async (value: number) => {
    await selectAlice()
    const input = await screen.findByLabelText(/Select amount for staking/i)
    act(() => {
      fireEvent.change(input, { target: { value } })
    })
  }

  const getNextStepButton = () => getButton(/Next step/i)

  const resetVotes = (castBy = '5ChwAW7ASAaewhQPNK334vSHNUrPFYg2WriY2vDBfEQwkipU') => {
    seedCouncilVotes(server.server, [
      { id: '0', electionRoundId: '0', voteForId: null, castBy },
      { id: '1', electionRoundId: '1', voteForId: null, castBy: alice.address },
    ])
  }

  beforeAll(async () => {
    await cryptoWaitReady()
    seedMembers(server.server, 2)
    seedElectedCouncils(server.server, [{}, {}])
    seedCouncilElections(server.server, [{}, {}])
    seedCouncilCandidates(server.server, [{ memberId: '0' }])
    resetVotes()

    useAccounts = {
      isLoading: false,
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

    stubQuery(
      api,
      'members.stakingAccountIdMemberStatus',
      createType('StakingAccountMemberBinding', {
        member_id: 0,
        confirmed: false,
      })
    )
    stubQuery(api, 'members.stakingAccountIdMemberStatus.size', createType('u64', 0))
  })

  describe('Requirements', () => {
    it('No active member', async () => {
      useMyMemberships.active = undefined

      renderModal()

      expect(useModal.showModal).toBeCalledWith({
        modal: 'SwitchMember',
        data: {
          originalModalData: { id: '0-0' },
          originalModalName: 'VoteForCouncil',
        },
      })
    })

    it('Insufficient funds', async () => {
      const minStake = 10000
      stubCouncilConstants(api, { minStake })
      stubTransaction(api, 'api.tx.referendum.vote', 10)

      renderModal()

      const moveFundsModalCall: MoveFundsModalCall = {
        modal: 'MoveFundsModal',
        data: {
          requiredStake: new BN(minStake),
          lock: 'Voting',
        },
      }

      expect(useModal.showModal).toBeCalledWith({ ...moveFundsModalCall })
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

      await fillStakeStep(50)
      const button = await getNextStepButton()
      expect(button).toBeDisabled()
    })

    describe('Staking Accounts Filter', () => {
      afterAll(resetVotes)

      it('My account have not voted this round', async () => {
        renderModal()

        const accountSelector = await openAccountSelector()
        await waitFor(() => findByText(accountSelector, 'bob'))

        expect(await findByText(accountSelector, 'alice')).not.toBeNull()
      })

      it('One of my account has voted', async () => {
        resetVotes(alice.address) // Alice casts a vote here
        renderModal()

        const accountSelector = await openAccountSelector()
        await waitFor(() => findByText(accountSelector, 'bob'))

        expect(queryByText(accountSelector, 'alice')).toBeNull()
      })
    })

    it('Valid fields', async () => {
      renderModal()

      await fillStakeStep(500)
      const button = await getNextStepButton()
      expect(button).not.toBeDisabled()
    })
  })

  it('Transaction sign', async () => {
    renderModal()

    await fillStakeStep(500)
    fireEvent.click(await getNextStepButton())

    expect(await screen.findByText(/^You intend to Vote and stake/i)).toBeDefined()
    expect(screen.getByText(/^Stake:/i)?.nextSibling?.textContent).toBe('500')
    expect(screen.getByText(/^Transaction fee:/i)?.nextSibling?.textContent).toBe('25')
    expect(await getButton('Sign and send')).toBeDefined()
  })

  it('Transaction success', async () => {
    stubTransactionSuccess(tx, 'referendum', 'VoteCast')
    renderModal()

    await fillStakeStep(500)
    fireEvent.click(await getNextStepButton())
    fireEvent.click(await getButton('Sign and send'))

    expect(await screen.findByText(/^You have just successfully voted for the Candidate/i)).toBeDefined()
    expect(await getButton('Back to Candidates')).toBeDefined()
  })

  it('Transaction error', async () => {
    stubTransactionFailure(tx)
    renderModal()

    await fillStakeStep(500)
    fireEvent.click(await getNextStepButton())
    fireEvent.click(await getButton('Sign and send'))

    expect(await screen.findByText(currentStubErrorMessage)).toBeDefined()
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
