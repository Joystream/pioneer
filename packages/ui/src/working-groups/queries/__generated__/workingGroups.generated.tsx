import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import {
  MemberFieldsFragment,
  MemberFieldsFragmentDoc,
} from '../../../memberships/queries/__generated__/members.generated'
import { gql } from '@apollo/client'

import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type WorkingGroupMetdataFieldsFragment = {
  __typename: 'WorkingGroupMetadata'
  about?: Types.Maybe<string>
  description?: Types.Maybe<string>
  status?: Types.Maybe<string>
  statusMessage?: Types.Maybe<string>
}

export type WorkerFieldsFragment = {
  __typename: 'Worker'
  id: string
  runtimeId: number
  applicationId: string
  isLead: boolean
  rewardPerBlock: any
  missingRewardAmount?: Types.Maybe<any>
  stake: any
  membership: { __typename: 'Membership' } & MemberFieldsFragment
  group: { __typename: 'WorkingGroup'; id: string; name: string }
  status:
    | { __typename: 'WorkerStatusActive' }
    | { __typename: 'WorkerStatusLeaving' }
    | { __typename: 'WorkerStatusLeft' }
    | { __typename: 'WorkerStatusTerminated' }
}

export type WorkerDetailedFieldsFragment = {
  __typename: 'Worker'
  roleAccount: string
  rewardAccount: string
  stakeAccount: string
  application: {
    __typename: 'WorkingGroupApplication'
    id: string
    openingId: string
    opening: { __typename: 'WorkingGroupOpening'; stakeAmount: any }
  }
} & WorkerFieldsFragment

export type WorkingGroupFieldsFragment = {
  __typename: 'WorkingGroup'
  id: string
  name: string
  budget: any
  metadata?: Types.Maybe<{ __typename: 'WorkingGroupMetadata' } & WorkingGroupMetdataFieldsFragment>
  workers: Array<{ __typename: 'Worker'; stake: any }>
  leader?: Types.Maybe<{ __typename: 'Worker'; membershipId: string }>
}

export type WorkingGroupDetailedFieldsFragment = {
  __typename: 'WorkingGroup'
  leader?: Types.Maybe<{ __typename: 'Worker'; id: string; runtimeId: number; stake: any; membershipId: string }>
} & WorkingGroupFieldsFragment

export type BudgetSpendingEventFieldsFragment = {
  __typename: 'BudgetSpendingEvent'
  id: string
  groupId: string
  reciever: string
  amount: any
  rationale?: Types.Maybe<string>
}

export type GetBudgetSpendingQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.BudgetSpendingEventWhereInput>
}>

export type GetBudgetSpendingQuery = {
  __typename: 'Query'
  budgetSpendingEvents: Array<{ __typename: 'BudgetSpendingEvent' } & BudgetSpendingEventFieldsFragment>
}

export type RewardPaidEventFieldsFragment = {
  __typename: 'RewardPaidEvent'
  id: string
  amount: any
  rewardAccount: string
  createdAt: any
}

export type GetWorkingGroupsQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetWorkingGroupsQuery = {
  __typename: 'Query'
  workingGroups: Array<{ __typename: 'WorkingGroup' } & WorkingGroupFieldsFragment>
}

export type GetWorkersQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.WorkerWhereInput>
  offset?: Types.Maybe<Types.Scalars['Int']>
  limit?: Types.Maybe<Types.Scalars['Int']>
}>

export type GetWorkersQuery = { __typename: 'Query'; workers: Array<{ __typename: 'Worker' } & WorkerFieldsFragment> }

export type GetWorkersCountQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.WorkerWhereInput>
}>

export type GetWorkersCountQuery = {
  __typename: 'Query'
  workersConnection: { __typename: 'WorkerConnection'; totalCount: number }
}

export type GetDetailedWorkersQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.WorkerWhereInput>
}>

export type GetDetailedWorkersQuery = {
  __typename: 'Query'
  workers: Array<{ __typename: 'Worker' } & WorkerDetailedFieldsFragment>
}

export type GetWorkerQueryVariables = Types.Exact<{
  where: Types.WorkerWhereUniqueInput
}>

export type GetWorkerQuery = {
  __typename: 'Query'
  workerByUniqueInput?: Types.Maybe<{ __typename: 'Worker' } & WorkerDetailedFieldsFragment>
}

export type GetGroupDebtQueryVariables = Types.Exact<{
  where: Types.WorkerWhereInput
}>

export type GetGroupDebtQuery = {
  __typename: 'Query'
  workers: Array<{ __typename: 'Worker'; missingRewardAmount?: Types.Maybe<any> }>
}

export type GetRewardsQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.RewardPaidEventWhereInput>
}>

export type GetRewardsQuery = {
  __typename: 'Query'
  rewardPaidEvents: Array<{ __typename: 'RewardPaidEvent' } & RewardPaidEventFieldsFragment>
}

export type WorkingGroupOpeningMetadataFieldsFragment = {
  __typename: 'WorkingGroupOpeningMetadata'
  applicationDetails?: Types.Maybe<string>
  shortDescription?: Types.Maybe<string>
  description?: Types.Maybe<string>
  hiringLimit?: Types.Maybe<number>
  expectedEnding?: Types.Maybe<any>
}

export type WorkingGroupOpeningFieldsFragment = {
  __typename: 'WorkingGroupOpening'
  id: string
  runtimeId: number
  groupId: string
  type: Types.WorkingGroupOpeningType
  stakeAmount: any
  rewardPerBlock: any
  unstakingPeriod: number
  group: { __typename: 'WorkingGroup'; name: string; budget: any; leaderId?: Types.Maybe<string> }
  metadata: { __typename: 'WorkingGroupOpeningMetadata' } & WorkingGroupOpeningMetadataFieldsFragment
  status:
    | { __typename: 'OpeningStatusOpen' }
    | { __typename: 'OpeningStatusFilled' }
    | { __typename: 'OpeningStatusCancelled' }
  applications: Array<{ __typename: 'WorkingGroupApplication'; id: string }>
}

export type WorkingGroupOpeningDetailedFieldsFragment = {
  __typename: 'WorkingGroupOpening'
  applications: Array<{
    __typename: 'WorkingGroupApplication'
    id: string
    status:
      | { __typename: 'ApplicationStatusPending' }
      | { __typename: 'ApplicationStatusAccepted' }
      | { __typename: 'ApplicationStatusRejected' }
      | { __typename: 'ApplicationStatusWithdrawn' }
      | { __typename: 'ApplicationStatusCancelled' }
    applicant: { __typename: 'Membership' } & MemberFieldsFragment
  }>
} & WorkingGroupOpeningFieldsFragment

export type CountWorkingGroupOpeningsQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.WorkingGroupOpeningWhereInput>
}>

export type CountWorkingGroupOpeningsQuery = {
  __typename: 'Query'
  workingGroupOpeningsConnection: { __typename: 'WorkingGroupOpeningConnection'; totalCount: number }
}

export type CountWorkingGroupWorkersQueryVariables = Types.Exact<{
  groupId_eq?: Types.Maybe<Types.Scalars['ID']>
  status_json?: Types.Maybe<Types.Scalars['JSONObject']>
}>

export type CountWorkingGroupWorkersQuery = {
  __typename: 'Query'
  workersConnection: { __typename: 'WorkerConnection'; totalCount: number }
}

export type GetWorkingGroupOpeningsQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.WorkingGroupOpeningWhereInput>
  limit?: Types.Maybe<Types.Scalars['Int']>
  offset?: Types.Maybe<Types.Scalars['Int']>
}>

export type GetWorkingGroupOpeningsQuery = {
  __typename: 'Query'
  workingGroupOpenings: Array<{ __typename: 'WorkingGroupOpening' } & WorkingGroupOpeningFieldsFragment>
}

export type GetWorkingGroupOpeningQueryVariables = Types.Exact<{
  where: Types.WorkingGroupOpeningWhereUniqueInput
}>

export type GetWorkingGroupOpeningQuery = {
  __typename: 'Query'
  workingGroupOpeningByUniqueInput?: Types.Maybe<
    { __typename: 'WorkingGroupOpening' } & WorkingGroupOpeningDetailedFieldsFragment
  >
}

export type ApplicationQuestionFieldsFragment = {
  __typename: 'ApplicationFormQuestion'
  index: number
  type: Types.ApplicationFormQuestionType
  question?: Types.Maybe<string>
}

export type GetWorkingGroupOpeningQuestionsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetWorkingGroupOpeningQuestionsQuery = {
  __typename: 'Query'
  workingGroupOpeningByUniqueInput?: Types.Maybe<{
    __typename: 'WorkingGroupOpening'
    metadata: {
      __typename: 'WorkingGroupOpeningMetadata'
      applicationFormQuestions: Array<{ __typename: 'ApplicationFormQuestion' } & ApplicationQuestionFieldsFragment>
    }
  }>
}

export type GetWorkingGroupQueryVariables = Types.Exact<{
  where: Types.WorkingGroupWhereUniqueInput
}>

export type GetWorkingGroupQuery = {
  __typename: 'Query'
  workingGroupByUniqueInput?: Types.Maybe<{ __typename: 'WorkingGroup' } & WorkingGroupDetailedFieldsFragment>
}

