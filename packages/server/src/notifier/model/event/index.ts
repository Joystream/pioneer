import { match } from 'ts-pattern'

import { GetCurrentRolesQuery, GetNotificationEventsQuery } from '@/common/queries'
import { NotificationEvent } from '@/notifier/types'

import {
  fromElectionAnnouncingStartedEvent,
  fromElectionRevealingStartedEvent,
  fromElectionVotingStartedEvent,
} from './election'
import { fromPostAddedEvent, fromThreadCreatedEvent } from './forum'
import { fromProposalPostAddedEvent } from './proposal'
import { buildEvents } from './utils/buildEvent'
import { ImplementedQNEvent } from './utils/types'

export { isGeneralPotentialNotif, isEntityPotentialNotif } from './utils'

type AnyQNEvent = GetNotificationEventsQuery['events'][0]

export const toNotificationEvents =
  (allMemberIds: number[], roles: GetCurrentRolesQuery) =>
  async (anyEvent: AnyQNEvent): Promise<NotificationEvent> => {
    // NOTE: The conversion to ImplementedQNEvent assumes that the QN will only return
    // events with fragments defined in the codegen document.
    // As a result any event fragment not implemented here will result in a type error.
    const event = anyEvent as ImplementedQNEvent
    const build = buildEvents(allMemberIds, event)

    const notifEvent = match(event)
      .with({ __typename: 'PostAddedEvent' }, (e) => fromPostAddedEvent(e, build, roles))
      .with({ __typename: 'ThreadCreatedEvent' }, (e) => fromThreadCreatedEvent(e, build, roles))
      .with({ __typename: 'ProposalDiscussionPostCreatedEvent' }, (e) => fromProposalPostAddedEvent(e, build, roles))
      .with({ __typename: 'AnnouncingPeriodStartedEvent' }, (e) => fromElectionAnnouncingStartedEvent(e, build))
      .with({ __typename: 'VotingPeriodStartedEvent' }, (e) => fromElectionVotingStartedEvent(e, build))
      .with({ __typename: 'RevealingStageStartedEvent' }, (e) => fromElectionRevealingStartedEvent(e, build))
      .exhaustive()

    return notifEvent
  }
