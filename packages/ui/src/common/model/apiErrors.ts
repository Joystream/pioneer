import { ApiRx } from '@polkadot/api'
import { DispatchError, EventRecord } from '@polkadot/types/interfaces/system'

export const isErrorEvent = ({ event: { method } }: EventRecord) => {
  return method === 'ExtrinsicFailed' || method === 'BatchInterrupted'
}

export const hasError = (events: EventRecord[]): boolean => !!events.find(isErrorEvent)

const getErrorMeta = (error: DispatchError) => {
  if (error.isModule) {
    return error.registry.findMetaError(error.asModule)
  } else {
    return
  }
}

export const toDispatchError = (event: EventRecord, api: ApiRx) => {
  if (api.events.utility.BatchInterrupted.is(event.event)) {
    const [, error] = event.event.data
    return getErrorMeta(error)
  }

  if (api.events.system.ExtrinsicFailed.is(event.event)) {
    const [error] = event.event.data
    return getErrorMeta(error)
  }
}