export type WorkingGroupApplicationFieldsFragment = {
  __typename: 'WorkingGroupApplication'
  id: string
  stakingAccount: string
  opening: {
    __typename: 'WorkingGroupOpening'
    id: string
    type: Types.WorkingGroupOpeningType
    rewardPerBlock: any
    group: { __typename: 'WorkingGroup'; name: string }
  }
  applicant: { __typename: 'Membership' } & MemberFieldsFragment
  status:
    | { __typename: 'ApplicationStatusPending' }
    | { __typename: 'ApplicationStatusAccepted' }
    | { __typename: 'ApplicationStatusRejected' }
    | { __typename: 'ApplicationStatusWithdrawn' }
    | { __typename: 'ApplicationStatusCancelled' }
}

export type GetWorkingGroupApplicationsQueryVariables = Types.Exact<{
  applicantId_in?: Types.Maybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>
}>

export type GetWorkingGroupApplicationsQuery = {
  __typename: 'Query'
  workingGroupApplications: Array<{ __typename: 'WorkingGroupApplication' } & WorkingGroupApplicationFieldsFragment>
}

export type GetWorkingGroupApplicationIdsQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.WorkingGroupApplicationWhereInput>
}>

export type GetWorkingGroupApplicationIdsQuery = {
  __typename: 'Query'
  workingGroupApplications: Array<{ __typename: 'WorkingGroupApplication'; id: string }>
}

export type GetWorkingGroupApplicationQueryVariables = Types.Exact<{
  where: Types.WorkingGroupApplicationWhereUniqueInput
}>

export type GetWorkingGroupApplicationQuery = {
  __typename: 'Query'
  workingGroupApplicationByUniqueInput?: Types.Maybe<
    { __typename: 'WorkingGroupApplication' } & WorkingGroupApplicationFieldsFragment
  >
}

export type ApplicationFormQuestionAnswerFieldsFragment = {
  __typename: 'ApplicationFormQuestionAnswer'
  answer: string
  question: { __typename: 'ApplicationFormQuestion' } & ApplicationQuestionFieldsFragment
}

export type GetApplicationFormQuestionAnswerQueryVariables = Types.Exact<{
  applicationId_eq?: Types.Maybe<Types.Scalars['ID']>
}>

export type GetApplicationFormQuestionAnswerQuery = {
  __typename: 'Query'
  applicationFormQuestionAnswers: Array<
    { __typename: 'ApplicationFormQuestionAnswer' } & ApplicationFormQuestionAnswerFieldsFragment
  >
}

export type UpcomingWorkingGroupOpeningFieldsFragment = {
  __typename: 'UpcomingWorkingGroupOpening'
  id: string
  groupId: string
  expectedStart?: Types.Maybe<any>
  stakeAmount?: Types.Maybe<any>
  rewardPerBlock?: Types.Maybe<any>
  group: { __typename: 'WorkingGroup'; name: string; budget: any; leaderId?: Types.Maybe<string> }
  metadata: { __typename: 'WorkingGroupOpeningMetadata' } & WorkingGroupOpeningMetadataFieldsFragment
}

export type GetUpcomingWorkingGroupOpeningQueryVariables = Types.Exact<{
  where: Types.UpcomingWorkingGroupOpeningWhereUniqueInput
}>

export type GetUpcomingWorkingGroupOpeningQuery = {
  __typename: 'Query'
  upcomingWorkingGroupOpeningByUniqueInput?: Types.Maybe<
    { __typename: 'UpcomingWorkingGroupOpening' } & UpcomingWorkingGroupOpeningFieldsFragment
  >
}

export type GetUpcomingWorkingGroupOpeningsQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.UpcomingWorkingGroupOpeningWhereInput>
  limit?: Types.Maybe<Types.Scalars['Int']>
  offset?: Types.Maybe<Types.Scalars['Int']>
}>

export type GetUpcomingWorkingGroupOpeningsQuery = {
  __typename: 'Query'
  upcomingWorkingGroupOpenings: Array<
    { __typename: 'UpcomingWorkingGroupOpening' } & UpcomingWorkingGroupOpeningFieldsFragment
  >
}

export type AppliedOnOpeningEventFieldsFragment = {
  __typename: 'AppliedOnOpeningEvent'
  id: string
  createdAt: any
  application: {
    __typename: 'WorkingGroupApplication'
    applicant: { __typename: 'Membership'; id: string; handle: string }
  }
  opening: { __typename: 'WorkingGroupOpening'; id: string; type: Types.WorkingGroupOpeningType }
  group: { __typename: 'WorkingGroup'; name: string }
}

export type ApplicationWithdrawnEventFieldsFragment = {
  __typename: 'ApplicationWithdrawnEvent'
  id: string
  createdAt: any
  application: {
    __typename: 'WorkingGroupApplication'
    opening: { __typename: 'WorkingGroupOpening'; id: string; type: Types.WorkingGroupOpeningType }
    applicant: { __typename: 'Membership'; id: string; handle: string }
  }
  group: { __typename: 'WorkingGroup'; name: string }
}

export type BudgetSpendingActivityEventFieldsFragment = {
  __typename: 'BudgetSpendingEvent'
  id: string
  createdAt: any
  amount: any
  group: { __typename: 'WorkingGroup'; name: string }
}

export type StakeDecreasedEventFieldsFragment = {
  __typename: 'StakeDecreasedEvent'
  id: string
  createdAt: any
  amount: any
  worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
}

export type StakeIncreasedEventFieldsFragment = {
  __typename: 'StakeIncreasedEvent'
  id: string
  createdAt: any
  amount: any
  worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
}

export type StakeSlashedEventFieldsFragment = {
  __typename: 'StakeSlashedEvent'
  id: string
  createdAt: any
  group: { __typename: 'WorkingGroup'; id: string; name: string }
  worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
}

export type OpeningFilledEventFieldsFragment = {
  __typename: 'OpeningFilledEvent'
  id: string
  createdAt: any
  opening: { __typename: 'WorkingGroupOpening'; id: string; type: Types.WorkingGroupOpeningType }
  group: { __typename: 'WorkingGroup'; name: string }
  workersHired: Array<{ __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }>
}

export type WorkerStartedLeavingEventFieldsFragment = {
  __typename: 'WorkerStartedLeavingEvent'
  id: string
  createdAt: any
  group: { __typename: 'WorkingGroup'; name: string }
  worker: {
    __typename: 'Worker'
    status:
      | { __typename: 'WorkerStatusActive' }
      | { __typename: 'WorkerStatusLeaving' }
      | { __typename: 'WorkerStatusLeft' }
      | { __typename: 'WorkerStatusTerminated' }
    membership: { __typename: 'Membership'; id: string; handle: string }
  }
}

export type WorkerExitedEventFieldsFragment = {
  __typename: 'WorkerExitedEvent'
  id: string
  createdAt: any
  group: { __typename: 'WorkingGroup'; name: string }
  worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
}

export type StatusTextChangedEventFieldsFragment = {
  __typename: 'StatusTextChangedEvent'
  id: string
  createdAt: any
  workinggroupmetadatasetInEvent?: Types.Maybe<Array<{ __typename: 'WorkingGroupMetadata'; id: string }>>
  upcomingworkinggroupopeningcreatedInEvent?: Types.Maybe<
    Array<{ __typename: 'UpcomingWorkingGroupOpening'; id: string }>
  >
  group: { __typename: 'WorkingGroup'; name: string }
}

export type OpeningAddedEventFieldsFragment = {
  __typename: 'OpeningAddedEvent'
  id: string
  createdAt: any
  opening: {
    __typename: 'WorkingGroupOpening'
    id: string
    type: Types.WorkingGroupOpeningType
    group: { __typename: 'WorkingGroup'; name: string }
  }
}

export type OpeningCanceledEventFieldsFragment = {
  __typename: 'OpeningCanceledEvent'
  id: string
  createdAt: any
  opening: {
    __typename: 'WorkingGroupOpening'
    id: string
    type: Types.WorkingGroupOpeningType
    group: { __typename: 'WorkingGroup'; name: string }
  }
}

export type BudgetSetEventFieldsFragment = {
  __typename: 'BudgetSetEvent'
  id: string
  createdAt: any
  newBudget: any
  group: { __typename: 'WorkingGroup'; name: string }
}

export type TerminatedWorkerEventFieldsFragment = {
  __typename: 'TerminatedWorkerEvent'
  id: string
  createdAt: any
  group: { __typename: 'WorkingGroup'; name: string }
  worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
}

export type TerminatedLeaderEventFieldsFragment = {
  __typename: 'TerminatedLeaderEvent'
  id: string
  createdAt: any
  group: { __typename: 'WorkingGroup'; name: string }
  worker: { __typename: 'Worker'; membership: { __typename: 'Membership'; id: string; handle: string } }
}

export type WorkerRewardAmountUpdatedEventFragment = {
  __typename: 'WorkerRewardAmountUpdatedEvent'
  id: string
  createdAt: any
  newRewardPerBlock: any
}

export type WorkerRewardAccountUpdatedEventFragment = {
  __typename: 'WorkerRewardAccountUpdatedEvent'
  id: string
  createdAt: any
  newRewardAccount: string
}

export type GetMemberRoleEventsQueryVariables = Types.Exact<{
  worker_in?: Types.Maybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>
  application_in?: Types.Maybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>
}>

