import { createType } from '@joystream/types'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { interpret } from 'xstate'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { getSteps } from '@/common/model/machines/getSteps'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import { AnnounceCandidateModal } from '@/council/modals/AnnounceCandidate'
import { announceCandidateMachine } from '@/council/modals/AnnounceCandidate/machine'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedMembers } from '@/mocks/data'

import { getButton } from '../../_helpers/getButton'
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
} from '../../_mocks/transactions'

describe('UI: Announce Candidate Modal', () => {
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
  let announceCandidateTx: any
  let batchTx: any
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
    stubCouncilConstants(api)
    announceCandidateTx = stubTransaction(api, 'api.tx.council.announceCandidacy', 25)
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
    batchTx = stubTransaction(api, 'api.tx.utility.batch')
    bindAccountTx = stubTransaction(api, 'api.tx.members.addStakingAccountCandidate', 42)
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

      expect(queryByText(/announce candidate/i)).toBeNull()
    })

    it('All passed', async () => {
      const { queryByText } = renderModal()

      expect(queryByText(/announce candidate/i)).not.toBeNull()
    })
  })

  describe('Stepper modal', () => {
    it('Renders a modal', async () => {
      const { queryByText } = renderModal()

      expect(queryByText(/announce candidate/i)).not.toBeNull()
    })

    it('Steps', () => {
      const service = interpret(announceCandidateMachine)
      service.start()

      expect(getSteps(service)).toEqual([
        { title: 'Staking', type: 'next' },
        { title: 'Reward account', type: 'next' },
        { title: 'Candidate profile', type: 'next' },
        { title: 'Title & Description', type: 'next', isBaby: true },
        { title: 'Summary & Banner', type: 'next', isBaby: true },
      ])
    })
  })

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
                    <AnnounceCandidateModal />
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
