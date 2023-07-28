import { isBn } from '@polkadot/util'
import BN from 'bn.js'
import * as Yup from 'yup'
import Reference from 'yup/lib/Reference'
import { AnyObject } from 'yup/lib/types'

import { JOY_DECIMAL_PLACES } from '@/common/constants'
import { formatJoyValue } from '@/common/model/formatters'

import { CSV_PATTERN } from '../constants/regExp'

export const maxAccounts = (message: string, max: number | undefined): Yup.TestConfig<any, AnyObject> => ({
  message,
  name: 'maxAccounts',
  params: { max },
  exclusive: false,
  test(value: string) {
    const pairs = value.split('\n')
    return max ? pairs.length <= max : false
  },
})

export const duplicateAccounts = (message: string): Yup.TestConfig<any, AnyObject> => ({
  message,
  name: 'duplicateAccounts',
  exclusive: false,
  test(value: string) {
    const pairs = value.split('\n')
    const addresses: string[] = []

    for (const pair of pairs) {
      const [address] = pair.split(',')
      if (addresses.indexOf(address) >= 0) return false
      addresses.push(address)
    }

    return true
  },
})

export const isValidCSV = (message: string): Yup.TestConfig<any, AnyObject> => ({
  message,
  name: 'isValidCSV',
  exclusive: false,
  test(value: string) {
    if (!CSV_PATTERN.test(value)) return false

    const pairs = value.split('\n')

    for (const pair of pairs) {
      const [, amount] = pair.split(',')
      if (!Number(amount)) return false
    }

    return true
  },
})

export const maxFundingAmount = (
  message: string,
  max: Reference<number | BN> | number | BN | undefined,
  isJoyValue = true
): Yup.TestConfig<any, AnyObject> => ({
  message,
  name: 'maxFundingAmount',
  params: { max: isJoyValue && isBn(max) ? formatJoyValue(max, { precision: 2 }) : max },
  exclusive: false,
  test(value: string) {
    const pairs = value.split('\n')
    let total = new BN(0)
    const decimals = new BN(10).pow(new BN(JOY_DECIMAL_PLACES))
    for (const pair of pairs) {
      const [, amount] = pair.split(',')
      total = total.add(new BN(amount))
    }
    total = total.mul(decimals)
    return !total || typeof max === 'undefined' || !isBn(total) || total.lte(new BN(this.resolve(max)))
  },
})
