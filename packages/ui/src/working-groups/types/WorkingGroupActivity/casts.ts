import BN from 'bn.js'

import { capitalizeFirstLetter } from '@/common/helpers'
import { asBaseActivity, asMemberDisplayFields } from '@/common/types'
import {
  ApplicationWithdrawnEventFieldsFragment,
  AppliedOnOpeningEventFieldsFragment,
  BudgetSetEventFieldsFragment,
  BudgetSpendingActivityEventFieldsFragment,
  GetOpeningsEventsQuery,
  OpeningAddedEventFieldsFragment,
  OpeningCanceledEventFieldsFragment,
  OpeningFilledEventFieldsFragment,
  StakeDecreasedEventFieldsFragment,
  StakeIncreasedEventFieldsFragment,
  StakeSlashedEventFieldsFragment,
  StatusTextChangedEventFieldsFragment,
  TerminatedLeaderEventFieldsFragment,
  TerminatedWorkerEventFieldsFragment,
  WorkerExitedEventFieldsFragment,
  WorkerRewardAccountUpdatedEventFragment,
  WorkerRewardAmountUpdatedEventFragment,
  WorkerStartedLeavingEventFieldsFragment,
} from '@/working-groups/queries/__generated__/workingGroupsEvents.generated'
import {
  ApplicationWithdrawnActivity,
  AppliedOnOpeningActivity,
  asWorkingGroupName,
  BudgetSetActivity,
  BudgetSpendingActivity,
  GroupIdName,
  OpeningAddedActivity,
  OpeningAnnouncedActivity,
  OpeningCanceledActivity,
  OpeningFilledActivity,
  StakeChangedActivity,
  StakeSlashedActivity,
  StatusTextChangedActivity,
  WorkerExitedActivity,
  WorkerRewardAccountUpdatedActivity,
  WorkerRewardAmountUpdatedActivity,
  WorkerStartedLeavingActivity,
  WorkerTerminatedActivity,
  WorkingGroupActivity,
} from '@/working-groups/types'

function asPositionTitle(groupName: string, type: 'LEAD' | 'REGULAR') {
  return `${capitalizeFirstLetter(asWorkingGroupName(groupName))} ${type === 'LEAD' ? 'Lead' : 'Worker'}`
}

export const asAppliedOnOpeningActivity: GroupActivityCast<
  AppliedOnOpeningEventFieldsFragment,
  AppliedOnOpeningActivity
> = (fragment): AppliedOnOpeningActivity => {
  const type = fragment.opening.type === 'LEADER' ? 'LEAD' : 'REGULAR'

  return {
    eventType: fragment.__typename,
    ...asBaseActivity(fragment),
    member: asMemberDisplayFields(fragment.application.applicant),
    opening: {
      id: fragment.opening.id,
      type: type,
      groupName: fragment.group.name,
      title: asPositionTitle(fragment.group.name, type),
    },
  }
}

export const asApplicationWithdrawnActivity: GroupActivityCast<
  ApplicationWithdrawnEventFieldsFragment,
  ApplicationWithdrawnActivity
> = (fragment): ApplicationWithdrawnActivity => {
  const type = fragment.application.opening.type === 'LEADER' ? 'LEAD' : 'REGULAR'

  return {
    eventType: fragment.__typename,
    ...asBaseActivity(fragment),
    member: asMemberDisplayFields(fragment.application.applicant),
    opening: {
      id: fragment.application.opening.id,
      type,
      groupName: fragment.group.name as GroupIdName,
      title: asPositionTitle(fragment.group.name, type),
    },
  }
}

export const asBudgetSpendingActivity: GroupActivityCast<
  BudgetSpendingActivityEventFieldsFragment,
  BudgetSpendingActivity
> = (fragment): BudgetSpendingActivity => ({
  eventType: fragment.__typename,
  ...asBaseActivity(fragment),
  groupName: fragment.group.name,
  amount: new BN(fragment.amount),
})

type StakeChangedFragment = StakeDecreasedEventFieldsFragment | StakeIncreasedEventFieldsFragment

