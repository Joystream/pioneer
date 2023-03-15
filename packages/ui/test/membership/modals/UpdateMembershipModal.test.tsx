import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, configure, fireEvent, render, screen } from '@testing-library/react'
import BN from 'bn.js'
import { set } from 'lodash'
import React from 'react'
import { of } from 'rxjs'

import { ApiContext } from '@/api/providers/context'
import { GlobalModals } from '@/app/GlobalModals'
import { MembershipExternalResourceType } from '@/common/api/queries'
import { ModalContextProvider } from '@/common/providers/modal/provider'
import { last } from '@/common/utils'
import { UpdateMembershipModal } from '@/memberships/modals/UpdateMembershipModal'
import { MembershipContext } from '@/memberships/providers/membership/context'
import { MyMemberships } from '@/memberships/providers/membership/provider'
import { MemberWithDetails } from '@/memberships/types'

import { getButton } from '../../_helpers/getButton'
import { selectFromDropdown } from '../../_helpers/selectFromDropdown'
import { createBalanceOf } from '../../_mocks/chainTypes'
import { alice, aliceStash, bob, bobStash } from '../../_mocks/keyring'
import { getMember } from '../../_mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import {
  stubAccounts,
  stubApi,
  stubBatchTransactionFailure,
  stubBatchTransactionSuccess,
  stubDefaultBalances,
  stubTransaction,
} from '../../_mocks/transactions'
import { mockUseModalCall } from '../../setup'

configure({ testIdAttribute: 'id' })

describe('UI: UpdatedMembershipModal', () => {
  beforeAll(async () => {
    await cryptoWaitReady()
    jest.spyOn(console, 'log').mockImplementation()
    stubAccounts([alice, aliceStash, bob, bobStash])
  })

  mockUseModalCall({
    modalData: {
      member: {
        ...getMember('alice'),
        externalResources: [{ source: MembershipExternalResourceType.Twitter, value: 'empty' }],
      } as MemberWithDetails,
    },
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  setupMockServer()

  const api = stubApi()
  let batchTx: any
  let profileTxMock: jest.Mock

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

  beforeEach(() => {
    stubDefaultBalances()
    set(api, 'api.query.members.membershipPrice', () => of(createBalanceOf(100)))
    set(api, 'api.query.members.memberIdByHandleHash.size', () => of(new BN(0)))
    stubTransaction(api, 'api.tx.members.updateProfile')
    stubTransaction(api, 'api.tx.members.updateAccounts')
    batchTx = stubTransaction(api, 'api.tx.utility.batch')
    stubTransaction(api, 'api.tx.members.updateProfile')
    profileTxMock = api.api.tx.members.updateProfile as unknown as jest.Mock
    useMyMemberships.members = [getMember('alice'), getMember('bob')]
    useMyMemberships.setActive(getMember('bob'))
  })

  it('Renders a modal', async () => {
    act(() => {
      renderModal()
    })
    expect(await screen.findByText('Edit membership')).toBeDefined()
  })

  it('Is initially disabled', async () => {
    act(() => {
      renderModal()
    })
    expect(await getButton(/^Save changes$/i)).toBeDisabled()
  })

  it('Enables button on external resources change', async () => {
    act(() => {
      renderModal()
    })
    expect(await getButton(/^Save changes$/i)).toBeDisabled()
    fireEvent.change(screen.getByTestId('twitter-input'), { target: { value: 'joystream@mail.com' } })

    expect(await getButton(/^Save changes$/i)).toBeEnabled()
  })

  it('Enables button on member field change', async () => {
    act(() => {
      renderModal()
    })
    expect(await getButton(/^Save changes$/i)).toBeDisabled()
    fireEvent.change(screen.getByLabelText(/member name/i), { target: { value: 'Bobby Bob' } })

    expect(await getButton(/^Save changes$/i)).toBeEnabled()
  })

  it('Enables save button on account change', async () => {
    act(() => {
      renderModal()
    })
    await selectFromDropdown('root account', 'bob')
    expect(await getButton(/^Save changes$/i)).toBeEnabled()
  })

  it('Disables button when invalid avatar URL', async () => {
    act(() => {
      renderModal()
    })

    fireEvent.change(await screen.findByLabelText(/member avatar/i), { target: { value: 'avatar' } })
    expect(await getButton(/^Save changes$/i)).toBeDisabled()

    fireEvent.change(await screen.findByLabelText(/member avatar/i), {
      target: { value: 'http://example.com/example.jpg' },
    })
    expect(await getButton(/^Save changes$/i)).toBeEnabled()
  })

  describe('Authorize - member field', () => {
    const newMemberName = 'Bobby Bob'
    const newMemberEmail = 'joystream@mail.com'
    async function changeNameAndSave() {
      await act(async () => {
        fireEvent.change(screen.getByLabelText(/member name/i), { target: { value: newMemberName } })
        fireEvent.change(screen.getByTestId('twitter-input'), { target: { value: newMemberEmail } })

        fireEvent.click(await screen.findByText(/^Save changes$/i))
      })
    }

    it('Authorize step', async () => {
      act(() => {
        renderModal()
      })

      await changeNameAndSave()
      const txCall = profileTxMock.mock.calls[0]
      const memberMetadata = Buffer.from(last(txCall) as Uint8Array).toString('utf8')

      expect(memberMetadata.includes(newMemberName)).toBe(true)
      expect(memberMetadata.includes(newMemberEmail)).toBe(true)
      expect(await screen.findByText('modals.authorizeTransaction.title')).toBeDefined()
      expect((await screen.findByText(/^modals.transactionFee.label/i))?.nextSibling?.textContent).toBe('25')
    })

    it('Success step', async () => {
      stubBatchTransactionSuccess(batchTx)
      await act(async () => {
        renderModal()
        await changeNameAndSave()
      })
      fireEvent.click(screen.getByText(/^sign and update a member$/i))
      expect(await screen.findByText('Success')).toBeDefined()
    })

    it('Failure step', async () => {
      act(() => {
        renderModal()
      })

      stubBatchTransactionFailure(batchTx)
      await changeNameAndSave()

      fireEvent.click(screen.getByText(/^sign and update a member$/i))

      expect(await screen.findByText('Failure')).toBeDefined()
    })
  })

  function renderModal() {
    render(
      <ModalContextProvider>
        <MockQueryNodeProviders>
          <MockKeyringProvider>
            <MembershipContext.Provider value={useMyMemberships}>
              <ApiContext.Provider value={api}>
                <GlobalModals />
                <UpdateMembershipModal />
              </ApiContext.Provider>
            </MembershipContext.Provider>
          </MockKeyringProvider>
        </MockQueryNodeProviders>
      </ModalContextProvider>
    )
  }
})
