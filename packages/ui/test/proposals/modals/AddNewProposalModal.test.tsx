import { createType } from '@joystream/types'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, configure, fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { interpret } from 'xstate'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { BalancesContextProvider } from '@/accounts/providers/balances/provider'
import { CKEditorProps } from '@/common/components/CKEditor'
import { camelCaseToText } from '@/common/helpers'
import { getSteps } from '@/common/model/machines/getSteps'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import {
  seedApplications,
  seedMembers,
  seedOpenings,
  seedOpeningStatuses,
  seedUpcomingOpenings,
  seedWorkers,
  seedWorkingGroups,
  updateWorkingGroups,
} from '@/mocks/data'
import { AddNewProposalModal } from '@/proposals/modals/AddNewProposal'
import { addNewProposalMachine } from '@/proposals/modals/AddNewProposal/machine'
import { ProposalType } from '@/proposals/types'

import { getButton } from '../../_helpers/getButton'
import { selectFromDropdown } from '../../_helpers/selectFromDropdown'
import { mockCKEditor } from '../../_mocks/components/CKEditor'
import { mockUseCurrentBlockNumber } from '../../_mocks/hooks/useCurrentBlockNumber'
import { alice, bob } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import {
  stubApi,
  stubConst,
  stubDefaultBalances,
  stubProposalConstants,
  stubQuery,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'

configure({ testIdAttribute: 'id' })

jest.mock('@/common/components/CKEditor', () => ({
  CKEditor: (props: CKEditorProps) => mockCKEditor(props),
}))

jest.mock('@/common/hooks/useCurrentBlockNumber', () => ({
  useCurrentBlockNumber: () => mockUseCurrentBlockNumber(),
}))

jest.mock('@/common/hooks/useQueryNodeTransactionStatus', () => ({
  useQueryNodeTransactionStatus: () => 'confirmed',
}))

describe('UI: AddNewProposalModal', () => {
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
  let createProposalTx: any
  let batchTx: any
  let bindAccountTx: any
  let changeModeTx: any

  const server = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(async () => {
    await cryptoWaitReady()

    seedMembers(server.server)
    seedWorkingGroups(server.server)
    seedOpeningStatuses(server.server)
    seedOpenings(server.server)
    seedUpcomingOpenings(server.server)
    seedApplications(server.server)
    seedWorkers(server.server)
    updateWorkingGroups(server.server)

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
    stubProposalConstants(api)
    createProposalTx = stubTransaction(api, 'api.tx.proposalsCodex.createProposal', 25)
    stubTransaction(api, 'api.tx.members.confirmStakingAccount', 25)
    stubQuery(
      api,
      'members.stakingAccountIdMemberStatus',
      createType('StakingAccountMemberBinding', {
        member_id: 0,
        confirmed: false,
      })
    )
    stubQuery(api, 'members.stakingAccountIdMemberStatus.size', createType('u64', 0))
    stubConst(api, 'proposalsEngine.titleMaxLength', createType('u32', 1000))
    stubConst(api, 'proposalsEngine.descriptionMaxLength', createType('u32', 1000))
    batchTx = stubTransaction(api, 'api.tx.utility.batch')
    bindAccountTx = stubTransaction(api, 'api.tx.members.addStakingAccountCandidate', 42)
    changeModeTx = stubTransaction(api, 'api.tx.proposalsDiscussion.changeThreadMode', 10)
  })

  describe('Requirements', () => {
    beforeEach(renderModal)

    it('No active member', async () => {
      useMyMemberships.active = undefined

      renderModal()

      expect(useModal.showModal).toBeCalledWith({ modal: 'SwitchMember' })
    })

    it('Insufficient funds', async () => {
      stubTransaction(api, 'api.tx.utility.batch', 10000)

      const { findByText } = renderModal()

      expect(await findByText('Insufficient Funds')).toBeDefined()
    })
  })

  describe('Warning modal', () => {
    beforeEach(renderModal)

    it('Not checked', async () => {
      const button = await getWarningNextButton()

      expect(button).toBeDisabled()
    })

    it('Checked', async () => {
      const button = await getWarningNextButton()

      const checkbox = await getCheckbox()
      fireEvent.click(checkbox)

      expect(button).toBeEnabled()
    })
  })

  describe('Stepper modal', () => {
    it('Renders a modal', async () => {
      await finishWarning()

      expect(await screen.findByText('Creating new proposal')).toBeDefined()
    })

    it('Steps', () => {
      const service = interpret(addNewProposalMachine)
      service.start()

      expect(getSteps(service)).toEqual([
        { title: 'Proposal type', type: 'next' },
        { title: 'General parameters', type: 'next' },
        { title: 'Staking account', type: 'next', isBaby: true },
        { title: 'Proposal details', type: 'next', isBaby: true },
        { title: 'Trigger & Discussion', type: 'next', isBaby: true },
        { title: 'Specific parameters', type: 'next' },
      ])
    })

    describe('Proposal type', () => {
      beforeEach(async () => {
        await finishWarning()
      })

      it('Not selected', async () => {
        const button = await getNextStepButton()
        expect(button).toBeDisabled()
      })

      it('Selected', async () => {
        const type = (await screen.findByText('Funding Request')).parentElement?.parentElement as HTMLElement
        fireEvent.click(type)

        const button = await getNextStepButton()
        expect(button).not.toBeDisabled()
      })
    })

    describe('Required stake', () => {
      beforeEach(async () => {
        await finishWarning()
      })

      it('Not enough funds', async () => {
        stubProposalConstants(api, { requiredStake: 9999 })
        await finishProposalType()

        expect(screen.queryByText('Creating new proposal')).toBeNull()
      })

      it('Enough funds', async () => {
        await finishProposalType()
        expect(screen.findByText('Creating new proposal')).toBeDefined()
      })
    })

    describe('General parameters', () => {
      beforeEach(async () => {
        await finishWarning()
        await finishProposalType()
      })

      describe('Staking account', () => {
        it('Not selected', async () => {
          const button = await getNextStepButton()
          expect(button).toBeDisabled()
        })

        it('Selected', async () => {
          await selectFromDropdown('Select account for Staking', 'alice')

          const button = await getNextStepButton()
          expect(button).not.toBeDisabled()
        })
      })

      describe('Proposal details', () => {
        beforeEach(async () => {
          await finishStakingAccount()
        })

        it('Not filled', async () => {
          const button = await getNextStepButton()
          expect(button).toBeDisabled()
        })

        it('Filled', async () => {
          await fillProposalDetails()

          const button = await getNextStepButton()
          expect(button).not.toBeDisabled()
        })
      })

      describe('Proposal details validation', () => {
        it('Title too long', async () => {
          stubConst(api, 'proposalsEngine.titleMaxLength', createType('u32', 5))
          await finishStakingAccount()

          await fillProposalDetails()

          expect(await screen.findByText(/Title exceeds maximum length./i)).toBeDefined()
          const button = await getNextStepButton()
          expect(button).toBeDisabled()
        })

        it('Description too long', async () => {
          stubConst(api, 'proposalsEngine.descriptionMaxLength', createType('u32', 5))
          await finishStakingAccount()

          await fillProposalDetails()

          expect(await screen.findByText(/Rationale exceeds maximum length./i)).toBeDefined()
          const button = await getNextStepButton()
          expect(button).toBeDisabled()
        })

        it('Both fields too long', async () => {
          stubConst(api, 'proposalsEngine.titleMaxLength', createType('u32', 5))
          stubConst(api, 'proposalsEngine.descriptionMaxLength', createType('u32', 5))
          await finishStakingAccount()

          await fillProposalDetails()

          expect(await screen.findByText(/Title exceeds maximum length./i)).toBeDefined()
          expect(await screen.findByText(/Rationale exceeds maximum length./i)).toBeDefined()
          const button = await getNextStepButton()
          expect(button).toBeDisabled()
        })
      })

      describe('Trigger & Discussion', () => {
        beforeEach(async () => {
          await finishStakingAccount()
          await finishProposalDetails()
        })

        it('Default(Trigger - No, Discussion Mode - Open)', async () => {
          const button = await getNextStepButton()
          expect(button).not.toBeDisabled()
        })

        describe('Trigger - Yes', () => {
          beforeEach(async () => {
            await triggerYes()
          })

          it('Not filled block number', async () => {
            const button = await getNextStepButton()
            expect(button).toBeDisabled()
          })

          it('Invalid block number: too low', async () => {
            await triggerYes()
            await fillTriggerBlock(10)

            expect(await screen.getByText('The minimum block number is 20.')).toBeDefined()

            const button = await getNextStepButton()
            expect(button).toBeDisabled()
          })

          it('Invalid block number: too high', async () => {
            await triggerYes()
            await fillTriggerBlock(9999999999999)

            expect(await screen.getByText(/(^The maximum block number is).*/i)).toBeDefined()
            const button = await getNextStepButton()
            expect(button).toBeDisabled()
          })

          it('Valid block number', async () => {
            await triggerYes()
            await fillTriggerBlock(30)

            expect(await screen.getByText(/^≈.*/i)).toBeDefined()

            const button = await getNextStepButton()
            expect(button).not.toBeDisabled()
          })
        })

        describe('Discussion Mode - Closed', () => {
          beforeEach(async () => {
            await discussionClosed()
          })

          it('Add member to whitelist', async () => {
            await selectFromDropdown('Add member to whitelist', 'alice')

            expect(await screen.getByTestId('removeMember')).toBeDefined()

            const button = await getNextStepButton()
            expect(button).not.toBeDisabled()
          })

          it('Remove member from whitelist', async () => {
            await selectFromDropdown('Add member to whitelist', 'alice')

            expect(await screen.getByTestId('removeMember')).toBeDefined()

            fireEvent.click(await screen.getByTestId('removeMember'))
            expect(screen.queryByTestId('removeMember')).toBeNull()

            const button = await getNextStepButton()
            expect(button).not.toBeDisabled()
          })
        })
      })
    })

    describe('Specific parameters', () => {
      beforeEach(async () => {
        await finishWarning()
      })

      describe('Type - Signal', () => {
        beforeEach(async () => {
          await finishProposalType('signal')
          await finishStakingAccount()
          await finishProposalDetails()
          await finishTriggerAndDiscussion()
        })

        it('Invalid - signal field not filled ', async () => {
          expect(screen.queryByLabelText(/^signal/i)).toHaveValue('')

          const button = await getCreateButton()
          expect(button).toBeDisabled()
        })

        it('Valid - signal field filled', async () => {
          await SpecificParameters.Signal.fillSignal('Foo')

          const button = await getCreateButton()
          expect(button).toBeEnabled()
        })
      })

      describe('Type - Funding Request', () => {
        beforeEach(async () => {
          await finishProposalType('fundingRequest')
          await finishStakingAccount()
          await finishProposalDetails()
          await finishTriggerAndDiscussion()
        })

        it('Invalid - not filled amount, no selected recipient', async () => {
          expect(screen.queryByText('Recipient account')).not.toBeNull()

          const button = await getCreateButton()
          expect(button).toBeDisabled()
        })

        it('Invalid - no selected recipient', async () => {
          await SpecificParameters.fillAmount(100)

          const button = await getCreateButton()
          expect(button).toBeDisabled()
        })

        it('Invalid - not filled amount', async () => {
          await SpecificParameters.FundingRequest.selectRecipient('bob')

          const button = await getCreateButton()
          expect(button).toBeDisabled()
        })

        it('Valid - everything filled', async () => {
          await SpecificParameters.fillAmount(100)
          await SpecificParameters.FundingRequest.selectRecipient('bob')

          const button = await getCreateButton()
          expect(button).not.toBeDisabled()
        })
      })

      describe('Type - Set Referral Cut', () => {
        beforeEach(async () => {
          await finishProposalType('setReferralCut')
          await finishStakingAccount()
          await finishProposalDetails()
          await finishTriggerAndDiscussion()
        })

        it('Default - Invalid', async () => {
          expect(await screen.getByTestId('amount-input')).toHaveValue('0')
          expect(await getCreateButton()).toBeDisabled()
        })

        it('Blocks value bigger than 255', async () => {
          await SpecificParameters.fillAmount(300)
          expect(await screen.getByTestId('amount-input')).toHaveValue('0')
          expect(await getCreateButton()).toBeDisabled()
        })

        it('Valid', async () => {
          await SpecificParameters.fillAmount(100)
          expect(await screen.getByTestId('amount-input')).toHaveValue('100')
          expect(await getCreateButton()).toBeEnabled()
        })
      })

      describe('Type - Decrease Working Group Lead Stake', () => {
        beforeEach(async () => {
          await finishProposalType('decreaseWorkingGroupLeadStake')
          await finishStakingAccount()
          await finishProposalDetails()
          await finishTriggerAndDiscussion()
        })

        it('Default - not filled amount, no selected group', async () => {
          expect(screen.queryByText('Working Group Lead')).not.toBeNull()
          expect(await getButton(/By half/i)).toBeDisabled()

          const button = await getCreateButton()
          expect(button).toBeDisabled()
        })

        it('Group selected', async () => {
          await SpecificParameters.DecreaseWorkingGroupLeadStake.selectGroup('Forum')
          await waitFor(async () => expect(await getButton(/By half/i)).not.toBeDisabled())

          expect(screen.queryByText(/The actual stake for Forum Working Group Lead is /i)).not.toBeNull()

          const button = await getCreateButton()
          expect(button).toBeDisabled()
        })

        it('Valid - group selected, amount filled', async () => {
          await SpecificParameters.DecreaseWorkingGroupLeadStake.selectGroup('Forum')
          await waitFor(() =>
            expect(screen.queryByText(/The actual stake for Forum Working Group Lead is /i)).not.toBeNull()
          )

          await SpecificParameters.fillAmount(100)

          const button = await getCreateButton()
          expect(button).not.toBeDisabled()
        })
      })

      describe('Type - Terminate Working Group Lead', () => {
        beforeEach(async () => {
          await finishProposalType('terminateWorkingGroupLead')
          await finishStakingAccount()
          await finishProposalDetails()
          await finishTriggerAndDiscussion()
        })

        it('Default - not filled amount, no selected group', async () => {
          expect(await screen.findByLabelText('Working Group', { selector: 'input' })).toHaveValue('')

          const button = await getCreateButton()
          expect(button).toBeDisabled()
        })

        it('Valid - group selected, amount: not filled/filled', async () => {
          await SpecificParameters.TerminateWorkingGroupLead.selectGroup('Forum')
          const workingGroup = server?.server?.schema.find('WorkingGroup', 'forumWorkingGroup') as any
          const leadHandle = workingGroup?.leader.membership.handle
          expect(await screen.findByText(leadHandle)).toBeDefined()

          const button = await getCreateButton()
          expect(button).not.toBeDisabled()

          await triggerYes()
          await SpecificParameters.fillAmount(100)

          expect(button).not.toBeDisabled()
        })
      })

      describe('Type - Create Working Group Lead Opening', () => {
        beforeEach(async () => {
          await finishProposalType('createWorkingGroupLeadOpening')
          await finishStakingAccount()
          await finishProposalDetails()
          await finishTriggerAndDiscussion()

          expect(screen.getByText(/^Create Working Group Lead Opening$/i)).toBeDefined()
        })

        it('Step 1: Valid', async () => {
          expect(screen.queryByLabelText(/^working group/i, { selector: 'input' })).toHaveValue('')
          expect(screen.queryByLabelText(/^short description/i)).toHaveValue('')
          expect(screen.queryByLabelText(/^description/i)).toHaveValue('')

          expect(await getNextStepButton()).toBeDisabled()
        })

        it('Step 1: Invalid to Valid', async () => {
          await SpecificParameters.CreateWorkingGroupLeadOpening.selectGroup('Forum')
          expect(await getNextStepButton()).toBeDisabled()

          await SpecificParameters.CreateWorkingGroupLeadOpening.fillDescription('Foo')
          expect(await getNextStepButton()).toBeDisabled()

          await SpecificParameters.CreateWorkingGroupLeadOpening.fillShortDescription('Bar')
          expect(await getNextStepButton()).toBeEnabled()
        })

        it('Step 2: Invalid ', async () => {
          await SpecificParameters.CreateWorkingGroupLeadOpening.selectGroup('Forum')
          await SpecificParameters.CreateWorkingGroupLeadOpening.fillDescription('Foo')
          await SpecificParameters.CreateWorkingGroupLeadOpening.fillShortDescription('Bar')
          await clickNextButton()

          expect(screen.queryByLabelText(/^staking amount/i, { selector: 'input' })).toHaveValue('0')
          expect(screen.queryByLabelText(/^leaving unstaking period/i, { selector: 'input' })).toHaveValue('0')
          expect(screen.queryByLabelText(/^reward amount per block/i, { selector: 'input' })).toHaveValue('0')

          expect(await getCreateButton()).toBeDisabled()
        })

        it('Step 2: Invalid to valid', async () => {
          await SpecificParameters.CreateWorkingGroupLeadOpening.selectGroup('Forum')
          await SpecificParameters.CreateWorkingGroupLeadOpening.fillDescription('Foo')
          await SpecificParameters.CreateWorkingGroupLeadOpening.fillShortDescription('Bar')
          await clickNextButton()

          await SpecificParameters.CreateWorkingGroupLeadOpening.fillStakingAmount(100)
          expect(await getCreateButton()).toBeDisabled()

          await SpecificParameters.CreateWorkingGroupLeadOpening.fillUnstakingPeriod(100)
          expect(await getCreateButton()).toBeEnabled()
        })
      })

      describe('Type - Set Working Group Lead Reward', () => {
        beforeEach(async () => {
          await finishProposalType('setWorkingGroupLeadReward')
          await finishStakingAccount()
          await finishProposalDetails()
          await finishTriggerAndDiscussion()

          expect(screen.getByText(/^Set Working Group Lead Reward$/i)).toBeDefined()
        })

        it('Invalid form', async () => {
          expect(await screen.queryByLabelText(/^Working Group$/i, { selector: 'input' })).toHaveValue('')
          expect(await screen.queryByTestId('amount-input')).toHaveValue('0')
          expect(await getCreateButton()).toBeDisabled()
        })

        it('Valid form', async () => {
          await SpecificParameters.SetWorkingGroupLeadReward.selectGroup('Forum')
          await waitForElementToBeRemoved(() => screen.queryByText('Loading...'), { timeout: 300 })
          await SpecificParameters.SetWorkingGroupLeadReward.fillRewardAmount(100)
          expect(await getCreateButton()).toBeEnabled()
        })
      })

      describe('Type - Cancel Working Group Lead Opening', () => {
        beforeEach(async () => {
          await finishProposalType('cancelWorkingGroupLeadOpening')
          await finishStakingAccount()
          await finishProposalDetails()
          await finishTriggerAndDiscussion()

          expect(screen.getByText(/^Cancel Working Group Lead Opening$/i)).toBeDefined()
        })

        it('Invalid form', async () => {
          expect(await screen.queryByLabelText(/^Opening/i, { selector: 'input' })).toHaveValue('')
          expect(await getCreateButton()).toBeDisabled()
        })

        it('Valid form', async () => {
          await SpecificParameters.CancelWorkingGroupLeadOpening.selectedOpening('forumWorkingGroup-1')
          expect(await getCreateButton()).toBeEnabled()
        })
      })
      describe('Type - Set Membership lead invitation quota proposal', () => {
        beforeAll(() => {
          seedWorkingGroups(server.server)
          seedOpeningStatuses(server.server)
          seedOpenings(server.server)
          seedApplications(server.server)
          seedWorkers(server.server)
          updateWorkingGroups(server.server)
        })

        beforeEach(async () => {
          await finishProposalType('setMembershipLeadInvitationQuota')
          await finishStakingAccount()
          await finishProposalDetails()
          await finishTriggerAndDiscussion()

          expect(screen.getByText(/^Set Membership Lead Invitation Quota$/i)).toBeDefined()
        })

        it('Invalid form', async () => {
          await waitFor(async () => expect(await screen.queryByTestId('amount-input')).toBeEnabled())
          expect(await screen.queryByTestId('amount-input')).toHaveValue('0')
          expect(await screen.queryByTestId('amount-input')).toBeEnabled()
          expect(await getCreateButton()).toBeDisabled()
        })

        it('Validate max value', async () => {
          await waitFor(async () => expect(await screen.queryByTestId('amount-input')).toBeEnabled())
          await SpecificParameters.fillAmount(Math.pow(2, 32))
          expect(await screen.queryByTestId('amount-input')).toHaveValue('0')
          expect(await screen.queryByTestId('amount-input')).toBeEnabled()
        })

        it('Valid form', async () => {
          await waitFor(async () => expect(await screen.queryByTestId('amount-input')).toBeEnabled())
          await SpecificParameters.fillAmount(100)
          expect(await getCreateButton()).toBeEnabled()
        })
      })
      describe('Type - Fill Working Group Lead Opening', () => {
        beforeEach(async () => {
          await finishProposalType('fillWorkingGroupLeadOpening')
          await finishStakingAccount()
          await finishProposalDetails()
          await finishTriggerAndDiscussion()

          expect(screen.getByText(/^Fill Working Group Lead Opening$/i)).toBeDefined()
        })

        it('Invalid form', async () => {
          expect(await screen.queryByLabelText(/^Opening/i, { selector: 'input' })).toHaveValue('')
          expect(await getCreateButton()).toBeDisabled()
        })

        it('Valid form', async () => {
          await SpecificParameters.FillWorkingGroupLeadOpening.selectedOpening('forumWorkingGroup-2')
          await SpecificParameters.FillWorkingGroupLeadOpening.selectApplication('forumWorkingGroup-2')
          expect(await getCreateButton()).toBeEnabled()
        })
      })
    })

    describe('Authorize', () => {
      describe('Staking account not bound nor staking candidate', () => {
        beforeEach(async () => {
          await finishWarning()
          await finishProposalType('fundingRequest')
          await finishStakingAccount()
          await finishProposalDetails()
          await finishTriggerAndDiscussion()
          await SpecificParameters.FundingRequest.finish(100, 'bob')
        })

        it('Bind account step', async () => {
          expect(await screen.findByText('You intend to bind account for staking')).toBeDefined()
          expect((await screen.findByText(/^Transaction fee:/i))?.nextSibling?.textContent).toBe('42')
        })

        it('Bind account failure', async () => {
          stubTransactionFailure(bindAccountTx)

          await act(async () => {
            fireEvent.click(screen.getByText(/^Sign transaction/i))
          })

          expect(await screen.findByText('Failure')).toBeDefined()
        })

        it('Create proposal step', async () => {
          stubTransactionSuccess(bindAccountTx, 'members', 'StakingAccountAdded')

          await act(async () => {
            fireEvent.click(screen.getByText(/^Sign transaction/i))
          })

          expect(await screen.findByText(/You intend to create a proposa/i)).toBeDefined()
          expect((await screen.findByText(/^Transaction fee:/i))?.nextSibling?.textContent).toBe('25')
        })

        it('Create proposal success', async () => {
          stubTransactionSuccess(bindAccountTx, 'members', 'StakingAccountAdded')
          await act(async () => {
            fireEvent.click(screen.getByText(/^Sign transaction/i))
          })
          stubTransactionSuccess(batchTx, 'proposalsCodex', 'ProposalCreated', [createType('ProposalId', 1337)])

          await act(async () => {
            fireEvent.click(await screen.findByText(/^Sign transaction and Create$/i))
          })

          expect(await screen.findByText('See my Proposal')).toBeDefined()
        })

        it('Create proposal failure', async () => {
          stubTransactionSuccess(bindAccountTx, 'members', 'StakingAccountAdded')
          await act(async () => {
            fireEvent.click(screen.getByText(/^Sign transaction/i))
          })
          stubTransactionFailure(batchTx)

          await act(async () => {
            fireEvent.click(await screen.findByText(/^Sign transaction and Create$/i))
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

          await finishWarning()
          await finishProposalType('fundingRequest')
          await finishStakingAccount()
          await finishProposalDetails()
          await finishTriggerAndDiscussion()
          await SpecificParameters.FundingRequest.finish(100, 'bob')
        })

        it('Create proposal step', async () => {
          expect(await screen.findByText(/You intend to create a proposa/i)).not.toBeNull()
          expect((await screen.findByText(/^Transaction fee:/i))?.nextSibling?.textContent).toBe('25')
        })

        it('Create proposal success', async () => {
          stubTransactionSuccess(batchTx, 'proposalsCodex', 'ProposalCreated', [createType('ProposalId', 1337)])

          await act(async () => {
            fireEvent.click(await screen.getByText(/^Sign transaction and Create$/i))
          })

          expect(await screen.findByText('See my Proposal')).toBeDefined()
        })

        it('Create proposal failure', async () => {
          stubTransactionFailure(batchTx)

          await act(async () => {
            fireEvent.click(await screen.getByText(/^Sign transaction and Create$/i))
          })

          expect(await screen.findByText('Failure')).toBeDefined()
        })
      })

      describe('Staking account is confirmed', () => {
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

          await finishWarning()
          await finishProposalType('fundingRequest')
          await finishStakingAccount()
          await finishProposalDetails()
          await finishTriggerAndDiscussion()
          await SpecificParameters.FundingRequest.finish(100, 'bob')
        })

        it('Create proposal step', async () => {
          expect(await screen.findByText(/You intend to create a proposa/i)).not.toBeNull()
          expect((await screen.findByText(/^Transaction fee:/i))?.nextSibling?.textContent).toBe('25')
        })

        it('Create proposal success', async () => {
          stubTransactionSuccess(createProposalTx, 'proposalsCodex', 'ProposalCreated', [
            createType('ProposalId', 1337),
          ])

          await act(async () => {
            fireEvent.click(await screen.getByText(/^Sign transaction and Create$/i))
          })

          expect(await screen.findByText('See my Proposal')).toBeDefined()
        })

        it('Create proposal failure', async () => {
          stubTransactionFailure(createProposalTx)

          await act(async () => {
            fireEvent.click(await screen.getByText(/^Sign transaction and Create$/i))
          })

          expect(await screen.findByText('Failure')).toBeDefined()
        })
      })
    })

    it('Previous step', async () => {
      await finishWarning()
      await finishProposalType()
      await finishStakingAccount()
      await finishProposalDetails()

      expect(screen.queryByText('Discussion mode:')).not.toBeNull()
      await clickPreviousButton()

      expect(screen.queryByDisplayValue('Some title')).not.toBeNull()
      await clickPreviousButton()

      expect(screen.queryByText('Select account for Staking')).not.toBeNull()
      expect(await getNextStepButton()).not.toBeDisabled()
      await clickPreviousButton()

      expect(screen.queryByText('Please choose proposal type')).not.toBeNull()
      expect(await getNextStepButton()).not.toBeDisabled()
    })

    describe('Discussion mode transaction', () => {
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
        stubTransactionSuccess(createProposalTx, 'proposalsCodex', 'ProposalCreated', [createType('ProposalId', 1337)])
        await finishWarning()
        await finishProposalType('fundingRequest')
        await finishStakingAccount()
        await finishProposalDetails()
        await discussionClosed()
        await finishTriggerAndDiscussion()
        await SpecificParameters.FundingRequest.finish(100, 'bob')

        await act(async () => {
          fireEvent.click(await screen.getByText(/^Sign transaction and Create$/i))
        })
      })

      it('Arrives at the transaction modal', async () => {
        expect(await screen.findByText(/You intend to change the proposal discussion thread mode./i)).toBeDefined()
        expect(await screen.findByText(/Sign transaction and change mode/i)).toBeDefined()
      })

      it('Success', async () => {
        stubTransactionSuccess(changeModeTx, 'proposalsDiscussion', 'ThreadModeChanged')
        const button = await getButton(/sign transaction and change mode/i)
        await act(async () => {
          fireEvent.click(button)
        })
        expect(await screen.findByText('See my Proposal')).toBeDefined()
      })

      it('Failure', async () => {
        stubTransactionFailure(changeModeTx)
        const button = await getButton(/sign transaction and change mode/i)

        fireEvent.click(button)

        expect(await screen.findByText('Failure')).toBeDefined()
      })
    })
  })

  const getCheckbox = async () => await screen.findByLabelText(/I’m aware of/i)

  async function finishWarning() {
    await renderModal()

    const button = await getWarningNextButton()

    const checkbox = await getCheckbox()
    fireEvent.click(checkbox)
    fireEvent.click(button as HTMLElement)
  }

  async function finishProposalType(type?: ProposalType) {
    const typeElement = (await screen.findByText(camelCaseToText(type || 'fundingRequest'))).parentElement
      ?.parentElement as HTMLElement
    fireEvent.click(typeElement)

    await clickNextButton()
  }

  async function finishStakingAccount() {
    await selectFromDropdown('Select account for Staking', 'alice')

    await clickNextButton()
  }

  async function finishProposalDetails() {
    await fillProposalDetails()

    await clickNextButton()
  }

  async function finishTriggerAndDiscussion() {
    await clickNextButton()
  }

  async function fillProposalDetails() {
    const titleInput = await screen.findByLabelText(/Proposal title/i)
    fireEvent.change(titleInput, { target: { value: 'Some title' } })

    const rationaleInput = await screen.findByLabelText(/Rationale/i)
    fireEvent.change(rationaleInput, { target: { value: 'Some rationale' } })
  }

  async function triggerYes() {
    const triggerToggle = await screen.findByText('Yes')
    fireEvent.click(triggerToggle)
  }

  async function fillTriggerBlock(value: number) {
    const blockInput = await screen.getByTestId('triggerBlock')
    fireEvent.change(blockInput, { target: { value } })
  }

  async function discussionClosed() {
    const discussionToggle = (await screen.findAllByRole('checkbox'))[1]
    fireEvent.click(discussionToggle)
  }

  async function getWarningNextButton() {
    return (await screen.findByText('I want to create a proposal anyway')).parentElement
  }

  async function getPreviousStepButton() {
    return await getButton(/Previous step/i)
  }

  async function clickPreviousButton() {
    const button = await getPreviousStepButton()
    fireEvent.click(button as HTMLElement)
  }

  async function getNextStepButton() {
    return getButton(/Next step/i)
  }

  async function getCreateButton() {
    return getButton(/Create proposal/i)
  }

  async function clickNextButton() {
    const button = await getNextStepButton()
    fireEvent.click(button as HTMLElement)
  }

  const selectGroup = async (name: string) => {
    await selectFromDropdown('^Working Group$', name)
  }

  const selectedOpening = async (name: string) => {
    await selectFromDropdown('^Opening$', name)
  }

  const selectApplication = async (name: string) => {
    await selectFromDropdown('^Application$', name)
  }

  async function fillField(id: string, value: number | string) {
    const amountInput = await screen.getByTestId(id)
    fireEvent.change(amountInput, { target: { value } })
  }

  const SpecificParameters = {
    fillAmount: async (value: number) => await fillField('amount-input', value),
    Signal: {
      fillSignal: async (value: string) => await fillField('signal', value),
    },
    FundingRequest: {
      selectRecipient: async (name: string) => {
        await selectFromDropdown('Recipient account', name)
      },
      finish: async (amount: number, recipient: string) => {
        await SpecificParameters.fillAmount(amount)
        await SpecificParameters.FundingRequest.selectRecipient(recipient)

        const button = await getCreateButton()
        fireEvent.click(button as HTMLElement)
      },
    },
    DecreaseWorkingGroupLeadStake: {
      selectGroup,
    },
    TerminateWorkingGroupLead: {
      selectGroup,
    },
    CreateWorkingGroupLeadOpening: {
      selectGroup,
      fillShortDescription: async (value: string) => await fillField('short-description', value),
      fillDescription: async (value: string) => await fillField('field-description', value),
      fillUnstakingPeriod: async (value: number) => await fillField('leaving-unstaking-period', value),
      fillStakingAmount: async (value: number) => await fillField('staking-amount', value),
    },
    CancelWorkingGroupLeadOpening: {
      selectedOpening,
    },
    SetWorkingGroupLeadReward: {
      selectGroup,
      fillRewardAmount: async (value: number) => await fillField('amount-input', value),
    },
    FillWorkingGroupLeadOpening: {
      selectedOpening,
      selectApplication,
    },
  }

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
                      <AddNewProposalModal />
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
