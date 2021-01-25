import { expect } from 'chai'
import { renderHook, act } from '@testing-library/react-hooks'
import { useNumberInput } from '../../src/hooks/useNumberInput'

describe('useNumberInput', () => {
  function render() {
    let decimals = 18
    const result = renderHook(() => useNumberInput(decimals))
    return {
      getValue: () => result.result.current[0],
      setValue: (value: string) => act(() => result.result.current[1](value)),
      setDecimals: (value: number) => {
        decimals = value
        result.rerender()
      },
    }
  }

  it('returns empty string', () => {
    const { getValue } = render()
    expect(getValue()).to.equal('')
  })

  it('prevents non-number input', () => {
    const { getValue, setValue } = render()
    setValue('foo')
    expect(getValue()).to.equal('')
  })

  it('can strip decimals on change', () => {
    const { getValue, setValue, setDecimals } = render()
    setValue('12.123456789012345678')
    expect(getValue()).to.equal('12.123456789012345678')
    setDecimals(10)
    expect(getValue()).to.equal('12.1234567890')
    setDecimals(0)
    expect(getValue()).to.equal('12')
  })

  it('can work with a normal user flow', () => {
    const { getValue, setValue, setDecimals } = render()
    setValue('.')
    expect(getValue()).to.equal('0.')
    setValue('0')
    expect(getValue()).to.equal('0')
    setValue('01')
    expect(getValue()).to.equal('1')
    setDecimals(3)
    expect(getValue()).to.equal('1')
    setValue('1.2')
    expect(getValue()).to.equal('1.2')
    setValue('1.23')
    expect(getValue()).to.equal('1.23')
    setValue('1.234')
    expect(getValue()).to.equal('1.234')
    setValue('1.2345')
    expect(getValue()).to.equal('1.234')
    setValue('')
    expect(getValue()).to.equal('')
  })
})
