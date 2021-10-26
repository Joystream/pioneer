import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated';

import { gql } from '@apollo/client';
import { MemberFieldsFragmentDoc } from '../../../memberships/queries/__generated__/members.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type WorkingGroupMetadataFieldsFragment = { __typename: 'WorkingGroupMetadata', about?: string | null | undefined, description?: string | null | undefined, status?: string | null | undefined, statusMessage?: string | null | undefined };

export type WorkerFieldsFragment = { __typename: 'Worker', id: string, runtimeId: number, applicationId: string, isLead: boolean, rewardPerBlock: any, missingRewardAmount?: any | null | undefined, stake: any, membership: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> }, group: { __typename: 'WorkingGroup', id: string, name: string }, status: { __typename: 'WorkerStatusActive' } | { __typename: 'WorkerStatusLeaving' } | { __typename: 'WorkerStatusLeft' } | { __typename: 'WorkerStatusTerminated' } };

export type PastWorkerFieldsFragment = { __typename: 'Worker', id: string, runtimeId: number, createdAt: any, updatedAt?: any | null | undefined, membership: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> }, status: { __typename: 'WorkerStatusActive' } | { __typename: 'WorkerStatusLeaving' } | { __typename: 'WorkerStatusLeft', workerExitedEvent?: { __typename: 'WorkerExitedEvent', createdAt: any, inBlock: number, network: Types.Network } | null | undefined } | { __typename: 'WorkerStatusTerminated', terminatedWorkerEvent?: { __typename: 'TerminatedWorkerEvent', createdAt: any, inBlock: number, network: Types.Network } | null | undefined }, entry: { __typename: 'OpeningFilledEvent', createdAt: any, inBlock: number, network: Types.Network } };

export type WorkerDetailedFieldsFragment = { __typename: 'Worker', roleAccount: string, rewardAccount: string, stakeAccount: string, id: string, runtimeId: number, applicationId: string, isLead: boolean, rewardPerBlock: any, missingRewardAmount?: any | null | undefined, stake: any, entry: { __typename: 'OpeningFilledEvent', inBlock: number, network: Types.Network, createdAt: any }, application: { __typename: 'WorkingGroupApplication', id: string, openingId: string, opening: { __typename: 'WorkingGroupOpening', stakeAmount: any } }, membership: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> }, group: { __typename: 'WorkingGroup', id: string, name: string }, status: { __typename: 'WorkerStatusActive' } | { __typename: 'WorkerStatusLeaving' } | { __typename: 'WorkerStatusLeft' } | { __typename: 'WorkerStatusTerminated' } };

export type WorkingGroupFieldsFragment = { __typename: 'WorkingGroup', id: string, name: string, budget: any, metadata?: { __typename: 'WorkingGroupMetadata', about?: string | null | undefined, description?: string | null | undefined, status?: string | null | undefined, statusMessage?: string | null | undefined } | null | undefined, workers: Array<{ __typename: 'Worker', stake: any }>, leader?: { __typename: 'Worker', membershipId: string } | null | undefined };

export type WorkingGroupDetailedFieldsFragment = { __typename: 'WorkingGroup', id: string, name: string, budget: any, leader?: { __typename: 'Worker', id: string, runtimeId: number, stake: any, membershipId: string } | null | undefined, metadata?: { __typename: 'WorkingGroupMetadata', about?: string | null | undefined, description?: string | null | undefined, status?: string | null | undefined, statusMessage?: string | null | undefined } | null | undefined, workers: Array<{ __typename: 'Worker', stake: any }> };

export type BudgetSpendingEventFieldsFragment = { __typename: 'BudgetSpendingEvent', id: string, groupId: string, reciever: string, amount: any, rationale?: string | null | undefined };

export type GetBudgetSpendingQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.BudgetSpendingEventWhereInput>;
}>;


export type GetBudgetSpendingQuery = { __typename: 'Query', budgetSpendingEvents: Array<{ __typename: 'BudgetSpendingEvent', id: string, groupId: string, reciever: string, amount: any, rationale?: string | null | undefined }> };

export type RewardPaidEventFieldsFragment = { __typename: 'RewardPaidEvent', id: string, amount: any, rewardAccount: string, createdAt: any };

export type GetWorkingGroupsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetWorkingGroupsQuery = { __typename: 'Query', workingGroups: Array<{ __typename: 'WorkingGroup', id: string, name: string, budget: any, metadata?: { __typename: 'WorkingGroupMetadata', about?: string | null | undefined, description?: string | null | undefined, status?: string | null | undefined, statusMessage?: string | null | undefined } | null | undefined, workers: Array<{ __typename: 'Worker', stake: any }>, leader?: { __typename: 'Worker', membershipId: string } | null | undefined }> };

export type GetWorkersQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.WorkerWhereInput>;
  offset?: Types.Maybe<Types.Scalars['Int']>;
  limit?: Types.Maybe<Types.Scalars['Int']>;
}>;


export type GetWorkersQuery = { __typename: 'Query', workers: Array<{ __typename: 'Worker', id: string, runtimeId: number, applicationId: string, isLead: boolean, rewardPerBlock: any, missingRewardAmount?: any | null | undefined, stake: any, membership: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> }, group: { __typename: 'WorkingGroup', id: string, name: string }, status: { __typename: 'WorkerStatusActive' } | { __typename: 'WorkerStatusLeaving' } | { __typename: 'WorkerStatusLeft' } | { __typename: 'WorkerStatusTerminated' } }> };

export type GetPastWorkersQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.WorkerWhereInput>;
  offset?: Types.Maybe<Types.Scalars['Int']>;
  limit?: Types.Maybe<Types.Scalars['Int']>;
  orderBy?: Types.Maybe<Array<Types.WorkerOrderByInput> | Types.WorkerOrderByInput>;
}>;


export type GetPastWorkersQuery = { __typename: 'Query', workers: Array<{ __typename: 'Worker', id: string, runtimeId: number, createdAt: any, updatedAt?: any | null | undefined, membership: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> }, status: { __typename: 'WorkerStatusActive' } | { __typename: 'WorkerStatusLeaving' } | { __typename: 'WorkerStatusLeft', workerExitedEvent?: { __typename: 'WorkerExitedEvent', createdAt: any, inBlock: number, network: Types.Network } | null | undefined } | { __typename: 'WorkerStatusTerminated', terminatedWorkerEvent?: { __typename: 'TerminatedWorkerEvent', createdAt: any, inBlock: number, network: Types.Network } | null | undefined }, entry: { __typename: 'OpeningFilledEvent', createdAt: any, inBlock: number, network: Types.Network } }> };

export type GetWorkersCountQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.WorkerWhereInput>;
}>;


export type GetWorkersCountQuery = { __typename: 'Query', workersConnection: { __typename: 'WorkerConnection', totalCount: number } };

export type GetDetailedWorkersQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.WorkerWhereInput>;
}>;


