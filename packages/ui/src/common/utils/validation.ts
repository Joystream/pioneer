import { isBn } from '@polkadot/util'
import BN from 'bn.js'
import { at } from 'lodash'
import { useCallback } from 'react'
import { FieldErrors, FieldValues, Resolver } from 'react-hook-form'
import * as Yup from 'yup'
import { AnyObjectSchema, ValidationError } from 'yup'
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
  params: { less },
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

interface IFormError {
  type: string
  message: string
}

export const useYupValidationResolver = <T extends FieldValues>(
  validationSchema: AnyObjectSchema,
  path?: string
): Resolver<T> =>
  useCallback(
    async (data, context) => {
      let values
      try {
        if (path) {
          values = await validationSchema.validateSyncAt(path, data, {
            abortEarly: false,
            context,
            stripUnknown: true,
          })
        } else {
          values = await validationSchema.validateSync(data, {
            abortEarly: false,
            context,
            stripUnknown: true,
          })
        }

        return {
          values,
          errors: {},
        }
      } catch (errors: any) {
        // console.log(
        //   errors,
        //   errors.inner?.reduce(
        //     (allErrors: Record<string, IFormError>, currentError: ValidationError) => ({
        //       ...allErrors,
        //       [currentError.path as string]: {
        //         type: currentError.type ?? 'validation',
        //         message: currentError.message,
        //       },
        //     }),
        //     {}
        //   ),
        //   'erry',
        //   path
        // )
        return {
          values: {},
          errors: errors.inner?.reduce(
            (allErrors: Record<string, IFormError>, currentError: ValidationError) => ({
              ...allErrors,
              [currentError.path as string]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {}
          ),
        }
      }
    },
    [validationSchema, path]
  )

export interface ValidationHelpers {
  errorMessageGetter: (field: string) => string | undefined
  errorChecker: (field: string) => boolean
  formValueGetter?: () => any
}

export const enhancedHasError = (errors: FieldErrors, depthPath?: string) => (field: string) =>
  !!at(errors, `${depthPath ? depthPath + '.' : ''}${field}`)[0]
export const enhancedGetErrorMessage = (errors: FieldErrors, depthPath?: string) => (field: string) =>
  at(errors, `${depthPath ? depthPath + '.' : ''}${field}`)[0]?.message
