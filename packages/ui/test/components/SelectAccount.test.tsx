import { beforeAll, expect } from '@jest/globals'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { act, fireEvent, render } from '@testing-library/react'
import React from 'react'
import { SelectAccount } from '../../src/components/selects/SelectAccount'
import { MockQueryNodeProviders } from '../helpers/providers'
import { setupMockServer } from '../mocks/server'

jest.mock('../../src/hooks/useAccounts', () => {
  return {
    useAccounts: () => ({
      hasAccounts: false,
      allAccounts: [
        { name: 'Alice', address: '1' },
        { name: 'Bob', address: '2' },
        { name: 'Dave', address: '3' },
        { name: 'Eve', address: '4' },
      ],
    }),
  }
})

describe('UI: SelectAccount component', () => {
  setupMockServer()

  beforeAll(cryptoWaitReady)

  it('Displays component', () => {
    const { getByRole } = renderComponent()

    expect(getByRole('textbox')).toBeDefined()
  })

  it('Displays search', () => {
    const { getByRole, getByText } = renderComponent()

    const textBox = getByRole('textbox')
    act(() => {
      fireEvent.click(textBox)
    })

    expect(getByText(/alice/i)).toBeDefined()
  })

  function renderComponent() {
    return render(
      <MockQueryNodeProviders>
        <SelectAccount onChange={() => undefined} />
      </MockQueryNodeProviders>
    )
  }
})
