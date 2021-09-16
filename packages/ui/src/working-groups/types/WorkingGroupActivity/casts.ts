import BN from 'bn.js'

import { capitalizeFirstLetter } from '@/common/helpers'
import { asBaseActivity, asMemberDisplayFields } from '@/common/types'
import {
  ApplicationWithdrawnEventFieldsFragment,
  AppliedOnOpeningEventFieldsFragment,
  BudgetSetEventFieldsFragment,
  BudgetSpendingActivityEventFieldsFragment,
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
} from '@/working-groups/types'

function asPositionTitle(groupName: string, type: 'LEAD' | 'REGULAR') {
  return `${capitalizeFirstLetter(asWorkingGroupName(groupName))} ${type === 'LEAD' ? 'Lead' : 'Worker'}`
}

export function asAppliedOnOpeningActivity(fragment: AppliedOnOpeningEventFieldsFragment): AppliedOnOpeningActivity {
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

export function asApplicationWithdrawnActivity(
  fragment: ApplicationWithdrawnEventFieldsFragment
): ApplicationWithdrawnActivity {
  const type = fragment.application.opening.type === 'LEADER' ? 'LEAD' : 'REGULAR'

  return {
    eventType: fragment.__typename,
    ...asBaseActivity(fragment),
    member: asMemberDisplayFields(fragment.application.applicant),
    opening: {
      id: fragment.application.opening.id,
      type,
      groupName: fragment.group.name,
      title: asPositionTitle(fragment.group.name, type),
    },
  }
}

export function asBudgetSpendingActivity(fragment: BudgetSpendingActivityEventFieldsFragment): BudgetSpendingActivity {
  return {
    eventType: fragment.__typename,
    ...asBaseActivity(fragment),
    groupName: fragment.group.name,
    amount: new BN(fragment.amount),
  }
}

type StakeChangedFragment = StakeDecreasedEventFieldsFragment | StakeIncreasedEventFieldsFragment

export function asStakeChangedActivity(fragment: StakeChangedFragment): StakeChangedActivity {
  return {
    eventType: fragment.__typename,
    ...asBaseActivity(fragment),
    member: asMemberDisplayFields(fragment.worker.membership),
    amount: new BN(fragment.amount),
  }
}

export function asStakeSlashedActivity(fragment: StakeSlashedEventFieldsFragment): StakeSlashedActivity {
  return {
    eventType: fragment.__typename,
    ...asBaseActivity(fragment),
    member: asMemberDisplayFields(fragment.worker.membership),
    groupName: asWorkingGroupName(fragment.group.name),
  }
}

export function asOpeningActivity(
  fragment: OpeningAddedEventFieldsFragment | OpeningCanceledEventFieldsFragment
): OpeningAddedActivity | OpeningCanceledActivity {
  const type = fragment.opening.type === 'LEADER' ? 'LEAD' : 'REGULAR'

  return {
    eventType: fragment.__typename,
    ...asBaseActivity(fragment),
    opening: {
      id: fragment.opening.id,
      type,
      groupName: fragment.opening.group.name,
      title: asPositionTitle(fragment.opening.group.name, type),
    },
  }
}

export function asOpeningFilledActivity(fragment: OpeningFilledEventFieldsFragment): OpeningFilledActivity {
  const type = fragment.opening.type === 'LEADER' ? 'LEAD' : 'REGULAR'

  return {
    eventType: fragment.__typename,
    ...asBaseActivity(fragment),
    opening: {
      id: fragment.opening.id,
      type,
      groupName: fragment.group.name,
      title: asPositionTitle(fragment.group.name, type),
    },
    hiredMembers: fragment.workersHired.map(({ membership }) => asMemberDisplayFields(membership)),
  }
}

export function asWorkerExitedActivity(fragment: WorkerExitedEventFieldsFragment): WorkerExitedActivity {
  return {
    eventType: fragment.__typename,
    ...asBaseActivity(fragment),
    member: asMemberDisplayFields(fragment.worker.membership),
  }
}

export function asWorkerStartedLeavingActivity(
  fragment: WorkerStartedLeavingEventFieldsFragment
): WorkerStartedLeavingActivity {
  return {
    eventType: fragment.__typename,
    ...asBaseActivity(fragment),
    member: asMemberDisplayFields(fragment.worker.membership),
    workerStatus: fragment.worker.status.__typename,
  }
}

export function asStatusTextChangedEventActivities(
  fragment: StatusTextChangedEventFieldsFragment
): Array<StatusTextChangedActivity | OpeningAnnouncedActivity> {
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

export function asBudgetSetActivity(fragment: BudgetSetEventFieldsFragment): BudgetSetActivity {
  return {
    eventType: fragment.__typename,
    ...asBaseActivity(fragment),
    groupName: asWorkingGroupName(fragment.group.name),
    newBudget: fragment.newBudget,
  }
}

export function asWorkerTerminatedActivity(
  fragment: TerminatedLeaderEventFieldsFragment | TerminatedWorkerEventFieldsFragment
): WorkerTerminatedActivity {
  return {
    eventType: fragment.__typename,
    ...asBaseActivity(fragment),
    member: asMemberDisplayFields(fragment.worker.membership),
    groupName: asWorkingGroupName(fragment.group.name),
  }
}

export function asWorkerRewardAccountUpdatedActivity(
  fragment: WorkerRewardAccountUpdatedEventFragment
): WorkerRewardAccountUpdatedActivity {
  return {
    eventType: fragment.__typename,
    ...asBaseActivity(fragment),
  }
}

export function asWorkerRewardAmountUpdatedActivity(
  fragment: WorkerRewardAmountUpdatedEventFragment
): WorkerRewardAmountUpdatedActivity {
  return {
    eventType: fragment.__typename,
    ...asBaseActivity(fragment),
    newAmount: fragment.newRewardPerBlock,
  }
}
