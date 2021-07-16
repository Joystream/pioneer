import { act, renderHook } from '@testing-library/react-hooks'
import BN from 'bn.js'

import { useBlockInput } from '@/common/hooks/useBlockInput'

describe('useBlockInput', () => {
  function render(min: number, max: number, initial: BN) {
    const { result } = renderHook(() => useBlockInput(min, max, initial))

    return [() => result.current[0], (value: string) => act(() => result.current[1](value))] as const
  }

  it('Initial', () => {
    const [getValue] = render(0, 100, new BN(7))
    expect(getValue()).toBeBN(new BN(7))
  })

  it('Update value', () => {
    const [getValue, setValue] = render(0, 100, new BN(7))

    setValue('42')

    expect(getValue()).toBeBN(new BN(42))
  })

  it('Above max', () => {
    const [getValue, setValue] = render(0, 100, new BN(7))

    setValue('10000')

    expect(getValue()).toBeBN(new BN(100))
  })

  it('Below min', () => {
    const [getValue, setValue] = render(0, 100, new BN(7))

    setValue('-1')

    expect(getValue()).toBeBN(new BN(0))
  })

  it('NaN', () => {
    const [getValue, setValue] = render(0, 100, new BN(7))

    setValue('NotANumber')

    expect(getValue()).toBeBN(new BN(0))
  })
})
