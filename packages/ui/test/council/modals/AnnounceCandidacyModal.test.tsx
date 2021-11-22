import { createType } from '@joystream/types'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, configure, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router'
import { interpret } from 'xstate'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { BalancesContextProvider } from '@/accounts/providers/balances/provider'
import { CKEditorProps } from '@/common/components/CKEditor'
import { getSteps } from '@/common/model/machines/getSteps'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import { ElectionRoutes } from '@/council/constants'
import { AnnounceCandidacyModal } from '@/council/modals/AnnounceCandidacy'
import { announceCandidacyMachine } from '@/council/modals/AnnounceCandidacy/machine'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { RawCouncilElectionMock, seedCouncilCandidate, seedCouncilElection, seedMembers } from '@/mocks/data'

import { getButton } from '../../_helpers/getButton'
import { includesTextWithMarkup } from '../../_helpers/includesTextWithMarkup'
import { selectFromDropdown } from '../../_helpers/selectFromDropdown'
import { mockCKEditor } from '../../_mocks/components/CKEditor'
import { CANDIDATE_DATA } from '../../_mocks/council'
import { alice, bob } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import {
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

describe('UI: Announce Candidacy Modal', () => {
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
  let announceCandidacyTx: any
  let bindAccountTx: any
  let candidacyNoteTx: any

  const server = setupMockServer({ noCleanupAfterEach: true })

  beforeAll(async () => {
    await cryptoWaitReady()
    seedMembers(server.server)

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
    stubCouncilConstants(api)
    stubTransaction(api, 'api.tx.members.confirmStakingAccount', 5)
    bindAccountTx = stubTransaction(api, 'api.tx.members.addStakingAccountCandidate', 10)
    announceCandidacyTx = stubTransaction(api, 'api.tx.council.announceCandidacy', 20)
    candidacyNoteTx = stubTransaction(api, 'api.tx.council.setCandidacyNote', 30)
    batchTx = stubTransaction(api, 'api.tx.utility.batch')
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

      expect(useModal.showModal).toBeCalledWith({ modal: 'SwitchMember' })
    })

    it('Transaction fee', async () => {
      stubTransaction(api, 'api.tx.utility.batch', 10000)

      const { queryByText } = renderModal()

      expect(queryByText('Insufficient Funds')).not.toBeNull()
    })

    it('Required stake', async () => {
      stubCouncilConstants(api, { minStake: 9999 })

      const { queryByText } = renderModal()

      expect(queryByText(/^announce candidacy/i)).toBeNull()
    })

    it('All passed', async () => {
      const { queryByText } = renderModal()

      expect(queryByText(/^announce candidacy/i)).not.toBeNull()
    })
  })

  describe('Stepper modal', () => {
    it('Renders a modal', async () => {
      const { queryByText } = renderModal()

      expect(queryByText(/^announce candidacy/i)).not.toBeNull()
    })

    it('Steps', () => {
      const service = interpret(announceCandidacyMachine)
      service.start()

      expect(getSteps(service)).toEqual([
        { title: 'Staking', type: 'next' },
        { title: 'Reward account', type: 'next' },
        { title: 'Candidate profile', type: 'next' },
        { title: 'Title & Bullet points', type: 'next', isBaby: true },
        { title: 'Summary & Banner', type: 'next', isBaby: true },
      ])
    })

    describe('Staking', () => {
      it('Default', async () => {
        const { getByText } = renderModal()

        expect(await getNextStepButton()).toBeDisabled()
        expect(includesTextWithMarkup(getByText, 'You must stake 10 to announce candidacy')).toBeInTheDocument()
      })

      describe('Staking amount', () => {
        it('Lower than minimal stake', async () => {
          const { getByText } = renderModal()

          await fillStakingAmount(2)

          expect(await getNextStepButton()).toBeDisabled()
          expect(includesTextWithMarkup(getByText, 'Minimum stake amount is 10 JOY')).toBeInTheDocument()
        })

        it('Higher than maximal balance', async () => {
          const { getByText } = renderModal()

          await fillStakingAmount(10000)

          expect(await getNextStepButton()).toBeDisabled()
          expect(
            includesTextWithMarkup(getByText, 'You have no 10,000 JOY on any of your accounts.')
          ).toBeInTheDocument()
        })
      })

      it('Valid', async () => {
        renderModal()

        await fillStakingStep('alice', 15)

        expect(await getNextStepButton()).not.toBeDisabled()
      })
    })

    describe('Reward account', () => {
      beforeEach(async () => {
        renderModal()
        await fillStakingStep('alice', 15, true)
      })

      it('Not selected', async () => {
        expect(await getNextStepButton()).toBeDisabled()
      })

      it('Selected', async () => {
        await fillRewardAccountStep('alice')

        expect(await getNextStepButton()).not.toBeDisabled()
      })
    })

    describe('Title and Bullet Points', () => {
      beforeEach(async () => {
        renderModal()
        await fillStakingStep('alice', 15, true)
        await fillRewardAccountStep('alice', true)
      })

      it('Default', async () => {
        expect(await getNextStepButton()).toBeDisabled()
      })

      it('Long title', async () => {
        await fillTitle(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
        )

        expect(screen.queryByText(/^maximum length is \d+ symbols/i)).not.toBeNull()
        expect(await getNextStepButton()).toBeDisabled()
      })

      it('Long bullet point', async () => {
        await fillBulletPoint(
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua!Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
        )
        expect(screen.queryByText(/^maximum length is \d+ symbols/i)).not.toBeNull()
        expect(await getNextStepButton()).toBeDisabled()
      })

      it('Valid', async () => {
        await fillTitleAndBulletPointsStep('Some title', 'Some bullet point')

        expect(await getNextStepButton()).not.toBeDisabled()
      })
    })

    describe('Summary and Banner', () => {
      beforeEach(async () => {
        renderModal()
        await fillStakingStep('alice', 15, true)
        await fillRewardAccountStep('alice', true)
        await fillTitleAndBulletPointsStep('Some title', 'Some bullet point', true)
      })

      it('Default', async () => {
        expect(await getButton(/Preview thumbnail/i)).toBeDisabled()
        expect(await getButton(/Preview profile/i)).toBeDisabled()
        expect(await getNextStepButton()).toBeDisabled()
      })

      it('Summary filled', async () => {
        await fillSummary()

        expect(await getNextStepButton()).not.toBeDisabled()
        expect(await getButton(/Preview thumbnail/i)).not.toBeDisabled()
        expect(await getButton(/Preview profile/i)).not.toBeDisabled()
      })

      it('Thumbnail preview', async () => {
        await fillSummary()

        const button = await getButton(/Preview thumbnail/i)
        expect(button).not.toBeDisabled()

        act(() => {
          fireEvent.click(button as HTMLElement)
        })

        expect(screen.queryByText(/Candidacy Thumbnail Preview/i)).not.toBeNull()
      })

      it('Profile preview', async () => {
        await fillSummary()

        const button = await getButton(/Preview profile/i)
        expect(button).not.toBeDisabled()

        act(() => {
          fireEvent.click(button as HTMLElement)
        })

        expect(screen.queryByText(/Candidacy Profile Preview/i)).not.toBeNull()
      })
    })
  })

  describe('Transaction', () => {
    describe('Bind account step', () => {
      describe('Staking account not bound nor staking candidate', () => {
        beforeEach(async () => {
          renderModal()
          await fillStakingStep('alice', 15, true)
          await fillRewardAccountStep('alice', true)
          await fillTitleAndBulletPointsStep('Some title', 'Some bullet point', true)
          await fillSummary(true)
        })

        it('Renders', async () => {
          expect(screen.queryByText('You intend to bind account for staking')).not.toBeNull()
          expect((await screen.findByText(/^Transaction fee:/i))?.nextSibling?.textContent).toBe('10')
        })

        it('Success', async () => {
          stubTransactionSuccess(bindAccountTx, 'members', 'StakingAccountAdded')

          await act(async () => {
            fireEvent.click(await getButton(/^Sign transaction/i))
          })

          expect(screen.queryByText(/You intend to announce candidacy/i)).not.toBeNull()
          expect((await screen.findByText(/^Transaction fee:/i))?.nextSibling?.textContent).toBe('25')
        })

        it('Failure', async () => {
          stubTransactionFailure(bindAccountTx)

          await act(async () => {
            fireEvent.click(await getButton(/^Sign transaction/i))
          })

          expect(screen.queryByText('Failure')).not.toBeNull()
        })
      })

      it('Staking account is a candidate', async () => {
        stubQuery(
          api,
          'members.stakingAccountIdMemberStatus',
          createType('StakingAccountMemberBinding', {
            member_id: createType('MemberId', 0),
            confirmed: createType('bool', false),
          })
        )
        stubQuery(api, 'members.stakingAccountIdMemberStatus.size', createType('u64', 8))

        renderModal()
        await fillStakingStep('alice', 15, true)
        await fillRewardAccountStep('alice', true)
        await fillTitleAndBulletPointsStep('Some title', 'Some bullet point', true)
        await fillSummary(true)

        expect(screen.queryByText(/You intend to announce candidacy/i)).not.toBeNull()
        expect((await screen.findByText(/^Transaction fee:/i))?.nextSibling?.textContent).toBe('25')
      })

      it('Staking account is confirmed', async () => {
        stubQuery(
          api,
          'members.stakingAccountIdMemberStatus',
          createType('StakingAccountMemberBinding', {
            member_id: createType('MemberId', 0),
            confirmed: createType('bool', true),
          })
        )
        stubQuery(api, 'members.stakingAccountIdMemberStatus.size', createType('u64', 8))

        renderModal()
        await fillStakingStep('alice', 15, true)
        await fillRewardAccountStep('alice', true)
        await fillTitleAndBulletPointsStep('Some title', 'Some bullet point', true)
        await fillSummary(true)

        expect(screen.queryByText(/You intend to announce candidacy/i)).not.toBeNull()
        expect((await screen.findByText(/^Transaction fee:/i))?.nextSibling?.textContent).toBe('20')
      })
    })

    describe('Announce candidacy step', () => {
      async function beforeEach(confirmed: boolean) {
        stubQuery(
          api,
          'members.stakingAccountIdMemberStatus',
          createType('StakingAccountMemberBinding', {
            member_id: createType('MemberId', 0),
            confirmed: createType('bool', confirmed),
          })
        )
        stubQuery(api, 'members.stakingAccountIdMemberStatus.size', createType('u64', 8))

        renderModal()
        await fillStakingStep('alice', 15, true)
        await fillRewardAccountStep('alice', true)
        await fillTitleAndBulletPointsStep('Some title', 'Some bullet point', true)
        await fillSummary(true)
      }

      it('Success: Staking account confirmed', async () => {
        await beforeEach(true)

        stubTransactionSuccess(announceCandidacyTx, 'council', 'NewCandidate')

        await act(async () => {
          fireEvent.click(await getButton(/^Sign transaction/i))
        })

        expect(screen.queryByText(/You intend to set candidacy note/i)).not.toBeNull()
      })

      it('Success: Staking account not confirmed', async () => {
        await beforeEach(false)
        stubTransactionSuccess(batchTx, 'council', 'NewCandidate')

        await act(async () => {
          fireEvent.click(await getButton(/^Sign transaction/i))
        })

        expect(screen.queryByText(/You intend to set candidacy note/i)).not.toBeNull()
      })

      it('Failure', async () => {
        await beforeEach(true)
        stubTransactionFailure(announceCandidacyTx)

        await act(async () => {
          fireEvent.click(await getButton(/^Sign transaction/i))
        })

        expect(await screen.findByText('Failure')).toBeDefined()
      })
    })

    describe('Candidacy note step', () => {
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

        renderModal()
        await fillStakingStep('alice', 15, true)
        await fillRewardAccountStep('alice', true)
        await fillTitleAndBulletPointsStep('Some title', 'Some bullet point', true)
        await fillSummary(true)

        stubTransactionSuccess(batchTx, 'council', 'NewCandidate')
        await act(async () => {
          fireEvent.click(await getButton(/^Sign transaction/i))
        })
      })

      it('Success', async () => {
        stubTransactionSuccess(candidacyNoteTx, 'council', 'CandidacyNoteSet')

        await act(async () => {
          fireEvent.click(await getButton(/^Sign transaction/i))
        })

        expect(screen.queryByText(/^Success/i)).not.toBeNull()
      })

      it('Failure', async () => {
        stubTransactionFailure(candidacyNoteTx)

        await act(async () => {
          fireEvent.click(await getButton(/^Sign transaction/i))
        })

        expect(await screen.findByText('Failure')).toBeDefined()
      })
    })
  })

  it('See my Announcement button', async () => {
    stubTransactionSuccess(candidacyNoteTx, 'council', 'CandidacyNoteSet')
    seedCouncilElection(
      {
        id: '0',
        isFinished: false,
        cycleId: 0,
      } as RawCouncilElectionMock,
      server.server
    )
    seedCouncilCandidate(CANDIDATE_DATA, server.server)

    const history = createMemoryHistory()

    stubQuery(
      api,
      'members.stakingAccountIdMemberStatus',
      createType('StakingAccountMemberBinding', {
        member_id: createType('MemberId', 0),
        confirmed: createType('bool', false),
      })
    )
    stubQuery(api, 'members.stakingAccountIdMemberStatus.size', createType('u64', 8))

    renderModal(history)
    await fillStakingStep('alice', 15, true)
    await fillRewardAccountStep('alice', true)
    await fillTitleAndBulletPointsStep('Some title', 'Some bullet point', true)
    await fillSummary(true)

    stubTransactionSuccess(batchTx, 'council', 'NewCandidate')
    await act(async () => {
      fireEvent.click(await getButton(/^Sign transaction/i))
    })

    stubTransactionSuccess(candidacyNoteTx, 'council', 'CandidacyNoteSet')
    await act(async () => {
      fireEvent.click(await getButton(/^Sign transaction/i))
    })

    expect(screen.queryByText(/^Success/i)).not.toBeNull()
    await waitFor(async () => expect(await getButton(/^See my announcement/i)).not.toBeDisabled())
    await act(async () => {
      fireEvent.click(await getButton(/^See my announcement/i))
    })

    const lastPage = history.entries.pop()
    expect(lastPage?.pathname).toEqual(ElectionRoutes.currentElection)
    expect(lastPage?.search).toEqual('?candidate=0')
  })

  async function fillStakingAmount(value: number) {
    const amountInput = await screen.getByTestId('amount-input')

    act(() => {
      fireEvent.change(amountInput, { target: { value } })
    })
  }

  async function fillStakingStep(stakingAccount: string, stakingAmount: number, goNext?: boolean) {
    await selectFromDropdown('Select account for Staking', stakingAccount)
    await fillStakingAmount(stakingAmount)

    if (goNext) {
      await clickNextButton()
    }
  }

  async function fillRewardAccountStep(rewardAccount: string, goNext?: boolean) {
    await selectFromDropdown(
      'Select account receiving councilor rewards in case your candidacy is elected',
      rewardAccount
    )

    if (goNext) {
      await clickNextButton()
    }
  }

  async function fillTitle(value: string) {
    const titleInput = await screen.getByTestId('title')

    act(() => {
      fireEvent.change(titleInput, { target: { value } })
    })
  }

  async function fillBulletPoint(value: string) {
    const bulletPointInput = await screen.getByTestId('bulletPoint1')

    act(() => {
      fireEvent.change(bulletPointInput, { target: { value } })
    })
  }

  async function fillTitleAndBulletPointsStep(title: string, bulletPoint: string, goNext?: boolean) {
    await fillTitle(title)
    await fillBulletPoint(bulletPoint)

    if (goNext) {
      await clickNextButton()
    }
  }

  async function fillSummary(goNext?: boolean) {
    const summaryInput = await screen.findByLabelText(/Summary/i)

    act(() => {
      fireEvent.change(summaryInput, { target: { value: 'Some summary' } })
    })

    if (goNext) {
      await clickNextButton()
    }
  }

  async function getNextStepButton() {
    return getButton(/(Next step|Announce candidacy)/i)
  }

  async function clickNextButton() {
    const button = await getNextStepButton()

    act(() => {
      fireEvent.click(button as HTMLElement)
    })
  }

  function renderModal(initialHistory?: MemoryHistory) {
    const history = initialHistory ?? createMemoryHistory()
    return render(
      <Router history={history}>
        <ModalContext.Provider value={useModal}>
          <MockQueryNodeProviders>
            <MockKeyringProvider>
              <AccountsContext.Provider value={useAccounts}>
                <ApiContext.Provider value={api}>
                  <BalancesContextProvider>
                    <MembershipContext.Provider value={useMyMemberships}>
                      <AnnounceCandidacyModal />
                    </MembershipContext.Provider>
                  </BalancesContextProvider>
                </ApiContext.Provider>
              </AccountsContext.Provider>
            </MockKeyringProvider>
          </MockQueryNodeProviders>
        </ModalContext.Provider>
      </Router>
    )
  }
})
