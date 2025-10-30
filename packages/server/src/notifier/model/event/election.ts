import { pick } from 'lodash'

import {
  ElectionAnnouncingStartedEventFieldsFragmentDoc,
  ElectionRevealingStartedFieldsFragmentDoc,
  ElectionVotingStartedEventFieldsFragmentDoc,
  useFragment,
} from '@/common/queries'

import { NotifEventFromQNEvent } from './utils'

export const fromElectionAnnouncingStartedEvent: NotifEventFromQNEvent<'AnnouncingPeriodStartedEvent'> = async (
  event,
  buildEvents
) => {
  const announcingPeriodStartedEvent = useFragment(ElectionAnnouncingStartedEventFieldsFragmentDoc, event)
  const eventData = pick(announcingPeriodStartedEvent, 'inBlock', 'id')
  return buildEvents(eventData, eventData.id, [], ({ generalEvent }) => [
    generalEvent('ELECTION_ANNOUNCING_STARTED', 'ANY'),
  ])
}

export const fromElectionVotingStartedEvent: NotifEventFromQNEvent<'VotingPeriodStartedEvent'> = async (
  event,
  buildEvents
) => {
  const votingPeriodStartedEvent = useFragment(ElectionVotingStartedEventFieldsFragmentDoc, event)
  const eventData = pick(votingPeriodStartedEvent, 'inBlock', 'id')
  return buildEvents(eventData, eventData.id, [], ({ generalEvent }) => [
    generalEvent('ELECTION_VOTING_STARTED', 'ANY'),
  ])
}

export const fromElectionRevealingStartedEvent: NotifEventFromQNEvent<'RevealingStageStartedEvent'> = async (
  event,
  buildEvents
) => {
  const revealingPeriodStartedEvent = useFragment(ElectionRevealingStartedFieldsFragmentDoc, event)
  const eventData = pick(revealingPeriodStartedEvent, 'inBlock', 'id')
  return buildEvents(eventData, eventData.id, [], ({ generalEvent }) => [
    generalEvent('ELECTION_REVEALING_STARTED', 'ANY'),
  ])
}
