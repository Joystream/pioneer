import { act, renderHook } from '@testing-library/react-hooks'
import BN from 'bn.js'

import { useNumberInput } from '@/common/hooks/useNumberInput'

describe('useNumberInput', () => {
  function render(initial?: BN | number) {
    let decimals = 18
    const { rerender, result } = renderHook(() => useNumberInput(decimals, initial))
    return {
      getValue: () => result.current[0],
      setValue: (value: string) => act(() => result.current[1](value)),
      setDecimals: (value: number) => {
        decimals = value
        rerender()
      },
    }
  }

  it('returns empty string', () => {
    const { getValue } = render()
    expect(getValue()).toBe('')
  })

  it('prevents non-number input', () => {
    const { getValue, setValue } = render()
    setValue('foo')
    expect(getValue()).toBe('')
  })

  it('can strip decimals on change', () => {
    const { getValue, setValue, setDecimals } = render()
    setValue('12.123456789012345678')
    expect(getValue()).toBe('12.123456789012345678')
    setDecimals(10)
    expect(getValue()).toBe('12.1234567890')
    setDecimals(0)
    expect(getValue()).toBe('12')
  })

  it('can work with a normal user flow', () => {
    const { getValue, setValue, setDecimals } = render()
    setValue('.')
    expect(getValue()).toBe('0.')
    setValue('0')
    expect(getValue()).toBe('0')
    setValue('01')
    expect(getValue()).toBe('1')
    setDecimals(3)
    expect(getValue()).toBe('1')
    setValue('1.2')
    expect(getValue()).toBe('1.2')
    setValue('1.23')
    expect(getValue()).toBe('1.23')
    setValue('1.234')
    expect(getValue()).toBe('1.234')
    setValue('1.2345')
    expect(getValue()).toBe('1.234')
    setValue('')
    expect(getValue()).toBe('')
  })

  it('cleans the input of thousands separators', () => {
    const { getValue, setValue } = render()
    setValue('1,000,000.1')
    expect(getValue()).toBe('1000000.1')
    setValue('1,000.99999')
    expect(getValue()).toBe('1000.99999')
  })

  it('Initial BN', () => {
    const { getValue } = render(new BN('10000000000000000000000000000000'))

    expect(getValue()).toBe('10000000000000000000000000000000')
  })
})
