import { RegistryError } from '@polkadot/types-codec/types'
import { EventRecord } from '@polkadot/types/interfaces/system'
import { SpRuntimeDispatchError } from '@polkadot/types/lookup'

import { isModuleEvent } from './isModuleEvent'

export const isErrorEvent = ({ event: { method } }: EventRecord) => {
  return method === 'ExtrinsicFailed' || method === 'BatchInterrupted' || method === 'TransactionCanceled'
}

export const hasErrorEvent = (events: EventRecord[]) => !!events.find(isErrorEvent)

const getErrorMeta = (error: SpRuntimeDispatchError) => {
  if (error.isModule) {
    return error.registry.findMetaError(error.asModule)
  }
}

export type DispatchedError = Pick<RegistryError, 'section' | 'name' | 'docs'>
export const toDispatchError = (event: EventRecord): DispatchedError | undefined => {
  const errorData = event.event.data.find((data) => (data as any).error)
  if (errorData) {
    return (errorData as any).error as DispatchedError
  }

  if (isModuleEvent(event.event, 'utility', 'BatchInterrupted')) {
    const error = event.event.data[1]
    return getErrorMeta(error)
  }

  if (isModuleEvent(event.event, 'system', 'ExtrinsicFailed')) {
    const error = event.event.data[0]
    return getErrorMeta(error)
  }
}
