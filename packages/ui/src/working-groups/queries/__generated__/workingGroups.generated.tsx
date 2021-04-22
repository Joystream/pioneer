import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import {
  MemberFieldsFragment,
  MemberFieldsFragmentDoc,
} from '../../../memberships/queries/__generated__/members.generated'
import { gql } from '@apollo/client'

import * as Apollo from '@apollo/client'
const defaultOptions = {}
export type WorkingGroupStatusFieldsFragment = {
  __typename: 'WorkingGroupStatus'
  name: string
  about?: Types.Maybe<string>
  description?: Types.Maybe<string>
  message?: Types.Maybe<string>
}

export type WorkerFieldsFragment = {
  __typename: 'Worker'
  membership: { __typename: 'Membership' } & MemberFieldsFragment
  group: { __typename: 'WorkingGroup'; id: string }
  status:
    | { __typename: 'WorkerStatusActive' }
    | { __typename: 'WorkerStatusLeft' }
    | { __typename: 'WorkerStatusTerminated' }
}

export type WorkingGroupFieldsFragment = {
  __typename: 'WorkingGroup'
  id: string
  name: string
  budget: any
  status?: Types.Maybe<{ __typename: 'WorkingGroupStatus' } & WorkingGroupStatusFieldsFragment>
  workers?: Types.Maybe<Array<{ __typename: 'Worker' } & WorkerFieldsFragment>>
  leader?: Types.Maybe<{ __typename: 'Worker'; membership: { __typename: 'Membership'; id: string } }>
}

export type GetWorkingGroupsQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetWorkingGroupsQuery = {
  __typename: 'Query'
  workingGroups: Array<{ __typename: 'WorkingGroup' } & WorkingGroupFieldsFragment>
}

export type GetWorkersQueryVariables = Types.Exact<{
  group_eq?: Types.Maybe<Types.Scalars['ID']>
}>

export type GetWorkersQuery = { __typename: 'Query'; workers: Array<{ __typename: 'Worker' } & WorkerFieldsFragment> }

export type WorkingGroupOpeningMetadataFieldsFragment = {
  __typename: 'WorkingGroupOpeningMetadata'
  applicationDetails: string
  shortDescription: string
  hiringLimit: number
  expectedEnding: any
}

export type WorkingGroupOpeningFieldsFragment = {
  __typename: 'WorkingGroupOpening'
  id: string
  type: Types.WorkingGroupOpeningType
  stakeAmount: any
  rewardPerBlock: any
  metadata: { __typename: 'WorkingGroupOpeningMetadata' } & WorkingGroupOpeningMetadataFieldsFragment
  applications?: Types.Maybe<
    Array<{
      __typename: 'WorkingGroupApplication'
      id: string
      status:
        | { __typename: 'ApplicationStatusPending' }
        | { __typename: 'ApplicationStatusAccepted' }
        | { __typename: 'ApplicationStatusRejected' }
        | { __typename: 'ApplicationStatusWithdrawn' }
    }>
  >
  status:
    | { __typename: 'OpeningStatusOpen' }
    | { __typename: 'OpeningStatusFilled' }
    | { __typename: 'OpeningStatusCancelled' }
}

export type GetWorkingGroupOpeningsQueryVariables = Types.Exact<{
  group_eq?: Types.Maybe<Types.Scalars['ID']>
}>

export type GetWorkingGroupOpeningsQuery = {
  __typename: 'Query'
  workingGroupOpenings?: Types.Maybe<Array<{ __typename: 'WorkingGroupOpening' } & WorkingGroupOpeningFieldsFragment>>
}

export type ApplicationQuestionFieldsFragment = {
  __typename: 'ApplicationFormQuestion'
  index: number
  type: Types.ApplicationFormQuestionType
  question: string
}

export type GetWorkingGroupOpeningQuestionsQueryVariables = Types.Exact<{
  id?: Types.Maybe<Types.Scalars['ID']>
}>

export type GetWorkingGroupOpeningQuestionsQuery = {
  __typename: 'Query'
  workingGroupOpening?: Types.Maybe<{
    __typename: 'WorkingGroupOpening'
    metadata: {
      __typename: 'WorkingGroupOpeningMetadata'
      applicationFormQuestions?: Types.Maybe<
        Array<{ __typename: 'ApplicationFormQuestion' } & ApplicationQuestionFieldsFragment>
      >
    }
  }>
}