export type GetDetailedWorkersQuery = { __typename: 'Query', workers: Array<{ __typename: 'Worker', roleAccount: string, rewardAccount: string, stakeAccount: string, id: string, runtimeId: number, applicationId: string, isLead: boolean, rewardPerBlock: any, missingRewardAmount?: any | null | undefined, stake: any, entry: { __typename: 'OpeningFilledEvent', inBlock: number, network: Types.Network, createdAt: any }, application: { __typename: 'WorkingGroupApplication', id: string, openingId: string, opening: { __typename: 'WorkingGroupOpening', stakeAmount: any } }, membership: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> }, group: { __typename: 'WorkingGroup', id: string, name: string }, status: { __typename: 'WorkerStatusActive' } | { __typename: 'WorkerStatusLeaving' } | { __typename: 'WorkerStatusLeft' } | { __typename: 'WorkerStatusTerminated' } }> };

export type GetWorkerQueryVariables = Types.Exact<{
  where: Types.WorkerWhereUniqueInput;
}>;


export type GetWorkerQuery = { __typename: 'Query', workerByUniqueInput?: { __typename: 'Worker', roleAccount: string, rewardAccount: string, stakeAccount: string, id: string, runtimeId: number, applicationId: string, isLead: boolean, rewardPerBlock: any, missingRewardAmount?: any | null | undefined, stake: any, entry: { __typename: 'OpeningFilledEvent', inBlock: number, network: Types.Network, createdAt: any }, application: { __typename: 'WorkingGroupApplication', id: string, openingId: string, opening: { __typename: 'WorkingGroupOpening', stakeAmount: any } }, membership: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> }, group: { __typename: 'WorkingGroup', id: string, name: string }, status: { __typename: 'WorkerStatusActive' } | { __typename: 'WorkerStatusLeaving' } | { __typename: 'WorkerStatusLeft' } | { __typename: 'WorkerStatusTerminated' } } | null | undefined };

export type GetGroupDebtQueryVariables = Types.Exact<{
  where: Types.WorkerWhereInput;
}>;


export type GetGroupDebtQuery = { __typename: 'Query', workers: Array<{ __typename: 'Worker', missingRewardAmount?: any | null | undefined }> };

export type GetRewardsQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.RewardPaidEventWhereInput>;
}>;


export type GetRewardsQuery = { __typename: 'Query', rewardPaidEvents: Array<{ __typename: 'RewardPaidEvent', id: string, amount: any, rewardAccount: string, createdAt: any }> };

export type WorkingGroupOpeningMetadataFieldsFragment = { __typename: 'WorkingGroupOpeningMetadata', applicationDetails?: string | null | undefined, shortDescription?: string | null | undefined, description?: string | null | undefined, hiringLimit?: number | null | undefined, expectedEnding?: any | null | undefined };

export type WorkingGroupOpeningFieldsFragment = { __typename: 'WorkingGroupOpening', id: string, runtimeId: number, groupId: string, type: Types.WorkingGroupOpeningType, stakeAmount: any, rewardPerBlock: any, unstakingPeriod: number, group: { __typename: 'WorkingGroup', name: string, budget: any, leaderId?: string | null | undefined }, createdInEvent: { __typename: 'OpeningAddedEvent', inBlock: number, network: Types.Network, createdAt: any }, metadata: { __typename: 'WorkingGroupOpeningMetadata', applicationDetails?: string | null | undefined, shortDescription?: string | null | undefined, description?: string | null | undefined, hiringLimit?: number | null | undefined, expectedEnding?: any | null | undefined }, status: { __typename: 'OpeningStatusCancelled' } | { __typename: 'OpeningStatusFilled' } | { __typename: 'OpeningStatusOpen' }, applications: Array<{ __typename: 'WorkingGroupApplication', id: string }> };

export type WorkingGroupOpeningDetailedFieldsFragment = { __typename: 'WorkingGroupOpening', id: string, runtimeId: number, groupId: string, type: Types.WorkingGroupOpeningType, stakeAmount: any, rewardPerBlock: any, unstakingPeriod: number, applications: Array<{ __typename: 'WorkingGroupApplication', id: string, status: { __typename: 'ApplicationStatusAccepted' } | { __typename: 'ApplicationStatusCancelled' } | { __typename: 'ApplicationStatusPending' } | { __typename: 'ApplicationStatusRejected' } | { __typename: 'ApplicationStatusWithdrawn' }, applicant: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> } }>, group: { __typename: 'WorkingGroup', name: string, budget: any, leaderId?: string | null | undefined }, createdInEvent: { __typename: 'OpeningAddedEvent', inBlock: number, network: Types.Network, createdAt: any }, metadata: { __typename: 'WorkingGroupOpeningMetadata', applicationDetails?: string | null | undefined, shortDescription?: string | null | undefined, description?: string | null | undefined, hiringLimit?: number | null | undefined, expectedEnding?: any | null | undefined }, status: { __typename: 'OpeningStatusCancelled' } | { __typename: 'OpeningStatusFilled' } | { __typename: 'OpeningStatusOpen' } };

export type CountWorkingGroupOpeningsQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.WorkingGroupOpeningWhereInput>;
}>;


export type CountWorkingGroupOpeningsQuery = { __typename: 'Query', workingGroupOpeningsConnection: { __typename: 'WorkingGroupOpeningConnection', totalCount: number } };

export type CountWorkingGroupWorkersQueryVariables = Types.Exact<{
  groupId_eq?: Types.Maybe<Types.Scalars['ID']>;
  status_json?: Types.Maybe<Types.Scalars['JSONObject']>;
}>;


export type CountWorkingGroupWorkersQuery = { __typename: 'Query', workersConnection: { __typename: 'WorkerConnection', totalCount: number } };

export type GetWorkingGroupOpeningsQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.WorkingGroupOpeningWhereInput>;
  limit?: Types.Maybe<Types.Scalars['Int']>;
  offset?: Types.Maybe<Types.Scalars['Int']>;
}>;


export type GetWorkingGroupOpeningsQuery = { __typename: 'Query', workingGroupOpenings: Array<{ __typename: 'WorkingGroupOpening', id: string, runtimeId: number, groupId: string, type: Types.WorkingGroupOpeningType, stakeAmount: any, rewardPerBlock: any, unstakingPeriod: number, group: { __typename: 'WorkingGroup', name: string, budget: any, leaderId?: string | null | undefined }, createdInEvent: { __typename: 'OpeningAddedEvent', inBlock: number, network: Types.Network, createdAt: any }, metadata: { __typename: 'WorkingGroupOpeningMetadata', applicationDetails?: string | null | undefined, shortDescription?: string | null | undefined, description?: string | null | undefined, hiringLimit?: number | null | undefined, expectedEnding?: any | null | undefined }, status: { __typename: 'OpeningStatusCancelled' } | { __typename: 'OpeningStatusFilled' } | { __typename: 'OpeningStatusOpen' }, applications: Array<{ __typename: 'WorkingGroupApplication', id: string }> }> };

export type GetWorkingGroupOpeningQueryVariables = Types.Exact<{
  where: Types.WorkingGroupOpeningWhereUniqueInput;
}>;


