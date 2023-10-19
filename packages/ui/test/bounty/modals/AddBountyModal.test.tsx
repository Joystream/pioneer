import { cryptoWaitReady } from '@polkadot/util-crypto'
import { configure, fireEvent, render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { interpret } from 'xstate'

import { ApiContext } from '@/api/providers/context'
import { GlobalModals } from '@/app/GlobalModals'
import { AddBountyModal } from '@/bounty/modals/AddBountyModal'
import { addBountyMachine } from '@/bounty/modals/AddBountyModal/machine'
import { CKEditorProps } from '@/common/components/CKEditor'
import { createType } from '@/common/model/createType'
import { getSteps } from '@/common/model/machines/getSteps'
import { ModalContextProvider } from '@/common/providers/modal/provider'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedForumCategories, seedMembers } from '@/mocks/data'

import { getButton } from '../../_helpers/getButton'
import { selectFromDropdown, selectFromDropdownWithId } from '../../_helpers/selectFromDropdown'
import { mockCKEditor } from '../../_mocks/components/CKEditor'
import { mockUseCurrentBlockNumber } from '../../_mocks/hooks/useCurrentBlockNumber'
import { alice, bob } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockApolloProvider, MockKeyringProvider } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import {
  stubAccounts,
  stubApi,
  stubBountyConstants,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'
import { mockUseModalCall } from '../../setup'

configure({ testIdAttribute: 'id' })

jest.mock('@/common/components/CKEditor', () => ({
  CKEditor: (props: CKEditorProps) => mockCKEditor(props),
}))

jest.mock('@/common/hooks/useCurrentBlockNumber', () => ({
  useCurrentBlockNumber: () => mockUseCurrentBlockNumber(),
}))

describe('UI: AddNewBountyModal', () => {
  const api = stubApi()
  const showModal = jest.fn()
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

  let createTransaction: any
  let forumThreadTransaction: any

  const server = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(async () => {
    await cryptoWaitReady()
    mockUseModalCall({ showModal })
    seedMembers(server.server, 2)
    seedForumCategories(server.server, [
      { parentId: null, status: { __typename: 'CategoryStatusActive' }, moderatorIds: [] },
    ])
    stubAccounts([alice, bob])
  })

  beforeEach(async () => {
    useMyMemberships.members = [getMember('alice'), getMember('bob')]
    useMyMemberships.setActive(getMember('alice'))

    stubDefaultBalances()
    stubBountyConstants(api)
    createTransaction = stubTransaction(api, 'api.tx.bounty.createBounty', 100)
    forumThreadTransaction = stubTransaction(api, 'api.tx.forum.createThread', 100)
  })

  describe('Requirements', () => {
    beforeEach(renderModal)

    it('No active member', async () => {
      useMyMemberships.active = undefined

      renderModal()

      expect(showModal).toBeCalledWith({
        modal: 'SwitchMember',
        data: {
          originalModalName: 'AddBounty',
        },
      })
    })
  })

  describe('Type - stepper modal', () => {
    beforeEach(renderModal)

    it('Render modal', async () => {
      expect(await screen.queryByText('Creating New Bounty')).toBeDefined()
    })

    it('Steps', () => {
      const service = interpret(addBountyMachine)
      service.start()

      expect(getSteps(service)).toEqual([
        {
          title: 'General Parameters',
          type: 'next',
        },
        {
          title: 'Funding Period Details',
          type: 'next',
        },
        {
          title: 'Working Period Details',
          type: 'next',
        },
        {
          title: 'Judging Period Details',
          type: 'next',
        },
      ])
    })
  })

  describe('Details', () => {
    describe('General Parameters', () => {
      it('Renders', async () => {
        renderModal()

        expect(await screen.queryByText('General parameters')).toBeDefined()
        expect(await getNextButton()).toBeDisabled()
      })

      it('Validates', async () => {
        renderModal()

        await fillGeneralParameters(false)

        const nextButton = await getNextButton()
        await waitFor(() => expect(nextButton).not.toBeDisabled())
      })
    })

    describe('Funding Details', () => {
      beforeEach(async () => {
        renderModal()
        await fillGeneralParameters()
      })

      it('Renders', async () => {
        expect(await screen.queryByText('Funding period details')).toBeDefined()
        expect(await getNextButton()).toBeDisabled()
      })

      describe('Valid form', () => {
        it('Type: Limited ', async () => {
          await fillFundingPeriod(false)

          expect(await getNextButton()).not.toBeDisabled()
        })

        it('Type: Perpetual', async () => {
          await fillFundingPeriod(false)
          await triggerSwitch('Perpetual')

          expect(await getNextButton()).not.toBeDisabled()
        })
      })

      describe('Invalid form', () => {
        it('Cherry too low', async () => {
          await fillFundingPeriod(false)
          await fillField('field-cherry', 5)

          expect(await getNextButton()).toBeDisabled()
        })

        it('Cherry exceeds balance', async () => {
          await fillFundingPeriod(false)
          await fillField('field-cherry', 3000)

          expect(await getNextButton()).toBeDisabled()
        })

        it('Min range bigger than max range', async () => {
          await fillFundingPeriod(false)
          await fillField('field-minRange', 102)

          expect(await getNextButton()).toBeDisabled()
        })

        // it('Min funding ???')
      })
    })

    describe('Working Details', () => {
      beforeEach(async () => {
        renderModal()
        await fillGeneralParameters()
        await fillFundingPeriod()
      })

      it('Renders', async () => {
        expect(await screen.queryAllByText('Cherry')).toBeDefined()
        expect(await getNextButton()).toBeDisabled()
      })

      describe('Valid from', () => {
        it('Closed with stake', async () => {
          await fillWorkingPeriod(false)

          expect(await getNextButton()).not.toBeDisabled()
        })
      })

      describe('Invalid form', () => {
        it('Stake too low', async () => {
          await fillWorkingPeriod(false)
          await fillField('field-periodStake', 5)

          expect(await getNextButton()).toBeDisabled()
        })
      })
    })

    describe('Judgment Details', () => {
      beforeEach(async () => {
        renderModal()
        await fillGeneralParameters()
        await fillFundingPeriod()
        await fillWorkingPeriod()
      })

      it('Renders', async () => {
        expect(await screen.findByText('Oracle')).toBeInTheDocument()
        expect(await getCreateButton()).toBeDisabled()
      })

      it('Valid form', async () => {
        await fillJudgingPeriod(false)

        expect(await getCreateButton()).not.toBeDisabled()
      })

      describe('Invalid form', () => {
        it('No oracle', async () => {
          await fillField('field-periodLength', 100)

          expect(await getCreateButton()).toBeDisabled()
        })

        it('No period length', async () => {
          await selectFromDropdown('Oracle', 'bob')

          expect(await getCreateButton()).toBeDisabled()
        })
      })
    })

    describe('Forum Thread Transaction', () => {
      beforeEach(async () => {
        renderModal()
        await fillGeneralParameters()
        await fillFundingPeriod()
        await fillWorkingPeriod()
        await fillJudgingPeriod()
      })

      it('Renders', async () => {
        const signButton = await getThreadTxButton()
        expect(signButton).not.toBeDisabled()
      })

      it('Failure', async () => {
        stubTransactionFailure(forumThreadTransaction)
        const button = await getThreadTxButton()
        fireEvent.click(button)

        expect(await screen.findByText(/^Failure$/i)).toBeDefined()
      })

      it('Success', async () => {
        stubTransactionSuccess(forumThreadTransaction, 'forum', 'ThreadCreated', [
          createType('CategoryId', 0),
          createType('ThreadId', 1337),
        ])
        const button = await getThreadTxButton()
        fireEvent.click(button)

        expect(await screen.findByText(/^Sign transaction and Create$/i)).toBeDefined()
      })
    })

    describe('Transaction', () => {
      beforeEach(async () => {
        renderModal()
        await fillGeneralParameters()
        await fillFundingPeriod()
        await fillWorkingPeriod()
        await fillJudgingPeriod()
        await fillForumThreadTransaction()
      })

      it('Renders', async () => {
        const signButton = await getButton(/^Sign transaction and Create$/i)
        expect(signButton).not.toBeDisabled()
      })

      it('Failure', async () => {
        stubTransactionFailure(createTransaction)
        const button = await getButton(/^Sign transaction and Create$/i)
        fireEvent.click(button)

        expect(await screen.findByText(/^Failure$/i)).toBeDefined()
      })

      it('Success', async () => {
        stubTransactionSuccess(createTransaction, 'bounty', 'BountyCreated')
        const button = await getButton(/^Sign transaction and Create$/i)
        fireEvent.click(button)

        expect(await screen.findByText(/^Success$/i)).toBeDefined()
      })
    })
  })

  const fillGeneralParameters = async (proceedToNextStep = true) => {
    await fillField('field-title', 'Title')
    await fillField('field-photo', 'https://photo.com')
    await fillField('field-description', 'Description')

    if (proceedToNextStep) {
      await goToNext()

      await waitFor(async () => expect(await screen.queryByText('Cherry')).toBeDefined())
    }
  }

  const fillFundingPeriod = async (proceedToNextStep = true) => {
    await fillField('field-cherry', 100)
    await triggerSwitch('Limited')
    await fillField('field-periodLength', 100)
    await fillField('field-minRange', 100)
    await fillField('field-maxRange', 101)

    if (proceedToNextStep) {
      await goToNext()

      await waitFor(async () => expect(await screen.queryByText('Stake')).toBeDefined())
    }
  }

  const fillWorkingPeriod = async (proceedToNextStep = true) => {
    await triggerSwitch(/^closed$/i)
    await waitFor(async () => expect(await screen.queryByText('Whitelist')))
    await selectFromDropdownWithId('select-whitelist', 'bob')
    await fillField('field-periodLength', 100)
    await fillField('field-periodStake', 100)

    if (proceedToNextStep) {
      await goToNext()

      await waitFor(async () => expect(await screen.queryByText('Oracle')).toBeDefined())
    }
  }

  const fillJudgingPeriod = async (proceedToNextStep = true) => {
    await fillField('field-periodLength', 100)
    await selectFromDropdown('Oracle', 'bob')

    if (proceedToNextStep) {
      await createBounty()

      await waitFor(async () => expect(await screen.queryByText(/^Create Forum Thread$/i)).toBeDefined())
    }
  }

  const fillForumThreadTransaction = async () => {
    const button = await getThreadTxButton()
    stubTransactionSuccess(forumThreadTransaction, 'forum', 'ThreadCreated', [
      createType('CategoryId', 0),
      createType('ThreadId', 1337),
    ])
    fireEvent.click(button)
  }

  async function fillField(id: string, value: number | string) {
    const amountInput = await screen.getByTestId(id)
    fireEvent.change(amountInput, { target: { value } })
  }

  const triggerSwitch = async (label: string | RegExp) => {
    const labelElement = await screen.findByText(label)
    fireEvent.click(labelElement)
  }

  const getNextButton = async () => getButton(/next step/i)

  const goToNext = async () => {
    const nextButton = await getNextButton()

    await waitFor(() => expect(nextButton).not.toBeDisabled())
    fireEvent.click(nextButton)
  }

  const getThreadTxButton = async () => getButton(/^Create Forum Thread$/i)
  const getCreateButton = async () => getButton(/create bounty/i)

  const createBounty = async () => {
    const createButton = await getCreateButton()

    fireEvent.click(createButton)
  }

  function renderModal() {
    return render(
      <MemoryRouter>
        <ModalContextProvider>
          <MockKeyringProvider>
            <ApiContext.Provider value={api}>
              <MembershipContext.Provider value={useMyMemberships}>
                <MockApolloProvider>
                  <GlobalModals />
                  <AddBountyModal />
                </MockApolloProvider>
              </MembershipContext.Provider>
            </ApiContext.Provider>
          </MockKeyringProvider>
        </ModalContextProvider>
      </MemoryRouter>
    )
  }
})
