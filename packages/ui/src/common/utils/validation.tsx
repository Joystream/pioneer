import { isBn } from '@polkadot/util'
import BN from 'bn.js'
import { at, get, merge } from 'lodash'
import React, { useCallback, useRef } from 'react'
import { FieldErrors, FieldValues, Resolver } from 'react-hook-form'
import { FieldError } from 'react-hook-form/dist/types/errors'
import { DeepMap, DeepPartial } from 'react-hook-form/dist/types/utils'
import * as Yup from 'yup'
import { AnyObjectSchema, ValidationError } from 'yup'
import Reference from 'yup/lib/Reference'
import { AnyObject } from 'yup/lib/types'

import { CurrencyName } from '@/app/constants/currency'
import { Loading } from '@/common/components/Loading'
import { formatJoyValue } from '@/common/model/formatters'

export const BNSchema = Yup.mixed()

export const whenDefined = (key: string, schema: Yup.AnySchema) =>
  Yup.mixed().when(key, {
    is: undefined,
    then: Yup.mixed(),
    otherwise: schema,
  })

/*
 *   Both maxContext and minContext allow you to check whether value is bigger or
 *   smaller than context value that has been provided to yup.
 *   lessThanMixed and moreThanMixed are methods for BN working same
 *   as the ones on Yup.number
 */
export const maxContext = (
  msg: string,
  contextPath: string,
  isJoyValue = true,
  type?: string
): Yup.TestConfig<any, AnyObject> => ({
  name: type ?? 'maxContext',
  exclusive: false,
  test(value: number | BN) {
    if (!value) {
      return true
    }

    const validationValue = new BN(get(this.options.context, contextPath))
    if (validationValue && validationValue.lt(new BN(value))) {
      return this.createError({
        message: msg,
        params: {
          max:
            isJoyValue && isBn(validationValue)
              ? formatJoyValue(validationValue, { precision: 2 })
              : validationValue.toString(),
        },
      })
    }

    return true
  },
})

export const minContext = (
  msg: string,
  contextPath: string,
  isJoyValue = true,
  type?: string
): Yup.TestConfig<any, AnyObject> => ({
  name: type ?? 'minContext',
  exclusive: false,
  test(value: number | BN) {
    if (!value) {
      return true
    }

    const validationValue = new BN(get(this.options.context, contextPath))
    if (validationValue && validationValue.gt(new BN(value))) {
      return this.createError({
        message: msg,
        params: {
          min:
            isJoyValue && isBn(validationValue)
              ? formatJoyValue(validationValue, { precision: 2 })
              : validationValue.toString(),
        },
      })
    }

    return true
  },
})
export const maxMixed = (
  max: Reference<number | BN> | number | BN | undefined,
  message: string,
  isJoyValue = true
): Yup.TestConfig<any, AnyObject> => ({
  message,
  name: 'lessThanMixed',
  params: { max: isJoyValue && isBn(max) ? formatJoyValue(max, { precision: 2 }) : max },
  exclusive: false,
  test(value: BN) {
    return !value || typeof max === 'undefined' || !isBn(value) || value.lte(new BN(this.resolve(max)))
  },
})

export const minMixed = (
  min: Reference<number | BN> | number | BN | undefined,
  message: string,
  isJoyValue = true
): Yup.TestConfig<any, AnyObject> => ({
  message,
  name: 'lessThanMixed',
  params: {
    min: isJoyValue && isBn(min) ? formatJoyValue(min, { precision: 2 }) : min,
  },
  exclusive: false,
  test(value: BN) {
    return !value || typeof min === 'undefined' || !isBn(value) || value.gte(new BN(this.resolve(min)))
  },
})

export const lessThanMixed = (
  less: Reference<number | BN> | BN | number | undefined,
  message: string,
  isJoyValue = true
): Yup.TestConfig<any, AnyObject> => ({
  message,
  name: 'lessThanMixed',
  params: {
    less: isJoyValue && isBn(less) ? formatJoyValue(less, { precision: 2 }) : less,
  },
  exclusive: false,
  test(value: BN) {
    return !value || typeof less === 'undefined' || !isBn(value) || value.lt(new BN(this.resolve(less)))
  },
})

