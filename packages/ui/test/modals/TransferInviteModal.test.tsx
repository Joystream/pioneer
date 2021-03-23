import { ApiRx } from '@polkadot/api'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { MemberFieldsFragment } from '../../src/api/queries'
import { TransferIcon } from '../../src/components/icons'
import { TransferInviteModal } from '../../src/modals/TransferInviteModal'
import { ApiContext } from '../../src/providers/api/context'
import { UseApi } from '../../src/providers/api/provider'
import { MockKeyringProvider, MockQueryNodeProviders } from '../mocks/providers'
import { selectMember } from '../helpers/selectMember'
import { getMember } from '../mocks/members'
import { setupMockServer } from '../mocks/server'

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

  const api: UseApi = {
    api: ({} as unknown) as ApiRx,
    isConnected: true,
  }

  afterEach(() => {
    members.splice(0)
  })

  it('Renders a modal', () => {
    const { findByText } = renderModal()
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

  function renderModal(member: MemberFieldsFragment | undefined = undefined) {
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
