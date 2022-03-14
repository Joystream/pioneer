import { BountyWorkData } from '@joystream/metadata-protobuf'
import { fireEvent, render, RenderResult, screen } from '@testing-library/react'
import BN from 'bn.js'
import React from 'react'

import { AccountsContext } from '@/accounts/providers/accounts/context'
import { BalancesContext } from '@/accounts/providers/balances/context'
import { SubmitWorkModal } from '@/bounty/modals/SubmitWorkModal'
import { BN_ZERO } from '@/common/constants'
import { metadataFromBytes } from '@/common/model/JoystreamNode/metadataFromBytes'
import { ApiContext } from '@/common/providers/api/context'
import { ModalContext } from '@/common/providers/modal/context'
import { UseModal } from '@/common/providers/modal/types'
import { last } from '@/common/utils'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { seedMembers } from '@/mocks/data'
import { getMember } from '@/mocks/helpers'

import { getButton } from '../../_helpers/getButton'
import { alice, bob } from '../../_mocks/keyring'
import { MockApolloProvider, MockKeyringProvider } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import {
  stubApi,
  stubBountyConstants,
  stubTransaction,
  stubTransactionFailure,
  stubTransactionSuccess,
} from '../../_mocks/transactions'

const defaultBalance = {
  total: BN_ZERO,
  locked: BN_ZERO,
  recoverable: BN_ZERO,
  transferable: new BN(1000),
  locks: [],
}

describe('UI: BountySubmitModal', () => {
  const mockServer = setupMockServer({ noCleanupAfterEach: true })
  let renderResult: RenderResult
  const api = stubApi()
  stubBountyConstants(api)
  const fee = 2000
  const transaction = stubTransaction(api, 'api.tx.bounty.submitWork', fee)
  const txMock = (api.api.tx.bounty.submitWork as unknown) as jest.Mock

  let useModal: UseModal<any>
  beforeAll(async () => {
    seedMembers(mockServer.server, 2)

    useModal = {
      hideModal: jest.fn(),
      showModal: jest.fn(),
      modal: 'foo',
      modalData: {
        bounty: {
          id: '1',
          title: 'Bounty title 1',
          entries: [
            {
              id: 2,
              worker: {
                id: getMember('bob').id,
              },
            },
          ],
        },
      },
    }
  })

  const useBalances = {
    [getMember('bob').controllerAccount]: { ...defaultBalance },
    [getMember('alice').controllerAccount]: defaultBalance,
  }

  const useMembership = {
    isLoading: false,
    active: getMember('bob'),
    hasMembers: true,
    setActive: () => null,
    members: [],
    helpers: {
      getMemberIdByBoundAccountAddress: () => undefined,
    },
  }

  const useAccounts = {
    isLoading: false,
    hasAccounts: true,
    allAccounts: [bob, alice],
  }

  beforeEach(() => {
    renderResult = render(<RenderModal />)
  })

  it('Renders', async () => {
    expect(screen.queryByText('modals.submitWork.title')).toBeDefined()
    expect(screen.queryByText('modals.submitWork.button.submitWork')).toBeDefined()
  })

  it('Displays correct bounty', () => {
    expect(screen.queryByText(useModal.modalData.bounty.title)).toBeDefined()
  })

  it('Send valid parameters', async () => {
    const workTitle = 'Work Title'
    const input = screen.getByLabelText('modals.submitWork.submitWorkInput.workTitle')
    fireEvent.change(input, { target: { value: workTitle } })

    const [memberId, bountyId, entryId, data] = last(txMock.mock.calls)
    expect(memberId.toNumber()).toBe(1)
    expect(bountyId.toNumber()).toBe(1)
    expect(entryId.toNumber()).toBe(2)

    expect(metadataFromBytes(BountyWorkData, data)).toEqual({
      title: 'Work Title',
      description: '',
    })
  })

  describe('Transaction result', () => {
    it('Success', async () => {
      stubTransactionSuccess(transaction, 'bounty', 'WorkSubmitted')

      await proceedToTransaction()

      expect(screen.queryByText('common:success')).toBeDefined()
    })

    it('Error', async () => {
      stubTransactionFailure(transaction)

      await proceedToTransaction()

      expect(screen.queryByText('modals.bountyCancel.error')).toBeDefined()
    })
  })

  const proceedToAuthorization = async () => {
    const button = await getButton('modals.submitWork.button.submitWork')
    fireEvent.click(button)

    renderResult.rerender(<RenderModal />)
  }

  const proceedToTransaction = async () => {
    await proceedToAuthorization()

    const button = await getButton('modals.submitWork.button.submitWork')
    fireEvent.click(button)
  }

  const RenderModal = () => (
    <MockApolloProvider>
      <ModalContext.Provider value={useModal}>
        <MockKeyringProvider>
          <ApiContext.Provider value={api}>
            <MembershipContext.Provider value={useMembership}>
              <AccountsContext.Provider value={useAccounts}>
                <BalancesContext.Provider value={useBalances}>
                  <SubmitWorkModal />
                </BalancesContext.Provider>
              </AccountsContext.Provider>
            </MembershipContext.Provider>
          </ApiContext.Provider>
        </MockKeyringProvider>
      </ModalContext.Provider>
    </MockApolloProvider>
  )
})