export type GetWorkingGroupOpeningQuery = { __typename: 'Query', workingGroupOpeningByUniqueInput?: { __typename: 'WorkingGroupOpening', id: string, runtimeId: number, groupId: string, type: Types.WorkingGroupOpeningType, stakeAmount: any, rewardPerBlock: any, unstakingPeriod: number, applications: Array<{ __typename: 'WorkingGroupApplication', id: string, status: { __typename: 'ApplicationStatusAccepted' } | { __typename: 'ApplicationStatusCancelled' } | { __typename: 'ApplicationStatusPending' } | { __typename: 'ApplicationStatusRejected' } | { __typename: 'ApplicationStatusWithdrawn' }, applicant: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> } }>, group: { __typename: 'WorkingGroup', name: string, budget: any, leaderId?: string | null | undefined }, createdInEvent: { __typename: 'OpeningAddedEvent', inBlock: number, network: Types.Network, createdAt: any }, metadata: { __typename: 'WorkingGroupOpeningMetadata', applicationDetails?: string | null | undefined, shortDescription?: string | null | undefined, description?: string | null | undefined, hiringLimit?: number | null | undefined, expectedEnding?: any | null | undefined }, status: { __typename: 'OpeningStatusCancelled' } | { __typename: 'OpeningStatusFilled' } | { __typename: 'OpeningStatusOpen' } } | null | undefined };

export type ApplicationQuestionFieldsFragment = { __typename: 'ApplicationFormQuestion', index: number, type: Types.ApplicationFormQuestionType, question?: string | null | undefined };

export type GetWorkingGroupOpeningQuestionsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type GetWorkingGroupOpeningQuestionsQuery = { __typename: 'Query', workingGroupOpeningByUniqueInput?: { __typename: 'WorkingGroupOpening', metadata: { __typename: 'WorkingGroupOpeningMetadata', applicationFormQuestions: Array<{ __typename: 'ApplicationFormQuestion', index: number, type: Types.ApplicationFormQuestionType, question?: string | null | undefined }> } } | null | undefined };

export type GetWorkingGroupQueryVariables = Types.Exact<{
  where: Types.WorkingGroupWhereUniqueInput;
}>;


export type GetWorkingGroupQuery = { __typename: 'Query', workingGroupByUniqueInput?: { __typename: 'WorkingGroup', id: string, name: string, budget: any, leader?: { __typename: 'Worker', id: string, runtimeId: number, stake: any, membershipId: string } | null | undefined, metadata?: { __typename: 'WorkingGroupMetadata', about?: string | null | undefined, description?: string | null | undefined, status?: string | null | undefined, statusMessage?: string | null | undefined } | null | undefined, workers: Array<{ __typename: 'Worker', stake: any }> } | null | undefined };

export type WorkingGroupApplicationFieldsFragment = { __typename: 'WorkingGroupApplication', id: string, runtimeId: number, stakingAccount: string, opening: { __typename: 'WorkingGroupOpening', id: string, type: Types.WorkingGroupOpeningType, rewardPerBlock: any, group: { __typename: 'WorkingGroup', name: string } }, applicant: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> }, status: { __typename: 'ApplicationStatusAccepted' } | { __typename: 'ApplicationStatusCancelled' } | { __typename: 'ApplicationStatusPending' } | { __typename: 'ApplicationStatusRejected' } | { __typename: 'ApplicationStatusWithdrawn' }, createdInEvent: { __typename: 'AppliedOnOpeningEvent', createdAt: any, inBlock: number, network: Types.Network } };

export type GetWorkingGroupApplicationsQueryVariables = Types.Exact<{
  applicantId_in?: Types.Maybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>;
}>;


export type GetWorkingGroupApplicationsQuery = { __typename: 'Query', workingGroupApplications: Array<{ __typename: 'WorkingGroupApplication', id: string, runtimeId: number, stakingAccount: string, opening: { __typename: 'WorkingGroupOpening', id: string, type: Types.WorkingGroupOpeningType, rewardPerBlock: any, group: { __typename: 'WorkingGroup', name: string } }, applicant: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> }, status: { __typename: 'ApplicationStatusAccepted' } | { __typename: 'ApplicationStatusCancelled' } | { __typename: 'ApplicationStatusPending' } | { __typename: 'ApplicationStatusRejected' } | { __typename: 'ApplicationStatusWithdrawn' }, createdInEvent: { __typename: 'AppliedOnOpeningEvent', createdAt: any, inBlock: number, network: Types.Network } }> };

export type GetWorkingGroupApplicationIdsQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.WorkingGroupApplicationWhereInput>;
}>;


export type GetWorkingGroupApplicationIdsQuery = { __typename: 'Query', workingGroupApplications: Array<{ __typename: 'WorkingGroupApplication', id: string }> };

export type GetWorkingGroupApplicationQueryVariables = Types.Exact<{
  where: Types.WorkingGroupApplicationWhereUniqueInput;
}>;


export type GetWorkingGroupApplicationQuery = { __typename: 'Query', workingGroupApplicationByUniqueInput?: { __typename: 'WorkingGroupApplication', id: string, runtimeId: number, stakingAccount: string, opening: { __typename: 'WorkingGroupOpening', id: string, type: Types.WorkingGroupOpeningType, rewardPerBlock: any, group: { __typename: 'WorkingGroup', name: string } }, applicant: { __typename: 'Membership', id: string, rootAccount: string, controllerAccount: string, handle: string, isVerified: boolean, isFoundingMember: boolean, inviteCount: number, createdAt: any, metadata: { __typename: 'MemberMetadata', name?: string | null | undefined, about?: string | null | undefined }, roles: Array<{ __typename: 'Worker', id: string, createdAt: any, isLead: boolean, group: { __typename: 'WorkingGroup', name: string } }> }, status: { __typename: 'ApplicationStatusAccepted' } | { __typename: 'ApplicationStatusCancelled' } | { __typename: 'ApplicationStatusPending' } | { __typename: 'ApplicationStatusRejected' } | { __typename: 'ApplicationStatusWithdrawn' }, createdInEvent: { __typename: 'AppliedOnOpeningEvent', createdAt: any, inBlock: number, network: Types.Network } } | null | undefined };

export type ApplicationFormQuestionAnswerFieldsFragment = { __typename: 'ApplicationFormQuestionAnswer', answer: string, question: { __typename: 'ApplicationFormQuestion', index: number, type: Types.ApplicationFormQuestionType, question?: string | null | undefined } };

export type GetApplicationFormQuestionAnswerQueryVariables = Types.Exact<{
  applicationId_eq?: Types.Maybe<Types.Scalars['ID']>;
}>;


export type GetApplicationFormQuestionAnswerQuery = { __typename: 'Query', applicationFormQuestionAnswers: Array<{ __typename: 'ApplicationFormQuestionAnswer', answer: string, question: { __typename: 'ApplicationFormQuestion', index: number, type: Types.ApplicationFormQuestionType, question?: string | null | undefined } }> };

export type UpcomingWorkingGroupOpeningFieldsFragment = { __typename: 'UpcomingWorkingGroupOpening', id: string, groupId: string, expectedStart?: any | null | undefined, stakeAmount?: any | null | undefined, rewardPerBlock?: any | null | undefined, group: { __typename: 'WorkingGroup', name: string, budget: any, leaderId?: string | null | undefined }, createdInEvent: { __typename: 'StatusTextChangedEvent', createdAt: any, inBlock: number, network: Types.Network }, metadata: { __typename: 'WorkingGroupOpeningMetadata', applicationDetails?: string | null | undefined, shortDescription?: string | null | undefined, description?: string | null | undefined, hiringLimit?: number | null | undefined, expectedEnding?: any | null | undefined } };

