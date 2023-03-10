import { GetNotificationEventsQuery } from '@/common/queries'

import { fromPostAddedEvent } from './fromEvents'
import { EntitiyPotentialNotif, ImplementedQNEvent, NotificationEvent, PotentialNotif } from './types'

type AnyQNEvent = GetNotificationEventsQuery['events'][0]

export const toNotificationEvents = (anyEvent: AnyQNEvent): NotificationEvent => {
  // NOTE: The conversion to ImplementedQNEvent assumes that the QN will only return
  // events with fragments defined in the codegen document.
  // As a result any event fragment not implemented here will result in a type error.
  const event = anyEvent as ImplementedQNEvent

  switch (event.__typename) {
    case 'PostAddedEvent':
      return fromPostAddedEvent(event)
  }
}

export const isEntityPotentialNotif = (p: PotentialNotif): p is EntitiyPotentialNotif => 'relatedEntityId' in p

export { NotificationEvent, PotentialNotif }
