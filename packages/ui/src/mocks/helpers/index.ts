import { isObject } from 'lodash'

import { JOY_DECIMAL_PLACES } from '@/common/constants'

import { Balance } from '../providers/accounts'

export * from './storybook'
export { getMember } from '@/../test/_mocks/members'

export function camelCaseToDash(myStr: string) {
  return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export const joy = (value: Balance): string => {
  if (isObject(value)) return value.toString()

  const [integer = '0', decimal = ''] = value.toString().replace(/[,_ ]/g, '').split('.')
  return `${integer}${decimal.padEnd(JOY_DECIMAL_PLACES, '0')}`
}

export const isoDate = (date: number | string | Date = Date.now()): string => new Date(date).toISOString()
