import { useEffect, useState } from 'react'

export const NUMBER_REGEX = /^\d*(\.\d*)?$/

export function useNumberInput(decimals = 6) {
  const [value, setValue] = useState('')

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

export function stripLeadingZeroes(value: string) {
  if (value === '') {
    return value
  }
  value = value.replace(/^0*/, '')
  if (value.startsWith('.') || value === '') {
    value = '0' + value
  }
  return value
}

export function truncateDecimals(value: string, decimals: number) {
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
