import { createType } from '@joystream/types'
import { isFunction, mapValues } from 'lodash'

export const asChainData = (data: any, key?: string | number): any => {
  if (key === 'unwrap' && !isFunction(data)) {
    const unwrappedValue = asChainData(data)
    return () => unwrappedValue
  }

  switch (Object.getPrototypeOf(data).constructor.name) {
    case 'Object':
      return mapValues(data, asChainData)

    case 'Array':
      return data.map(asChainData)

    case 'Number':
      return createType('u128', data)

    case 'String':
      return isNaN(data) ? data : createType('u128', data)

    default:
      return data
  }
}
