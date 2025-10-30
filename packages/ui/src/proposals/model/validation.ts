import { get } from 'lodash'
import * as Yup from 'yup'
import { AnyObject } from 'yup/lib/types'

export const equalToContext = (
  msg: (value: any) => string,
  contextPath: string,
  type?: string
): Yup.TestConfig<any, AnyObject> => ({
  name: type ?? 'equalToContext',
  exclusive: false,
  test(value: boolean) {
    const validationValue = get(this.options.context, contextPath)
    return (
      value === validationValue ||
      this.createError({
        message: msg(value),
      })
    )
  },
})
