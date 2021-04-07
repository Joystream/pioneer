import { act, renderHook } from '@testing-library/react-hooks'

import { useToggle } from '../../../src/common/hooks/useToggle'

describe('useToggle', () => {
  it('Has default state', () => {
    const { result } = renderHook(() => useToggle())

    const [isActive] = result.current

    expect(isActive).toBeFalsy()
  })

  it('Toggles value', () => {
    const { result } = renderHook(() => useToggle())

    const [, toggle] = result.current

    act(() => {
      toggle()
    })

    const [isActive] = result.current

    expect(isActive).toBeTruthy()
  })

  it('Accepts default value', () => {
    const { result } = renderHook(() => useToggle(true))

    const [isActive] = result.current

    expect(isActive).toBeTruthy()
  })
})
