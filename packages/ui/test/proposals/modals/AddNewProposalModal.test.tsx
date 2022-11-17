import { OpeningMetadata } from '@joystream/metadata-protobuf'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, configure, fireEvent, render, screen, waitFor } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { interpret } from 'xstate'

import { MoveFundsModalCall } from '@/accounts/modals/MoveFoundsModal'
import { ApiContext } from '@/api/providers/context'
import { CurrencyName } from '@/app/constants/currency'
import { GlobalModals } from '@/app/GlobalModals'
import { CKEditorProps } from '@/common/components/CKEditor'
import { camelCaseToText } from '@/common/helpers'
import { createType } from '@/common/model/createType'
import { metadataFromBytes } from '@/common/model/JoystreamNode/metadataFromBytes'
import { getSteps } from '@/common/model/machines/getSteps'
import { ModalContextProvider } from '@/common/providers/modal/provider'
import { last } from '@/common/utils'
import { powerOf2 } from '@/common/utils/bn'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import {
  seedApplication,
  seedApplications,
  seedMembers,
  seedOpening,
  seedOpenings,
  seedOpeningStatuses,
  seedUpcomingOpenings,
  seedWorkers,
  seedWorkingGroups,
  updateWorkingGroups,
} from '@/mocks/data'
import workingGroups from '@/mocks/data/raw/workingGroups.json'
import { addNewProposalMachine } from '@/proposals/modals/AddNewProposal/machine'
import { ProposalType } from '@/proposals/types'

