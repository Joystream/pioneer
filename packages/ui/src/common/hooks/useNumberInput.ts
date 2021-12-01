import BN from 'bn.js'
import { useEffect, useState } from 'react'

const NUMBER_REGEX = /^\d*(\.\d*)?$/

export function useNumberInput(decimals = 6, initialValue?: BN | number) {
  const [value, setValue] = useState(initialValue ? initialValue.toString() : '')

  function set(value: string) {
    value = cleanInputValue(value)
    if (NUMBER_REGEX.test(value)) {
      setValue(truncateDecimals(stripLeadingZeroes(value), decimals))
    }
  }

  useEffect(() => {
    setValue(truncateDecimals(value, decimals))
  }, [decimals])

  return [value, set] as const
}

function stripLeadingZeroes(value: string) {
  if (value === '') {
    return value
  }
  value = value.replace(/^0*/, '')
  if (value.startsWith('.') || value === '') {
    value = '0' + value
  }
  return value
}

function truncateDecimals(value: string, decimals: number) {
  if (value.includes('.')) {
    const [integer, decimal] = value.split('.')
    const trimmed = decimal.substring(0, decimals)
    return decimals !== 0 ? `${integer}.${trimmed}` : integer
  } else {
    return value
  }
}

export function cleanInputValue(value: string) {
  return value.replace(/,/g, '')
}