export type GetMemberRoleEventsQuery = {
  __typename: 'Query'
  appliedOnOpeningEvents: Array<{ __typename: 'AppliedOnOpeningEvent' } & AppliedOnOpeningEventFieldsFragment>
  applicationWithdrawnEvents: Array<
    { __typename: 'ApplicationWithdrawnEvent' } & ApplicationWithdrawnEventFieldsFragment
  >
  stakeDecreasedEvents: Array<{ __typename: 'StakeDecreasedEvent' } & StakeDecreasedEventFieldsFragment>
  stakeIncreasedEvents: Array<{ __typename: 'StakeIncreasedEvent' } & StakeIncreasedEventFieldsFragment>
  stakeSlashedEvents: Array<{ __typename: 'StakeSlashedEvent' } & StakeSlashedEventFieldsFragment>
  workerStartedLeavingEvents: Array<
    { __typename: 'WorkerStartedLeavingEvent' } & WorkerStartedLeavingEventFieldsFragment
  >
  workerExitedEvents: Array<{ __typename: 'WorkerExitedEvent' } & WorkerExitedEventFieldsFragment>
  terminatedWorkerEvents: Array<{ __typename: 'TerminatedWorkerEvent' } & TerminatedWorkerEventFieldsFragment>
  terminatedLeaderEvents: Array<{ __typename: 'TerminatedLeaderEvent' } & TerminatedLeaderEventFieldsFragment>
  workerRewardAccountUpdatedEvents: Array<
    { __typename: 'WorkerRewardAccountUpdatedEvent' } & WorkerRewardAccountUpdatedEventFragment
  >
  workerRewardAmountUpdatedEvents: Array<
    { __typename: 'WorkerRewardAmountUpdatedEvent' } & WorkerRewardAmountUpdatedEventFragment
  >
}

export type GetGroupEventsQueryVariables = Types.Exact<{
  group_eq: Types.Scalars['ID']
}>

export type GetGroupEventsQuery = {
  __typename: 'Query'
  appliedOnOpeningEvents: Array<{ __typename: 'AppliedOnOpeningEvent' } & AppliedOnOpeningEventFieldsFragment>
  applicationWithdrawnEvents: Array<
    { __typename: 'ApplicationWithdrawnEvent' } & ApplicationWithdrawnEventFieldsFragment
  >
  budgetSpendingEvents: Array<{ __typename: 'BudgetSpendingEvent' } & BudgetSpendingActivityEventFieldsFragment>
  stakeDecreasedEvents: Array<{ __typename: 'StakeDecreasedEvent' } & StakeDecreasedEventFieldsFragment>
  stakeIncreasedEvents: Array<{ __typename: 'StakeIncreasedEvent' } & StakeIncreasedEventFieldsFragment>
  openingAddedEvents: Array<{ __typename: 'OpeningAddedEvent' } & OpeningAddedEventFieldsFragment>
  openingCanceledEvents: Array<{ __typename: 'OpeningCanceledEvent' } & OpeningCanceledEventFieldsFragment>
  openingFilledEvents: Array<{ __typename: 'OpeningFilledEvent' } & OpeningFilledEventFieldsFragment>
  workerExitedEvents: Array<{ __typename: 'WorkerExitedEvent' } & WorkerExitedEventFieldsFragment>
  statusTextChangedEvents: Array<{ __typename: 'StatusTextChangedEvent' } & StatusTextChangedEventFieldsFragment>
  budgetSetEvents: Array<{ __typename: 'BudgetSetEvent' } & BudgetSetEventFieldsFragment>
  stakeSlashedEvents: Array<{ __typename: 'StakeSlashedEvent' } & StakeSlashedEventFieldsFragment>
  terminatedWorkerEvents: Array<{ __typename: 'TerminatedWorkerEvent' } & TerminatedWorkerEventFieldsFragment>
  terminatedLeaderEvents: Array<{ __typename: 'TerminatedLeaderEvent' } & TerminatedLeaderEventFieldsFragment>
}

export type GetWorkerEventsQueryVariables = Types.Exact<{
  workerId?: Types.Maybe<Types.Scalars['ID']>
  applicationId?: Types.Maybe<Types.Scalars['ID']>
}>

export type GetWorkerEventsQuery = {
  __typename: 'Query'
  appliedOnOpeningEvents: Array<{ __typename: 'AppliedOnOpeningEvent' } & AppliedOnOpeningEventFieldsFragment>
  applicationWithdrawnEvents: Array<
    { __typename: 'ApplicationWithdrawnEvent' } & ApplicationWithdrawnEventFieldsFragment
  >
  stakeDecreasedEvents: Array<{ __typename: 'StakeDecreasedEvent' } & StakeDecreasedEventFieldsFragment>
  stakeIncreasedEvents: Array<{ __typename: 'StakeIncreasedEvent' } & StakeIncreasedEventFieldsFragment>
  stakeSlashedEvents: Array<{ __typename: 'StakeSlashedEvent' } & StakeSlashedEventFieldsFragment>
  workerStartedLeavingEvents: Array<
    { __typename: 'WorkerStartedLeavingEvent' } & WorkerStartedLeavingEventFieldsFragment
  >
  workerExitedEvents: Array<{ __typename: 'WorkerExitedEvent' } & WorkerExitedEventFieldsFragment>
  terminatedWorkerEvents: Array<{ __typename: 'TerminatedWorkerEvent' } & TerminatedWorkerEventFieldsFragment>
  terminatedLeaderEvents: Array<{ __typename: 'TerminatedLeaderEvent' } & TerminatedLeaderEventFieldsFragment>
}

export type GetWorkerIdsQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.WorkerWhereInput>
}>

export type GetWorkerIdsQuery = { __typename: 'Query'; workers: Array<{ __typename: 'Worker'; id: string }> }

export type GetWorkerUnstakingDetailsQueryVariables = Types.Exact<{
  where: Types.WorkerWhereUniqueInput
}>

export type GetWorkerUnstakingDetailsQuery = {
  __typename: 'Query'
  workerByUniqueInput?: Types.Maybe<{
    __typename: 'Worker'
    status:
      | { __typename: 'WorkerStatusActive' }
      | {
          __typename: 'WorkerStatusLeaving'
          workerStartedLeavingEvent?: Types.Maybe<{ __typename: 'WorkerStartedLeavingEvent'; createdAt: any }>
        }
      | { __typename: 'WorkerStatusLeft' }
      | { __typename: 'WorkerStatusTerminated' }
    application: {
      __typename: 'WorkingGroupApplication'
      opening: { __typename: 'WorkingGroupOpening'; unstakingPeriod: number }
    }
  }>
}

