import { expect } from '@jest/globals'
import { ApiRx } from '@polkadot/api'
import { Keyring } from '@polkadot/ui-keyring/Keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { Matcher } from '@testing-library/dom/types/matches'
import { fireEvent, render } from '@testing-library/react'
import React from 'react'
import { MemberFieldsFragment } from '../../src/api/queries'
import { TransferIcon } from '../../src/components/icons'
import { TransferInviteModal } from '../../src/modals/TransferInviteModal'
import { ApiContext } from '../../src/providers/api/context'
import { UseApi } from '../../src/providers/api/provider'
import { KeyringContext } from '../../src/providers/keyring/context'
import { MockQueryNodeProviders } from '../helpers/providers'
import { mockKeyring } from '../mocks/keyring'
import { getMember } from '../mocks/members'
import { setupMockServer } from '../mocks/server'

const selectMember = (label: string, name: string, getByText: (text: Matcher) => HTMLElement) => {
  const labelElement = getByText(/^to$/i)
  const parentNode = labelElement.parentElement
  const button = parentNode?.querySelector('div > button')

  expect(button).toBeDefined()
  button && fireEvent.click(button)
}

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

  let keyring: Keyring

  beforeEach(async () => {
    keyring = mockKeyring()
  })

  afterEach(() => {
    members.splice(0)
  })

  it('Renders a modal', () => {
    const { findByText } = renderModal()
    expect(findByText(/transfer invites/i)).toBeDefined()
  })

  xit('Validates form', async () => {
    const aliceMember = await getMember('Alice')
    const bobMember = await getMember('Bob')

    members.push((aliceMember as unknown) as MemberFieldsFragment)
    members.push((bobMember as unknown) as MemberFieldsFragment)

    const { getByLabelText, getByRole, getByText } = renderModal((aliceMember as unknown) as MemberFieldsFragment)

    const button = getByRole('button', { name: /transfer invites/i }) as HTMLButtonElement
    expect(button.disabled).toBeTruthy()

    const input = getByLabelText(/number of invites/i)
    expect(input).toBeDefined()
    fireEvent.change(input, { target: { value: '1' } })
    selectMember('to', 'bob', getByText)

    expect(button.disabled).toBeFalsy()
  })

  function renderModal(member: MemberFieldsFragment | undefined = undefined) {
    return render(
      <MockQueryNodeProviders>
        <KeyringContext.Provider value={keyring}>
          <ApiContext.Provider value={api}>
            <TransferInviteModal onClose={() => null} icon={<TransferIcon />} member={member} />
          </ApiContext.Provider>
        </KeyringContext.Provider>
      </MockQueryNodeProviders>
    )
  }
})
