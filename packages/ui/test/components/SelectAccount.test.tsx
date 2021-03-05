import { beforeAll } from '@jest/globals'
import { cryptoWaitReady } from '@polkadot/util-crypto'
import { render } from '@testing-library/react'
import React from 'react'
import { SelectAccount } from '../../src/components/selects/SelectAccount'
import { MockQueryNodeProviders } from '../helpers/providers'

jest.mock('../../src/hooks/useAccounts', () => {
  return {
    useAccounts: () => ({
      hasAccounts: false,
      allAccounts: [],
    }),
  }
})

describe('UI: SelectAccount component', () => {
  beforeAll(cryptoWaitReady)

  it('Displays component', () => {
    const { getByRole } = renderComponent()

    expect(getByRole('textbox')).toBeDefined()
  })

  function renderComponent() {
    return render(
      <MockQueryNodeProviders>
        <SelectAccount onChange={() => undefined} />
      </MockQueryNodeProviders>
    )
  }
})