export const WorkerFieldsFragmentDoc = gql`
  fragment WorkerFields on Worker {
    id
    runtimeId
    membership {
      ...MemberFields
    }
    group {
      id
      name
    }
    status {
      __typename
    }
    applicationId
    isLead
    rewardPerBlock
    missingRewardAmount
    stake
  }
  ${MemberFieldsFragmentDoc}
`
export const WorkerDetailedFieldsFragmentDoc = gql`
  fragment WorkerDetailedFields on Worker {
    ...WorkerFields
    roleAccount
    rewardAccount
    stakeAccount
    application {
      id
      openingId
      opening {
        stakeAmount
      }
    }
  }
  ${WorkerFieldsFragmentDoc}
`
export const WorkingGroupMetdataFieldsFragmentDoc = gql`
  fragment WorkingGroupMetdataFields on WorkingGroupMetadata {
    about
    description
    status
    statusMessage
  }
`
export const WorkingGroupFieldsFragmentDoc = gql`
  fragment WorkingGroupFields on WorkingGroup {
    id
    name
    budget
    metadata {
      ...WorkingGroupMetdataFields
    }
    workers {
      stake
    }
    leader {
      membershipId
    }
  }
  ${WorkingGroupMetdataFieldsFragmentDoc}
`
export const WorkingGroupDetailedFieldsFragmentDoc = gql`
  fragment WorkingGroupDetailedFields on WorkingGroup {
    ...WorkingGroupFields
    leader {
      id
      runtimeId
      stake
      membershipId
    }
  }
  ${WorkingGroupFieldsFragmentDoc}
`
export const BudgetSpendingEventFieldsFragmentDoc = gql`
  fragment BudgetSpendingEventFields on BudgetSpendingEvent {
    id
    groupId
    reciever
    amount
    rationale
  }
`
export const RewardPaidEventFieldsFragmentDoc = gql`
  fragment RewardPaidEventFields on RewardPaidEvent {
    id
    amount
    rewardAccount
    createdAt
  }
`
export const WorkingGroupOpeningMetadataFieldsFragmentDoc = gql`
  fragment WorkingGroupOpeningMetadataFields on WorkingGroupOpeningMetadata {
    applicationDetails
    shortDescription
    description
    hiringLimit
    expectedEnding
  }
`
export const WorkingGroupOpeningFieldsFragmentDoc = gql`
  fragment WorkingGroupOpeningFields on WorkingGroupOpening {
    id
    runtimeId
    groupId
    group {
      name
      budget
      leaderId
    }
    type
    stakeAmount
    rewardPerBlock
    metadata {
      ...WorkingGroupOpeningMetadataFields
    }
    status {
      __typename
    }
    unstakingPeriod
    applications {
      id
    }
  }
  ${WorkingGroupOpeningMetadataFieldsFragmentDoc}
`
export const WorkingGroupOpeningDetailedFieldsFragmentDoc = gql`
  fragment WorkingGroupOpeningDetailedFields on WorkingGroupOpening {
    ...WorkingGroupOpeningFields
    applications {
      id
      status {
        __typename
      }
      applicant {
        ...MemberFields
      }
      status {
        __typename
      }
    }
  }
  ${WorkingGroupOpeningFieldsFragmentDoc}
  ${MemberFieldsFragmentDoc}
`
export const WorkingGroupApplicationFieldsFragmentDoc = gql`
  fragment WorkingGroupApplicationFields on WorkingGroupApplication {
    id
    opening {
      id
      group {
        name
      }
      type
      rewardPerBlock
    }
    applicant {
      ...MemberFields
    }
    status {
      __typename
    }
    stakingAccount
  }
  ${MemberFieldsFragmentDoc}
`
export const ApplicationQuestionFieldsFragmentDoc = gql`
  fragment ApplicationQuestionFields on ApplicationFormQuestion {
    index
    type
    question
  }
`
export const ApplicationFormQuestionAnswerFieldsFragmentDoc = gql`
  fragment ApplicationFormQuestionAnswerFields on ApplicationFormQuestionAnswer {
    question {
      ...ApplicationQuestionFields
    }
    answer
  }
  ${ApplicationQuestionFieldsFragmentDoc}
`
export const UpcomingWorkingGroupOpeningFieldsFragmentDoc = gql`
  fragment UpcomingWorkingGroupOpeningFields on UpcomingWorkingGroupOpening {
    id
    groupId
    group {
      name
      budget
      leaderId
    }
    expectedStart
    stakeAmount
    rewardPerBlock
    metadata {
      ...WorkingGroupOpeningMetadataFields
    }
  }
  ${WorkingGroupOpeningMetadataFieldsFragmentDoc}
`
export const AppliedOnOpeningEventFieldsFragmentDoc = gql`
  fragment AppliedOnOpeningEventFields on AppliedOnOpeningEvent {
    id
    createdAt
    application {
      applicant {
        id
        handle
      }
    }
    opening {
      id
      type
    }
    group {
      name
    }
  }
`
export const ApplicationWithdrawnEventFieldsFragmentDoc = gql`
  fragment ApplicationWithdrawnEventFields on ApplicationWithdrawnEvent {
    id
    createdAt
    application {
      opening {
        id
        type
      }
      applicant {
        id
        handle
      }
    }
    group {
      name
    }
  }
`
export const BudgetSpendingActivityEventFieldsFragmentDoc = gql`
  fragment BudgetSpendingActivityEventFields on BudgetSpendingEvent {
    id
    createdAt
    amount
    group {
      name
    }
  }
`
export const StakeDecreasedEventFieldsFragmentDoc = gql`
  fragment StakeDecreasedEventFields on StakeDecreasedEvent {
    id
    createdAt
    worker {
      membership {
        id
        handle
      }
    }
    amount
  }
`
export const StakeIncreasedEventFieldsFragmentDoc = gql`
  fragment StakeIncreasedEventFields on StakeIncreasedEvent {
    id
    createdAt
    worker {
      membership {
        id
        handle
      }
    }
    amount
  }
`
export const StakeSlashedEventFieldsFragmentDoc = gql`
  fragment StakeSlashedEventFields on StakeSlashedEvent {
    id
    createdAt
    group {
      id
      name
    }
    worker {
      membership {
        id
        handle
      }
    }
  }
`
export const OpeningFilledEventFieldsFragmentDoc = gql`
  fragment OpeningFilledEventFields on OpeningFilledEvent {
    id
    createdAt
    opening {
      id
      type
    }
    group {
      name
    }
    workersHired {
      membership {
        id
        handle
      }
    }
  }
`
export const WorkerStartedLeavingEventFieldsFragmentDoc = gql`
  fragment WorkerStartedLeavingEventFields on WorkerStartedLeavingEvent {
    id
    createdAt
    group {
      name
    }
    worker {
      status {
        __typename
      }
      membership {
        id
        handle
      }
    }
  }
`
export const WorkerExitedEventFieldsFragmentDoc = gql`
  fragment WorkerExitedEventFields on WorkerExitedEvent {
    id
    createdAt
    group {
      name
    }
    worker {
      membership {
        id
        handle
      }
    }
  }
`
export const StatusTextChangedEventFieldsFragmentDoc = gql`
  fragment StatusTextChangedEventFields on StatusTextChangedEvent {
    id
    createdAt
    workinggroupmetadatasetInEvent {
      id
    }
    upcomingworkinggroupopeningcreatedInEvent {
      id
    }
    group {
      name
    }
  }
`
export const OpeningAddedEventFieldsFragmentDoc = gql`
  fragment OpeningAddedEventFields on OpeningAddedEvent {
    id
    createdAt
    opening {
      id
      type
      group {
        name
      }
    }
  }
`
export const OpeningCanceledEventFieldsFragmentDoc = gql`
  fragment OpeningCanceledEventFields on OpeningCanceledEvent {
    id
    createdAt
    opening {
      id
      type
      group {
        name
      }
    }
  }
`
export const BudgetSetEventFieldsFragmentDoc = gql`
  fragment BudgetSetEventFields on BudgetSetEvent {
    id
    createdAt
    group {
      name
    }
    newBudget
  }
`
export const TerminatedWorkerEventFieldsFragmentDoc = gql`
  fragment TerminatedWorkerEventFields on TerminatedWorkerEvent {
    id
    createdAt
    group {
      name
    }
    worker {
      membership {
        id
        handle
      }
    }
  }
`
export const TerminatedLeaderEventFieldsFragmentDoc = gql`
  fragment TerminatedLeaderEventFields on TerminatedLeaderEvent {
    id
    createdAt
    group {
      name
    }
    worker {
      membership {
        id
        handle
      }
    }
  }
`
export const WorkerRewardAmountUpdatedEventFragmentDoc = gql`
  fragment WorkerRewardAmountUpdatedEvent on WorkerRewardAmountUpdatedEvent {
    id
    createdAt
    newRewardPerBlock
  }
`
export const WorkerRewardAccountUpdatedEventFragmentDoc = gql`
  fragment WorkerRewardAccountUpdatedEvent on WorkerRewardAccountUpdatedEvent {
    id
    createdAt
    newRewardAccount
  }
`
export const GetBudgetSpendingDocument = gql`
  query getBudgetSpending($where: BudgetSpendingEventWhereInput) {
    budgetSpendingEvents(where: $where) {
      ...BudgetSpendingEventFields
    }
  }
  ${BudgetSpendingEventFieldsFragmentDoc}
`

