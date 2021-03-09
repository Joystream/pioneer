import { expect } from '@jest/globals'
import { ApiRx } from '@polkadot/api'
import { Keyring } from '@polkadot/ui-keyring/Keyring'
import { cryptoWaitReady } from '@polkadot/util-crypto'
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

  it('Renders a modal', () => {
    const { findByText } = renderModal()
    expect(findByText(/transfer invites/i)).toBeDefined()
  })

  it('Validates form', async () => {
    const aliceMember = await getMember('Alice')
    const { getByLabelText, getByRole } = renderModal((aliceMember as unknown) as MemberFieldsFragment)

    const button = getByRole('button', { name: /transfer invites/i }) as HTMLButtonElement
    expect(button.disabled).toBeTruthy()

    const input = getByLabelText(/number of tokens/i)
    expect(input).toBeDefined()
    fireEvent.change(input, { target: { value: '1' } })

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