export type GetUpcomingWorkingGroupOpeningQueryVariables = Types.Exact<{
  where: Types.UpcomingWorkingGroupOpeningWhereUniqueInput;
}>;


export type GetUpcomingWorkingGroupOpeningQuery = { __typename: 'Query', upcomingWorkingGroupOpeningByUniqueInput?: { __typename: 'UpcomingWorkingGroupOpening', id: string, groupId: string, expectedStart?: any | null | undefined, stakeAmount?: any | null | undefined, rewardPerBlock?: any | null | undefined, group: { __typename: 'WorkingGroup', name: string, budget: any, leaderId?: string | null | undefined }, createdInEvent: { __typename: 'StatusTextChangedEvent', createdAt: any, inBlock: number, network: Types.Network }, metadata: { __typename: 'WorkingGroupOpeningMetadata', applicationDetails?: string | null | undefined, shortDescription?: string | null | undefined, description?: string | null | undefined, hiringLimit?: number | null | undefined, expectedEnding?: any | null | undefined } } | null | undefined };

export type GetUpcomingWorkingGroupOpeningsQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.UpcomingWorkingGroupOpeningWhereInput>;
  limit?: Types.Maybe<Types.Scalars['Int']>;
  offset?: Types.Maybe<Types.Scalars['Int']>;
}>;


export type GetUpcomingWorkingGroupOpeningsQuery = { __typename: 'Query', upcomingWorkingGroupOpenings: Array<{ __typename: 'UpcomingWorkingGroupOpening', id: string, groupId: string, expectedStart?: any | null | undefined, stakeAmount?: any | null | undefined, rewardPerBlock?: any | null | undefined, group: { __typename: 'WorkingGroup', name: string, budget: any, leaderId?: string | null | undefined }, createdInEvent: { __typename: 'StatusTextChangedEvent', createdAt: any, inBlock: number, network: Types.Network }, metadata: { __typename: 'WorkingGroupOpeningMetadata', applicationDetails?: string | null | undefined, shortDescription?: string | null | undefined, description?: string | null | undefined, hiringLimit?: number | null | undefined, expectedEnding?: any | null | undefined } }> };

export type GetWorkerIdsQueryVariables = Types.Exact<{
  where?: Types.Maybe<Types.WorkerWhereInput>;
}>;


export type GetWorkerIdsQuery = { __typename: 'Query', workers: Array<{ __typename: 'Worker', id: string }> };

export type GetWorkerUnstakingDetailsQueryVariables = Types.Exact<{
  where: Types.WorkerWhereUniqueInput;
}>;


export type GetWorkerUnstakingDetailsQuery = { __typename: 'Query', workerByUniqueInput?: { __typename: 'Worker', status: { __typename: 'WorkerStatusActive' } | { __typename: 'WorkerStatusLeaving', workerStartedLeavingEvent?: { __typename: 'WorkerStartedLeavingEvent', createdAt: any } | null | undefined } | { __typename: 'WorkerStatusLeft' } | { __typename: 'WorkerStatusTerminated' }, application: { __typename: 'WorkingGroupApplication', opening: { __typename: 'WorkingGroupOpening', unstakingPeriod: number } } } | null | undefined };

export const PastWorkerFieldsFragmentDoc = gql`
    fragment PastWorkerFields on Worker {
  id
  runtimeId
  membership {
    ...MemberFields
  }
  createdAt
  updatedAt
  status {
    ... on WorkerStatusLeft {
      workerExitedEvent {
        createdAt
        inBlock
        network
      }
    }
    ... on WorkerStatusTerminated {
      terminatedWorkerEvent {
        createdAt
        inBlock
        network
      }
    }
  }
  entry {
    createdAt
    inBlock
    network
  }
}
    ${MemberFieldsFragmentDoc}`;
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
    ${MemberFieldsFragmentDoc}`;
export const WorkerDetailedFieldsFragmentDoc = gql`
    fragment WorkerDetailedFields on Worker {
  ...WorkerFields
  roleAccount
  rewardAccount
  stakeAccount
  entry {
    inBlock
    network
    createdAt
  }
  application {
    id
    openingId
    opening {
      stakeAmount
    }
  }
}
    ${WorkerFieldsFragmentDoc}`;
export const WorkingGroupMetadataFieldsFragmentDoc = gql`
    fragment WorkingGroupMetadataFields on WorkingGroupMetadata {
  about
  description
  status
  statusMessage
}
    `;
export const WorkingGroupFieldsFragmentDoc = gql`
    fragment WorkingGroupFields on WorkingGroup {
  id
  name
  budget
  metadata {
    ...WorkingGroupMetadataFields
  }
  workers {
    stake
  }
  leader {
    membershipId
  }
}
    ${WorkingGroupMetadataFieldsFragmentDoc}`;
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
    ${WorkingGroupFieldsFragmentDoc}`;
export const BudgetSpendingEventFieldsFragmentDoc = gql`
    fragment BudgetSpendingEventFields on BudgetSpendingEvent {
  id
  groupId
  reciever
  amount
  rationale
}
    `;
export const RewardPaidEventFieldsFragmentDoc = gql`
    fragment RewardPaidEventFields on RewardPaidEvent {
  id
  amount
  rewardAccount
  createdAt
}
    `;
export const WorkingGroupOpeningMetadataFieldsFragmentDoc = gql`
    fragment WorkingGroupOpeningMetadataFields on WorkingGroupOpeningMetadata {
  applicationDetails
  shortDescription
  description
  hiringLimit
  expectedEnding
}
    `;
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
  createdInEvent {
    inBlock
    network
    createdAt
  }
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
    ${WorkingGroupOpeningMetadataFieldsFragmentDoc}`;
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
${MemberFieldsFragmentDoc}`;
export const WorkingGroupApplicationFieldsFragmentDoc = gql`
    fragment WorkingGroupApplicationFields on WorkingGroupApplication {
  id
  runtimeId
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
  createdInEvent {
    createdAt
    inBlock
    network
  }
}
    ${MemberFieldsFragmentDoc}`;
export const ApplicationQuestionFieldsFragmentDoc = gql`
    fragment ApplicationQuestionFields on ApplicationFormQuestion {
  index
  type
  question
}
    `;
