import { DispatchError, EventRecord } from '@polkadot/types/interfaces/system'

import { isModuleEvent } from './isModuleEvent'

export const isErrorEvent = ({ event: { method } }: EventRecord) => {
  return method === 'ExtrinsicFailed' || method === 'BatchInterrupted'
}

export const hasErrorEvent = (events: EventRecord[]) => !!events.find(isErrorEvent)

const getErrorMeta = (error: DispatchError) => {
  if (error.isModule) {
    return error.registry.findMetaError(error.asModule)
  }
}

export const toDispatchError = (event: EventRecord) => {
  if (isModuleEvent(event.event, 'utility', 'BatchInterrupted')) {
    const [, error] = event.event.data
    return getErrorMeta(error)
  }

  if (isModuleEvent(event.event, 'system', 'ExtrinsicFailed')) {
    const [error] = event.event.data
    return getErrorMeta(error)
  }
}
