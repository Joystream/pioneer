import { useEffect, useState } from 'react'

const NUMBER_REGEX = /^\d*(\.\d*)?$/

export function useNumberInput(decimals = 6) {
  const [value, setValue] = useState('')

  function set(value: string) {
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
  const leadingZeroes = value.match(/^0*/)?.[0].length
  if (leadingZeroes) {
    value = value.substring(leadingZeroes)
  }
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