export const ApplicationFormQuestionAnswerFieldsFragmentDoc = gql`
    fragment ApplicationFormQuestionAnswerFields on ApplicationFormQuestionAnswer {
  question {
    ...ApplicationQuestionFields
  }
  answer
}
    ${ApplicationQuestionFieldsFragmentDoc}`;
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
  createdInEvent {
    createdAt
    inBlock
    network
  }
  metadata {
    ...WorkingGroupOpeningMetadataFields
  }
}
    ${WorkingGroupOpeningMetadataFieldsFragmentDoc}`;
export const GetBudgetSpendingDocument = gql`
    query GetBudgetSpending($where: BudgetSpendingEventWhereInput) {
  budgetSpendingEvents(where: $where) {
    ...BudgetSpendingEventFields
  }
}
    ${BudgetSpendingEventFieldsFragmentDoc}`;

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
export function useGetBudgetSpendingQuery(baseOptions?: Apollo.QueryHookOptions<GetBudgetSpendingQuery, GetBudgetSpendingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBudgetSpendingQuery, GetBudgetSpendingQueryVariables>(GetBudgetSpendingDocument, options);
      }
export function useGetBudgetSpendingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBudgetSpendingQuery, GetBudgetSpendingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBudgetSpendingQuery, GetBudgetSpendingQueryVariables>(GetBudgetSpendingDocument, options);
        }
export type GetBudgetSpendingQueryHookResult = ReturnType<typeof useGetBudgetSpendingQuery>;
export type GetBudgetSpendingLazyQueryHookResult = ReturnType<typeof useGetBudgetSpendingLazyQuery>;
export type GetBudgetSpendingQueryResult = Apollo.QueryResult<GetBudgetSpendingQuery, GetBudgetSpendingQueryVariables>;
export const GetWorkingGroupsDocument = gql`
    query GetWorkingGroups {
  workingGroups {
    ...WorkingGroupFields
  }
}
    ${WorkingGroupFieldsFragmentDoc}`;

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
export function useGetWorkingGroupsQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>(GetWorkingGroupsDocument, options);
      }
export function useGetWorkingGroupsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>(GetWorkingGroupsDocument, options);
        }
export type GetWorkingGroupsQueryHookResult = ReturnType<typeof useGetWorkingGroupsQuery>;
export type GetWorkingGroupsLazyQueryHookResult = ReturnType<typeof useGetWorkingGroupsLazyQuery>;
export type GetWorkingGroupsQueryResult = Apollo.QueryResult<GetWorkingGroupsQuery, GetWorkingGroupsQueryVariables>;
export const GetWorkersDocument = gql`
    query GetWorkers($where: WorkerWhereInput, $offset: Int, $limit: Int) {
  workers(where: $where, offset: $offset, limit: $limit) {
    ...WorkerFields
  }
}
    ${WorkerFieldsFragmentDoc}`;

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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkersQuery, GetWorkersQueryVariables>(GetWorkersDocument, options);
      }
export function useGetWorkersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkersQuery, GetWorkersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkersQuery, GetWorkersQueryVariables>(GetWorkersDocument, options);
        }
export type GetWorkersQueryHookResult = ReturnType<typeof useGetWorkersQuery>;
export type GetWorkersLazyQueryHookResult = ReturnType<typeof useGetWorkersLazyQuery>;
export type GetWorkersQueryResult = Apollo.QueryResult<GetWorkersQuery, GetWorkersQueryVariables>;
export const GetPastWorkersDocument = gql`
    query GetPastWorkers($where: WorkerWhereInput, $offset: Int, $limit: Int, $orderBy: [WorkerOrderByInput!]) {
  workers(where: $where, offset: $offset, limit: $limit, orderBy: $orderBy) {
    ...PastWorkerFields
  }
}
    ${PastWorkerFieldsFragmentDoc}`;

/**
 * __useGetPastWorkersQuery__
 *
 * To run a query within a React component, call `useGetPastWorkersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPastWorkersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPastWorkersQuery({
 *   variables: {
 *      where: // value for 'where'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useGetPastWorkersQuery(baseOptions?: Apollo.QueryHookOptions<GetPastWorkersQuery, GetPastWorkersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPastWorkersQuery, GetPastWorkersQueryVariables>(GetPastWorkersDocument, options);
      }
export function useGetPastWorkersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPastWorkersQuery, GetPastWorkersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPastWorkersQuery, GetPastWorkersQueryVariables>(GetPastWorkersDocument, options);
        }
export type GetPastWorkersQueryHookResult = ReturnType<typeof useGetPastWorkersQuery>;
export type GetPastWorkersLazyQueryHookResult = ReturnType<typeof useGetPastWorkersLazyQuery>;
export type GetPastWorkersQueryResult = Apollo.QueryResult<GetPastWorkersQuery, GetPastWorkersQueryVariables>;
export const GetWorkersCountDocument = gql`
    query GetWorkersCount($where: WorkerWhereInput) {
  workersConnection(where: $where) {
    totalCount
  }
}
    `;

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
export function useGetWorkersCountQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkersCountQuery, GetWorkersCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkersCountQuery, GetWorkersCountQueryVariables>(GetWorkersCountDocument, options);
      }
export function useGetWorkersCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkersCountQuery, GetWorkersCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkersCountQuery, GetWorkersCountQueryVariables>(GetWorkersCountDocument, options);
        }
export type GetWorkersCountQueryHookResult = ReturnType<typeof useGetWorkersCountQuery>;
export type GetWorkersCountLazyQueryHookResult = ReturnType<typeof useGetWorkersCountLazyQuery>;
export type GetWorkersCountQueryResult = Apollo.QueryResult<GetWorkersCountQuery, GetWorkersCountQueryVariables>;
export const GetDetailedWorkersDocument = gql`
    query GetDetailedWorkers($where: WorkerWhereInput) {
  workers(where: $where) {
    ...WorkerDetailedFields
  }
}
    ${WorkerDetailedFieldsFragmentDoc}`;

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
export function useGetDetailedWorkersQuery(baseOptions?: Apollo.QueryHookOptions<GetDetailedWorkersQuery, GetDetailedWorkersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDetailedWorkersQuery, GetDetailedWorkersQueryVariables>(GetDetailedWorkersDocument, options);
      }
export function useGetDetailedWorkersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDetailedWorkersQuery, GetDetailedWorkersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDetailedWorkersQuery, GetDetailedWorkersQueryVariables>(GetDetailedWorkersDocument, options);
        }
export type GetDetailedWorkersQueryHookResult = ReturnType<typeof useGetDetailedWorkersQuery>;
export type GetDetailedWorkersLazyQueryHookResult = ReturnType<typeof useGetDetailedWorkersLazyQuery>;
export type GetDetailedWorkersQueryResult = Apollo.QueryResult<GetDetailedWorkersQuery, GetDetailedWorkersQueryVariables>;
export const GetWorkerDocument = gql`
    query GetWorker($where: WorkerWhereUniqueInput!) {
  workerByUniqueInput(where: $where) {
    ...WorkerDetailedFields
  }
}
    ${WorkerDetailedFieldsFragmentDoc}`;

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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkerQuery, GetWorkerQueryVariables>(GetWorkerDocument, options);
      }
export function useGetWorkerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkerQuery, GetWorkerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkerQuery, GetWorkerQueryVariables>(GetWorkerDocument, options);
        }
