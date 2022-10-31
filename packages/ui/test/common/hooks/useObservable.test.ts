import { act, renderHook } from '@testing-library/react-hooks'
import { Subject } from 'rxjs'

import { useObservable } from '@/common/hooks/useObservable'

describe('useObservable', () => {
  it('Undefined observable', () => {
    const { result } = renderHook(() => useObservable<undefined>(() => undefined, []))
    expect(result.current).toBeUndefined()
  })

  it('Returns observed values', () => {
    const subject = new Subject<number>()
    const { result } = renderHook(() => useObservable(() => subject.asObservable(), []))

    act(() => {
      subject.next(1)
    })
    expect(result.current).toBe(1)

    act(() => {
      subject.next(2)
    })
    expect(result.current).toBe(2)
  })
})
