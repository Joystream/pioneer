import BN from 'bn.js'

import { formatTokenValue } from '@/common/model/formatters'

export const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1)
export const lowerFirstLetter = (str: string): string => str.charAt(0).toLowerCase() + str.slice(1)
export const camelCaseToText = (str: string): string => {
  return capitalizeFirstLetter(str.replace(/(?<=[a-z])([A-Z])|(?<=[A-Z])([A-Z][a-z])/g, ' $1$2'))
}

export const plural = (quantity?: unknown, suffix = 's') => (quantity == 1 ? '' : suffix)

export const displayConstantValue = (value?: number | BN) => {
  if (value === undefined) {
    return '-'
  }

  return typeof value === 'number' ? value : formatTokenValue(value)
}
