import { AugmentedEvents } from '@polkadot/api/types'
import { EventRecord } from '@polkadot/types/interfaces/system'

import { ExtractTuple } from './types'

export const getDataFromEvent = <
  Module extends keyof AugmentedEvents<'rxjs'>,
  Event extends keyof AugmentedEvents<'rxjs'>[Module],
  Tuple extends ExtractTuple<AugmentedEvents<'rxjs'>[Module][Event]>,
  Index extends keyof Tuple
>(
  events: EventRecord[],
  module: Module,
  eventName: Event,
  index: Index = 0 as Index
): Tuple[Index] | undefined => {
  const eventRecord = events.find((event) => event.event.method === eventName)

  if (!eventRecord) {
    return
  }

  const data = eventRecord.event.data as unknown as Tuple

  return data[index]
}
