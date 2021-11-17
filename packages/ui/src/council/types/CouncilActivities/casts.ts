import { asBaseActivity } from '@/common/types'
import {
  NewCouncilElectedEventFieldsFragment,
  CandidacyWithdrawEventFieldsFragment,
  AnnouncingPeriodStartedEventFieldsFragment,
  VotingPeriodStartedEventFieldsFragment,
  CouncilorRewardUpdatedEventFieldsFragment,
  NewCandidateEventFieldsFragment,
  NotEnoughCandidatesEventFieldsFragment,
  RevealingStageStartedEventFieldsFragment,
  GetCouncilEventsQuery,
} from '@/council/queries/__generated__/councilEvents.generated'
import {
  CouncilEventFieldsFragment,
  CouncilActivity,
  NewCouncilElectedActivity,
  AnnouncingPeriodStartedActivity,
  VotingPeriodStartedActivity,
  RevealingStageStartedActivity,
  NewCandidateActivity,
  CouncilWithdrawActivity,
  CouncilorRewardUpdatedActivity,
  NotEnoughCandidatesActivity,
} from '@/council/types/CouncilActivities/types'

interface CouncilActivityCast<Fields, Activity extends CouncilActivity> {
  (fields: Fields): Activity
}

const asAnnouncingPeriodStartedActivity: CouncilActivityCast<
  AnnouncingPeriodStartedEventFieldsFragment,
  AnnouncingPeriodStartedActivity
> = (fields) => ({
  eventType: fields.__typename,
  ...asBaseActivity(fields),
})

const asRevealingStageStartedActivity: CouncilActivityCast<
  RevealingStageStartedEventFieldsFragment,
  RevealingStageStartedActivity
> = (fields) => ({
  eventType: fields.__typename,
  ...asBaseActivity(fields),
})

const asVotingPeriodStartedActivity: CouncilActivityCast<
  VotingPeriodStartedEventFieldsFragment,
  VotingPeriodStartedActivity
> = (fields) => ({
  eventType: fields.__typename,
  ...asBaseActivity(fields),
})

const asNewCouncilElectedActivity: CouncilActivityCast<
  NewCouncilElectedEventFieldsFragment,
  NewCouncilElectedActivity
> = (fields) => ({
  eventType: fields.__typename,
  ...asBaseActivity(fields),
  electedMembersNumber: fields.electedMembers.length,
})

const asNewCandidateActivity: CouncilActivityCast<NewCandidateEventFieldsFragment, NewCandidateActivity> = (
  fields
) => ({
  eventType: fields.__typename,
  ...asBaseActivity(fields),
  candidateHandle: fields.member.handle,
})

const asCandidacyWithdrawActivity: CouncilActivityCast<
  CandidacyWithdrawEventFieldsFragment,
  CouncilWithdrawActivity
> = (fields) => ({
  eventType: fields.__typename,
  ...asBaseActivity(fields),
  candidateHandle: fields.member.handle,
})

const asCouncilorRewardUpdatedActivity: CouncilActivityCast<
  CouncilorRewardUpdatedEventFieldsFragment,
  CouncilorRewardUpdatedActivity
> = (fields) => ({
  eventType: fields.__typename,
  ...asBaseActivity(fields),
  newReward: fields.rewardAmount,
})

const asNotEnoughCandidatesActivity: CouncilActivityCast<
  NotEnoughCandidatesEventFieldsFragment,
  NotEnoughCandidatesActivity
> = (fields) => ({
  eventType: fields.__typename,
  ...asBaseActivity(fields),
})

const councilCastByType: Record<CouncilEventFieldsFragment['__typename'], CouncilActivityCast<any, CouncilActivity>> = {
  AnnouncingPeriodStartedEvent: asAnnouncingPeriodStartedActivity,
  RevealingStageStartedEvent: asRevealingStageStartedActivity,
  VotingPeriodStartedEvent: asVotingPeriodStartedActivity,
  NewCouncilElectedEvent: asNewCouncilElectedActivity,
  NewCandidateEvent: asNewCandidateActivity,
  CandidacyWithdrawEvent: asCandidacyWithdrawActivity,
  CouncilorRewardUpdatedEvent: asCouncilorRewardUpdatedActivity,
  NotEnoughCandidatesEvent: asNotEnoughCandidatesActivity,
}

type EventsQueryResult = GetCouncilEventsQuery['events'][0]

const isCouncilEvent = (fields: EventsQueryResult): fields is CouncilEventFieldsFragment =>
  fields.__typename in councilCastByType

export const asCouncilActivities = (events: EventsQueryResult[]) =>
  events.filter(isCouncilEvent).map((eventFields) => councilCastByType[eventFields.__typename](eventFields))
