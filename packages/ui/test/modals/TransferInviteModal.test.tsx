import { render } from '@testing-library/react'
import React from 'react'
import { TransferIcon } from '../../src/components/icons'
import { TransferInviteModal } from '../../src/modals/TransferInviteModal'

describe('UI: TransferInviteModal', () => {
  it('Renders a modal', () => {
    const { getByText } = renderModal()
    expect(getByText(/transfer invites/i)).toBeDefined()
  })

  function renderModal() {
    return render(<TransferInviteModal onClose={() => null} icon={<TransferIcon />} />)
  }
})
