import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { MemberFieldsFragment } from '../../src/api/queries'
import { TransferIcon } from '../../src/components/icons'
import { TransferInviteModal } from '../../src/modals/TransferInviteModal'
import { ApiContext } from '../../src/providers/api/context'
import { selectMember } from '../helpers/selectMember'
import { getMember } from '../mocks/members'
import { MockKeyringProvider, MockQueryNodeProviders } from '../mocks/providers'
import { setupMockServer } from '../mocks/server'
import { stubApi, stubDefaultBalances, stubTransaction } from '../mocks/transactions'

const members: MemberFieldsFragment[] = []

jest.mock('../../src/hooks/useMyMemberships', () => {
  return {
    useMyMemberships: () => ({
      isLoading: false,
      members: members,
    }),
  }
})

describe('UI: TransferInviteModal', () => {
  beforeAll(cryptoWaitReady)

  setupMockServer()

  const api = stubApi()

  beforeEach(async () => {
    stubDefaultBalances(api)
    stubTransaction(api, 'api.tx.members.transferInvites')
  })

  afterEach(() => {
    members.splice(0)
  })

  it('Renders a modal', () => {
    const aliceMember = getMember('Alice')
    const { findByText } = renderModal(aliceMember)
    expect(findByText(/transfer invites/i)).toBeDefined()
  })

  it.skip('Validates form', async () => {
    const aliceMember = getMember('Alice')
    const bobMember = getMember('Bob')

    members.push(aliceMember)
    members.push(bobMember)

    const { findByLabelText, findByRole } = renderModal(aliceMember)

    const button = (await findByRole('button', { name: /transfer invites/i })) as HTMLButtonElement
    expect(button.disabled).toBeTruthy()

    const input = await findByLabelText(/number of invites/i)
    expect(input).toBeDefined()
    fireEvent.change(input, { target: { value: '1' } })

    await selectMember('to', 'bob')

    expect(button.disabled).toBeFalsy()
  })

  function renderModal(member: MemberFieldsFragment) {
    return render(
      <MockQueryNodeProviders>
        <MockKeyringProvider>
          <ApiContext.Provider value={api}>
            <TransferInviteModal onClose={() => null} icon={<TransferIcon />} member={member} />
          </ApiContext.Provider>
        </MockKeyringProvider>
      </MockQueryNodeProviders>
    )
  }
})
