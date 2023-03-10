import { GetNotificationEventsQuery } from '@/common/queries'

import { buildEvents } from './buildEvent'
import { fromPostAddedEvent } from './fromEvents'
import {
  EntitiyPotentialNotif,
  GeneralPotentialNotif,
  ImplementedQNEvent,
  NotificationEvent,
  PotentialNotif,
} from './types'

type AnyQNEvent = GetNotificationEventsQuery['events'][0]

export const toNotificationEvents =
  (allMemberIds: number[]) =>
  (anyEvent: AnyQNEvent): NotificationEvent => {
    // NOTE: The conversion to ImplementedQNEvent assumes that the QN will only return
    // events with fragments defined in the codegen document.
    // As a result any event fragment not implemented here will result in a type error.
    const event = anyEvent as ImplementedQNEvent

    switch (event.__typename) {
      case 'PostAddedEvent':
        return fromPostAddedEvent(event, buildEvents(allMemberIds))
    }
  }

export const isGeneralPotentialNotif = (p: PotentialNotif): p is GeneralPotentialNotif => 'relatedMembers' in p
export const isEntityPotentialNotif = (p: PotentialNotif): p is EntitiyPotentialNotif => 'relatedEntityId' in p

export { NotificationEvent, PotentialNotif }