/**
 * __useGetBudgetSpendingQuery__
 *
 * To run a query within a React component, call `useGetBudgetSpendingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBudgetSpendingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBudgetSpendingQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetBudgetSpendingQuery(
  baseOptions?: Apollo.QueryHookOptions<GetBudgetSpendingQuery, GetBudgetSpendingQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetBudgetSpendingQuery, GetBudgetSpendingQueryVariables>(GetBudgetSpendingDocument, options)
}
export function useGetBudgetSpendingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetBudgetSpendingQuery, GetBudgetSpendingQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetBudgetSpendingQuery, GetBudgetSpendingQueryVariables>(
    GetBudgetSpendingDocument,
    options
  )
}
export type GetBudgetSpendingQueryHookResult = ReturnType<typeof useGetBudgetSpendingQuery>
export type GetBudgetSpendingLazyQueryHookResult = ReturnType<typeof useGetBudgetSpendingLazyQuery>
export type GetBudgetSpendingQueryResult = Apollo.QueryResult<GetBudgetSpendingQuery, GetBudgetSpendingQueryVariables>
export const GetWorkingGroupsDocument = gql`
  query getWorkingGroups {
    workingGroups {
      ...WorkingGroupFields
    }
  }
  ${WorkingGroupFieldsFragmentDoc}
`

/**
 * __useGetWorkingGroupsQuery__
 *
 * To run a query within a React component, call `useGetWorkingGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkingGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkingGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetWorkingGroupsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>(GetWorkingGroupsDocument, options)
}
export function useGetWorkingGroupsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>(GetWorkingGroupsDocument, options)
}
export type GetWorkingGroupsQueryHookResult = ReturnType<typeof useGetWorkingGroupsQuery>
export type GetWorkingGroupsLazyQueryHookResult = ReturnType<typeof useGetWorkingGroupsLazyQuery>
export type GetWorkingGroupsQueryResult = Apollo.QueryResult<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>
export const GetWorkersDocument = gql`
  query getWorkers($where: WorkerWhereInput, $offset: Int, $limit: Int) {
    workers(where: $where, offset: $offset, limit: $limit) {
      ...WorkerFields
    }
  }
  ${WorkerFieldsFragmentDoc}
`

/**
 * __useGetWorkersQuery__
 *
 * To run a query within a React component, call `useGetWorkersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkersQuery({
 *   variables: {
 *      where: // value for 'where'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetWorkersQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkersQuery, GetWorkersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkersQuery, GetWorkersQueryVariables>(GetWorkersDocument, options)
}
export function useGetWorkersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetWorkersQuery, GetWorkersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkersQuery, GetWorkersQueryVariables>(GetWorkersDocument, options)
}
export type GetWorkersQueryHookResult = ReturnType<typeof useGetWorkersQuery>
export type GetWorkersLazyQueryHookResult = ReturnType<typeof useGetWorkersLazyQuery>
export type GetWorkersQueryResult = Apollo.QueryResult<GetWorkersQuery, GetWorkersQueryVariables>
export const GetWorkersCountDocument = gql`
  query getWorkersCount($where: WorkerWhereInput) {
    workersConnection(where: $where) {
      totalCount
    }
  }
`

/**
 * __useGetWorkersCountQuery__
 *
 * To run a query within a React component, call `useGetWorkersCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkersCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkersCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetWorkersCountQuery(
  baseOptions?: Apollo.QueryHookOptions<GetWorkersCountQuery, GetWorkersCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkersCountQuery, GetWorkersCountQueryVariables>(GetWorkersCountDocument, options)
}
export function useGetWorkersCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetWorkersCountQuery, GetWorkersCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkersCountQuery, GetWorkersCountQueryVariables>(GetWorkersCountDocument, options)
}
export type GetWorkersCountQueryHookResult = ReturnType<typeof useGetWorkersCountQuery>
export type GetWorkersCountLazyQueryHookResult = ReturnType<typeof useGetWorkersCountLazyQuery>
export type GetWorkersCountQueryResult = Apollo.QueryResult<GetWorkersCountQuery, GetWorkersCountQueryVariables>
export const GetDetailedWorkersDocument = gql`
  query getDetailedWorkers($where: WorkerWhereInput) {
    workers(where: $where) {
      ...WorkerDetailedFields
    }
  }
  ${WorkerDetailedFieldsFragmentDoc}
`

/**
 * __useGetDetailedWorkersQuery__
 *
 * To run a query within a React component, call `useGetDetailedWorkersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDetailedWorkersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDetailedWorkersQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetDetailedWorkersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetDetailedWorkersQuery, GetDetailedWorkersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetDetailedWorkersQuery, GetDetailedWorkersQueryVariables>(GetDetailedWorkersDocument, options)
}
export function useGetDetailedWorkersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetDetailedWorkersQuery, GetDetailedWorkersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetDetailedWorkersQuery, GetDetailedWorkersQueryVariables>(
    GetDetailedWorkersDocument,
    options
  )
}
export type GetDetailedWorkersQueryHookResult = ReturnType<typeof useGetDetailedWorkersQuery>
export type GetDetailedWorkersLazyQueryHookResult = ReturnType<typeof useGetDetailedWorkersLazyQuery>
export type GetDetailedWorkersQueryResult = Apollo.QueryResult<
  GetDetailedWorkersQuery,
  GetDetailedWorkersQueryVariables
>
export const GetWorkerDocument = gql`
  query getWorker($where: WorkerWhereUniqueInput!) {
    workerByUniqueInput(where: $where) {
      ...WorkerDetailedFields
    }
  }
  ${WorkerDetailedFieldsFragmentDoc}
`

/**
 * __useGetWorkerQuery__
 *
 * To run a query within a React component, call `useGetWorkerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkerQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetWorkerQuery(baseOptions: Apollo.QueryHookOptions<GetWorkerQuery, GetWorkerQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkerQuery, GetWorkerQueryVariables>(GetWorkerDocument, options)
}
export function useGetWorkerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetWorkerQuery, GetWorkerQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkerQuery, GetWorkerQueryVariables>(GetWorkerDocument, options)
}
export type GetWorkerQueryHookResult = ReturnType<typeof useGetWorkerQuery>
export type GetWorkerLazyQueryHookResult = ReturnType<typeof useGetWorkerLazyQuery>
export type GetWorkerQueryResult = Apollo.QueryResult<GetWorkerQuery, GetWorkerQueryVariables>
export const GetGroupDebtDocument = gql`
  query getGroupDebt($where: WorkerWhereInput!) {
    workers(where: $where) {
      missingRewardAmount
    }
  }
`

/**
 * __useGetGroupDebtQuery__
 *
 * To run a query within a React component, call `useGetGroupDebtQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupDebtQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupDebtQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetGroupDebtQuery(
  baseOptions: Apollo.QueryHookOptions<GetGroupDebtQuery, GetGroupDebtQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetGroupDebtQuery, GetGroupDebtQueryVariables>(GetGroupDebtDocument, options)
}
export function useGetGroupDebtLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetGroupDebtQuery, GetGroupDebtQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetGroupDebtQuery, GetGroupDebtQueryVariables>(GetGroupDebtDocument, options)
}
export type GetGroupDebtQueryHookResult = ReturnType<typeof useGetGroupDebtQuery>
export type GetGroupDebtLazyQueryHookResult = ReturnType<typeof useGetGroupDebtLazyQuery>
export type GetGroupDebtQueryResult = Apollo.QueryResult<GetGroupDebtQuery, GetGroupDebtQueryVariables>
export const GetRewardsDocument = gql`
  query getRewards($where: RewardPaidEventWhereInput) {
    rewardPaidEvents(where: $where) {
      ...RewardPaidEventFields
    }
  }
  ${RewardPaidEventFieldsFragmentDoc}
`

/**
 * __useGetRewardsQuery__
 *
 * To run a query within a React component, call `useGetRewardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRewardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRewardsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetRewardsQuery(baseOptions?: Apollo.QueryHookOptions<GetRewardsQuery, GetRewardsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetRewardsQuery, GetRewardsQueryVariables>(GetRewardsDocument, options)
}
export function useGetRewardsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetRewardsQuery, GetRewardsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetRewardsQuery, GetRewardsQueryVariables>(GetRewardsDocument, options)
}
export type GetRewardsQueryHookResult = ReturnType<typeof useGetRewardsQuery>
export type GetRewardsLazyQueryHookResult = ReturnType<typeof useGetRewardsLazyQuery>
export type GetRewardsQueryResult = Apollo.QueryResult<GetRewardsQuery, GetRewardsQueryVariables>
export const CountWorkingGroupOpeningsDocument = gql`
  query countWorkingGroupOpenings($where: WorkingGroupOpeningWhereInput) {
    workingGroupOpeningsConnection(where: $where) {
      totalCount
    }
  }
`

/**
 * __useCountWorkingGroupOpeningsQuery__
 *
 * To run a query within a React component, call `useCountWorkingGroupOpeningsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountWorkingGroupOpeningsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountWorkingGroupOpeningsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useCountWorkingGroupOpeningsQuery(
  baseOptions?: Apollo.QueryHookOptions<CountWorkingGroupOpeningsQuery, CountWorkingGroupOpeningsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<CountWorkingGroupOpeningsQuery, CountWorkingGroupOpeningsQueryVariables>(
    CountWorkingGroupOpeningsDocument,
    options
  )
}
export function useCountWorkingGroupOpeningsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CountWorkingGroupOpeningsQuery, CountWorkingGroupOpeningsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<CountWorkingGroupOpeningsQuery, CountWorkingGroupOpeningsQueryVariables>(
    CountWorkingGroupOpeningsDocument,
    options
  )
}
export type CountWorkingGroupOpeningsQueryHookResult = ReturnType<typeof useCountWorkingGroupOpeningsQuery>
export type CountWorkingGroupOpeningsLazyQueryHookResult = ReturnType<typeof useCountWorkingGroupOpeningsLazyQuery>
export type CountWorkingGroupOpeningsQueryResult = Apollo.QueryResult<
  CountWorkingGroupOpeningsQuery,
  CountWorkingGroupOpeningsQueryVariables
>
export const CountWorkingGroupWorkersDocument = gql`
  query countWorkingGroupWorkers($groupId_eq: ID, $status_json: JSONObject) {
    workersConnection(where: { group: { id_eq: $groupId_eq }, status_json: $status_json }) {
      totalCount
    }
  }
`

/**
 * __useCountWorkingGroupWorkersQuery__
 *
 * To run a query within a React component, call `useCountWorkingGroupWorkersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountWorkingGroupWorkersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountWorkingGroupWorkersQuery({
 *   variables: {
 *      groupId_eq: // value for 'groupId_eq'
 *      status_json: // value for 'status_json'
 *   },
 * });
 */
export function useCountWorkingGroupWorkersQuery(
  baseOptions?: Apollo.QueryHookOptions<CountWorkingGroupWorkersQuery, CountWorkingGroupWorkersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<CountWorkingGroupWorkersQuery, CountWorkingGroupWorkersQueryVariables>(
    CountWorkingGroupWorkersDocument,
    options
  )
}
export function useCountWorkingGroupWorkersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CountWorkingGroupWorkersQuery, CountWorkingGroupWorkersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<CountWorkingGroupWorkersQuery, CountWorkingGroupWorkersQueryVariables>(
    CountWorkingGroupWorkersDocument,
    options
  )
}
export type CountWorkingGroupWorkersQueryHookResult = ReturnType<typeof useCountWorkingGroupWorkersQuery>
export type CountWorkingGroupWorkersLazyQueryHookResult = ReturnType<typeof useCountWorkingGroupWorkersLazyQuery>
export type CountWorkingGroupWorkersQueryResult = Apollo.QueryResult<
  CountWorkingGroupWorkersQuery,
  CountWorkingGroupWorkersQueryVariables
>
export const GetWorkingGroupOpeningsDocument = gql`
  query getWorkingGroupOpenings($where: WorkingGroupOpeningWhereInput, $limit: Int, $offset: Int) {
    workingGroupOpenings(where: $where, limit: $limit, offset: $offset) {
      ...WorkingGroupOpeningFields
    }
  }
  ${WorkingGroupOpeningFieldsFragmentDoc}
`