export type GetWorkingGroupQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetWorkingGroupQuery = {
  __typename: 'Query'
  workingGroup?: Types.Maybe<{ __typename: 'WorkingGroup' } & WorkingGroupFieldsFragment>
}

export type WorkingGroupApplicationFieldsFragment = {
  __typename: 'WorkingGroupApplication'
  id: string
  opening: {
    __typename: 'WorkingGroupOpening'
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
}

export type GetWorkingGroupApplicationsQueryVariables = Types.Exact<{
  applicant_in?: Types.Maybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>
}>

export type GetWorkingGroupApplicationsQuery = {
  __typename: 'Query'
  workingGroupApplications?: Types.Maybe<
    Array<{ __typename: 'WorkingGroupApplication' } & WorkingGroupApplicationFieldsFragment>
  >
}

export const WorkingGroupStatusFieldsFragmentDoc = gql`
  fragment WorkingGroupStatusFields on WorkingGroupStatus {
    name
    about
    description
    message
  }
`
export const WorkerFieldsFragmentDoc = gql`
  fragment WorkerFields on Worker {
    membership {
      ...MemberFields
    }
    group {
      id
    }
    status {
      __typename
    }
  }
  ${MemberFieldsFragmentDoc}
`
export const WorkingGroupFieldsFragmentDoc = gql`
  fragment WorkingGroupFields on WorkingGroup {
    id
    name
    budget
    status {
      ...WorkingGroupStatusFields
    }
    workers {
      ...WorkerFields
    }
    leader {
      membership {
        id
      }
    }
  }
  ${WorkingGroupStatusFieldsFragmentDoc}
  ${WorkerFieldsFragmentDoc}
`
export const WorkingGroupOpeningMetadataFieldsFragmentDoc = gql`
  fragment WorkingGroupOpeningMetadataFields on WorkingGroupOpeningMetadata {
    applicationDetails
    shortDescription
    hiringLimit
    expectedEnding
  }
`
export const WorkingGroupOpeningFieldsFragmentDoc = gql`
  fragment WorkingGroupOpeningFields on WorkingGroupOpening {
    id
    type
    stakeAmount
    rewardPerBlock
    metadata {
      ...WorkingGroupOpeningMetadataFields
    }
    applications {
      id
      status {
        __typename
      }
    }
    status {
      __typename
    }
  }
  ${WorkingGroupOpeningMetadataFieldsFragmentDoc}
`
export const ApplicationQuestionFieldsFragmentDoc = gql`
  fragment ApplicationQuestionFields on ApplicationFormQuestion {
    index
    type
    question
  }
`
export const WorkingGroupApplicationFieldsFragmentDoc = gql`
  fragment WorkingGroupApplicationFields on WorkingGroupApplication {
    id
    opening {
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
  }
  ${MemberFieldsFragmentDoc}
`
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
  query getWorkers($group_eq: ID) {
    workers(where: { group_eq: $group_eq }) {
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
 *      group_eq: // value for 'group_eq'
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
export const GetWorkingGroupOpeningsDocument = gql`
  query getWorkingGroupOpenings($group_eq: ID) {
    workingGroupOpenings(where: { group_eq: $group_eq }) {
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
 *      group_eq: // value for 'group_eq'
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
export const GetWorkingGroupOpeningQuestionsDocument = gql`
  query GetWorkingGroupOpeningQuestions($id: ID) {
    workingGroupOpening(where: { id: $id }) {
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
  baseOptions?: Apollo.QueryHookOptions<
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
  query GetWorkingGroup($id: ID!) {
    workingGroup(where: { id: $id }) {
      ...WorkingGroupFields
    }
  }
  ${WorkingGroupFieldsFragmentDoc}
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
 *      id: // value for 'id'
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
  query GetWorkingGroupApplications($applicant_in: [ID!]) {
    workingGroupApplications(where: { applicant_in: $applicant_in }) {
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
 *      applicant_in: // value for 'applicant_in'
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
