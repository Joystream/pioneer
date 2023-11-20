import { maskFragment } from '@test/_mocks/utils'

import {
  ElectionAnnouncingStartedEventFieldsFragment,
  ElectionRevealingStartedFieldsFragment,
  ElectionVotingStartedEventFieldsFragment,
  GetNotificationEventsQuery,
} from '@/common/queries'

export const electionAnnouncingEvent = (id: string): GetNotificationEventsQuery['events'][0] =>
  maskFragment(
    'ElectionAnnouncingStartedEventFields',
    'AnnouncingPeriodStartedEvent'
  )<ElectionAnnouncingStartedEventFieldsFragment>({
    id,
    inBlock: 1,
  })

export const electionVotingEvent = (id: string): GetNotificationEventsQuery['events'][0] =>
  maskFragment(
    'ElectionVotingStartedEventFields',
    'VotingPeriodStartedEvent'
  )<ElectionVotingStartedEventFieldsFragment>({
    id,
    inBlock: 1,
  })

export const electionRevealingEvent = (id: string): GetNotificationEventsQuery['events'][0] =>
  maskFragment(
    'ElectionRevealingStartedFields',
    'RevealingStageStartedEvent'
  )<ElectionRevealingStartedFieldsFragment>({
    id,
    inBlock: 1,
  })