export type GetWorkerQueryHookResult = ReturnType<typeof useGetWorkerQuery>;
export type GetWorkerLazyQueryHookResult = ReturnType<typeof useGetWorkerLazyQuery>;
export type GetWorkerQueryResult = Apollo.QueryResult<GetWorkerQuery, GetWorkerQueryVariables>;
export const GetGroupDebtDocument = gql`
    query GetGroupDebt($where: WorkerWhereInput!) {
  workers(where: $where) {
    missingRewardAmount
  }
}
    `;

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
export function useGetGroupDebtQuery(baseOptions: Apollo.QueryHookOptions<GetGroupDebtQuery, GetGroupDebtQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGroupDebtQuery, GetGroupDebtQueryVariables>(GetGroupDebtDocument, options);
      }
export function useGetGroupDebtLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGroupDebtQuery, GetGroupDebtQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGroupDebtQuery, GetGroupDebtQueryVariables>(GetGroupDebtDocument, options);
        }
export type GetGroupDebtQueryHookResult = ReturnType<typeof useGetGroupDebtQuery>;
export type GetGroupDebtLazyQueryHookResult = ReturnType<typeof useGetGroupDebtLazyQuery>;
export type GetGroupDebtQueryResult = Apollo.QueryResult<GetGroupDebtQuery, GetGroupDebtQueryVariables>;
export const GetRewardsDocument = gql`
    query GetRewards($where: RewardPaidEventWhereInput) {
  rewardPaidEvents(where: $where) {
    ...RewardPaidEventFields
  }
}
    ${RewardPaidEventFieldsFragmentDoc}`;

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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRewardsQuery, GetRewardsQueryVariables>(GetRewardsDocument, options);
      }
export function useGetRewardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRewardsQuery, GetRewardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRewardsQuery, GetRewardsQueryVariables>(GetRewardsDocument, options);
        }
export type GetRewardsQueryHookResult = ReturnType<typeof useGetRewardsQuery>;
export type GetRewardsLazyQueryHookResult = ReturnType<typeof useGetRewardsLazyQuery>;
export type GetRewardsQueryResult = Apollo.QueryResult<GetRewardsQuery, GetRewardsQueryVariables>;
export const CountWorkingGroupOpeningsDocument = gql`
    query CountWorkingGroupOpenings($where: WorkingGroupOpeningWhereInput) {
  workingGroupOpeningsConnection(where: $where) {
    totalCount
  }
}
    `;

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
export function useCountWorkingGroupOpeningsQuery(baseOptions?: Apollo.QueryHookOptions<CountWorkingGroupOpeningsQuery, CountWorkingGroupOpeningsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountWorkingGroupOpeningsQuery, CountWorkingGroupOpeningsQueryVariables>(CountWorkingGroupOpeningsDocument, options);
      }
export function useCountWorkingGroupOpeningsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountWorkingGroupOpeningsQuery, CountWorkingGroupOpeningsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountWorkingGroupOpeningsQuery, CountWorkingGroupOpeningsQueryVariables>(CountWorkingGroupOpeningsDocument, options);
        }
export type CountWorkingGroupOpeningsQueryHookResult = ReturnType<typeof useCountWorkingGroupOpeningsQuery>;
export type CountWorkingGroupOpeningsLazyQueryHookResult = ReturnType<typeof useCountWorkingGroupOpeningsLazyQuery>;
export type CountWorkingGroupOpeningsQueryResult = Apollo.QueryResult<CountWorkingGroupOpeningsQuery, CountWorkingGroupOpeningsQueryVariables>;
export const CountWorkingGroupWorkersDocument = gql`
    query CountWorkingGroupWorkers($groupId_eq: ID, $status_json: JSONObject) {
  workersConnection(
    where: {group: {id_eq: $groupId_eq}, status_json: $status_json}
  ) {
    totalCount
  }
}
    `;

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
export function useCountWorkingGroupWorkersQuery(baseOptions?: Apollo.QueryHookOptions<CountWorkingGroupWorkersQuery, CountWorkingGroupWorkersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountWorkingGroupWorkersQuery, CountWorkingGroupWorkersQueryVariables>(CountWorkingGroupWorkersDocument, options);
      }
export function useCountWorkingGroupWorkersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountWorkingGroupWorkersQuery, CountWorkingGroupWorkersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountWorkingGroupWorkersQuery, CountWorkingGroupWorkersQueryVariables>(CountWorkingGroupWorkersDocument, options);
        }
export type CountWorkingGroupWorkersQueryHookResult = ReturnType<typeof useCountWorkingGroupWorkersQuery>;
export type CountWorkingGroupWorkersLazyQueryHookResult = ReturnType<typeof useCountWorkingGroupWorkersLazyQuery>;
export type CountWorkingGroupWorkersQueryResult = Apollo.QueryResult<CountWorkingGroupWorkersQuery, CountWorkingGroupWorkersQueryVariables>;
export const GetWorkingGroupOpeningsDocument = gql`
    query GetWorkingGroupOpenings($where: WorkingGroupOpeningWhereInput, $limit: Int, $offset: Int) {
  workingGroupOpenings(where: $where, limit: $limit, offset: $offset) {
    ...WorkingGroupOpeningFields
  }
}
    ${WorkingGroupOpeningFieldsFragmentDoc}`;

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
export function useGetWorkingGroupOpeningsQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkingGroupOpeningsQuery, GetWorkingGroupOpeningsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkingGroupOpeningsQuery, GetWorkingGroupOpeningsQueryVariables>(GetWorkingGroupOpeningsDocument, options);
      }
export function useGetWorkingGroupOpeningsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingGroupOpeningsQuery, GetWorkingGroupOpeningsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkingGroupOpeningsQuery, GetWorkingGroupOpeningsQueryVariables>(GetWorkingGroupOpeningsDocument, options);
        }
export type GetWorkingGroupOpeningsQueryHookResult = ReturnType<typeof useGetWorkingGroupOpeningsQuery>;
export type GetWorkingGroupOpeningsLazyQueryHookResult = ReturnType<typeof useGetWorkingGroupOpeningsLazyQuery>;
export type GetWorkingGroupOpeningsQueryResult = Apollo.QueryResult<GetWorkingGroupOpeningsQuery, GetWorkingGroupOpeningsQueryVariables>;
export const GetWorkingGroupOpeningDocument = gql`
    query GetWorkingGroupOpening($where: WorkingGroupOpeningWhereUniqueInput!) {
  workingGroupOpeningByUniqueInput(where: $where) {
    ...WorkingGroupOpeningDetailedFields
  }
}
    ${WorkingGroupOpeningDetailedFieldsFragmentDoc}`;

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
export function useGetWorkingGroupOpeningQuery(baseOptions: Apollo.QueryHookOptions<GetWorkingGroupOpeningQuery, GetWorkingGroupOpeningQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkingGroupOpeningQuery, GetWorkingGroupOpeningQueryVariables>(GetWorkingGroupOpeningDocument, options);
      }
export function useGetWorkingGroupOpeningLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingGroupOpeningQuery, GetWorkingGroupOpeningQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkingGroupOpeningQuery, GetWorkingGroupOpeningQueryVariables>(GetWorkingGroupOpeningDocument, options);
        }
