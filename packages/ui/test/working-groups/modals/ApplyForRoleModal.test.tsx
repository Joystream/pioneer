import { ApplicationMetadata } from '@joystream/metadata-protobuf'
import { createType } from '@joystream/types'
import { adaptRecord } from '@miragejs/graphql/dist/orm/records'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, configure, fireEvent, render, screen, waitFor } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { interpret } from 'xstate'

import { MoveFundsModalCall } from '@/accounts/modals/MoveFoundsModal'
import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { BalancesContextProvider } from '@/accounts/providers/balances/provider'
import { metadataFromBytes } from '@/common/model/JoystreamNode/metadataFromBytes'
import { getSteps } from '@/common/model/machines/getSteps'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import { last } from '@/common/utils'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers } from '@/mocks/data'
import { seedWorkingGroups } from '@/mocks/data/seedWorkingGroups'
import { ApplyForRoleModal } from '@/working-groups/modals/ApplyForRoleModal'
import { applyForRoleMachine } from '@/working-groups/modals/ApplyForRoleModal/machine'
import { WorkingGroupOpeningFieldsFragment } from '@/working-groups/queries'
import { asWorkingGroupOpening, WorkingGroupOpening } from '@/working-groups/types'

import { seedOpening, seedOpeningStatuses } from '../../../src/mocks/data/seedOpenings'
import { getButton } from '../../_helpers/getButton'
import { selectFromDropdown, selectFromDropdownWithId } from '../../_helpers/selectFromDropdown'
import { alice, bob } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { OPENING_DATA } from '../../_mocks/server/seeds'
import {
  stubApi,
  stubBalances,
  stubConst,
  stubQuery,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'

const useHasRequiredStake = { hasRequiredStake: true }

configure({ testIdAttribute: 'id' })

jest.mock('../../../src/accounts/hooks/useHasRequiredStake', () => {
  return {
    useHasRequiredStake: () => useHasRequiredStake,
  }
})

jest.mock('@/common/hooks/useQueryNodeTransactionStatus', () => ({
  useQueryNodeTransactionStatus: () => 'confirmed',
}))

describe('UI: ApplyForRoleModal', () => {
  const api = stubApi()

  const useModal: UseModal<any> = {
    hideModal: jest.fn(),
    showModal: jest.fn(),
    modal: null,
    modalData: undefined,
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
  let batchTx: any
  let bindAccountTx: any
  let applyTransaction: any
  let applyOnOpeningTxMock: jest.Mock

  const server = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(async () => {
    await cryptoWaitReady()

    seedMembers(server.server)
    seedWorkingGroups(server.server)
    seedOpeningStatuses(server.server)
    seedOpening(OPENING_DATA, server.server)

    useAccounts = {
      isLoading: false,
      hasAccounts: true,
      allAccounts: [alice, bob],
    }
  })

  beforeEach(async () => {
    const fields = adaptRecord(server.server?.schema.first('WorkingGroupOpening')) as WorkingGroupOpeningFieldsFragment
    fields.stakeAmount = '2000'
    fields.openingfilledeventopening = []
    const opening: WorkingGroupOpening = asWorkingGroupOpening(fields)
    useModal.modalData = { opening }
    useMyMemberships.setActive(getMember('alice'))

    stubConst(api, 'forumWorkingGroup.rewardPeriod', createType('u32', 14410))
    stubBalances(api, {
      available: 2000,
    })
    applyTransaction = stubTransaction(api, 'api.tx.forumWorkingGroup.applyOnOpening')
    applyOnOpeningTxMock = api.api.tx.forumWorkingGroup.applyOnOpening as unknown as jest.Mock

    stubTransaction(api, 'api.tx.members.confirmStakingAccount')
    stubQuery(
      api,
      'members.stakingAccountIdMemberStatus',
      createType('StakingAccountMemberBinding', {
        member_id: 0,
        confirmed: false,
      })
    )
    stubQuery(api, 'members.stakingAccountIdMemberStatus.size', createType('u64', 0))
    batchTx = stubTransaction(api, 'api.tx.utility.batch')
    bindAccountTx = stubTransaction(api, 'api.tx.members.addStakingAccountCandidate', 42)
  })

  describe('Steps', () => {
    const service = interpret(applyForRoleMachine)
    service.start()

    expect(getSteps(service)).toEqual([
      { title: 'Stake', type: 'next' },
      { title: 'Form', type: 'next' },
      { title: 'Submit application', type: 'next' },
    ])
  })

  describe('Requirements', () => {
    it('No active member', async () => {
      useMyMemberships.active = undefined

      renderModal()

      expect(useModal.showModal).toBeCalledWith({
        modal: 'SwitchMember',
        data: {
          originalModalData: useModal.modalData,
          originalModalName: 'ApplyForRoleModal',
        },
      })
    })

    it('Insufficient funds', async () => {
      const requiredStake = '10_000'
      const fields = adaptRecord(
        server.server?.schema.first('WorkingGroupOpening')
      ) as WorkingGroupOpeningFieldsFragment
      fields.stakeAmount = requiredStake
      fields.openingfilledeventopening = []
      const opening: WorkingGroupOpening = asWorkingGroupOpening(fields)
      useModal.modalData = { opening }
      batchTx = stubTransaction(api, 'api.tx.forumWorkingGroup.applyOnOpening', 10_000)

      renderModal()

      const moveFundsModalCall: MoveFundsModalCall = {
        modal: 'MoveFundsModal',
        data: {
          requiredStake: new BN(requiredStake),
          lock: 'Forum Worker',
        },
      }

      expect(useModal.showModal).toBeCalledWith({ ...moveFundsModalCall })
    })
  })

  it('Renders a modal', async () => {
    renderModal()

    expect(await screen.findByText('Applying for role')).toBeDefined()
  })

  describe('Stake step', () => {
    it('Empty fields', async () => {
      renderModal()

      const button = await getNextStepButton()
      expect(button).toBeDisabled()
    })

    it('Too low stake', async () => {
      renderModal()

      await selectFromDropdown('Select account for Staking', 'alice')
      await fillFieldByLabel(/Select amount for staking/i, '50')

      const button = await getNextStepButton()
      expect(button).toBeDisabled()
    })

    it('Valid fields', async () => {
      renderModal()

      await selectFromDropdown('Select account for Staking', 'alice')
      await fillFieldByLabel(/Select amount for staking/i, '2000')
      await selectFromDropdownWithId('role-account', 'alice')
      await selectFromDropdownWithId('reward-account', 'bob')

      const button = await getNextStepButton()
      expect(button).not.toBeDisabled()
    })
  })

  describe('Application form step', () => {
    beforeEach(async () => {
      await renderModal()
      await fillAndSubmitStakeStep()
    })

    it('Form questions', async () => {
      expect(await screen.findByLabelText(/Question 1/i)).toBeDefined()
      expect(await screen.findByLabelText(/Question 2/i)).toBeDefined()
      expect(await screen.findByLabelText(/Question 3/i)).toBeDefined()
    })

    it('Empty form', async () => {
      await waitFor(async () => expect(await getNextStepButton()).toBeDisabled())
    })

    it('Valid fields', async () => {
      await fillFieldByLabel(/Question 1/i, 'Foo bar baz')
      await fillFieldByLabel(/Question 2/i, 'Foo bar baz')
      await fillFieldByLabel(/Question 3/i, 'Foo bar baz')

      const button = await getNextStepButton()
      expect(button).not.toBeDisabled()
    })
  })

  describe('Authorize', () => {
    describe('Staking account is not nor staking candidate', () => {
      it('Bind account step', async () => {
        await fillSteps()

        expect(await screen.findByText('You intend to bind account for staking')).toBeDefined()
        expect((await screen.findByText(/^Transaction fee:/i))?.nextSibling?.textContent).toBe('42')
      })

      it('Bind account failure', async () => {
        stubTransactionFailure(bindAccountTx)
        await fillSteps()

        await act(async () => {
          fireEvent.click(screen.getByText(/^Sign transaction/i))
        })

        expect(await screen.findByText('Failure')).toBeDefined()
      })

      it('Apply on opening step', async () => {
        stubTransactionSuccess(bindAccountTx, 'members', 'StakingAccountAdded')
        await fillSteps()

        await act(async () => {
          fireEvent.click(screen.getByText(/^Sign transaction/i))
        })

        expect(await screen.findByText(/You intend to apply for a role/i)).toBeDefined()
        expect((await screen.findByText(/^Transaction fee:/i))?.nextSibling?.textContent).toBe('25')
      })

      it('Apply on opening success', async () => {
        stubTransactionSuccess(bindAccountTx, 'members', 'StakingAccountAdded')
        stubTransactionSuccess(batchTx, 'forumWorkingGroup', 'AppliedOnOpening', [
          undefined,
          createType('ApplicationId', 1337),
        ])
        await fillSteps()
        await act(async () => {
          fireEvent.click(await screen.findByText(/^Sign transaction/i))
        })

        await waitFor(async () => await screen.findByText(/You intend to apply for a role/i))

        await act(async () => {
          fireEvent.click(await screen.findByText(/^Sign transaction/i))
        })

        expect(await screen.findByText('Application submitted!')).toBeDefined()
        expect(await screen.findByText(/application id: 1337/i)).toBeDefined()
      })

      it('Apply on opening failure', async () => {
        stubTransactionSuccess(bindAccountTx, 'members', 'StakingAccountAdded')
        stubTransactionFailure(batchTx)
        await fillSteps()
        await act(async () => {
          fireEvent.click(await screen.findByText(/^Sign transaction/i))
        })

        await waitFor(async () => await screen.findByText(/You intend to apply for a role/i))

        await act(async () => {
          fireEvent.click(await screen.findByText(/^Sign transaction/i))
        })

        expect(await screen.findByText('Failure')).toBeDefined()
      })
    })

    describe('Staking account is a candidate', () => {
      beforeEach(async () => {
        stubQuery(
          api,
          'members.stakingAccountIdMemberStatus',
          createType('StakingAccountMemberBinding', {
            member_id: createType('MemberId', 0),
            confirmed: createType('bool', false),
          })
        )
        stubQuery(api, 'members.stakingAccountIdMemberStatus.size', createType('u64', 8))
      })

      it('Apply on opening step', async () => {
        await fillSteps()

        expect(await screen.findByText(/You intend to apply for a role/i)).toBeDefined()
        expect((await screen.findByText(/^Transaction fee:/i))?.nextSibling?.textContent).toBe('25')
      })

      it('Apply on opening success', async () => {
        stubTransactionSuccess(batchTx, 'forumWorkingGroup', 'AppliedOnOpening', [
          undefined,
          createType('ApplicationId', 1337),
        ])
        await fillSteps()
        await act(async () => {
          fireEvent.click(screen.getByText(/^Sign transaction/i))
        })

        expect(await screen.findByText('Application submitted!')).toBeDefined()
        expect(await screen.findByText(/application id: 1337/i)).toBeDefined()
      })

      it('Apply on opening failure', async () => {
        stubTransactionFailure(batchTx)
        await fillSteps()

        await act(async () => {
          fireEvent.click(screen.getByText(/^Sign transaction/i))
        })

        expect(await screen.findByText('Failure')).toBeDefined()
      })
    })

    describe('Staking account is a confirmed', () => {
      beforeEach(async () => {
        stubQuery(
          api,
          'members.stakingAccountIdMemberStatus',
          createType('StakingAccountMemberBinding', {
            member_id: createType('MemberId', 0),
            confirmed: createType('bool', true),
          })
        )
        stubQuery(api, 'members.stakingAccountIdMemberStatus.size', createType('u64', 8))
      })

      it('Apply on opening step', async () => {
        await fillSteps()

        expect(await screen.findByText(/You intend to apply for a role/i)).toBeDefined()
        expect((await screen.findByText(/^Transaction fee:/i))?.nextSibling?.textContent).toBe('25')
      })

      it('Apply on opening success', async () => {
        stubTransactionSuccess(applyTransaction, 'forumWorkingGroup', 'AppliedOnOpening', [
          undefined,
          createType('ApplicationId', 1337),
        ])
        await fillSteps()
        await act(async () => {
          fireEvent.click(screen.getByText(/^Sign transaction/i))
        })

        expect(await screen.findByText('Application submitted!')).toBeDefined()
        expect(await screen.findByText(/application id: 1337/i)).toBeDefined()
      })

      it('Apply on opening failure', async () => {
        stubTransactionFailure(applyTransaction)
        await fillSteps()

        await act(async () => {
          fireEvent.click(screen.getByText(/^Sign transaction/i))
        })

        expect(await screen.findByText('Failure')).toBeDefined()
      })
    })
  })

  it('Parameters', async () => {
    stubTransactionSuccess(bindAccountTx, 'members', 'StakingAccountAdded')
    stubTransactionFailure(batchTx)

    await fillSteps('bob')

    await act(async () => {
      fireEvent.click(screen.getByText(/^Sign transaction/i))
    })

    await waitFor(async () => await screen.findByText(/You intend to apply for a role/i))

    const [beforeTransactionParam] = last(applyOnOpeningTxMock.mock.calls)
    expect(beforeTransactionParam.opening_id).toBe(1)

    expect(beforeTransactionParam.member_id).toBe(useMyMemberships.active?.id)
    expect(beforeTransactionParam.role_account_id).toBe(alice.address)
    expect(beforeTransactionParam.reward_account_id).toBe(alice.address)

    expect(beforeTransactionParam.stake_parameters.staking_account_id).toBe(bob.address)
    expect(beforeTransactionParam.stake_parameters.stake.toString()).toBe('2000')

    await act(async () => {
      fireEvent.click(await screen.findByText(/^Sign transaction/i))
    })

    const [transactionParam] = last(applyOnOpeningTxMock.mock.calls)

    expect(transactionParam.opening_id).toBe(1)

    expect(transactionParam.member_id).toBe(useMyMemberships.active?.id)
    expect(transactionParam.role_account_id).toBe(alice.address)
    expect(transactionParam.reward_account_id).toBe(alice.address)

    expect(transactionParam.stake_parameters.staking_account_id).toBe(bob.address)
    expect(transactionParam.stake_parameters.stake.toString()).toBe('2000')

    expect(metadataFromBytes(ApplicationMetadata, transactionParam.description)).toEqual({
      answers: ['Foo bar baz', 'Foo bar baz', 'Foo bar baz'],
    })
  })

  async function getNextStepButton() {
    return getButton(/Next step/i)
  }

  async function fillAndSubmitStakeStep(stakingAccount = 'alice') {
    await selectFromDropdown('Select account for Staking', stakingAccount)
    await fillFieldByLabel(/Select amount for staking/i, '2000')
    await selectFromDropdownWithId('role-account', 'alice')
    await selectFromDropdownWithId('reward-account', 'alice')
    fireEvent.click(await getNextStepButton())
    await screen.findByText('Application')
  }

  async function fillSteps(stakingAccount = 'alice') {
    await renderModal()
    await fillAndSubmitStakeStep(stakingAccount)

    await fillFieldByLabel(/Question 1/i, 'Foo bar baz')
    await fillFieldByLabel(/Question 2/i, 'Foo bar baz')
    await fillFieldByLabel(/Question 3/i, 'Foo bar baz')
    fireEvent.click(await getNextStepButton())
  }

  async function fillFieldByLabel(label: string | RegExp, value: number | string) {
    const amountInput = await screen.findByLabelText(label)
    fireEvent.change(amountInput, { target: { value } })
    fireEvent.blur(amountInput)
  }

  function renderModal() {
    return render(
      <MemoryRouter>
        <ModalContext.Provider value={useModal}>
          <MockQueryNodeProviders>
            <MockKeyringProvider>
              <ApiContext.Provider value={api}>
                <AccountsContext.Provider value={useAccounts}>
                  <MembershipContext.Provider value={useMyMemberships}>
                    <BalancesContextProvider>
                      <ApplyForRoleModal />
                    </BalancesContextProvider>
                  </MembershipContext.Provider>
                </AccountsContext.Provider>
              </ApiContext.Provider>
            </MockKeyringProvider>
          </MockQueryNodeProviders>
        </ModalContext.Provider>
      </MemoryRouter>
    )
  }
})
