import { isBn } from '@polkadot/util'
import BN from 'bn.js'
import * as Yup from 'yup'
import Reference from 'yup/lib/Reference'
import { AnyObject } from 'yup/lib/types'

export const BNSchema = Yup.mixed()

/*
 *   Both maxContext and minContext allow you to check whether value is bigger or
 *   smaller than context value that has been provided to yup.
 *   lessThanMixed and moreThanMixed are methods for BN working same
 *   as the ones on Yup.number
 */
export const maxContext = (msg: string, contextPath: string): Yup.TestConfig<any, AnyObject> => ({
  name: 'maxContext',
  exclusive: false,
  test(value: number | BN) {
    if (!value) {
      return true
    }

    const validationValue = this.options.context?.[contextPath]
    if (validationValue && new BN(validationValue).lt(new BN(value))) {
      return this.createError({ message: msg, params: { max: validationValue?.toNumber() ?? validationValue } })
    }

    return true
  },
})

export const minContext = (msg: string, contextPath: string): Yup.TestConfig<any, AnyObject> => ({
  name: 'minContext',
  exclusive: false,
  test(value: number | BN) {
    if (!value) {
      return true
    }

    const validationValue = this.options.context?.[contextPath]
    if (validationValue && new BN(validationValue).gt(new BN(value))) {
      return this.createError({ message: msg, params: { min: validationValue?.toNumber() ?? validationValue } })
    }

    return true
  },
})

export const lessThanMixed = (
  less: Reference<number | BN> | number,
  message: string
): Yup.TestConfig<any, AnyObject> => ({
  message,
  name: 'lessThanMixed',
  exclusive: false,
  test(value: BN) {
    return !value || !isBn(value) || value.lt(new BN(this.resolve(less)))
  },
})

export const moreThanMixed = (
  more: Reference<number | BN> | number,
  message: string
): Yup.TestConfig<any, AnyObject> => ({
  message,
  name: 'lessThanMixed',
  params: { more },
  exclusive: false,
  test(value: BN) {
    return !value || !isBn(value) || value.gt(new BN(this.resolve(more)))
  },
})
