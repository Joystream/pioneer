import { GetNotificationEventsQuery } from '@/common/queries'

import { fromPostAddedEvent } from './forum'
import { buildEvents } from './utils/buildEvent'
import { ImplementedQNEvent, NotificationEvent, PotentialNotif } from './utils/types'

export { isGeneralPotentialNotif, isEntityPotentialNotif } from './utils/utils'
export { NotificationEvent, PotentialNotif }

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
