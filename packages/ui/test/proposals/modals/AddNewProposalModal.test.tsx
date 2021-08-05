import { registry } from '@joystream/types'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { configure, fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { interpret } from 'xstate'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
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
import { selectAccount } from '../../_helpers/selectAccount'
import { selectMember } from '../../_helpers/selectMember'
import { mockCKEditor } from '../../_mocks/components/CKEditor'
import { mockUseCurrentBlockNumber } from '../../_mocks/hooks/useCurrentBlockNumber'
import { alice, bob } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import {
  stubApi,
  stubDefaultBalances,
  stubProposalConstants,
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
  }

  let useAccounts: UseAccounts
  let tx: any
  let bindAccountTx: any

  const server = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(async () => {
    await cryptoWaitReady()
    seedMembers(server.server)

    useAccounts = {
      hasAccounts: true,
      allAccounts: [alice, bob],
    }
  })

  beforeEach(async () => {
    useMyMemberships.members = [getMember('alice'), getMember('bob')]
    useMyMemberships.setActive(getMember('alice'))

    stubDefaultBalances(api)
    stubProposalConstants(api)
    tx = stubTransaction(api, 'api.tx.proposalsCodex.createProposal', 25)
    bindAccountTx = stubTransaction(api, 'api.tx.members.addStakingAccountCandidate', 42)

    await renderModal()
  })

  describe('Requirements', () => {
    it('No active member', async () => {
      useMyMemberships.active = undefined

      renderModal()

      expect(useModal.showModal).toBeCalledWith({ modal: 'SwitchMember' })
    })

    it('Insufficient funds', async () => {
      stubTransaction(api, 'api.tx.proposalsCodex.createProposal', 10000)

      const { findByText } = renderModal()

      expect(await findByText('Insufficient Funds')).toBeDefined()
    })
  })

  describe('Warning modal', () => {
    it('Not checked', async () => {
      const button = await getWarningNextButton()

      expect(button).toBeDisabled()
    })

    it('Checked', async () => {
      const button = await getWarningNextButton()

      const checkbox = await screen.findByRole('checkbox')
      await fireEvent.click(checkbox)

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
        await fireEvent.click(type)

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
          await selectAccount('Select account for Staking', 'alice')

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
            await selectMember('Add member to whitelist', 'alice')

            expect(await screen.getByTestId('removeMember')).toBeDefined()

            const button = await getNextStepButton()
            expect(button).not.toBeDisabled()
          })

          it('Remove member from whitelist', async () => {
            await selectMember('Add member to whitelist', 'alice')

            expect(await screen.getByTestId('removeMember')).toBeDefined()

            await fireEvent.click(await screen.getByTestId('removeMember'))
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

      describe('Type - Decrease Working Group Lead Stake', () => {
        beforeAll(() => {
          seedWorkingGroups(server.server)
          seedOpeningStatuses(server.server)
          seedOpenings(server.server)
          seedUpcomingOpenings(server.server)
          seedApplications(server.server)
          seedWorkers(server.server)
          updateWorkingGroups(server.server)
        })

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
    })

    describe('Authorize', () => {
      beforeEach(async () => {
        await finishWarning()
        await finishProposalType('fundingRequest')
        await finishStakingAccount()
        await finishProposalDetails()
        await finishTriggerAndDiscussion()
        await SpecificParameters.FundingRequest.finish(100, 'bob')
      })

      describe('Staking account is not bound yet', () => {
        it('Bind account step', async () => {
          expect(await screen.findByText('You intend to bind account for staking')).toBeDefined()
          expect((await screen.findByText(/^Transaction fee:/i))?.nextSibling?.textContent).toBe('42')
        })

        it('Bind account failure', async () => {
          stubTransactionFailure(bindAccountTx)

          fireEvent.click(screen.getByText(/^Sign transaction/i))

          expect(await screen.findByText('Failure')).toBeDefined()
        })

        it('Create proposal step', async () => {
          stubTransactionSuccess(bindAccountTx, [], 'members', '')
          fireEvent.click(screen.getByText(/^Sign transaction/i))

          expect(screen.getByText(/You intend to create a proposa/i)).not.toBeNull()
          expect((await screen.findByText(/^Transaction fee:/i))?.nextSibling?.textContent).toBe('25')
        })

        it('Create proposal success', async () => {
          stubTransactionSuccess(bindAccountTx, [], 'members', '')
          fireEvent.click(screen.getByText(/^Sign transaction/i))
          stubTransactionSuccess(
            tx,
            ['EventParams', registry.createType('ProposalId', 1337)],
            'proposalsEngine',
            'ProposalCreated'
          )

          fireEvent.click(await screen.getByText(/^Sign transaction and Create$/i))

          expect(screen.queryByText('See my Proposal')).not.toBeNull()
        })

        it('Create proposal failure', async () => {
          stubTransactionSuccess(bindAccountTx, [], 'members', '')
          fireEvent.click(screen.getByText(/^Sign transaction/i))
          stubTransactionFailure(tx)

          fireEvent.click(await screen.getByText(/^Sign transaction and Create$/i))

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
  })

  async function finishWarning() {
    const button = await getWarningNextButton()

    const checkbox = await screen.findByRole('checkbox')
    await fireEvent.click(checkbox)
    await fireEvent.click(button as HTMLElement)
  }

  async function finishProposalType(type?: ProposalType) {
    const typeElement = (await screen.findByText(camelCaseToText(type || 'fundingRequest'))).parentElement
      ?.parentElement as HTMLElement
    await fireEvent.click(typeElement)

    await clickNextButton()
  }

  async function finishStakingAccount() {
    await selectAccount('Select account for Staking', 'alice')

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
    await fireEvent.change(titleInput, { target: { value: 'Some title' } })

    const rationaleInput = await screen.findByLabelText(/Rationale/i)
    await fireEvent.change(rationaleInput, { target: { value: 'Some rationale' } })
  }

  async function triggerYes() {
    const triggerToggle = await screen.findByText('Yes')
    await fireEvent.click(triggerToggle)
  }

  async function fillTriggerBlock(value: number) {
    const blockInput = await screen.getByTestId('triggerBlock')
    await fireEvent.change(blockInput, { target: { value } })
  }

  async function discussionClosed() {
    const discussionToggle = (await screen.findAllByRole('checkbox'))[1]
    await fireEvent.click(discussionToggle)
  }

  async function getWarningNextButton() {
    return (await screen.findByText('I want to create a proposal anyway')).parentElement
  }

  async function getPreviousStepButton() {
    return await getButton(/Previous step/i)
  }

  async function clickPreviousButton() {
    const button = await getPreviousStepButton()
    await fireEvent.click(button as HTMLElement)
  }

  async function getNextStepButton() {
    return getButton(/Next step/i)
  }

  async function getCreateButton() {
    return getButton(/Create proposal/i)
  }

  async function clickNextButton() {
    const button = await getNextStepButton()
    await fireEvent.click(button as HTMLElement)
  }

  const SpecificParameters = {
    fillAmount: async (value: number) => {
      const amountInput = await screen.getByTestId('amount-input')
      await fireEvent.change(amountInput, { target: { value } })
    },
    FundingRequest: {
      selectRecipient: async (name: string) => {
        await selectAccount('Recipient account', name)
      },
      finish: async (amount: number, recipient: string) => {
        await SpecificParameters.fillAmount(amount)
        await SpecificParameters.FundingRequest.selectRecipient(recipient)

        const button = await getCreateButton()
        await fireEvent.click(button as HTMLElement)
      },
    },
    DecreaseWorkingGroupLeadStake: {
      selectGroup: async (name: string) => {
        await selectAccount('Working Group', name)
      },
    },
  }

  function renderModal() {
    return render(
      <MemoryRouter>
        <ModalContext.Provider value={useModal}>
          <MockQueryNodeProviders>
            <MockKeyringProvider>
              <AccountsContext.Provider value={useAccounts}>
                <MembershipContext.Provider value={useMyMemberships}>
                  <ApiContext.Provider value={api}>
                    <AddNewProposalModal />
                  </ApiContext.Provider>
                </MembershipContext.Provider>
              </AccountsContext.Provider>
            </MockKeyringProvider>
          </MockQueryNodeProviders>
        </ModalContext.Provider>
      </MemoryRouter>
    )
  }
})