/**
 * __useGetWorkingGroupOpeningsQuery__
 *
 * To run a query within a React component, call `useGetWorkingGroupOpeningsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkingGroupOpeningsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkingGroupOpeningsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetWorkingGroupOpeningsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetWorkingGroupOpeningsQuery, GetWorkingGroupOpeningsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkingGroupOpeningsQuery, GetWorkingGroupOpeningsQueryVariables>(
    GetWorkingGroupOpeningsDocument,
    options
  )
}
export function useGetWorkingGroupOpeningsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingGroupOpeningsQuery, GetWorkingGroupOpeningsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkingGroupOpeningsQuery, GetWorkingGroupOpeningsQueryVariables>(
    GetWorkingGroupOpeningsDocument,
    options
  )
}
export type GetWorkingGroupOpeningsQueryHookResult = ReturnType<typeof useGetWorkingGroupOpeningsQuery>
export type GetWorkingGroupOpeningsLazyQueryHookResult = ReturnType<typeof useGetWorkingGroupOpeningsLazyQuery>
export type GetWorkingGroupOpeningsQueryResult = Apollo.QueryResult<
  GetWorkingGroupOpeningsQuery,
  GetWorkingGroupOpeningsQueryVariables
>
export const GetWorkingGroupOpeningDocument = gql`
  query getWorkingGroupOpening($where: WorkingGroupOpeningWhereUniqueInput!) {
    workingGroupOpeningByUniqueInput(where: $where) {
      ...WorkingGroupOpeningDetailedFields
    }
  }
  ${WorkingGroupOpeningDetailedFieldsFragmentDoc}
`

/**
 * __useGetWorkingGroupOpeningQuery__
 *
 * To run a query within a React component, call `useGetWorkingGroupOpeningQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkingGroupOpeningQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkingGroupOpeningQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetWorkingGroupOpeningQuery(
  baseOptions: Apollo.QueryHookOptions<GetWorkingGroupOpeningQuery, GetWorkingGroupOpeningQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkingGroupOpeningQuery, GetWorkingGroupOpeningQueryVariables>(
    GetWorkingGroupOpeningDocument,
    options
  )
}
export function useGetWorkingGroupOpeningLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingGroupOpeningQuery, GetWorkingGroupOpeningQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkingGroupOpeningQuery, GetWorkingGroupOpeningQueryVariables>(
    GetWorkingGroupOpeningDocument,
    options
  )
}
export type GetWorkingGroupOpeningQueryHookResult = ReturnType<typeof useGetWorkingGroupOpeningQuery>
export type GetWorkingGroupOpeningLazyQueryHookResult = ReturnType<typeof useGetWorkingGroupOpeningLazyQuery>
export type GetWorkingGroupOpeningQueryResult = Apollo.QueryResult<
  GetWorkingGroupOpeningQuery,
  GetWorkingGroupOpeningQueryVariables
>
export const GetWorkingGroupOpeningQuestionsDocument = gql`
  query GetWorkingGroupOpeningQuestions($id: ID!) {
    workingGroupOpeningByUniqueInput(where: { id: $id }) {
      metadata {
        applicationFormQuestions {
          ...ApplicationQuestionFields
        }
      }
    }
  }
  ${ApplicationQuestionFieldsFragmentDoc}
`

/**
 * __useGetWorkingGroupOpeningQuestionsQuery__
 *
 * To run a query within a React component, call `useGetWorkingGroupOpeningQuestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkingGroupOpeningQuestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkingGroupOpeningQuestionsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetWorkingGroupOpeningQuestionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetWorkingGroupOpeningQuestionsQuery,
    GetWorkingGroupOpeningQuestionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkingGroupOpeningQuestionsQuery, GetWorkingGroupOpeningQuestionsQueryVariables>(
    GetWorkingGroupOpeningQuestionsDocument,
    options
  )
}
export function useGetWorkingGroupOpeningQuestionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetWorkingGroupOpeningQuestionsQuery,
    GetWorkingGroupOpeningQuestionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkingGroupOpeningQuestionsQuery, GetWorkingGroupOpeningQuestionsQueryVariables>(
    GetWorkingGroupOpeningQuestionsDocument,
    options
  )
}
export type GetWorkingGroupOpeningQuestionsQueryHookResult = ReturnType<typeof useGetWorkingGroupOpeningQuestionsQuery>
export type GetWorkingGroupOpeningQuestionsLazyQueryHookResult = ReturnType<
  typeof useGetWorkingGroupOpeningQuestionsLazyQuery
>
export type GetWorkingGroupOpeningQuestionsQueryResult = Apollo.QueryResult<
  GetWorkingGroupOpeningQuestionsQuery,
  GetWorkingGroupOpeningQuestionsQueryVariables
>
export const GetWorkingGroupDocument = gql`
  query GetWorkingGroup($where: WorkingGroupWhereUniqueInput!) {
    workingGroupByUniqueInput(where: $where) {
      ...WorkingGroupDetailedFields
    }
  }
  ${WorkingGroupDetailedFieldsFragmentDoc}
`

/**
 * __useGetWorkingGroupQuery__
 *
 * To run a query within a React component, call `useGetWorkingGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkingGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkingGroupQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetWorkingGroupQuery(
  baseOptions: Apollo.QueryHookOptions<GetWorkingGroupQuery, GetWorkingGroupQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkingGroupQuery, GetWorkingGroupQueryVariables>(GetWorkingGroupDocument, options)
}
export function useGetWorkingGroupLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingGroupQuery, GetWorkingGroupQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkingGroupQuery, GetWorkingGroupQueryVariables>(GetWorkingGroupDocument, options)
}
export type GetWorkingGroupQueryHookResult = ReturnType<typeof useGetWorkingGroupQuery>
export type GetWorkingGroupLazyQueryHookResult = ReturnType<typeof useGetWorkingGroupLazyQuery>
export type GetWorkingGroupQueryResult = Apollo.QueryResult<GetWorkingGroupQuery, GetWorkingGroupQueryVariables>
export const GetWorkingGroupApplicationsDocument = gql`
  query GetWorkingGroupApplications($applicantId_in: [ID!]) {
    workingGroupApplications(where: { applicant_in: $applicantId_in }) {
      ...WorkingGroupApplicationFields
    }
  }
  ${WorkingGroupApplicationFieldsFragmentDoc}
`

/**
 * __useGetWorkingGroupApplicationsQuery__
 *
 * To run a query within a React component, call `useGetWorkingGroupApplicationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkingGroupApplicationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkingGroupApplicationsQuery({
 *   variables: {
 *      applicantId_in: // value for 'applicantId_in'
 *   },
 * });
 */
export function useGetWorkingGroupApplicationsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetWorkingGroupApplicationsQuery, GetWorkingGroupApplicationsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkingGroupApplicationsQuery, GetWorkingGroupApplicationsQueryVariables>(
    GetWorkingGroupApplicationsDocument,
    options
  )
}
export function useGetWorkingGroupApplicationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingGroupApplicationsQuery, GetWorkingGroupApplicationsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkingGroupApplicationsQuery, GetWorkingGroupApplicationsQueryVariables>(
    GetWorkingGroupApplicationsDocument,
    options
  )
}
export type GetWorkingGroupApplicationsQueryHookResult = ReturnType<typeof useGetWorkingGroupApplicationsQuery>
export type GetWorkingGroupApplicationsLazyQueryHookResult = ReturnType<typeof useGetWorkingGroupApplicationsLazyQuery>
export type GetWorkingGroupApplicationsQueryResult = Apollo.QueryResult<
  GetWorkingGroupApplicationsQuery,
  GetWorkingGroupApplicationsQueryVariables
>
export const GetWorkingGroupApplicationIdsDocument = gql`
  query GetWorkingGroupApplicationIds($where: WorkingGroupApplicationWhereInput) {
    workingGroupApplications(where: $where) {
      id
    }
  }
`

/**
 * __useGetWorkingGroupApplicationIdsQuery__
 *
 * To run a query within a React component, call `useGetWorkingGroupApplicationIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkingGroupApplicationIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkingGroupApplicationIdsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetWorkingGroupApplicationIdsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetWorkingGroupApplicationIdsQuery, GetWorkingGroupApplicationIdsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkingGroupApplicationIdsQuery, GetWorkingGroupApplicationIdsQueryVariables>(
    GetWorkingGroupApplicationIdsDocument,
    options
  )
}
export function useGetWorkingGroupApplicationIdsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetWorkingGroupApplicationIdsQuery,
    GetWorkingGroupApplicationIdsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkingGroupApplicationIdsQuery, GetWorkingGroupApplicationIdsQueryVariables>(
    GetWorkingGroupApplicationIdsDocument,
    options
  )
}
export type GetWorkingGroupApplicationIdsQueryHookResult = ReturnType<typeof useGetWorkingGroupApplicationIdsQuery>
export type GetWorkingGroupApplicationIdsLazyQueryHookResult = ReturnType<
  typeof useGetWorkingGroupApplicationIdsLazyQuery
>
export type GetWorkingGroupApplicationIdsQueryResult = Apollo.QueryResult<
  GetWorkingGroupApplicationIdsQuery,
  GetWorkingGroupApplicationIdsQueryVariables
>
export const GetWorkingGroupApplicationDocument = gql`
  query GetWorkingGroupApplication($where: WorkingGroupApplicationWhereUniqueInput!) {
    workingGroupApplicationByUniqueInput(where: $where) {
      ...WorkingGroupApplicationFields
    }
  }
  ${WorkingGroupApplicationFieldsFragmentDoc}
`

/**
 * __useGetWorkingGroupApplicationQuery__
 *
 * To run a query within a React component, call `useGetWorkingGroupApplicationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkingGroupApplicationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkingGroupApplicationQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetWorkingGroupApplicationQuery(
  baseOptions: Apollo.QueryHookOptions<GetWorkingGroupApplicationQuery, GetWorkingGroupApplicationQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkingGroupApplicationQuery, GetWorkingGroupApplicationQueryVariables>(
    GetWorkingGroupApplicationDocument,
    options
  )
}
export function useGetWorkingGroupApplicationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingGroupApplicationQuery, GetWorkingGroupApplicationQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkingGroupApplicationQuery, GetWorkingGroupApplicationQueryVariables>(
    GetWorkingGroupApplicationDocument,
    options
  )
}
export type GetWorkingGroupApplicationQueryHookResult = ReturnType<typeof useGetWorkingGroupApplicationQuery>
export type GetWorkingGroupApplicationLazyQueryHookResult = ReturnType<typeof useGetWorkingGroupApplicationLazyQuery>
export type GetWorkingGroupApplicationQueryResult = Apollo.QueryResult<
  GetWorkingGroupApplicationQuery,
  GetWorkingGroupApplicationQueryVariables
>
export const GetApplicationFormQuestionAnswerDocument = gql`
  query GetApplicationFormQuestionAnswer($applicationId_eq: ID) {
    applicationFormQuestionAnswers(where: { application: { id_eq: $applicationId_eq } }) {
      ...ApplicationFormQuestionAnswerFields
    }
  }
  ${ApplicationFormQuestionAnswerFieldsFragmentDoc}
`

/**
 * __useGetApplicationFormQuestionAnswerQuery__
 *
 * To run a query within a React component, call `useGetApplicationFormQuestionAnswerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetApplicationFormQuestionAnswerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetApplicationFormQuestionAnswerQuery({
 *   variables: {
 *      applicationId_eq: // value for 'applicationId_eq'
 *   },
 * });
 */
export function useGetApplicationFormQuestionAnswerQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetApplicationFormQuestionAnswerQuery,
    GetApplicationFormQuestionAnswerQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetApplicationFormQuestionAnswerQuery, GetApplicationFormQuestionAnswerQueryVariables>(
    GetApplicationFormQuestionAnswerDocument,
    options
  )
}
export function useGetApplicationFormQuestionAnswerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetApplicationFormQuestionAnswerQuery,
    GetApplicationFormQuestionAnswerQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetApplicationFormQuestionAnswerQuery, GetApplicationFormQuestionAnswerQueryVariables>(
    GetApplicationFormQuestionAnswerDocument,
    options
  )
}
export type GetApplicationFormQuestionAnswerQueryHookResult = ReturnType<
  typeof useGetApplicationFormQuestionAnswerQuery
>
export type GetApplicationFormQuestionAnswerLazyQueryHookResult = ReturnType<
  typeof useGetApplicationFormQuestionAnswerLazyQuery
>
export type GetApplicationFormQuestionAnswerQueryResult = Apollo.QueryResult<
  GetApplicationFormQuestionAnswerQuery,
  GetApplicationFormQuestionAnswerQueryVariables
>
export const GetUpcomingWorkingGroupOpeningDocument = gql`
  query GetUpcomingWorkingGroupOpening($where: UpcomingWorkingGroupOpeningWhereUniqueInput!) {
    upcomingWorkingGroupOpeningByUniqueInput(where: $where) {
      ...UpcomingWorkingGroupOpeningFields
    }
  }
  ${UpcomingWorkingGroupOpeningFieldsFragmentDoc}
`

/**
 * __useGetUpcomingWorkingGroupOpeningQuery__
 *
 * To run a query within a React component, call `useGetUpcomingWorkingGroupOpeningQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUpcomingWorkingGroupOpeningQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUpcomingWorkingGroupOpeningQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetUpcomingWorkingGroupOpeningQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetUpcomingWorkingGroupOpeningQuery,
    GetUpcomingWorkingGroupOpeningQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUpcomingWorkingGroupOpeningQuery, GetUpcomingWorkingGroupOpeningQueryVariables>(
    GetUpcomingWorkingGroupOpeningDocument,
    options
  )
}
export function useGetUpcomingWorkingGroupOpeningLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUpcomingWorkingGroupOpeningQuery,
    GetUpcomingWorkingGroupOpeningQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUpcomingWorkingGroupOpeningQuery, GetUpcomingWorkingGroupOpeningQueryVariables>(
    GetUpcomingWorkingGroupOpeningDocument,
    options
  )
}
export type GetUpcomingWorkingGroupOpeningQueryHookResult = ReturnType<typeof useGetUpcomingWorkingGroupOpeningQuery>
export type GetUpcomingWorkingGroupOpeningLazyQueryHookResult = ReturnType<
  typeof useGetUpcomingWorkingGroupOpeningLazyQuery
>
export type GetUpcomingWorkingGroupOpeningQueryResult = Apollo.QueryResult<
  GetUpcomingWorkingGroupOpeningQuery,
  GetUpcomingWorkingGroupOpeningQueryVariables
>
export const GetUpcomingWorkingGroupOpeningsDocument = gql`
  query GetUpcomingWorkingGroupOpenings($where: UpcomingWorkingGroupOpeningWhereInput, $limit: Int, $offset: Int) {
    upcomingWorkingGroupOpenings(where: $where, limit: $limit, offset: $offset) {
      ...UpcomingWorkingGroupOpeningFields
    }
  }
  ${UpcomingWorkingGroupOpeningFieldsFragmentDoc}
`

/**
 * __useGetUpcomingWorkingGroupOpeningsQuery__
 *
 * To run a query within a React component, call `useGetUpcomingWorkingGroupOpeningsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUpcomingWorkingGroupOpeningsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUpcomingWorkingGroupOpeningsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetUpcomingWorkingGroupOpeningsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetUpcomingWorkingGroupOpeningsQuery,
    GetUpcomingWorkingGroupOpeningsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUpcomingWorkingGroupOpeningsQuery, GetUpcomingWorkingGroupOpeningsQueryVariables>(
    GetUpcomingWorkingGroupOpeningsDocument,
    options
  )
}
export function useGetUpcomingWorkingGroupOpeningsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUpcomingWorkingGroupOpeningsQuery,
    GetUpcomingWorkingGroupOpeningsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUpcomingWorkingGroupOpeningsQuery, GetUpcomingWorkingGroupOpeningsQueryVariables>(
    GetUpcomingWorkingGroupOpeningsDocument,
    options
  )
}
export type GetUpcomingWorkingGroupOpeningsQueryHookResult = ReturnType<typeof useGetUpcomingWorkingGroupOpeningsQuery>
export type GetUpcomingWorkingGroupOpeningsLazyQueryHookResult = ReturnType<
  typeof useGetUpcomingWorkingGroupOpeningsLazyQuery
>
export type GetUpcomingWorkingGroupOpeningsQueryResult = Apollo.QueryResult<
  GetUpcomingWorkingGroupOpeningsQuery,
  GetUpcomingWorkingGroupOpeningsQueryVariables
>
export const GetMemberRoleEventsDocument = gql`
  query GetMemberRoleEvents($worker_in: [ID!], $application_in: [ID!]) {
    appliedOnOpeningEvents(where: { application_in: $application_in }) {
      ...AppliedOnOpeningEventFields
    }
    applicationWithdrawnEvents(where: { application_in: $application_in }) {
      ...ApplicationWithdrawnEventFields
    }
    stakeDecreasedEvents(where: { worker_in: $worker_in }) {
      ...StakeDecreasedEventFields
    }
    stakeIncreasedEvents(where: { worker_in: $worker_in }) {
      ...StakeIncreasedEventFields
    }
    stakeSlashedEvents(where: { worker_in: $worker_in }) {
      ...StakeSlashedEventFields
    }
    workerStartedLeavingEvents(where: { worker_in: $worker_in }) {
      ...WorkerStartedLeavingEventFields
    }
    workerExitedEvents(where: { worker_in: $worker_in }) {
      ...WorkerExitedEventFields
    }
    terminatedWorkerEvents(where: { worker_in: $worker_in }) {
      ...TerminatedWorkerEventFields
    }
    terminatedLeaderEvents(where: { worker_in: $worker_in }) {
      ...TerminatedLeaderEventFields
    }
    workerRewardAccountUpdatedEvents(where: { worker_in: $worker_in }) {
      ...WorkerRewardAccountUpdatedEvent
    }
    workerRewardAmountUpdatedEvents(where: { worker_in: $worker_in }) {
      ...WorkerRewardAmountUpdatedEvent
    }
  }
  ${AppliedOnOpeningEventFieldsFragmentDoc}
  ${ApplicationWithdrawnEventFieldsFragmentDoc}
  ${StakeDecreasedEventFieldsFragmentDoc}
  ${StakeIncreasedEventFieldsFragmentDoc}
  ${StakeSlashedEventFieldsFragmentDoc}
  ${WorkerStartedLeavingEventFieldsFragmentDoc}
  ${WorkerExitedEventFieldsFragmentDoc}
  ${TerminatedWorkerEventFieldsFragmentDoc}
  ${TerminatedLeaderEventFieldsFragmentDoc}
  ${WorkerRewardAccountUpdatedEventFragmentDoc}
  ${WorkerRewardAmountUpdatedEventFragmentDoc}
`

/**
 * __useGetMemberRoleEventsQuery__
 *
 * To run a query within a React component, call `useGetMemberRoleEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemberRoleEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemberRoleEventsQuery({
 *   variables: {
 *      worker_in: // value for 'worker_in'
 *      application_in: // value for 'application_in'
 *   },
 * });
 */
export function useGetMemberRoleEventsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMemberRoleEventsQuery, GetMemberRoleEventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMemberRoleEventsQuery, GetMemberRoleEventsQueryVariables>(
    GetMemberRoleEventsDocument,
    options
  )
}
export function useGetMemberRoleEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMemberRoleEventsQuery, GetMemberRoleEventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMemberRoleEventsQuery, GetMemberRoleEventsQueryVariables>(
    GetMemberRoleEventsDocument,
    options
  )
}
export type GetMemberRoleEventsQueryHookResult = ReturnType<typeof useGetMemberRoleEventsQuery>
export type GetMemberRoleEventsLazyQueryHookResult = ReturnType<typeof useGetMemberRoleEventsLazyQuery>
export type GetMemberRoleEventsQueryResult = Apollo.QueryResult<
  GetMemberRoleEventsQuery,
  GetMemberRoleEventsQueryVariables