import { getButton } from '../../_helpers/getButton'
import { selectFromDropdown } from '../../_helpers/selectFromDropdown'
import { toggleCheckBox } from '../../_helpers/toggleCheckBox'
import { mockCKEditor } from '../../_mocks/components/CKEditor'
import { mockUseCurrentBlockNumber } from '../../_mocks/hooks/useCurrentBlockNumber'
import { alice, bob } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import {
  stubAccounts,
  stubApi,
  stubConst,
  stubCouncilAndReferendum,
  stubCouncilConstants,
  stubDefaultBalances,
  stubProposalConstants,
  stubQuery,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'
import { mockedTransactionFee, mockUseModalCall } from '../../setup'

const QUESTION_INPUT = OpeningMetadata.ApplicationFormQuestion.InputType

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

const OPENING_DATA = {
  id: 'forumWorkingGroup-1337',
  runtimeId: 1337,
  groupId: 'forumWorkingGroup',
  stakeAmount: 4000,
  rewardPerBlock: 200,
  version: 1,
  type: 'LEADER',
  status: 'open',
  unstakingPeriod: 25110,
  metadata: {
    title: 'Foo',
    shortDescription: '',
    description: '',
    hiringLimit: 1,
    applicationDetails: '',
    applicationFormQuestions: [],
    expectedEnding: '2021-12-06T14:26:06.283Z',
  },
}

const APPLICATION_DATA = {
  id: 'forumWorkingGroup-1337',
  runtimeId: 1337,
  openingId: 'forumWorkingGroup-1337',
  applicantId: '0',
  answers: [],
  status: 'pending',
  stake: new BN(10000),
}

describe('AddNewProposalModal types parameters', () => {
  describe('Specific parameters', () => {
    describe('createWorkingGroupLeadOpening', () => {
      const result = createType('PalletProposalsCodexProposalDetails', {
        CreateWorkingGroupLeadOpening: {
          description: 'Dolor deserunt adipisicing velit et.',
          stakePolicy: {
            stakeAmount: new BN(100),
            leavingUnstakingPeriod: 10,
          },
          rewardPerBlock: 10,
          group: 'Forum',
        },
      })

      it('Stake policy', () => {
        const stakePolicy = result.asCreateWorkingGroupLeadOpening.stakePolicy.toJSON()
        expect(stakePolicy).toEqual({ stakeAmount: 100, leavingUnstakingPeriod: 10 })
      })
    })
  })
})

describe('UI: AddNewProposalModal', () => {
  const api = stubApi()

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
  const forumLeadId = workingGroups.find((group) => group.id === 'forumWorkingGroup')?.leadId
  const showModal = jest.fn()
  let createProposalTx: any
  let batchTx: any
  let bindAccountTx: any
  let changeModeTx: any
  let createProposalTxMock: jest.Mock

  const server = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(async () => {
    await cryptoWaitReady()
    mockUseModalCall({ showModal, modal: 'AddNewProposalModal' })
    seedMembers(server.server)
    seedWorkingGroups(server.server)
    seedOpeningStatuses(server.server)
    seedOpenings(server.server)
    seedUpcomingOpenings(server.server)
    seedApplications(server.server)
    seedOpening(OPENING_DATA, server.server)
    seedApplication(APPLICATION_DATA, server.server)
    seedWorkers(server.server)
    updateWorkingGroups(server.server)
    stubAccounts([alice, bob])
  })

  beforeEach(async () => {
    mockedTransactionFee.feeInfo = { transactionFee: new BN(100), canAfford: true }

    useMyMemberships.members = [getMember('alice'), getMember('bob')]
    useMyMemberships.setActive(getMember('alice'))

    stubDefaultBalances()
    stubProposalConstants(api)
    stubCouncilConstants(api)
    stubCouncilAndReferendum(api, 'Announcing', 'Inactive')

    createProposalTx = stubTransaction(api, 'api.tx.proposalsCodex.createProposal', 25)
    createProposalTxMock = api.api.tx.proposalsCodex.createProposal as unknown as jest.Mock

    stubTransaction(api, 'api.tx.members.confirmStakingAccount', 25)
    stubQuery(
      api,
      'members.stakingAccountIdMemberStatus',
      createType('PalletMembershipStakingAccountMemberBinding', {
        memberId: 0,
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
    beforeEach(async () => {
      await renderModal()
    })

    it('No active member', async () => {
      useMyMemberships.active = undefined

      await renderModal()

      expect(showModal).toBeCalledWith({
        modal: 'SwitchMember',
        data: { originalModalName: 'AddNewProposalModal', originalModalData: null },
      })
    })
  })

  describe('Warning modal', () => {
    beforeEach(async () => {
      await renderModal()
    })
    it('Not checked', async () => {
      const button = await getWarningNextButton()
      expect(await screen.queryByText('Do not show this message again.')).toBeDefined()
      expect(button).toBeDisabled()
    })

    it('Checked', async () => {
      const button = await getWarningNextButton()

      const checkbox = await getCheckbox()
      fireEvent.click(checkbox as HTMLElement)

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
        const requiredStake = 9999
        stubProposalConstants(api, { requiredStake })
        await finishProposalType()

        const moveFundsModalCall: MoveFundsModalCall = {
          modal: 'MoveFundsModal',
          data: {
            requiredStake: new BN(requiredStake),
            lock: 'Proposals',
            isFeeOriented: false,
          },
        }

        expect(showModal).toBeCalledWith({ ...moveFundsModalCall })
      })

      it('Enough funds', async () => {
        await finishProposalType()
        expect(screen.findByText('Creating new proposal')).toBeDefined()
      })
    })

    describe('General parameters', () => {
      describe('Staking account', () => {
        beforeEach(async () => {
          await finishWarning()
          await finishProposalType()
        })

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
          await finishWarning()
          await finishProposalType()
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
        beforeEach(async () => {
          stubConst(api, 'proposalsEngine.titleMaxLength', createType('u32', 5))
          stubConst(api, 'proposalsEngine.descriptionMaxLength', createType('u32', 5))
          await finishWarning()
          await finishProposalType()
        })
        it('Title too long', async () => {
          stubConst(api, 'proposalsEngine.titleMaxLength', createType('u32', 5))

          await finishStakingAccount()

          await fillProposalDetails()

          expect(await screen.findByText(/Title exceeds maximum length/i)).toBeDefined()
          const button = await getNextStepButton()
          expect(button).toBeDisabled()
        })

        it('Description too long', async () => {
          await finishStakingAccount()

          await fillProposalDetails()

          expect(await screen.findByText(/Rationale exceeds maximum length/i)).toBeDefined()
          const button = await getNextStepButton()
          expect(button).toBeDisabled()
        })

        it('Both fields too long', async () => {
          await finishStakingAccount()

          await fillProposalDetails()

          expect(await screen.findByText(/Title exceeds maximum length/i)).toBeDefined()
          expect(await screen.findByText(/Rationale exceeds maximum length/i)).toBeDefined()
          const button = await getNextStepButton()
          expect(button).toBeDisabled()
        })
      })

      describe('Trigger & Discussion', () => {
        beforeEach(async () => {
          await finishWarning()
          await finishProposalType()
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

            await waitFor(async () => expect(await screen.getByText('The minimum block number is 20')).toBeDefined())

            const button = await getNextStepButton()
            expect(button).toBeDisabled()
          })

          it('Invalid block number: too high', async () => {
            await act(async () => {
              await triggerYes()
              await fillTriggerBlock(99999999999999)
            })
            expect(screen.queryAllByText(/(^The maximum block number is \d*)*/i)).toBeDefined()
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
          const signal = 'Foo'
          await SpecificParameters.Signal.fillSignal(signal)

          const [, txSpecificParameters] = last(createProposalTxMock.mock.calls)
          const parameters = txSpecificParameters.asSignal.toHuman()
          expect(parameters).toEqual(signal)
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

        it('Invalid - amount exceeds max value of 10k', async () => {
          await SpecificParameters.FundingRequest.selectRecipient('bob')
          await SpecificParameters.fillAmount(100_000)

          const button = await getCreateButton()
          expect(screen.queryByText(/^Maximal amount allowed is*/)).toBeInTheDocument()
          expect(button).toBeDisabled()
        })

        it('Valid - everything filled', async () => {
          const amount = 100
          await SpecificParameters.fillAmount(amount)
          await SpecificParameters.FundingRequest.selectRecipient('bob')

          const [, txSpecificParameters] = last(createProposalTxMock.mock.calls)
          const parameters = txSpecificParameters.asFundingRequest.toJSON()
          expect(parameters).toEqual([
            {
              account: getMember('bob').controllerAccount,
              amount: amount,
            },
          ])
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

        it('Invalid - over 100 percent', async () => {
          await SpecificParameters.fillAmount(200)
          expect(await screen.getByTestId('amount-input')).toHaveValue('200')
          expect(await getCreateButton()).toBeDisabled()
        })

        it('Valid', async () => {
          const amount = 40
          await SpecificParameters.fillAmount(amount)
          expect(await screen.getByTestId('amount-input')).toHaveValue(String(amount))

          const [, txSpecificParameters] = last(createProposalTxMock.mock.calls)
          const parameters = txSpecificParameters.asSetReferralCut.toJSON()

          expect(parameters).toEqual(amount)
          expect(await getCreateButton()).toBeEnabled()
        })

        it('Valid with execution warning', async () => {
          const amount = 100
          const button = await getCreateButton()

          await SpecificParameters.fillAmount(amount)
          expect(await screen.getByTestId('amount-input')).toHaveValue(String(amount))
          expect(button).toBeDisabled()

          const checkbox = screen.getByTestId('execution-requirement')
          fireEvent.click(checkbox)

          const [, txSpecificParameters] = last(createProposalTxMock.mock.calls)
          const parameters = txSpecificParameters.asSetReferralCut.toJSON()

          expect(parameters).toEqual(amount)
          expect(button).toBeEnabled()
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
          expect(screen.queryByText('Working Group Lead')).toBeNull()
          expect(await getButton(/By half/i)).toBeDisabled()

          const button = await getCreateButton()
          expect(button).toBeDisabled()
        })

        it('Group selected, amount filled with half stake', async () => {
          await SpecificParameters.DecreaseWorkingGroupLeadStake.selectGroup('Forum')
          await waitFor(async () => expect(await getButton(/By half/i)).not.toBeDisabled())

          expect(screen.queryByText(/The actual stake for Forum Working Group Lead is /i)).not.toBeNull()

          const button = await getCreateButton()
          expect(button).not.toBeDisabled()
        })

        it('Zero amount entered', async () => {
          await SpecificParameters.DecreaseWorkingGroupLeadStake.selectGroup('Forum')
          await waitFor(async () => expect(await getButton(/By half/i)).not.toBeDisabled())
          await SpecificParameters.fillAmount(0)

          const button = await getCreateButton()
          expect(button).toBeDisabled()
        })

        it('Valid - group selected, amount filled', async () => {
          const amount = 100
          const group = 'Forum'
          await SpecificParameters.DecreaseWorkingGroupLeadStake.selectGroup(group)
          await waitFor(() =>
            expect(screen.queryByText(/The actual stake for Forum Working Group Lead is /i)).not.toBeNull()
          )
          await SpecificParameters.fillAmount(amount)

          const [, txSpecificParameters] = last(createProposalTxMock.mock.calls)
          const parameters = txSpecificParameters.asDecreaseWorkingGroupLeadStake.toJSON()
          expect(parameters).toEqual([Number(forumLeadId?.split('-')[1]), amount, group])

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
          const group = 'Forum'
          const slashingAmount = 100
          await SpecificParameters.TerminateWorkingGroupLead.selectGroup(group)
          const workingGroup = server?.server?.schema.find('WorkingGroup', 'forumWorkingGroup') as any
          const leader = workingGroup?.leader.membership
          expect(await screen.findByText(leader?.handle)).toBeDefined()

          const button = await getCreateButton()
          expect(button).not.toBeDisabled()

          await triggerYes()
          await SpecificParameters.fillAmount(slashingAmount)

          const [, txSpecificParameters] = last(createProposalTxMock.mock.calls)
          const parameters = txSpecificParameters.asTerminateWorkingGroupLead.toJSON()
          expect(parameters).toEqual({
            slashingAmount,
            workerId: Number(forumLeadId?.split('-')[1]),
            group,
          })

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

        it('Step 1: Invalid to Valid', async () => {
          expect(await getNextStepButton()).toBeDisabled()

          await SpecificParameters.CreateWorkingGroupLeadOpening.selectGroup('Forum')
          expect(await getNextStepButton()).toBeDisabled()

          await SpecificParameters.CreateWorkingGroupLeadOpening.fillTitle('Foo')
          expect(await getNextStepButton()).toBeDisabled()

          await SpecificParameters.CreateWorkingGroupLeadOpening.fillDescription('Bar')
          expect(await getNextStepButton()).toBeDisabled()

          await SpecificParameters.CreateWorkingGroupLeadOpening.fillShortDescription('Baz')
          expect(await getNextStepButton()).toBeEnabled()
        })

        it('Step 2: Invalid to Valid', async () => {
          await SpecificParameters.CreateWorkingGroupLeadOpening.flow({
            group: 'Forum',
            title: 'Foo',
            description: 'Bar',
            shortDesc: 'Baz',
          })
          expect(await getNextStepButton()).toBeDisabled()

          await SpecificParameters.CreateWorkingGroupLeadOpening.fillDetails('Lorem ipsum')
          expect(await getNextStepButton()).toBeEnabled()

          await toggleCheckBox(true)
          await fillField('field-period-length', '0')
          expect(await getNextStepButton()).toBeDisabled()

          await toggleCheckBox(false)
          expect(await getNextStepButton()).toBeEnabled()
        })

        it('Step 3: Invalid to Valid', async () => {
          await SpecificParameters.CreateWorkingGroupLeadOpening.flow(
            { group: 'Forum', title: 'Foo', description: 'Bar', shortDesc: 'Baz' },
            { duration: 100, details: 'Lorem ipsum' }
          )
          expect(await getNextStepButton()).toBeDisabled()

          await SpecificParameters.CreateWorkingGroupLeadOpening.fillQuestionField('🐁?', 0)
          expect(await getNextStepButton()).toBeEnabled()

          const addQuestionBtn = await screen.findByText('Add new question')
          act(() => {
            fireEvent.click(addQuestionBtn)
          })
          expect(await getNextStepButton()).toBeDisabled()

          await toggleCheckBox(false, 1)
          expect(await getNextStepButton()).toBeDisabled()

          await SpecificParameters.CreateWorkingGroupLeadOpening.fillQuestionField('🐘?', 1)
          expect(await getNextStepButton()).toBeEnabled()
        })

        it('Step 4: Invalid to valid', async () => {
          const step1 = { group: 'Storage', title: 'Foo', description: 'Bar', shortDesc: 'Baz' }
          const step2 = { duration: 100, details: 'Lorem ipsum' }
          const step3 = {
            questions: [
              { question: 'Short?', type: QUESTION_INPUT.TEXT },
              { question: 'Long?', type: QUESTION_INPUT.TEXTAREA },
            ],
          }
          const step4 = { stake: 100, unstakingPeriod: 101, rewardPerBlock: 102 }

          await SpecificParameters.CreateWorkingGroupLeadOpening.flow(step1, step2, step3)
          expect(await getCreateButton()).toBeDisabled()

          await SpecificParameters.CreateWorkingGroupLeadOpening.fillStakingAmount(step4.stake)
          expect(await getCreateButton()).toBeDisabled()

          await SpecificParameters.CreateWorkingGroupLeadOpening.fillUnstakingPeriod(step4.unstakingPeriod)
          expect(await getCreateButton()).toBeDisabled()

          await SpecificParameters.CreateWorkingGroupLeadOpening.fillRewardPerBlock(step4.rewardPerBlock)
          expect(await getCreateButton()).toBeEnabled()

          const [, txSpecificParameters] = last(createProposalTxMock.mock.calls)

          const { description: metadata, ...data } = txSpecificParameters.asCreateWorkingGroupLeadOpening.toJSON()
          expect(data).toEqual({
            rewardPerBlock: step4.rewardPerBlock,
            stakePolicy: {
              stakeAmount: step4.stake,
              leavingUnstakingPeriod: step4.unstakingPeriod,
            },
            group: step1.group,
          })

          expect(metadataFromBytes(OpeningMetadata, metadata)).toEqual({
            title: step1.title,
            shortDescription: step1.shortDesc,
            description: step1.description,
            hiringLimit: 1,
            expectedEndingTimestamp: step2.duration,
            applicationDetails: step2.details,
            applicationFormQuestions: step3.questions,
          })
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
          expect(await screen.queryByTestId('amount-input')).toHaveValue('')
          expect(await getCreateButton()).toBeDisabled()

          await SpecificParameters.SetWorkingGroupLeadReward.fillRewardAmount(0)
          expect(await getCreateButton()).toBeDisabled()
        })

        it('Valid form', async () => {
          const group = 'Forum'
          const amount = 100
          await SpecificParameters.SetWorkingGroupLeadReward.selectGroup(group)
          await SpecificParameters.SetWorkingGroupLeadReward.fillRewardAmount(amount)
          expect(await getCreateButton()).toBeEnabled()

          const [, txSpecificParameters] = last(createProposalTxMock.mock.calls)
          const parameters = txSpecificParameters.asSetWorkingGroupLeadReward.toJSON()
          expect(parameters).toEqual([Number(forumLeadId?.split('-')[1]), amount, group])
        })
      })

      describe('Type - Set Max Validator Count', () => {
        beforeEach(async () => {
          await finishProposalType('setMaxValidatorCount')
          await finishStakingAccount()
          await finishProposalDetails()
          await finishTriggerAndDiscussion()

          expect(screen.getByText(/^Set max validator count$/i)).toBeDefined()
        })

        it('Invalid form', async () => {
          expect(await screen.queryByTestId('amount-input')).toHaveValue('0')
          expect(await getCreateButton()).toBeDisabled()
        })

        it('Validate max and min value', async () => {
          await SpecificParameters.fillAmount(400)
          expect(await screen.queryByText('Maximal amount allowed is'))

          await SpecificParameters.fillAmount(0)
          expect(await screen.queryByText('Minimal amount allowed is'))
        })

        it('Valid form', async () => {
          const amount = 100
          await SpecificParameters.fillAmount(amount)
          expect(await getCreateButton()).toBeEnabled()

          const [, txSpecificParameters] = last(createProposalTxMock.mock.calls)
          const parameters = txSpecificParameters.asSetMaxValidatorCount.toJSON()
          await waitFor(() => expect(parameters).toEqual(amount))
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
          await SpecificParameters.CancelWorkingGroupLeadOpening.selectedOpening('forumWorkingGroup-1337')
          const [, txSpecificParameters] = last(createProposalTxMock.mock.calls)
          const parameters = txSpecificParameters.asCancelWorkingGroupLeadOpening.toJSON()
          expect(parameters).toEqual([1337, 'Forum'])
          expect(await getCreateButton()).toBeEnabled()
        })
      })

      describe('Type - Set Council Budget Increment', () => {
        beforeEach(async () => {
          await finishProposalType('setCouncilBudgetIncrement')
          await finishStakingAccount()
          await finishProposalDetails()
          await finishTriggerAndDiscussion()

          expect(screen.getByText(/^Set Council Budget Increment$/i)).toBeDefined()
        })

        it('Invalid form', async () => {
          expect(await screen.queryByTestId('amount-input')).toHaveValue('')
          expect(await screen.queryByTestId('amount-input')).toBeEnabled()
          expect(await getCreateButton()).toBeDisabled()

          await SpecificParameters.fillAmount(0)
          expect(await getCreateButton()).toBeDisabled()
        })

        it('Validate max value', async () => {
          await SpecificParameters.fillAmount(powerOf2(128))
          expect(await screen.queryByTestId('amount-input')).toHaveValue('')
          expect(await screen.queryByTestId('amount-input')).toBeEnabled()
          expect(await getCreateButton()).toBeDisabled()
        })

        it('Valid form', async () => {
          const amount = 100
          await SpecificParameters.fillAmount(amount)
          expect(await getCreateButton()).toBeEnabled()

          const [, txSpecificParameters] = last(createProposalTxMock.mock.calls)
          const parameters = txSpecificParameters.asSetCouncilBudgetIncrement.toJSON()
          expect(parameters).toEqual(amount)
        })
      })

      describe('Type - Set Councilor Reward', () => {
        beforeEach(async () => {
          await finishProposalType('setCouncilorReward')
          await finishStakingAccount()
          await finishProposalDetails()
          await finishTriggerAndDiscussion()

          expect(screen.getByText(/^Set Councilor Reward$/i)).toBeDefined()
        })

        it('Invalid form', async () => {
          expect(await screen.queryByTestId('amount-input')).toHaveValue('')
          expect(await screen.queryByTestId('amount-input')).toBeEnabled()
          expect(await getCreateButton()).toBeDisabled()

          await SpecificParameters.fillAmount(0)
          expect(await getCreateButton()).toBeDisabled()
        })

        it('Valid form', async () => {
          const amount = 100
          await SpecificParameters.fillAmount(amount)
          expect(await getCreateButton()).toBeEnabled()

          const [, txSpecificParameters] = last(createProposalTxMock.mock.calls)
          const parameters = txSpecificParameters.asSetCouncilorReward.toJSON()
          expect(parameters).toEqual(amount)
        })
      })

      describe('Type - Set Membership lead invitation quota proposal', () => {
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

          await SpecificParameters.fillAmount(0)
          expect(await getCreateButton()).toBeDisabled()
        })

        it('Validate max value', async () => {
          await waitFor(async () => expect(await screen.queryByTestId('amount-input')).toBeEnabled())
          await SpecificParameters.fillAmount(powerOf2(32))
          expect(screen.queryByTestId('amount-input')).toHaveValue('0')
          expect(screen.queryByTestId('amount-input')).toBeEnabled()
        })

        it('Valid form', async () => {
          const amount = 100
          await waitFor(async () => expect(await screen.queryByTestId('amount-input')).toBeEnabled())
          await SpecificParameters.fillAmount(amount)
          expect(await getCreateButton()).toBeEnabled()

          const [, txSpecificParameters] = last(createProposalTxMock.mock.calls)
          const parameters = txSpecificParameters.asSetMembershipLeadInvitationQuota.toJSON()
          expect(parameters).toEqual(amount)
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
          await SpecificParameters.FillWorkingGroupLeadOpening.selectedOpening('forumWorkingGroup-1337')
          await SpecificParameters.FillWorkingGroupLeadOpening.selectApplication(
            `Member ID: ${APPLICATION_DATA.applicantId}`
          )
          const [, txSpecificParameters] = last(createProposalTxMock.mock.calls)
          const parameters = txSpecificParameters.asFillWorkingGroupLeadOpening.toJSON()
          expect(parameters).toEqual({
            openingId: 1337,
            applicationId: 1337,
            workingGroup: 'Forum',
          })
          expect(await getCreateButton()).toBeEnabled()
        })
      })
      describe('Type - Set Initial Invitation Count', () => {
        beforeAll(() => {
          stubQuery(api, 'members.initialInvitationCount', createType('u32', 13))
        })

        beforeEach(async () => {
          await finishProposalType('setInitialInvitationCount')
          await finishStakingAccount()
          await finishProposalDetails()
          await finishTriggerAndDiscussion()

          expect(screen.getByText(/^Set Initial Invitation Count$/i)).toBeDefined()
        })

        it('Displays current invitations count', async () => {
          expect(await screen.findByText('The current initial invitation count is 13.')).toBeDefined()
        })

        it('Invalid form', async () => {
          expect(await screen.findByLabelText(/^New Count$/i, { selector: 'input' })).toHaveValue('0')
          expect(await getCreateButton()).toBeDisabled()
        })

        it('Valid form', async () => {
          const count = 1
          await SpecificParameters.SetInitialInvitationCount.fillCount(1)
          expect(await getCreateButton()).toBeEnabled()
          await SpecificParameters.SetInitialInvitationCount.fillCount(count)
          expect(await getCreateButton()).toBeEnabled()

          const [, txSpecificParameters] = last(createProposalTxMock.mock.calls)
          const parameters = txSpecificParameters.asSetInitialInvitationCount.toJSON()
          expect(parameters).toEqual(count)
        })
      })
      describe('Type - Set Initial Invitation Balance', () => {
        beforeAll(() => {
          stubQuery(api, 'members.initialInvitationBalance', createType('Balance', 2137))
        })

        beforeEach(async () => {
          await finishProposalType('setInitialInvitationBalance')
          await finishStakingAccount()
          await finishProposalDetails()
          await finishTriggerAndDiscussion()

          expect(screen.getByText(/^Set Initial Invitation Balance$/i)).toBeDefined()
        })

        it('Invalid form', async () => {
          expect(await screen.queryByTestId('amount-input')).toHaveValue('')
          expect(await getCreateButton()).toBeDisabled()

          await SpecificParameters.fillAmount(0)
          expect(await getCreateButton()).toBeDisabled()
        })

        it('Valid form', async () => {
          const amount = 1000
          await SpecificParameters.fillAmount(amount)
          expect(await getCreateButton()).toBeEnabled()

          const [, txSpecificParameters] = last(createProposalTxMock.mock.calls)
          const parameters = txSpecificParameters.asSetInitialInvitationBalance.toJSON()
          expect(parameters).toEqual(amount)
        })

        it('Displays current balance', async () => {
          expect(await screen.queryByText(`The current balance is 2137 ${CurrencyName.integerValue}.`)).toBeDefined()
        })
      })
      describe('Type - Set Membership price', () => {
        beforeEach(async () => {
          await finishProposalType('setMembershipPrice')
          await finishStakingAccount()
          await finishProposalDetails()
          await finishTriggerAndDiscussion()
        })

        it('Default - Invalid', async () => {
          expect(await screen.getByTestId('amount-input')).toHaveValue('')
          expect(await getCreateButton()).toBeDisabled()
        })

        it('Valid', async () => {
          const price = 100
          await SpecificParameters.fillAmount(price)
          expect(await getCreateButton()).toBeEnabled()

          const [, txSpecificParameters] = last(createProposalTxMock.mock.calls)
          const parameters = txSpecificParameters.asSetMembershipPrice.toJSON()
          expect(parameters).toEqual(price)
        })
      })

      describe('Type - Update Working Group Budget', () => {
        beforeEach(async () => {
          stubQuery(api, 'council.budget', new BN(2500))
          await finishProposalType('updateWorkingGroupBudget')
          await finishStakingAccount()
          await finishProposalDetails()
          await finishTriggerAndDiscussion()
        })

        it('Default - no selected group, amount not filled', async () => {
          expect(await screen.findByLabelText('Working Group', { selector: 'input' })).toHaveValue('')

          expect(await getCreateButton()).toBeDisabled()
        })

        it('Invalid - group selected, positive amount bigger than current council budget', async () => {
          await SpecificParameters.UpdateWorkingGroupBudget.selectGroup('Forum')
          await waitFor(() => expect(screen.queryByText(/Current budget for Forum Working Group is /i)).not.toBeNull())
          await SpecificParameters.fillAmount(3000)

          expect(await getCreateButton()).toBeDisabled()
        })

        it('Valid - group selected, amount automatically filled', async () => {
          await SpecificParameters.UpdateWorkingGroupBudget.selectGroup('Forum')
          await waitFor(() => expect(screen.queryByText(/Current budget for Forum Working Group is /i)).not.toBeNull())
          screen.logTestingPlaygroundURL()
          expect(await getCreateButton()).not.toBeDisabled()
        })

        it('Valid - group selected, amount bigger than current stake filled', async () => {
          await SpecificParameters.UpdateWorkingGroupBudget.selectGroup('Forum')
          await waitFor(() => expect(screen.queryByText(/Current budget for Forum Working Group is /i)).not.toBeNull())
          await SpecificParameters.fillAmount(1000)

          expect(await getCreateButton()).toBeEnabled()
        })

        it('Invaild - group selected, negative amount bigger than current WG budget', async () => {
          await SpecificParameters.UpdateWorkingGroupBudget.selectGroup('Forum')
          await waitFor(() => expect(screen.queryByText(/Current budget for Forum Working Group is /i)).not.toBeNull())

          // Switch to 'Decrease budget', input will be handled as negative
          await triggerYes()
          await SpecificParameters.fillAmount(999999)

          expect(await getCreateButton()).toBeDisabled()
        })

        it('Valid - group selected, negative amount filled', async () => {
          const amount = 100
          const group = 'Forum'
          await SpecificParameters.UpdateWorkingGroupBudget.selectGroup('Forum')
          await waitFor(() => expect(screen.queryByText(/Current budget for Forum Working Group is /i)).not.toBeNull())

          // Switch to 'Decrease budget', input will be handled as negative
          await triggerYes()
          await SpecificParameters.fillAmount(amount)

          expect(await getCreateButton()).toBeEnabled()

          const [, txSpecificParameters] = last(createProposalTxMock.mock.calls)
          const parameters = txSpecificParameters.asUpdateWorkingGroupBudget.toJSON()
          expect(parameters).toEqual([amount, group, 'Negative'])
        })
      })
    })

    describe('Authorize', () => {
      it('Fee fail before transaction', async () => {
        await finishWarning()
        await finishProposalType('fundingRequest')
        const requiredStake = 10
        stubProposalConstants(api, { requiredStake })
        stubTransaction(api, 'api.tx.utility.batch', 10000)
        mockedTransactionFee.feeInfo = { transactionFee: new BN(10000), canAfford: false }

        await finishStakingAccount()
        await finishProposalDetails()
        await finishTriggerAndDiscussion()
        await SpecificParameters.FundingRequest.finish(100, 'bob')

        const moveFundsModalCall: MoveFundsModalCall = {
          modal: 'MoveFundsModal',
          data: {
            requiredStake: new BN(requiredStake),
            lock: 'Proposals',
            isFeeOriented: true,
          },
        }

        expect(showModal).toBeCalledWith({ ...moveFundsModalCall })
      })

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
          expect((await screen.findByText(/^modals.transactionFee.label/i))?.nextSibling?.textContent).toBe('42')
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
          expect((await screen.findByText(/^modals.transactionFee.label/i))?.nextSibling?.textContent).toBe('25')
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
            createType('PalletMembershipStakingAccountMemberBinding', {
              memberId: createType('MemberId', 0),
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
          expect((await screen.findByText(/^modals.transactionFee.label/i))?.nextSibling?.textContent).toBe('25')
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
            createType('PalletMembershipStakingAccountMemberBinding', {
              memberId: createType('MemberId', 0),
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
          expect((await screen.findByText(/^modals.transactionFee.label/i))?.nextSibling?.textContent).toBe('25')
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
          createType('PalletMembershipStakingAccountMemberBinding', {
            memberId: createType('MemberId', 0),
            confirmed: createType('bool', true),
          })
        )
        stubQuery(api, 'members.stakingAccountIdMemberStatus.size', createType('u64', 8))
        stubTransactionSuccess(createProposalTx, 'proposalsCodex', 'ProposalCreated', [createType('ProposalId', 1337)])
        await finishWarning()
        await finishProposalType('fundingRequest')
        await finishStakingAccount()
        await finishProposalDetails()
        await finishTriggerAndDiscussion(true)
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

  const getCheckbox = async () =>
    await screen.queryByText('I’m aware of the possible risks associated with creating a proposal.')

  async function finishWarning() {
    await renderModal()

    const button = await getWarningNextButton()

    const checkbox = await getCheckbox()
    fireEvent.click(checkbox as HTMLElement)
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

  async function finishTriggerAndDiscussion(closeDiscussion = false) {
    if (closeDiscussion) {
      await discussionClosed()
    }
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
    return await getButton('Create A Proposal')
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

  async function fillField(id: string, value: number | BN | string) {
    const amountInput = screen.getByTestId(id)
    act(() => {
      fireEvent.change(amountInput, { target: { value: String(value) } })
    })
  }

  const SpecificParameters = {
    fillAmount: async (value: number | BN) => await fillField('amount-input', String(value)),
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
        act(() => {
          fireEvent.click(button as HTMLElement)
        })
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
      fillTitle: async (value: string) => await fillField('opening-title', value),
      fillShortDescription: async (value: string) => await fillField('short-description', value),
      fillDescription: async (value: string) => await fillField('field-description', value),
      fillDuration: async (value: number | undefined) => {
        await toggleCheckBox(!!value)
        if (value) await fillField('field-period-length', value)
      },
      fillDetails: async (value: string) => await fillField('field-details', value),
      fillQuestionField: async (value: string, index: number) => {
        const field = (await screen.findAllByRole('textbox'))[index]
        act(() => {
          fireEvent.change(field, { target: { value } })
        })
      },
      fillQuestions: async (value: OpeningMetadata.IApplicationFormQuestion[]) => {
        const addQuestionBtn = await screen.findByText('Add new question')

        for (let index = 0; index < value.length; index++) {
          if (index > 0)
            act(() => {
              fireEvent.click(addQuestionBtn)
            })

          const question = value[index].question ?? ''
          await SpecificParameters.CreateWorkingGroupLeadOpening.fillQuestionField(question, index)

          await toggleCheckBox(value[index].type === QUESTION_INPUT.TEXT, index)
        }
      },
      fillUnstakingPeriod: async (value: number) => await fillField('leaving-unstaking-period', value),
      fillStakingAmount: async (value: number) => await fillField('staking-amount', value),
      fillRewardPerBlock: async (value: number) => await fillField('reward-per-block', value),
      flow: async (
        step1?: { group: string; title: string; description: string; shortDesc: string },
        step2?: { duration: number | undefined; details: string },
        step3?: { questions: OpeningMetadata.IApplicationFormQuestion[] },
        step4?: { stake: number; unstakingPeriod: number; rewardPerBlock: number }
      ) => {
        if (!step1) return
        await SpecificParameters.CreateWorkingGroupLeadOpening.selectGroup(step1.group)
        await SpecificParameters.CreateWorkingGroupLeadOpening.fillTitle(step1.title)
        await SpecificParameters.CreateWorkingGroupLeadOpening.fillDescription(step1.description)
        await SpecificParameters.CreateWorkingGroupLeadOpening.fillShortDescription(step1.shortDesc)
        await clickNextButton()

        if (!step2) return
        await SpecificParameters.CreateWorkingGroupLeadOpening.fillDuration(step2.duration)
        await SpecificParameters.CreateWorkingGroupLeadOpening.fillDetails(step2.details)
        await clickNextButton()

        if (!step3) return
        await SpecificParameters.CreateWorkingGroupLeadOpening.fillQuestions(step3.questions)
        await clickNextButton()

        if (!step4) return
        await SpecificParameters.CreateWorkingGroupLeadOpening.fillStakingAmount(step4.stake)
        await SpecificParameters.CreateWorkingGroupLeadOpening.fillUnstakingPeriod(step4.unstakingPeriod)
        await SpecificParameters.CreateWorkingGroupLeadOpening.fillRewardPerBlock(step4.rewardPerBlock)

        const createButton = await getCreateButton()
        await act(async () => {
          fireEvent.click(createButton as HTMLElement)
        })
      },
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
    UpdateWorkingGroupBudget: {
      selectGroup,
    },
    SetInitialInvitationCount: {
      fillCount: async (value: number) => await fillField('count-input', value),
    },
  }

  async function renderModal() {
    return await render(
      <MemoryRouter>
        <MockQueryNodeProviders>
          <MockKeyringProvider>
            <ApiContext.Provider value={api}>
              <MembershipContext.Provider value={useMyMemberships}>
                <ModalContextProvider>
                  <GlobalModals />
                </ModalContextProvider>
              </MembershipContext.Provider>
            </ApiContext.Provider>
          </MockKeyringProvider>
        </MockQueryNodeProviders>
      </MemoryRouter>
    )
  }
})
