import { act, renderHook } from '@testing-library/react-hooks'

import { useLocalStorage } from '../../../src/common/hooks/useLocalStorage'

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  function render(key?: string) {
    const result = renderHook(() => useLocalStorage(key))
    return {
      getValue: () => result.result.current[0],
      setValue: (value: any) => act(() => result.result.current[1](value)),
      setKey: (value: string) => {
        key = value
        result.rerender()
      },
    }
  }

  it('returns undefined for empty storage', () => {
    const { getValue } = render()
    expect(getValue()).toBeUndefined()
  })

  it('empty key', () => {
    const { getValue } = render()
    expect(getValue()).toBeUndefined()
  })

  it('parses existing values', () => {
    window.localStorage.setItem('foo', JSON.stringify({ a: 1 }))
    const { getValue } = render('foo')
    expect(getValue()).toEqual({ a: 1 })
  })

  it('caches results', () => {
    window.localStorage.setItem('foo', JSON.stringify({ a: 1 }))
    const { getValue } = render('foo')
    expect(getValue()).toEqual({ a: 1 })
    window.localStorage.setItem('foo', JSON.stringify({ a: 2 }))
    expect(getValue()).toEqual({ a: 1 })
  })

  it('returns undefined when cannot parse', () => {
    window.localStorage.setItem('foo', 'x{}y')
    const { getValue } = render('foo')
    expect(getValue()).toBeUndefined()
  })

  it('modifies the localStorage and returns a the new value', () => {
    const { getValue, setValue } = render('foo')
    expect(getValue()).toBeUndefined()
    setValue({ a: 1 })
    expect(window.localStorage.getItem('foo')).toBe('{"a":1}')
    expect(getValue()).toEqual({ a: 1 })
  })

  it('can remove the item by setting undefined', () => {
    window.localStorage.setItem('foo', 'true')
    const { getValue, setValue } = render('foo')
    expect(getValue()).toBe(true)
    setValue(undefined)
    expect(getValue()).toBeUndefined()
    expect(window.localStorage.getItem('foo')).toBe(null)
  })

  it('can change keys', () => {
    window.localStorage.setItem('foo', 'true')
    const { getValue, setKey } = render('foo')
    expect(getValue()).toBe(true)
    setKey('bar')
    expect(getValue()).toBeUndefined()
    expect(window.localStorage.getItem('foo')).toBe('true')
    expect(window.localStorage.getItem('bar')).toBe(null)
  })

  it('can change keys and modify the other value', () => {
    window.localStorage.setItem('foo', 'true')
    window.localStorage.setItem('bar', 'false')
    const { getValue, setValue, setKey } = render('foo')
    expect(getValue()).toBe(true)
    setValue(123)
    setKey('bar')
    expect(getValue()).toBe(false)
    setValue(456)
    expect(window.localStorage.getItem('foo')).toBe('123')
    expect(window.localStorage.getItem('bar')).toBe('456')
  })
})
