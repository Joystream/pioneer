import { get } from 'lodash'
import * as Yup from 'yup'
import { AnyObject } from 'yup/lib/types'

import { CSV_PATTERN } from '../constants/regExp'

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
export const differentFromContext = (
  msg: (value: any) => string,
  contextPath: string,
  type?: string
): Yup.TestConfig<any, AnyObject> => ({
  name: type ?? 'differentFromContext',
  exclusive: false,
  test(value: boolean) {
    const validationValue = get(this.options.context, contextPath).toJSON()
    if (value === validationValue) {
      return this.createError({
        message: msg(value),
      })
    }
    return true
  },
})