export const asStakeChangedActivity: GroupActivityCast<StakeChangedFragment, StakeChangedActivity> = (
  fragment
): StakeChangedActivity => ({
  eventType: fragment.__typename,
  ...asBaseActivity(fragment),
  member: asMemberDisplayFields(fragment.worker.membership),
  amount: new BN(fragment.amount),
})

export const asStakeSlashedActivity: GroupActivityCast<StakeSlashedEventFieldsFragment, StakeSlashedActivity> = (
  fragment
): StakeSlashedActivity => ({
  eventType: fragment.__typename,
  ...asBaseActivity(fragment),
  member: asMemberDisplayFields(fragment.worker.membership),
  groupName: asWorkingGroupName(fragment.group.name),
})

export const asOpeningActivity: GroupActivityCast<
  OpeningAddedEventFieldsFragment | OpeningCanceledEventFieldsFragment,
  OpeningAddedActivity | OpeningCanceledActivity
> = (fragment): OpeningAddedActivity | OpeningCanceledActivity => {
  const type = fragment.opening.type === 'LEADER' ? 'LEAD' : 'REGULAR'

  return {
    eventType: fragment.__typename,
    ...asBaseActivity(fragment),
    opening: {
      id: fragment.opening.id,
      type,
      groupName: fragment.opening.group.name as GroupIdName,
      title: asPositionTitle(fragment.opening.group.name, type),
    },
  }
}

export const asOpeningFilledActivity: GroupActivityCast<OpeningFilledEventFieldsFragment, OpeningFilledActivity> = (
  fragment
): OpeningFilledActivity => {
  const type = fragment.opening.type === 'LEADER' ? 'LEAD' : 'REGULAR'

  return {
    eventType: fragment.__typename,
    ...asBaseActivity(fragment),
    opening: {
      id: fragment.opening.id,
      type,
      groupName: fragment.group.name as GroupIdName,
      title: asPositionTitle(fragment.group.name, type),
    },
    hiredMembers: fragment.workersHired.map(({ membership }) => asMemberDisplayFields(membership)),
  }
}

export const asWorkerExitedActivity: GroupActivityCast<WorkerExitedEventFieldsFragment, WorkerExitedActivity> = (
  fragment
): WorkerExitedActivity => ({
  eventType: fragment.__typename,
  ...asBaseActivity(fragment),
  member: asMemberDisplayFields(fragment.worker.membership),
})

export const asWorkerStartedLeavingActivity: GroupActivityCast<
  WorkerStartedLeavingEventFieldsFragment,
  WorkerStartedLeavingActivity
> = (fragment): WorkerStartedLeavingActivity => ({
  eventType: fragment.__typename,
  ...asBaseActivity(fragment),
  member: asMemberDisplayFields(fragment.worker.membership),
  workerStatus: fragment.worker.status.__typename,
})

export const asStatusTextChangedEventActivities: GroupActivityCast<
  StatusTextChangedEventFieldsFragment,
  StatusTextChangedActivity | OpeningAnnouncedActivity
> = (fragment): Array<StatusTextChangedActivity | OpeningAnnouncedActivity> => {
  const result: Array<StatusTextChangedActivity | OpeningAnnouncedActivity> = []
  if (fragment.workinggroupmetadatasetInEvent?.length) {
    result.push({
      eventType: fragment.__typename,
      ...asBaseActivity(fragment),
      groupName: asWorkingGroupName(fragment.group.name),
    })
  }
  fragment.upcomingworkinggroupopeningcreatedInEvent?.forEach((opening) => {
    result.push({
      id: opening.id,
      eventType: 'OpeningAnnounced',
      createdAt: fragment.createdAt,
      groupName: asWorkingGroupName(fragment.group.name),
      openingId: opening.id,
    })
  })
  return result
}

export const asBudgetSetActivity: GroupActivityCast<BudgetSetEventFieldsFragment, BudgetSetActivity> = (
  fragment
): BudgetSetActivity => ({
  eventType: fragment.__typename,
  ...asBaseActivity(fragment),
  groupName: asWorkingGroupName(fragment.group.name),
  newBudget: new BN(fragment.newBudget),
})

export const asWorkerTerminatedActivity: GroupActivityCast<
  TerminatedLeaderEventFieldsFragment | TerminatedWorkerEventFieldsFragment,
  WorkerTerminatedActivity
