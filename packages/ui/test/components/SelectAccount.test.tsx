import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, fireEvent, render } from '@testing-library/react'
import React from 'react'
import { SelectAccount } from '../../src/components/account/SelectAccount'
import { MockQueryNodeProviders } from '../mocks/providers'
import { setupMockServer } from '../mocks/server'

jest.mock('../../src/hooks/useAccounts', () => {
  return {
    useAccounts: () => ({
      hasAccounts: false,
      allAccounts: [
        { name: 'Alice', address: '1' },
        { name: 'Bob', address: '5222' },
        { name: 'Dave', address: '3' },
        { name: 'Eve', address: '4' },
      ],
    }),
  }
})

describe('UI: SelectAccount component', () => {
  setupMockServer()

  jest.useFakeTimers()

  beforeAll(cryptoWaitReady)

  it('Displays component', () => {
    const { getByRole } = renderComponent()

    expect(getByRole('textbox')).toBeDefined()
  })

  it('Displays options', () => {
    const { getByRole, getByText } = renderComponent()

    const textBox = getByRole('textbox')
    act(() => {
      fireEvent.click(textBox)
    })

    expect(getByText(/alice/i)).toBeDefined()
  })

  describe('Options open', () => {
    const renderOpenedComponent = () => {
      const renderResult = renderComponent()
      const { getByRole } = renderResult
      const textBox = getByRole('textbox')
      act(() => {
        fireEvent.click(textBox)
      })

      return renderResult
    }

    it('Narrows search results', () => {
      const { getByRole, queryByText } = renderOpenedComponent()
      fireEvent.change(getByRole('textbox'), { target: { value: 'Ali' } })

      expect(queryByText(/bob/i)).toBeNull()
    })

    it('Clears input after hitting Escape', () => {
      const { getByRole } = renderOpenedComponent()
      const textBox = getByRole('textbox')
      act(() => {
        fireEvent.change(textBox, { target: { value: 'bob' } })
        jest.runOnlyPendingTimers()
      })

      expect(textBox.getAttribute('value')).toEqual('bob')

      fireEvent.keyDown(textBox, { key: 'Escape', code: 'Escape' })

      expect(textBox.getAttribute('value')).toEqual('')
    })

    it('Clears input after clicking outside', () => {
      const { getByRole } = renderOpenedComponent()
      const textBox = getByRole('textbox')
      act(() => {
        fireEvent.change(textBox, { target: { value: 'bob' } })
        jest.runOnlyPendingTimers()
      })
      expect(textBox.getAttribute('value')).toEqual('bob')

      fireEvent.mouseDown(document.body)

      expect(textBox.getAttribute('value')).toEqual('')
    })
  })

  function renderComponent() {
    return render(
      <MockQueryNodeProviders>
        <SelectAccount onChange={() => undefined} />
      </MockQueryNodeProviders>
    )
  }
})
