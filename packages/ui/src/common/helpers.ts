import { toNumber } from './utils'

export const capitalizeFirstLetter = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1)
export const lowerFirstLetter = (str: string): string => str.charAt(0).toLowerCase() + str.slice(1)
export const camelCaseToText = (str: string): string => {
  return capitalizeFirstLetter(str.replace(/(?<=[a-z])([A-Z])|(?<=[A-Z])([A-Z][a-z])/g, ' $1$2'))
}

export const plural = (quantity?: unknown, suffix = 's') => (toNumber(quantity) === 1 ? '' : suffix)

export const parseNumber = (value: any): string => {
  const num = toNumber(value)
  return Number.isNaN(num) ? '-' : String(num)
}
