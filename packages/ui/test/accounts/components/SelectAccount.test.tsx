import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, fireEvent, render, screen } from '@testing-library/react'
import React, { useState } from 'react'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { Account } from '@/accounts/types'
import { KeyringContext } from '@/common/providers/keyring/context'

import { mockKeyring } from '../../_mocks/keyring'
import { MockApiProvider, MockQueryNodeProviders } from '../../_mocks/providers'
import { setupMockServer } from '../../_mocks/server'
import { stubAccounts } from '../../_mocks/transactions'

describe('UI: SelectAccount component', () => {
  setupMockServer()

  jest.useFakeTimers()

  beforeAll(() => {
    stubAccounts([
      { name: 'Alice', address: '1' },
      { name: 'Bob', address: '5222' },
      { name: 'Dave', address: '3' },
      { name: 'Eve', address: '4' },
    ])

    cryptoWaitReady()
  })

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

    it('Picks an account', () => {
      renderOpenedComponent()
      expect(screen.getByText('Alice')).toBeDefined()
      expect(screen.getByText('Bob')).toBeDefined()
      act(() => {
        fireEvent.click(screen.getByText('Alice'))
      })
      expect(screen.getByText('Alice')).toBeDefined()
      expect(screen.queryAllByText('Bob')).toEqual([])
    })

    it('Picks an unknown account', () => {
      renderOpenedComponent()
      const textBox = screen.getByRole('textbox')
      act(() => {
        fireEvent.change(textBox, { target: { value: '5CStixio6DdmhMJGtTpUVWtR2PvR7Kydc7RnECRYefFr5mKy' } })
        fireEvent.keyDown(textBox, { key: 'Enter', code: 'Enter' })
      })
      expect(screen.getByText('Unsaved account')).toBeDefined()
    })
  })

  function renderComponent() {
    const Form = () => {
      const [selected, setSelected] = useState<Account>()
      return <SelectAccount selected={selected} onChange={(a) => setSelected(a)} />
    }
    return render(
      <KeyringContext.Provider value={mockKeyring()}>
        <MockApiProvider>
          <MockQueryNodeProviders>
            <Form />
          </MockQueryNodeProviders>
        </MockApiProvider>
      </KeyringContext.Provider>
    )
  }
})
