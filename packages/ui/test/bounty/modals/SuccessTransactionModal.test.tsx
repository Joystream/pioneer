import { render, screen } from '@testing-library/react'
import React from 'react'

import { SuccessTransactionModal, Props as SuccessTransactionModalProps } from '@/bounty/modals/SuccessTransactionModal'

describe('UI: SuccessTransactionModal', () => {
  const onClose = jest.fn()
  const onButtonClick = jest.fn()
  const message = 'message'
  const buttonLabel = 'button-label'
  const props: SuccessTransactionModalProps = {
    onClose,
    onButtonClick,
    message,
    buttonLabel,
  }

  beforeEach(() => {
    render(<SuccessTransactionModal {...props} />)
  })

  it('Renders', async () => {
    expect(screen.getByText('success')).toBeInTheDocument()
  })

  it('Displays correct message', () => {
    expect(screen.getByText(message)).toBeInTheDocument()
  })

  it('Displays proper button label', () => {
    expect(screen.getByText(buttonLabel)).toBeInTheDocument()
  })
})
