import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { interpret } from 'xstate'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { CKEditorProps } from '@/common/components/CKEditor'
import { getSteps } from '@/common/model/machines/getSteps'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers } from '@/mocks/data'
import { AddNewProposalModal } from '@/proposals/modals/AddNewProposal'
import { addNewProposalMachine } from '@/proposals/modals/AddNewProposal/machine'

import { selectAccount } from '../../_helpers/selectAccount'
import { mockCKEditor } from '../../_mocks/components/CKEditor'
import { alice, bob } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { stubApi, stubDefaultBalances, stubProposalConstants, stubTransaction } from '../../_mocks/transactions'

jest.mock('@/common/components/CKEditor', () => ({
  CKEditor: (props: CKEditorProps) => mockCKEditor(props),
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

  const server = setupMockServer()

  beforeAll(async () => {
    await cryptoWaitReady()
    jest.spyOn(console, 'log').mockImplementation()

    useAccounts = {
      hasAccounts: true,
      allAccounts: [alice, bob],
    }
  })

  beforeEach(async () => {
    seedMembers(server.server)

    useMyMemberships.setActive(getMember('alice'))

    stubDefaultBalances(api)
    stubProposalConstants(api)
    stubTransaction(api, 'api.tx.proposalsCodex.createProposal', 25)
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

  beforeEach(async () => {
    await renderModal()
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
        const type = (await screen.findByText('Signal')).parentElement?.parentElement as HTMLElement
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
        expect(screen.queryByText('Creating new proposal')).toBeDefined()
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
    })
  })

  async function finishWarning() {
    const button = await getWarningNextButton()

    const checkbox = await screen.findByRole('checkbox')
    await fireEvent.click(checkbox)
    await fireEvent.click(button as HTMLElement)
  }

  async function finishProposalType() {
    const type = (await screen.findByText('Signal')).parentElement?.parentElement as HTMLElement
    await fireEvent.click(type)

    await clickNextButton()
  }

  async function finishStakingAccount() {
    await selectAccount('Select account for Staking', 'alice')

    await clickNextButton()
  }

  async function fillProposalDetails() {
    const titleInput = await screen.findByLabelText(/Proposal title/i)
    await fireEvent.change(titleInput, { target: { value: 'Some title' } })

    const rationaleInput = await screen.findByLabelText(/Rationale/i)
    await fireEvent.change(rationaleInput, { target: { value: 'Some rationale' } })
  }

  async function getWarningNextButton() {
    return (await screen.findByText('I want to create a proposal anyway')).parentElement
  }

  async function getNextStepButton() {
    return await screen.findByRole('button', { name: /Next step/i })
  }

  async function clickNextButton() {
    const button = await getNextStepButton()
    await fireEvent.click(button as HTMLElement)
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
