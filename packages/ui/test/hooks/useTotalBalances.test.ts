import { renderHook } from '@testing-library/react-hooks'
import BN from 'bn.js'
import { expect } from 'chai'

import { useTotalBalances } from '../../src/hooks/useTotalBalances'

describe('useTotalBalances', () => {
  it('Returns zero balances when no accounts', () => {
    const { result } = renderHook(() => useTotalBalances())
    expect(result.current).to.be.deep.equal({
      total: new BN(0),
      transferable: new BN(0),
      locked: new BN(0),
      recoverable: new BN(0),
    })
  })
})