export type GetWorkingGroupOpeningQueryHookResult = ReturnType<typeof useGetWorkingGroupOpeningQuery>;
export type GetWorkingGroupOpeningLazyQueryHookResult = ReturnType<typeof useGetWorkingGroupOpeningLazyQuery>;
export type GetWorkingGroupOpeningQueryResult = Apollo.QueryResult<GetWorkingGroupOpeningQuery, GetWorkingGroupOpeningQueryVariables>;
export const GetWorkingGroupOpeningQuestionsDocument = gql`
    query GetWorkingGroupOpeningQuestions($id: ID!) {
  workingGroupOpeningByUniqueInput(where: {id: $id}) {
    metadata {
      applicationFormQuestions {
        ...ApplicationQuestionFields
      }
    }
  }
}
    ${ApplicationQuestionFieldsFragmentDoc}`;

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
export function useGetWorkingGroupOpeningQuestionsQuery(baseOptions: Apollo.QueryHookOptions<GetWorkingGroupOpeningQuestionsQuery, GetWorkingGroupOpeningQuestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkingGroupOpeningQuestionsQuery, GetWorkingGroupOpeningQuestionsQueryVariables>(GetWorkingGroupOpeningQuestionsDocument, options);
      }
export function useGetWorkingGroupOpeningQuestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingGroupOpeningQuestionsQuery, GetWorkingGroupOpeningQuestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkingGroupOpeningQuestionsQuery, GetWorkingGroupOpeningQuestionsQueryVariables>(GetWorkingGroupOpeningQuestionsDocument, options);
        }
export type GetWorkingGroupOpeningQuestionsQueryHookResult = ReturnType<typeof useGetWorkingGroupOpeningQuestionsQuery>;
export type GetWorkingGroupOpeningQuestionsLazyQueryHookResult = ReturnType<typeof useGetWorkingGroupOpeningQuestionsLazyQuery>;
export type GetWorkingGroupOpeningQuestionsQueryResult = Apollo.QueryResult<GetWorkingGroupOpeningQuestionsQuery, GetWorkingGroupOpeningQuestionsQueryVariables>;
export const GetWorkingGroupDocument = gql`
    query GetWorkingGroup($where: WorkingGroupWhereUniqueInput!) {
  workingGroupByUniqueInput(where: $where) {
    ...WorkingGroupDetailedFields
  }
}
    ${WorkingGroupDetailedFieldsFragmentDoc}`;

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
export function useGetWorkingGroupQuery(baseOptions: Apollo.QueryHookOptions<GetWorkingGroupQuery, GetWorkingGroupQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkingGroupQuery, GetWorkingGroupQueryVariables>(GetWorkingGroupDocument, options);
      }
export function useGetWorkingGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingGroupQuery, GetWorkingGroupQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkingGroupQuery, GetWorkingGroupQueryVariables>(GetWorkingGroupDocument, options);
        }
export type GetWorkingGroupQueryHookResult = ReturnType<typeof useGetWorkingGroupQuery>;
export type GetWorkingGroupLazyQueryHookResult = ReturnType<typeof useGetWorkingGroupLazyQuery>;
export type GetWorkingGroupQueryResult = Apollo.QueryResult<GetWorkingGroupQuery, GetWorkingGroupQueryVariables>;
export const GetWorkingGroupApplicationsDocument = gql`
    query GetWorkingGroupApplications($applicantId_in: [ID!]) {
  workingGroupApplications(where: {applicant: {id_in: $applicantId_in}}) {
    ...WorkingGroupApplicationFields
  }
}
    ${WorkingGroupApplicationFieldsFragmentDoc}`;

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
export function useGetWorkingGroupApplicationsQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkingGroupApplicationsQuery, GetWorkingGroupApplicationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkingGroupApplicationsQuery, GetWorkingGroupApplicationsQueryVariables>(GetWorkingGroupApplicationsDocument, options);
      }
export function useGetWorkingGroupApplicationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingGroupApplicationsQuery, GetWorkingGroupApplicationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkingGroupApplicationsQuery, GetWorkingGroupApplicationsQueryVariables>(GetWorkingGroupApplicationsDocument, options);
        }
export type GetWorkingGroupApplicationsQueryHookResult = ReturnType<typeof useGetWorkingGroupApplicationsQuery>;
export type GetWorkingGroupApplicationsLazyQueryHookResult = ReturnType<typeof useGetWorkingGroupApplicationsLazyQuery>;
export type GetWorkingGroupApplicationsQueryResult = Apollo.QueryResult<GetWorkingGroupApplicationsQuery, GetWorkingGroupApplicationsQueryVariables>;
export const GetWorkingGroupApplicationIdsDocument = gql`
    query GetWorkingGroupApplicationIds($where: WorkingGroupApplicationWhereInput) {
  workingGroupApplications(where: $where) {
    id
  }
}
    `;

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
export function useGetWorkingGroupApplicationIdsQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkingGroupApplicationIdsQuery, GetWorkingGroupApplicationIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkingGroupApplicationIdsQuery, GetWorkingGroupApplicationIdsQueryVariables>(GetWorkingGroupApplicationIdsDocument, options);
      }
export function useGetWorkingGroupApplicationIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingGroupApplicationIdsQuery, GetWorkingGroupApplicationIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkingGroupApplicationIdsQuery, GetWorkingGroupApplicationIdsQueryVariables>(GetWorkingGroupApplicationIdsDocument, options);
        }
export type GetWorkingGroupApplicationIdsQueryHookResult = ReturnType<typeof useGetWorkingGroupApplicationIdsQuery>;
export type GetWorkingGroupApplicationIdsLazyQueryHookResult = ReturnType<typeof useGetWorkingGroupApplicationIdsLazyQuery>;
export type GetWorkingGroupApplicationIdsQueryResult = Apollo.QueryResult<GetWorkingGroupApplicationIdsQuery, GetWorkingGroupApplicationIdsQueryVariables>;
export const GetWorkingGroupApplicationDocument = gql`
    query GetWorkingGroupApplication($where: WorkingGroupApplicationWhereUniqueInput!) {
  workingGroupApplicationByUniqueInput(where: $where) {
    ...WorkingGroupApplicationFields
  }
}
    ${WorkingGroupApplicationFieldsFragmentDoc}`;

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
export function useGetWorkingGroupApplicationQuery(baseOptions: Apollo.QueryHookOptions<GetWorkingGroupApplicationQuery, GetWorkingGroupApplicationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkingGroupApplicationQuery, GetWorkingGroupApplicationQueryVariables>(GetWorkingGroupApplicationDocument, options);
      }
export function useGetWorkingGroupApplicationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkingGroupApplicationQuery, GetWorkingGroupApplicationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkingGroupApplicationQuery, GetWorkingGroupApplicationQueryVariables>(GetWorkingGroupApplicationDocument, options);
        }