> = (fragment): WorkerTerminatedActivity => ({
  eventType: fragment.__typename,
  ...asBaseActivity(fragment),
  member: asMemberDisplayFields(fragment.worker.membership),
  groupName: asWorkingGroupName(fragment.group.name),
})

export const asWorkerRewardAccountUpdatedActivity: GroupActivityCast<
  WorkerRewardAccountUpdatedEventFragment,
  WorkerRewardAccountUpdatedActivity
> = (fragment): WorkerRewardAccountUpdatedActivity => ({
  eventType: fragment.__typename,
  ...asBaseActivity(fragment),
})

export const asWorkerRewardAmountUpdatedActivity: GroupActivityCast<
  WorkerRewardAmountUpdatedEventFragment,
  WorkerRewardAmountUpdatedActivity
> = (fragment): WorkerRewardAmountUpdatedActivity => ({
  eventType: fragment.__typename,
  ...asBaseActivity(fragment),
  member: asMemberDisplayFields(fragment.worker.membership),
  newAmount: new BN(fragment.newRewardPerBlock),
  openingTitle: fragment.worker.application.opening.metadata.title ?? '',
  groupId: fragment.worker.application.opening.groupId as GroupIdName,
})

type WorkingGroupEventFields =
  | ApplicationWithdrawnEventFieldsFragment
  | AppliedOnOpeningEventFieldsFragment
  | BudgetSetEventFieldsFragment
  | BudgetSpendingActivityEventFieldsFragment
  | OpeningAddedEventFieldsFragment
  | OpeningCanceledEventFieldsFragment
  | OpeningFilledEventFieldsFragment
  | StakeDecreasedEventFieldsFragment
  | StakeIncreasedEventFieldsFragment
  | StakeSlashedEventFieldsFragment
  | StatusTextChangedEventFieldsFragment
  | TerminatedLeaderEventFieldsFragment
  | TerminatedWorkerEventFieldsFragment
  | WorkerExitedEventFieldsFragment
  | WorkerRewardAccountUpdatedEventFragment
  | WorkerRewardAmountUpdatedEventFragment
  | WorkerStartedLeavingEventFieldsFragment

type GroupActivityCast<Fields, Activity extends WorkingGroupActivity> = (fields: Fields) => Activity | Activity[]

type EventsQueryResult = GetOpeningsEventsQuery['events'][0]

const activityCastByType: Record<
  WorkingGroupEventFields['__typename'],
  GroupActivityCast<any, WorkingGroupActivity>
> = {
  ApplicationWithdrawnEvent: asApplicationWithdrawnActivity,
  AppliedOnOpeningEvent: asAppliedOnOpeningActivity,
  BudgetSetEvent: asBudgetSetActivity,
  BudgetSpendingEvent: asBudgetSpendingActivity,
  OpeningAddedEvent: asOpeningActivity,
  OpeningCanceledEvent: asOpeningActivity,
  OpeningFilledEvent: asOpeningFilledActivity,
  StakeDecreasedEvent: asStakeChangedActivity,
  StakeIncreasedEvent: asStakeChangedActivity,
  StakeSlashedEvent: asStakeSlashedActivity,
  StatusTextChangedEvent: asStatusTextChangedEventActivities,
  TerminatedLeaderEvent: asWorkerTerminatedActivity,
  TerminatedWorkerEvent: asWorkerTerminatedActivity,
  WorkerExitedEvent: asWorkerExitedActivity,
  WorkerRewardAccountUpdatedEvent: asWorkerRewardAccountUpdatedActivity,
  WorkerRewardAmountUpdatedEvent: asWorkerRewardAmountUpdatedActivity,
  WorkerStartedLeavingEvent: asWorkerStartedLeavingActivity,
}

const isGroupEvent = (fields: EventsQueryResult): fields is WorkingGroupEventFields =>
  fields.__typename in activityCastByType

export const asOpeningsActivities = (events: EventsQueryResult[]) =>
  events
    .filter(isGroupEvent)
    .map((eventFields) => activityCastByType[eventFields.__typename](eventFields))
    .flat()
