import { AugmentedEvent, AugmentedEvents } from '@polkadot/api/types'
import { EventRecord } from '@polkadot/types/interfaces/system'

type ExtractTuple<P> = P extends AugmentedEvent<'rxjs', infer T> ? T : never

export const getDataFromEvent = <
  Section extends keyof AugmentedEvents<'rxjs'>,
  Method extends keyof AugmentedEvents<'rxjs'>[Section],
  Tuple extends ExtractTuple<AugmentedEvents<'rxjs'>[Section][Method]>,
  Index extends keyof Tuple
>(
  events: EventRecord[],
  section: Section,
  method: Method,
  index: Index = 0 as Index
): Tuple[Index] | undefined => {
  const eventRecord = events.find((event) => event.event.method === method)

  if (!eventRecord) {
    return
  }

  const data = (eventRecord.event.data as unknown) as Tuple

  return data[index]
}
