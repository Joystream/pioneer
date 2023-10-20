import { createType } from '@joystream/types'
import { mapValues } from 'lodash'

export const asChainData = (data: any): any => {
  switch (Object.getPrototypeOf(data).constructor.name) {
    case 'Object':
      return withUnwrap(mapValues(data, asChainData))

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

const withUnwrap = (data: Record<any, any>) => Object.defineProperty(data, 'unwrap', { value: () => data })
