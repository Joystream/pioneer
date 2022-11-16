import { waitFor } from '@testing-library/react'
import { act, renderHook } from '@testing-library/react-hooks'
import { Subject } from 'rxjs'

import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'

describe('useFirstObservableValue', () => {
  it('Undefined observable', () => {
    const { result } = renderHook(() => useFirstObservableValue<undefined>(() => undefined, []))
    expect(result.current).toBeUndefined()
  })

  it('Returns first observed values', () => {
    const subject = new Subject<number>()
    const { result } = renderHook(() => useFirstObservableValue(() => subject.asObservable(), []))
    act(() => {
      subject.next(1)
    })

    waitFor(() => expect(result.current).toBe(1))

    act(() => {
      subject.next(2)
    })
    waitFor(() => expect(result.current).toBe(1))
  })
})
