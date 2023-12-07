import { createType } from '@joystream/types'
import { mapValues } from 'lodash'
import { of } from 'rxjs'

export const asChainData = (data: any): any => {
  switch (Object.getPrototypeOf(data).constructor.name) {
    case 'Object':
      return withComputed(mapValues(data, asChainData))

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

const withComputed = (data: Record<any, any>) =>
  Object.defineProperties(data, {
    unwrap: { value: () => data },
    isSome: { value: Object.keys(data).length > 0 },
    keys: { value: () => of(Object.keys(data).map((entry) => ({ args: [entry] }))) },
  })