export const moreThanMixed = (
  more: Reference<number | BN> | number | undefined,
  message: string,
  isJoyValue = true
): Yup.TestConfig<any, AnyObject> => ({
  message,
  name: 'lessThanMixed',
  params: {
    more: isJoyValue && isBn(more) ? formatJoyValue(more, { precision: 2 }) : more,
  },
  exclusive: false,
  test(value: BN) {
    return !value || typeof more === 'undefined' || !isBn(value) || value.gt(new BN(this.resolve(more)))
  },
})

export const validStakingAmount = (): Yup.TestConfig<any, AnyObject> => ({
  name: 'validStakingAmount',
  exclusive: false,
  test(value: number | BN) {
    if (!value) {
      return true
    }
    const stake = new BN(value)

    const minStake: BN | undefined = this.options.context?.minStake
    if (minStake && minStake.gt(stake)) {
      return this.createError({
        message: 'Minimal stake amount is ${min} ' + CurrencyName.integerValue,
        params: { min: formatJoyValue(minStake) },
      })
    }

    const totalBalance: BN | undefined = this.options.context?.balances.total
    const extraFees = new BN(this.options.context?.extraFees ?? 0)
    const totalFee = stake.add(extraFees)
    if (totalBalance && totalBalance.lt(new BN(totalFee))) {
      return this.createError({
        message: 'Selected amount exceeds account balance.',
        params: { max: formatJoyValue(totalBalance), extra: formatJoyValue(extraFees) },
      })
    }
    return true
  },
})

interface IFormError {
  type: string
  message: string
}

export const useYupValidationResolver = <T extends FieldValues>(
  validationSchema: AnyObjectSchema,
  path?: string
): Resolver<T> => {
  const validationsPromise = useRef<Promise<any>>(Promise.resolve())

  return useCallback(
    async (data, context) => {
      let values

      // Deep clone data since it's "by reference" attributes values might change by the time it runs
      const _data = merge({}, data)
      const options = {
        abortEarly: false,
        context,
        stripUnknown: true,
      }
      const validate = () =>
        path ? validationSchema.validateSyncAt(path, _data, options) : validationSchema.validateSync(_data, options)

      validationsPromise.current = validationsPromise.current.then(validate, validate)

      try {
        values = await validationsPromise.current

        return {
          values,
          errors: {},
        }
      } catch (errors: any) {
        return {
          values: {},
          errors: convertYupErrorVectorToFieldErrors<T>(errors?.inner ?? [errors ?? Error('Unknown')]),
        }
      }
    },
    [validationSchema, path]
  )
}

export interface ValidationHelpers {
  errorMessageGetter: (field: string) => string | undefined
  errorChecker: (field: string) => boolean
  formValueGetter?: () => any
}

export const enhancedHasError = (errors: FieldErrors, depthPath?: string) => (field: string) => {
  const error = at(errors, `${depthPath ? depthPath + '.' : ''}${field}`)[0]
  if (error?.type === 'unknownStakingStatus') {
    return false
  }

  return !!error
}
export const enhancedGetErrorMessage = (errors: FieldErrors, depthPath?: string) => (field: string) => {
  const error = at(errors, `${depthPath ? depthPath + '.' : ''}${field}`)[0]
  if (!error) {
    return undefined
  }

  if (error.type === 'unknownStakingStatus') {
    return <Loading text="Validating staking account" />
  }

  return error?.message
}

export const convertYupErrorVectorToFieldErrors = <T extends FieldValues>(vector: ValidationError[]): FieldErrors<T> =>
  vector.reduce(
    (allErrors: Record<string, IFormError>, currentError: ValidationError) => ({
      ...allErrors,
      [currentError.path as string]: {
        type: currentError.type ?? 'validation',
        message: currentError.message,
      },
    }),
    {}
  ) as DeepMap<DeepPartial<T>, FieldError>
