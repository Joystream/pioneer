import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { UseAccounts } from '@/accounts/providers/accounts/provider'
import { ApiContext } from '@/common/providers/api/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { seedWorkingGroups } from '@/mocks/data/mockWorkingGroups'

import { MembershipContext } from '../../../src/memberships/providers/membership/context'
import { seedMembers } from '../../../src/mocks/data'
import { WithdrawApplicationModal } from '../../../src/working-groups/modals/WithdrawApplicationModal/WithdrawApplicationModal'
import { WorkingGroupApplication } from '../../../src/working-groups/types/WorkingGroupApplication'
import { alice, bob } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import {
  stubApi,
  stubDefaultBalances,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'

const APPLICATION: WorkingGroupApplication = {
  id: '1',
  opening: {
    type: 'LEADER',
    groupName: 'storage',
    reward: new BN('100'),
  },
  roleAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  stakingAccount: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
  createdAtBlock: {
    id: '1',
    number: 1,
    network: 'BABYLON',
    timestamp: '2021-03-09T23:38:04.155Z',
  },
}

describe('UI: WithdrawApplication modal', () => {
  const api = stubApi()

  const useMyMemberships: MyMemberships = {
    active: undefined,
    members: [],
    setActive: (member) => (useMyMemberships.active = member),
    isLoading: false,
  }

  let useAccounts: UseAccounts
  let tx: any

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
    seedWorkingGroups(server.server)

    useMyMemberships.setActive(getMember('alice'))

    stubDefaultBalances(api)
    tx = stubTransaction(api, 'api.tx.storageWorkingGroup.withdrawApplication')
  })

  it('Renders a modal', async () => {
    renderModal()

    expect(await screen.findByText(/withdraw application for/i)).toBeDefined()
  })

  it('With known role account', async () => {
    renderModal()
    expect(await screen.findByText('alice')).toBeDefined()
    expect(await screen.findByText('5GrwvaEF5...NoHGKutQY')).toBeDefined()
    expect(await screen.getByRole('button', { name: /sign and withdraw application/i })).not.toBeDisabled()
  })

  it('With unknown role account', async () => {
    renderModal({ ...APPLICATION, roleAccount: '5arwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY' })
    expect(
      await screen.findByText("Application withdrawal can only be signed with the application's role account")
    ).toBeDefined()
    expect(await screen.getByRole('button', { name: /sign and withdraw application/i })).toBeDisabled()
  })

  describe('Authorize', () => {
    it('Success step', async () => {
      renderModal()
      stubTransactionSuccess(tx, [APPLICATION.id], 'workingGroup', 'ApplicationWithdrawn')

      await fireEvent.click(await screen.getByRole('button', { name: /sign and withdraw application/i }))

      expect(await screen.findByText(/application withdrawn/i)).toBeDefined()
    })

    it('Failure step', async () => {
      renderModal()
      stubTransactionFailure(tx)

      await fireEvent.click(await screen.getByText(/sign and withdraw application/i))

      expect(await screen.findByText('Failure')).toBeDefined()
    })
  })

  function renderModal(application = APPLICATION) {
    return render(
      <BrowserRouter>
        <MockQueryNodeProviders>
          <MockKeyringProvider>
            <AccountsContext.Provider value={useAccounts}>
              <MembershipContext.Provider value={useMyMemberships}>
                <ApiContext.Provider value={api}>
                  <WithdrawApplicationModal application={application} onClose={() => null} />
                </ApiContext.Provider>
              </MembershipContext.Provider>
            </AccountsContext.Provider>
          </MockKeyringProvider>
        </MockQueryNodeProviders>
      </BrowserRouter>
    )
  }
})
