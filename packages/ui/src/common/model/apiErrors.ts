import { DispatchError, EventRecord } from '@polkadot/types/interfaces/system'
import { ITuple } from '@polkadot/types/types'

export const isErrorEvent = ({ event: { method } }: EventRecord) => {
  return method === 'ExtrinsicFailed' || method === 'BatchInterrupted'
}

export const isError = (events: EventRecord[]): boolean => !!events.find(isErrorEvent)

export const toDispatchError = (event: EventRecord) => {
  const [dispatchError] = (event.event.data as unknown) as ITuple<[DispatchError]>

  if (dispatchError.isModule) {
    return dispatchError.registry.findMetaError(dispatchError.asModule)
  }
}