>
export const GetGroupEventsDocument = gql`
  query GetGroupEvents($group_eq: ID!) {
    appliedOnOpeningEvents(where: { group: { id_eq: $group_eq } }) {
      ...AppliedOnOpeningEventFields
    }
    applicationWithdrawnEvents(where: { group: { id_eq: $group_eq } }) {
      ...ApplicationWithdrawnEventFields
    }
    budgetSpendingEvents(where: { group: { id_eq: $group_eq } }) {
      ...BudgetSpendingActivityEventFields
    }
    stakeDecreasedEvents(where: { group: { id_eq: $group_eq } }) {
      ...StakeDecreasedEventFields
    }
    stakeIncreasedEvents(where: { group: { id_eq: $group_eq } }) {
      ...StakeIncreasedEventFields
    }
    openingAddedEvents(where: { group: { id_eq: $group_eq } }) {
      ...OpeningAddedEventFields
    }
    openingCanceledEvents(where: { group: { id_eq: $group_eq } }) {
      ...OpeningCanceledEventFields
    }
    openingFilledEvents(where: { group: { id_eq: $group_eq } }) {
      ...OpeningFilledEventFields
    }
    workerExitedEvents(where: { group: { id_eq: $group_eq } }) {
      ...WorkerExitedEventFields
    }
    statusTextChangedEvents(where: { group: { id_eq: $group_eq } }) {
      ...StatusTextChangedEventFields
    }
    budgetSetEvents(where: { group: { id_eq: $group_eq } }) {
      ...BudgetSetEventFields
    }
    stakeSlashedEvents(where: { group: { id_eq: $group_eq } }) {
      ...StakeSlashedEventFields
    }
    terminatedWorkerEvents(where: { group: { id_eq: $group_eq } }) {
      ...TerminatedWorkerEventFields
    }
    terminatedLeaderEvents(where: { group: { id_eq: $group_eq } }) {
      ...TerminatedLeaderEventFields
    }
  }
  ${AppliedOnOpeningEventFieldsFragmentDoc}
  ${ApplicationWithdrawnEventFieldsFragmentDoc}
  ${BudgetSpendingActivityEventFieldsFragmentDoc}
  ${StakeDecreasedEventFieldsFragmentDoc}
  ${StakeIncreasedEventFieldsFragmentDoc}
  ${OpeningAddedEventFieldsFragmentDoc}
  ${OpeningCanceledEventFieldsFragmentDoc}
  ${OpeningFilledEventFieldsFragmentDoc}
  ${WorkerExitedEventFieldsFragmentDoc}
  ${StatusTextChangedEventFieldsFragmentDoc}
  ${BudgetSetEventFieldsFragmentDoc}
  ${StakeSlashedEventFieldsFragmentDoc}
  ${TerminatedWorkerEventFieldsFragmentDoc}
  ${TerminatedLeaderEventFieldsFragmentDoc}
`

/**
 * __useGetGroupEventsQuery__
 *
 * To run a query within a React component, call `useGetGroupEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGroupEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGroupEventsQuery({
 *   variables: {
 *      group_eq: // value for 'group_eq'
 *   },
 * });
 */
export function useGetGroupEventsQuery(
  baseOptions: Apollo.QueryHookOptions<GetGroupEventsQuery, GetGroupEventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetGroupEventsQuery, GetGroupEventsQueryVariables>(GetGroupEventsDocument, options)
}
export function useGetGroupEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetGroupEventsQuery, GetGroupEventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetGroupEventsQuery, GetGroupEventsQueryVariables>(GetGroupEventsDocument, options)
}
export type GetGroupEventsQueryHookResult = ReturnType<typeof useGetGroupEventsQuery>
export type GetGroupEventsLazyQueryHookResult = ReturnType<typeof useGetGroupEventsLazyQuery>
export type GetGroupEventsQueryResult = Apollo.QueryResult<GetGroupEventsQuery, GetGroupEventsQueryVariables>
export const GetWorkerEventsDocument = gql`
  query GetWorkerEvents($workerId: ID, $applicationId: ID) {
    appliedOnOpeningEvents(where: { application_eq: $applicationId }) {
      ...AppliedOnOpeningEventFields
    }
    applicationWithdrawnEvents(where: { application_eq: $applicationId }) {
      ...ApplicationWithdrawnEventFields
    }
    stakeDecreasedEvents(where: { worker: { id_eq: $workerId } }) {
      ...StakeDecreasedEventFields
    }
    stakeIncreasedEvents(where: { worker: { id_eq: $workerId } }) {
      ...StakeIncreasedEventFields
    }
    stakeSlashedEvents(where: { worker: { id_eq: $workerId } }) {
      ...StakeSlashedEventFields
    }
    workerStartedLeavingEvents(where: { worker: { id_eq: $workerId } }) {
      ...WorkerStartedLeavingEventFields
    }
    workerExitedEvents(where: { worker: { id_eq: $workerId } }) {
      ...WorkerExitedEventFields
    }
    terminatedWorkerEvents(where: { worker: { id_eq: $workerId } }) {
      ...TerminatedWorkerEventFields
    }
    terminatedLeaderEvents(where: { worker: { id_eq: $workerId } }) {
      ...TerminatedLeaderEventFields
    }
  }
  ${AppliedOnOpeningEventFieldsFragmentDoc}
  ${ApplicationWithdrawnEventFieldsFragmentDoc}
  ${StakeDecreasedEventFieldsFragmentDoc}
  ${StakeIncreasedEventFieldsFragmentDoc}
  ${StakeSlashedEventFieldsFragmentDoc}
  ${WorkerStartedLeavingEventFieldsFragmentDoc}
  ${WorkerExitedEventFieldsFragmentDoc}
  ${TerminatedWorkerEventFieldsFragmentDoc}
  ${TerminatedLeaderEventFieldsFragmentDoc}
`

/**
 * __useGetWorkerEventsQuery__
 *
 * To run a query within a React component, call `useGetWorkerEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkerEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkerEventsQuery({
 *   variables: {
 *      workerId: // value for 'workerId'
 *      applicationId: // value for 'applicationId'
 *   },
 * });
 */
export function useGetWorkerEventsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetWorkerEventsQuery, GetWorkerEventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkerEventsQuery, GetWorkerEventsQueryVariables>(GetWorkerEventsDocument, options)
}
export function useGetWorkerEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetWorkerEventsQuery, GetWorkerEventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkerEventsQuery, GetWorkerEventsQueryVariables>(GetWorkerEventsDocument, options)
}
export type GetWorkerEventsQueryHookResult = ReturnType<typeof useGetWorkerEventsQuery>
export type GetWorkerEventsLazyQueryHookResult = ReturnType<typeof useGetWorkerEventsLazyQuery>
export type GetWorkerEventsQueryResult = Apollo.QueryResult<GetWorkerEventsQuery, GetWorkerEventsQueryVariables>
export const GetWorkerIdsDocument = gql`
  query GetWorkerIds($where: WorkerWhereInput) {
    workers(where: $where) {
      id
    }
  }
`

/**
 * __useGetWorkerIdsQuery__
 *
 * To run a query within a React component, call `useGetWorkerIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkerIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkerIdsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetWorkerIdsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetWorkerIdsQuery, GetWorkerIdsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkerIdsQuery, GetWorkerIdsQueryVariables>(GetWorkerIdsDocument, options)
}
export function useGetWorkerIdsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetWorkerIdsQuery, GetWorkerIdsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkerIdsQuery, GetWorkerIdsQueryVariables>(GetWorkerIdsDocument, options)
}
export type GetWorkerIdsQueryHookResult = ReturnType<typeof useGetWorkerIdsQuery>
export type GetWorkerIdsLazyQueryHookResult = ReturnType<typeof useGetWorkerIdsLazyQuery>
export type GetWorkerIdsQueryResult = Apollo.QueryResult<GetWorkerIdsQuery, GetWorkerIdsQueryVariables>
export const GetWorkerUnstakingDetailsDocument = gql`
  query GetWorkerUnstakingDetails($where: WorkerWhereUniqueInput!) {
    workerByUniqueInput(where: $where) {
      status {
        __typename
        ... on WorkerStatusLeaving {
          workerStartedLeavingEvent {
            createdAt
          }
        }
      }
      application {
        opening {
          unstakingPeriod
        }
      }
    }
  }
`

/**
 * __useGetWorkerUnstakingDetailsQuery__
 *
 * To run a query within a React component, call `useGetWorkerUnstakingDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkerUnstakingDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkerUnstakingDetailsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetWorkerUnstakingDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<GetWorkerUnstakingDetailsQuery, GetWorkerUnstakingDetailsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetWorkerUnstakingDetailsQuery, GetWorkerUnstakingDetailsQueryVariables>(
    GetWorkerUnstakingDetailsDocument,
    options
  )
}
export function useGetWorkerUnstakingDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetWorkerUnstakingDetailsQuery, GetWorkerUnstakingDetailsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetWorkerUnstakingDetailsQuery, GetWorkerUnstakingDetailsQueryVariables>(
    GetWorkerUnstakingDetailsDocument,
    options
  )
}
export type GetWorkerUnstakingDetailsQueryHookResult = ReturnType<typeof useGetWorkerUnstakingDetailsQuery>
export type GetWorkerUnstakingDetailsLazyQueryHookResult = ReturnType<typeof useGetWorkerUnstakingDetailsLazyQuery>
export type GetWorkerUnstakingDetailsQueryResult = Apollo.QueryResult<
  GetWorkerUnstakingDetailsQuery,
  GetWorkerUnstakingDetailsQueryVariables
>
