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
export const equalValueContext = (contextPath: string, type?: string): Yup.TestConfig<any, AnyObject> => ({
  name: type ?? 'equalValueContext',
  exclusive: false,
  test(value: boolean) {
    const validationValue = this.options.context?.palletFrozenStatus
    return value !== validationValue
  },
})