export type GetWorkingGroupApplicationQueryHookResult = ReturnType<typeof useGetWorkingGroupApplicationQuery>;
export type GetWorkingGroupApplicationLazyQueryHookResult = ReturnType<typeof useGetWorkingGroupApplicationLazyQuery>;
export type GetWorkingGroupApplicationQueryResult = Apollo.QueryResult<GetWorkingGroupApplicationQuery, GetWorkingGroupApplicationQueryVariables>;
export const GetApplicationFormQuestionAnswerDocument = gql`
    query GetApplicationFormQuestionAnswer($applicationId_eq: ID) {
  applicationFormQuestionAnswers(where: {application: {id_eq: $applicationId_eq}}) {
    ...ApplicationFormQuestionAnswerFields
  }
}
    ${ApplicationFormQuestionAnswerFieldsFragmentDoc}`;

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
export function useGetApplicationFormQuestionAnswerQuery(baseOptions?: Apollo.QueryHookOptions<GetApplicationFormQuestionAnswerQuery, GetApplicationFormQuestionAnswerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetApplicationFormQuestionAnswerQuery, GetApplicationFormQuestionAnswerQueryVariables>(GetApplicationFormQuestionAnswerDocument, options);
      }
export function useGetApplicationFormQuestionAnswerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetApplicationFormQuestionAnswerQuery, GetApplicationFormQuestionAnswerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetApplicationFormQuestionAnswerQuery, GetApplicationFormQuestionAnswerQueryVariables>(GetApplicationFormQuestionAnswerDocument, options);
        }
export type GetApplicationFormQuestionAnswerQueryHookResult = ReturnType<typeof useGetApplicationFormQuestionAnswerQuery>;
export type GetApplicationFormQuestionAnswerLazyQueryHookResult = ReturnType<typeof useGetApplicationFormQuestionAnswerLazyQuery>;
export type GetApplicationFormQuestionAnswerQueryResult = Apollo.QueryResult<GetApplicationFormQuestionAnswerQuery, GetApplicationFormQuestionAnswerQueryVariables>;
export const GetUpcomingWorkingGroupOpeningDocument = gql`
    query GetUpcomingWorkingGroupOpening($where: UpcomingWorkingGroupOpeningWhereUniqueInput!) {
  upcomingWorkingGroupOpeningByUniqueInput(where: $where) {
    ...UpcomingWorkingGroupOpeningFields
  }
}
    ${UpcomingWorkingGroupOpeningFieldsFragmentDoc}`;

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
export function useGetUpcomingWorkingGroupOpeningQuery(baseOptions: Apollo.QueryHookOptions<GetUpcomingWorkingGroupOpeningQuery, GetUpcomingWorkingGroupOpeningQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUpcomingWorkingGroupOpeningQuery, GetUpcomingWorkingGroupOpeningQueryVariables>(GetUpcomingWorkingGroupOpeningDocument, options);
      }
export function useGetUpcomingWorkingGroupOpeningLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUpcomingWorkingGroupOpeningQuery, GetUpcomingWorkingGroupOpeningQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUpcomingWorkingGroupOpeningQuery, GetUpcomingWorkingGroupOpeningQueryVariables>(GetUpcomingWorkingGroupOpeningDocument, options);
        }
export type GetUpcomingWorkingGroupOpeningQueryHookResult = ReturnType<typeof useGetUpcomingWorkingGroupOpeningQuery>;
export type GetUpcomingWorkingGroupOpeningLazyQueryHookResult = ReturnType<typeof useGetUpcomingWorkingGroupOpeningLazyQuery>;
export type GetUpcomingWorkingGroupOpeningQueryResult = Apollo.QueryResult<GetUpcomingWorkingGroupOpeningQuery, GetUpcomingWorkingGroupOpeningQueryVariables>;
export const GetUpcomingWorkingGroupOpeningsDocument = gql`
    query GetUpcomingWorkingGroupOpenings($where: UpcomingWorkingGroupOpeningWhereInput, $limit: Int, $offset: Int) {
  upcomingWorkingGroupOpenings(where: $where, limit: $limit, offset: $offset) {
    ...UpcomingWorkingGroupOpeningFields
  }
}
    ${UpcomingWorkingGroupOpeningFieldsFragmentDoc}`;

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
export function useGetUpcomingWorkingGroupOpeningsQuery(baseOptions?: Apollo.QueryHookOptions<GetUpcomingWorkingGroupOpeningsQuery, GetUpcomingWorkingGroupOpeningsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUpcomingWorkingGroupOpeningsQuery, GetUpcomingWorkingGroupOpeningsQueryVariables>(GetUpcomingWorkingGroupOpeningsDocument, options);
      }
export function useGetUpcomingWorkingGroupOpeningsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUpcomingWorkingGroupOpeningsQuery, GetUpcomingWorkingGroupOpeningsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUpcomingWorkingGroupOpeningsQuery, GetUpcomingWorkingGroupOpeningsQueryVariables>(GetUpcomingWorkingGroupOpeningsDocument, options);
        }
export type GetUpcomingWorkingGroupOpeningsQueryHookResult = ReturnType<typeof useGetUpcomingWorkingGroupOpeningsQuery>;
export type GetUpcomingWorkingGroupOpeningsLazyQueryHookResult = ReturnType<typeof useGetUpcomingWorkingGroupOpeningsLazyQuery>;
export type GetUpcomingWorkingGroupOpeningsQueryResult = Apollo.QueryResult<GetUpcomingWorkingGroupOpeningsQuery, GetUpcomingWorkingGroupOpeningsQueryVariables>;
export const GetWorkerIdsDocument = gql`
    query GetWorkerIds($where: WorkerWhereInput) {
  workers(where: $where) {
    id
  }
}
    `;

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
export function useGetWorkerIdsQuery(baseOptions?: Apollo.QueryHookOptions<GetWorkerIdsQuery, GetWorkerIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkerIdsQuery, GetWorkerIdsQueryVariables>(GetWorkerIdsDocument, options);
      }
export function useGetWorkerIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkerIdsQuery, GetWorkerIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkerIdsQuery, GetWorkerIdsQueryVariables>(GetWorkerIdsDocument, options);
        }
export type GetWorkerIdsQueryHookResult = ReturnType<typeof useGetWorkerIdsQuery>;
export type GetWorkerIdsLazyQueryHookResult = ReturnType<typeof useGetWorkerIdsLazyQuery>;
export type GetWorkerIdsQueryResult = Apollo.QueryResult<GetWorkerIdsQuery, GetWorkerIdsQueryVariables>;
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
    `;

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
export function useGetWorkerUnstakingDetailsQuery(baseOptions: Apollo.QueryHookOptions<GetWorkerUnstakingDetailsQuery, GetWorkerUnstakingDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkerUnstakingDetailsQuery, GetWorkerUnstakingDetailsQueryVariables>(GetWorkerUnstakingDetailsDocument, options);
      }
export function useGetWorkerUnstakingDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkerUnstakingDetailsQuery, GetWorkerUnstakingDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkerUnstakingDetailsQuery, GetWorkerUnstakingDetailsQueryVariables>(GetWorkerUnstakingDetailsDocument, options);
        }
export type GetWorkerUnstakingDetailsQueryHookResult = ReturnType<typeof useGetWorkerUnstakingDetailsQuery>;
export type GetWorkerUnstakingDetailsLazyQueryHookResult = ReturnType<typeof useGetWorkerUnstakingDetailsLazyQuery>;
export type GetWorkerUnstakingDetailsQueryResult = Apollo.QueryResult<GetWorkerUnstakingDetailsQuery, GetWorkerUnstakingDetailsQueryVariables>;