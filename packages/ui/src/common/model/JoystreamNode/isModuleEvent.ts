import { AugmentedEvents } from '@polkadot/api/types/events'
import { AnyTuple, IEvent } from '@polkadot/types/types'

import { ExtractTuple } from './types'

export const isModuleEvent = <
  Module extends keyof AugmentedEvents<'rxjs'>,
  Event extends keyof AugmentedEvents<'rxjs'>[Module],
  Tuple extends ExtractTuple<AugmentedEvents<'rxjs'>[Module][Event]>
>(
  event: IEvent<AnyTuple>,
  module: Module,
  eventName: Event
): event is IEvent<Tuple> => event.section === module && event.method === eventName
