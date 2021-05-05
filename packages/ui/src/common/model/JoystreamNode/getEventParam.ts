import { EventRecord } from '@polkadot/types/interfaces/system'
import { Codec } from '@polkadot/types/types'

export const getEventParam = <T extends Codec>(
  events: EventRecord[],
  method: string,
  paramIndex = 0
): T | undefined => {
  const eventRecord = events.find((event) => event.event.method === method)

  if (!eventRecord) {
    return
  }

  const { data } = eventRecord.event

  return data[paramIndex] as T
}
