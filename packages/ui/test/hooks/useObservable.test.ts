import { act, renderHook } from '@testing-library/react-hooks'
import { expect } from 'chai'
import { Subject } from 'rxjs'

import { useObservable } from '../../src/hooks/useObservable'

describe('useObservable', () => {
  it('Returns undefined for undefined observable', () => {
    const { result } = renderHook(() => useObservable<undefined>(undefined, []))
    expect(result.current).to.be.undefined
  })

  it('Returns observed values', () => {
    const subject = new Subject<number>()
    const { result } = renderHook(() => useObservable(subject.asObservable(), []))

    act(() => {
      subject.next(1)
    })
    expect(result.current).to.equal(1)

    act(() => {
      subject.next(2)
    })
    expect(result.current).to.equal(2)
  })

  it('Returns observed values', () => {
    const subject = new Subject<number>()
    const { result } = renderHook(() => useObservable(subject.asObservable(), []))

    act(() => {
      subject.next(1)
    })
    expect(result.current).to.equal(1)

    act(() => {
      subject.next(2)
    })
    expect(result.current).to.equal(2)
  })
})
