import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type MemberFieldsFragment = {
  __typename: 'Membership'
  id: string
  rootAccount: string
  controllerAccount: string
  boundAccounts: Array<string>
  handle: string
  isVerified: boolean
  isFoundingMember: boolean
  isCouncilMember: boolean
  inviteCount: number
  createdAt: any
  metadata: {
    __typename: 'MemberMetadata'
    name?: string | null
    about?: string | null
    avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
  }
  roles: Array<{
    __typename: 'Worker'
    id: string
    createdAt: any
    isLead: boolean
    group: { __typename: 'WorkingGroup'; name: string }
  }>
  stakingaccountaddedeventmember?: Array<{
    __typename: 'StakingAccountAddedEvent'
    createdAt: any
    inBlock: number
    network: Types.Network
    account: string
  }> | null
}

export type MemberWithDetailsFieldsFragment = {
  __typename: 'Membership'
  id: string
  rootAccount: string
  controllerAccount: string
  boundAccounts: Array<string>
  handle: string
  isVerified: boolean
  isFoundingMember: boolean
  isCouncilMember: boolean
  inviteCount: number
  createdAt: any
  metadata: {
    __typename: 'MemberMetadata'
    name?: string | null
    about?: string | null
    externalResources?: Array<{
      __typename: 'MembershipExternalResource'
      type: Types.MembershipExternalResourceType
      value: string
    }> | null
    avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
  }
  entry:
    | { __typename: 'MembershipEntryGenesis'; phantom?: number | null }
    | { __typename: 'MembershipEntryGifted' }
    | {
        __typename: 'MembershipEntryInvited'
        memberInvitedEvent?: {
          __typename: 'MemberInvitedEvent'
          createdAt: any
          inBlock: number
          network: Types.Network
        } | null
      }
    | { __typename: 'MembershipEntryMemberCreated' }
    | {
        __typename: 'MembershipEntryPaid'
        membershipBoughtEvent?: {
          __typename: 'MembershipBoughtEvent'
          createdAt: any
          inBlock: number
          network: Types.Network
        } | null
      }
  invitees: Array<{
    __typename: 'Membership'
    id: string
    rootAccount: string
    controllerAccount: string
    boundAccounts: Array<string>
    handle: string
    isVerified: boolean
    isFoundingMember: boolean
    isCouncilMember: boolean
    inviteCount: number
    createdAt: any
    metadata: {
      __typename: 'MemberMetadata'
      name?: string | null
      about?: string | null
      avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
    }
    roles: Array<{
      __typename: 'Worker'
      id: string
      createdAt: any
      isLead: boolean
      group: { __typename: 'WorkingGroup'; name: string }
    }>
    stakingaccountaddedeventmember?: Array<{
      __typename: 'StakingAccountAddedEvent'
      createdAt: any
      inBlock: number
      network: Types.Network
      account: string
    }> | null
  }>
  invitedBy?: {
    __typename: 'Membership'
    id: string
    rootAccount: string
    controllerAccount: string
    boundAccounts: Array<string>
    handle: string
    isVerified: boolean
    isFoundingMember: boolean
    isCouncilMember: boolean
    inviteCount: number
    createdAt: any
    metadata: {
      __typename: 'MemberMetadata'
      name?: string | null
      about?: string | null
      avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
    }
    roles: Array<{
      __typename: 'Worker'
      id: string
      createdAt: any
      isLead: boolean
      group: { __typename: 'WorkingGroup'; name: string }
    }>
    stakingaccountaddedeventmember?: Array<{
      __typename: 'StakingAccountAddedEvent'
      createdAt: any
      inBlock: number
      network: Types.Network
      account: string
    }> | null
  } | null
  roles: Array<{
    __typename: 'Worker'
    id: string
    createdAt: any
    isLead: boolean
    group: { __typename: 'WorkingGroup'; name: string }
  }>
  stakingaccountaddedeventmember?: Array<{
    __typename: 'StakingAccountAddedEvent'
    createdAt: any
    inBlock: number
    network: Types.Network
    account: string
  }> | null
}

export type GetMembersQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.MembershipWhereInput>
  orderBy?: Types.InputMaybe<Array<Types.MembershipOrderByInput> | Types.MembershipOrderByInput>
  offset?: Types.InputMaybe<Types.Scalars['Int']>
  limit?: Types.InputMaybe<Types.Scalars['Int']>
}>

export type GetMembersQuery = {
  __typename: 'Query'
  memberships: Array<{
    __typename: 'Membership'
    id: string
    rootAccount: string
    controllerAccount: string
    boundAccounts: Array<string>
    handle: string
    isVerified: boolean
    isFoundingMember: boolean
    isCouncilMember: boolean
    inviteCount: number
    createdAt: any
    metadata: {
      __typename: 'MemberMetadata'
      name?: string | null
      about?: string | null
      avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
    }
    roles: Array<{
      __typename: 'Worker'
      id: string
      createdAt: any
      isLead: boolean
      group: { __typename: 'WorkingGroup'; name: string }
    }>
    stakingaccountaddedeventmember?: Array<{
      __typename: 'StakingAccountAddedEvent'
      createdAt: any
      inBlock: number
      network: Types.Network
      account: string
    }> | null
  }>
}

export type GetMembersWithDetailsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.MembershipWhereInput>
  orderBy?: Types.InputMaybe<Array<Types.MembershipOrderByInput> | Types.MembershipOrderByInput>
  offset?: Types.InputMaybe<Types.Scalars['Int']>
  limit?: Types.InputMaybe<Types.Scalars['Int']>
}>

export type GetMembersWithDetailsQuery = {
  __typename: 'Query'
  memberships: Array<{
    __typename: 'Membership'
    id: string
    rootAccount: string
    controllerAccount: string
    boundAccounts: Array<string>
    handle: string
    isVerified: boolean
    isFoundingMember: boolean
    isCouncilMember: boolean
    inviteCount: number
    createdAt: any
    metadata: {
      __typename: 'MemberMetadata'
      name?: string | null
      about?: string | null
      externalResources?: Array<{
        __typename: 'MembershipExternalResource'
        type: Types.MembershipExternalResourceType
        value: string
      }> | null
      avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
    }
    entry:
      | { __typename: 'MembershipEntryGenesis'; phantom?: number | null }
      | { __typename: 'MembershipEntryGifted' }
      | {
          __typename: 'MembershipEntryInvited'
          memberInvitedEvent?: {
            __typename: 'MemberInvitedEvent'
            createdAt: any
            inBlock: number
            network: Types.Network
          } | null
        }
      | { __typename: 'MembershipEntryMemberCreated' }
      | {
          __typename: 'MembershipEntryPaid'
          membershipBoughtEvent?: {
            __typename: 'MembershipBoughtEvent'
            createdAt: any
            inBlock: number
            network: Types.Network
          } | null
        }
    invitees: Array<{
      __typename: 'Membership'
      id: string
      rootAccount: string
      controllerAccount: string
      boundAccounts: Array<string>
      handle: string
      isVerified: boolean
      isFoundingMember: boolean
      isCouncilMember: boolean
      inviteCount: number
      createdAt: any
      metadata: {
        __typename: 'MemberMetadata'
        name?: string | null
        about?: string | null
        avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
      }
      roles: Array<{
        __typename: 'Worker'
        id: string
        createdAt: any
        isLead: boolean
        group: { __typename: 'WorkingGroup'; name: string }
      }>
      stakingaccountaddedeventmember?: Array<{
        __typename: 'StakingAccountAddedEvent'
        createdAt: any
        inBlock: number
        network: Types.Network
        account: string
      }> | null
    }>
    invitedBy?: {
      __typename: 'Membership'
      id: string
      rootAccount: string
      controllerAccount: string
      boundAccounts: Array<string>
      handle: string
      isVerified: boolean
      isFoundingMember: boolean
      isCouncilMember: boolean
      inviteCount: number
      createdAt: any
      metadata: {
        __typename: 'MemberMetadata'
        name?: string | null
        about?: string | null
        avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
      }
      roles: Array<{
        __typename: 'Worker'
        id: string
        createdAt: any
        isLead: boolean
        group: { __typename: 'WorkingGroup'; name: string }
      }>
      stakingaccountaddedeventmember?: Array<{
        __typename: 'StakingAccountAddedEvent'
        createdAt: any
        inBlock: number
        network: Types.Network
        account: string
      }> | null
    } | null
    roles: Array<{
      __typename: 'Worker'
      id: string
      createdAt: any
      isLead: boolean
      group: { __typename: 'WorkingGroup'; name: string }
    }>
    stakingaccountaddedeventmember?: Array<{
      __typename: 'StakingAccountAddedEvent'
      createdAt: any
      inBlock: number
      network: Types.Network
      account: string
    }> | null
  }>
}

export type GetMembersCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.MembershipWhereInput>
}>

export type GetMembersCountQuery = {
  __typename: 'Query'
  membershipsConnection: { __typename: 'MembershipConnection'; totalCount: number }
}

export type GetMemberQueryVariables = Types.Exact<{
  where: Types.MembershipWhereUniqueInput
}>

export type GetMemberQuery = {
  __typename: 'Query'
  membershipByUniqueInput?: {
    __typename: 'Membership'
    id: string
    rootAccount: string
    controllerAccount: string
    boundAccounts: Array<string>
    handle: string
    isVerified: boolean
    isFoundingMember: boolean
    isCouncilMember: boolean
    inviteCount: number
    createdAt: any
    metadata: {
      __typename: 'MemberMetadata'
      name?: string | null
      about?: string | null
      externalResources?: Array<{
        __typename: 'MembershipExternalResource'
        type: Types.MembershipExternalResourceType
        value: string
      }> | null
      avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
    }
    entry:
      | { __typename: 'MembershipEntryGenesis'; phantom?: number | null }
      | { __typename: 'MembershipEntryGifted' }
      | {
          __typename: 'MembershipEntryInvited'
          memberInvitedEvent?: {
            __typename: 'MemberInvitedEvent'
            createdAt: any
            inBlock: number
            network: Types.Network
          } | null
        }
      | { __typename: 'MembershipEntryMemberCreated' }
      | {
          __typename: 'MembershipEntryPaid'
          membershipBoughtEvent?: {
            __typename: 'MembershipBoughtEvent'
            createdAt: any
            inBlock: number
            network: Types.Network
          } | null
        }
    invitees: Array<{
      __typename: 'Membership'
      id: string
      rootAccount: string
      controllerAccount: string
      boundAccounts: Array<string>
      handle: string
      isVerified: boolean
      isFoundingMember: boolean
      isCouncilMember: boolean
      inviteCount: number
      createdAt: any
      metadata: {
        __typename: 'MemberMetadata'
        name?: string | null
        about?: string | null
        avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
      }
      roles: Array<{
        __typename: 'Worker'
        id: string
        createdAt: any
        isLead: boolean
        group: { __typename: 'WorkingGroup'; name: string }
      }>
      stakingaccountaddedeventmember?: Array<{
        __typename: 'StakingAccountAddedEvent'
        createdAt: any
        inBlock: number
        network: Types.Network
        account: string
      }> | null
    }>
    invitedBy?: {
      __typename: 'Membership'
      id: string
      rootAccount: string
      controllerAccount: string
      boundAccounts: Array<string>
      handle: string
      isVerified: boolean
      isFoundingMember: boolean
      isCouncilMember: boolean
      inviteCount: number
      createdAt: any
      metadata: {
        __typename: 'MemberMetadata'
        name?: string | null
        about?: string | null
        avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
      }
      roles: Array<{
        __typename: 'Worker'
        id: string
        createdAt: any
        isLead: boolean
        group: { __typename: 'WorkingGroup'; name: string }
      }>
      stakingaccountaddedeventmember?: Array<{
        __typename: 'StakingAccountAddedEvent'
        createdAt: any
        inBlock: number
        network: Types.Network
        account: string
      }> | null
    } | null
    roles: Array<{
      __typename: 'Worker'
      id: string
      createdAt: any
      isLead: boolean
      group: { __typename: 'WorkingGroup'; name: string }
    }>
    stakingaccountaddedeventmember?: Array<{
      __typename: 'StakingAccountAddedEvent'
      createdAt: any
      inBlock: number
      network: Types.Network
      account: string
    }> | null
  } | null
}

export type SearchMembersQueryVariables = Types.Exact<{
  text: Types.Scalars['String']
  limit?: Types.InputMaybe<Types.Scalars['Int']>
  validIds?: Types.InputMaybe<Array<Types.Scalars['ID']> | Types.Scalars['ID']>
}>

export type SearchMembersQuery = {
  __typename: 'Query'
  memberships: Array<{
    __typename: 'Membership'
    id: string
    rootAccount: string
    controllerAccount: string
    boundAccounts: Array<string>
    handle: string
    isVerified: boolean
    isFoundingMember: boolean
    isCouncilMember: boolean
    inviteCount: number
    createdAt: any
    metadata: {
      __typename: 'MemberMetadata'
      name?: string | null
      about?: string | null
      avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
    }
    roles: Array<{
      __typename: 'Worker'
      id: string
      createdAt: any
      isLead: boolean
      group: { __typename: 'WorkingGroup'; name: string }
    }>
    stakingaccountaddedeventmember?: Array<{
      __typename: 'StakingAccountAddedEvent'
      createdAt: any
      inBlock: number
      network: Types.Network
      account: string
    }> | null
  }>
}

export type SimpleSearchMembersQueryVariables = Types.Exact<{
  text: Types.Scalars['String']
  limit?: Types.InputMaybe<Types.Scalars['Int']>
}>

export type SimpleSearchMembersQuery = {
  __typename: 'Query'
  memberships: Array<{ __typename: 'Membership'; id: string; handle: string }>
}

export type GetMemberMentionQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetMemberMentionQuery = {
  __typename: 'Query'
  membership?: {
    __typename: 'Membership'
    id: string
    rootAccount: string
    controllerAccount: string
    boundAccounts: Array<string>
    handle: string
    isVerified: boolean
    isFoundingMember: boolean
    isCouncilMember: boolean
    inviteCount: number
    createdAt: any
    metadata: {
      __typename: 'MemberMetadata'
      name?: string | null
      about?: string | null
      avatar?: { __typename: 'AvatarObject' } | { __typename: 'AvatarUri'; avatarUri: string } | null
    }
    roles: Array<{
      __typename: 'Worker'
      id: string
      createdAt: any
      isLead: boolean
      group: { __typename: 'WorkingGroup'; name: string }
    }>
    stakingaccountaddedeventmember?: Array<{
      __typename: 'StakingAccountAddedEvent'
      createdAt: any
      inBlock: number
      network: Types.Network
      account: string
    }> | null
  } | null
}

export type GetMemberExtraInfoQueryVariables = Types.Exact<{
  membershipId_eq: Types.Scalars['ID']
  workerId_in: Array<Types.Scalars['ID']> | Types.Scalars['ID']
}>

export type GetMemberExtraInfoQuery = {
  __typename: 'Query'
  councilMembersConnection: { __typename: 'CouncilMemberConnection'; totalCount: number }
  forumPostsConnection: { __typename: 'ForumPostConnection'; totalCount: number }
  workingGroupApplicationsConnection: { __typename: 'WorkingGroupApplicationConnection'; totalCount: number }
  stakeSlashedEventsConnection: { __typename: 'StakeSlashedEventConnection'; totalCount: number }
  terminatedLeaderEventsConnection: { __typename: 'TerminatedLeaderEventConnection'; totalCount: number }
  terminatedWorkerEventsConnection: { __typename: 'TerminatedWorkerEventConnection'; totalCount: number }
  workerStartedLeavingEventsConnection: { __typename: 'WorkerStartedLeavingEventConnection'; totalCount: number }
}

export type GetMemberRowDetailsQueryVariables = Types.Exact<{
  workerId_in: Array<Types.Scalars['ID']> | Types.Scalars['ID']
}>

export type GetMemberRowDetailsQuery = {
  __typename: 'Query'
  stakeSlashedEventsConnection: { __typename: 'StakeSlashedEventConnection'; totalCount: number }
  terminatedLeaderEventsConnection: { __typename: 'TerminatedLeaderEventConnection'; totalCount: number }
  terminatedWorkerEventsConnection: { __typename: 'TerminatedWorkerEventConnection'; totalCount: number }
}

export type GetMemberActionDetailsQueryVariables = Types.Exact<{
  workerId_in: Array<Types.Scalars['ID']> | Types.Scalars['ID']
}>

export type GetMemberActionDetailsQuery = {
  __typename: 'Query'
  stakeSlashedEventsConnection: { __typename: 'StakeSlashedEventConnection'; totalCount: number }
  terminatedLeaderEventsConnection: { __typename: 'TerminatedLeaderEventConnection'; totalCount: number }
  terminatedWorkerEventsConnection: { __typename: 'TerminatedWorkerEventConnection'; totalCount: number }
  memberInvitedEventsConnection: { __typename: 'MemberInvitedEventConnection'; totalCount: number }
}

export type GetMemberInvitedEventsQueryVariables = Types.Exact<{
  lockAccount?: Types.InputMaybe<Types.Scalars['String']>
}>

export type GetMemberInvitedEventsQuery = {
  __typename: 'Query'
  memberInvitedEvents: Array<{
    __typename: 'MemberInvitedEvent'
    createdAt: any
    inBlock: number
    network: Types.Network
  }>
}

export const MemberFieldsFragmentDoc = gql`
  fragment MemberFields on Membership {
    id
    rootAccount
    controllerAccount
    boundAccounts
    handle
    metadata {
      name
      about
      avatar {
        __typename
        ... on AvatarUri {
          avatarUri
        }
      }
    }
    isVerified
    isFoundingMember
    isCouncilMember
    inviteCount
    roles {
      id
      group {
        name
      }
      createdAt
      isLead
    }
    createdAt
    stakingaccountaddedeventmember {
      createdAt
      inBlock
      network
      account
    }
  }
`
export const MemberWithDetailsFieldsFragmentDoc = gql`
  fragment MemberWithDetailsFields on Membership {
    ...MemberFields
    metadata {
      name
      about
      externalResources {
        type
        value
      }
      avatar {
        __typename
        ... on AvatarUri {
          avatarUri
        }
      }
    }
    entry {
      ... on MembershipEntryInvited {
        memberInvitedEvent {
          createdAt
          inBlock
          network
        }
      }
      ... on MembershipEntryPaid {
        membershipBoughtEvent {
          createdAt
          inBlock
          network
        }
      }
      ... on MembershipEntryGenesis {
        phantom
      }
    }
    invitees {
      ...MemberFields
    }
    invitedBy {
      ...MemberFields
    }
  }
  ${MemberFieldsFragmentDoc}
`
export const GetMembersDocument = gql`
  query GetMembers($where: MembershipWhereInput, $orderBy: [MembershipOrderByInput!], $offset: Int, $limit: Int) {
    memberships(where: $where, orderBy: $orderBy, offset: $offset, limit: $limit) {
      ...MemberFields
    }
  }
  ${MemberFieldsFragmentDoc}
`

/**
 * __useGetMembersQuery__
 *
 * To run a query within a React component, call `useGetMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMembersQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetMembersQuery(baseOptions?: Apollo.QueryHookOptions<GetMembersQuery, GetMembersQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMembersQuery, GetMembersQueryVariables>(GetMembersDocument, options)
}
export function useGetMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMembersQuery, GetMembersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMembersQuery, GetMembersQueryVariables>(GetMembersDocument, options)
}
export type GetMembersQueryHookResult = ReturnType<typeof useGetMembersQuery>
export type GetMembersLazyQueryHookResult = ReturnType<typeof useGetMembersLazyQuery>
export type GetMembersQueryResult = Apollo.QueryResult<GetMembersQuery, GetMembersQueryVariables>
export const GetMembersWithDetailsDocument = gql`
  query GetMembersWithDetails(
    $where: MembershipWhereInput
    $orderBy: [MembershipOrderByInput!]
    $offset: Int
    $limit: Int
  ) {
    memberships(where: $where, orderBy: $orderBy, offset: $offset, limit: $limit) {
      ...MemberWithDetailsFields
    }
  }
  ${MemberWithDetailsFieldsFragmentDoc}
`

/**
 * __useGetMembersWithDetailsQuery__
 *
 * To run a query within a React component, call `useGetMembersWithDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMembersWithDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMembersWithDetailsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetMembersWithDetailsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMembersWithDetailsQuery, GetMembersWithDetailsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMembersWithDetailsQuery, GetMembersWithDetailsQueryVariables>(
    GetMembersWithDetailsDocument,
    options
  )
}
export function useGetMembersWithDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMembersWithDetailsQuery, GetMembersWithDetailsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMembersWithDetailsQuery, GetMembersWithDetailsQueryVariables>(
    GetMembersWithDetailsDocument,
    options
  )
}
export type GetMembersWithDetailsQueryHookResult = ReturnType<typeof useGetMembersWithDetailsQuery>
export type GetMembersWithDetailsLazyQueryHookResult = ReturnType<typeof useGetMembersWithDetailsLazyQuery>
export type GetMembersWithDetailsQueryResult = Apollo.QueryResult<
  GetMembersWithDetailsQuery,
  GetMembersWithDetailsQueryVariables
>
export const GetMembersCountDocument = gql`
  query GetMembersCount($where: MembershipWhereInput) {
    membershipsConnection(where: $where) {
      totalCount
    }
  }
`

/**
 * __useGetMembersCountQuery__
 *
 * To run a query within a React component, call `useGetMembersCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMembersCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMembersCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetMembersCountQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMembersCountQuery, GetMembersCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMembersCountQuery, GetMembersCountQueryVariables>(GetMembersCountDocument, options)
}
export function useGetMembersCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMembersCountQuery, GetMembersCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMembersCountQuery, GetMembersCountQueryVariables>(GetMembersCountDocument, options)
}
export type GetMembersCountQueryHookResult = ReturnType<typeof useGetMembersCountQuery>
export type GetMembersCountLazyQueryHookResult = ReturnType<typeof useGetMembersCountLazyQuery>
export type GetMembersCountQueryResult = Apollo.QueryResult<GetMembersCountQuery, GetMembersCountQueryVariables>
export const GetMemberDocument = gql`
  query GetMember($where: MembershipWhereUniqueInput!) {
    membershipByUniqueInput(where: $where) {
      ...MemberWithDetailsFields
    }
  }
  ${MemberWithDetailsFieldsFragmentDoc}
`

/**
 * __useGetMemberQuery__
 *
 * To run a query within a React component, call `useGetMemberQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemberQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetMemberQuery(baseOptions: Apollo.QueryHookOptions<GetMemberQuery, GetMemberQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMemberQuery, GetMemberQueryVariables>(GetMemberDocument, options)
}
export function useGetMemberLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMemberQuery, GetMemberQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMemberQuery, GetMemberQueryVariables>(GetMemberDocument, options)
}
export type GetMemberQueryHookResult = ReturnType<typeof useGetMemberQuery>
export type GetMemberLazyQueryHookResult = ReturnType<typeof useGetMemberLazyQuery>
export type GetMemberQueryResult = Apollo.QueryResult<GetMemberQuery, GetMemberQueryVariables>
export const SearchMembersDocument = gql`
  query SearchMembers($text: String!, $limit: Int, $validIds: [ID!]) {
    memberships(where: { handle_contains: $text, id_in: $validIds }, limit: $limit) {
      ...MemberFields
    }
  }
  ${MemberFieldsFragmentDoc}
`

/**
 * __useSearchMembersQuery__
 *
 * To run a query within a React component, call `useSearchMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchMembersQuery({
 *   variables: {
 *      text: // value for 'text'
 *      limit: // value for 'limit'
 *      validIds: // value for 'validIds'
 *   },
 * });
 */
export function useSearchMembersQuery(
  baseOptions: Apollo.QueryHookOptions<SearchMembersQuery, SearchMembersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SearchMembersQuery, SearchMembersQueryVariables>(SearchMembersDocument, options)
}
export function useSearchMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SearchMembersQuery, SearchMembersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SearchMembersQuery, SearchMembersQueryVariables>(SearchMembersDocument, options)
}
export type SearchMembersQueryHookResult = ReturnType<typeof useSearchMembersQuery>
export type SearchMembersLazyQueryHookResult = ReturnType<typeof useSearchMembersLazyQuery>
export type SearchMembersQueryResult = Apollo.QueryResult<SearchMembersQuery, SearchMembersQueryVariables>
export const SimpleSearchMembersDocument = gql`
  query SimpleSearchMembers($text: String!, $limit: Int) {
    memberships(where: { handle_contains: $text }, limit: $limit) {
      id
      handle
    }
  }
`

/**
 * __useSimpleSearchMembersQuery__
 *
 * To run a query within a React component, call `useSimpleSearchMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSimpleSearchMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSimpleSearchMembersQuery({
 *   variables: {
 *      text: // value for 'text'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSimpleSearchMembersQuery(
  baseOptions: Apollo.QueryHookOptions<SimpleSearchMembersQuery, SimpleSearchMembersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SimpleSearchMembersQuery, SimpleSearchMembersQueryVariables>(
    SimpleSearchMembersDocument,
    options
  )
}
export function useSimpleSearchMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SimpleSearchMembersQuery, SimpleSearchMembersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SimpleSearchMembersQuery, SimpleSearchMembersQueryVariables>(
    SimpleSearchMembersDocument,
    options
  )
}
export type SimpleSearchMembersQueryHookResult = ReturnType<typeof useSimpleSearchMembersQuery>
export type SimpleSearchMembersLazyQueryHookResult = ReturnType<typeof useSimpleSearchMembersLazyQuery>
export type SimpleSearchMembersQueryResult = Apollo.QueryResult<
  SimpleSearchMembersQuery,
  SimpleSearchMembersQueryVariables
>
export const GetMemberMentionDocument = gql`
  query GetMemberMention($id: ID!) {
    membership: membershipByUniqueInput(where: { id: $id }) {
      ...MemberFields
    }
  }
  ${MemberFieldsFragmentDoc}
`

/**
 * __useGetMemberMentionQuery__
 *
 * To run a query within a React component, call `useGetMemberMentionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemberMentionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemberMentionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetMemberMentionQuery(
  baseOptions: Apollo.QueryHookOptions<GetMemberMentionQuery, GetMemberMentionQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMemberMentionQuery, GetMemberMentionQueryVariables>(GetMemberMentionDocument, options)
}
export function useGetMemberMentionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMemberMentionQuery, GetMemberMentionQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMemberMentionQuery, GetMemberMentionQueryVariables>(GetMemberMentionDocument, options)
}
export type GetMemberMentionQueryHookResult = ReturnType<typeof useGetMemberMentionQuery>
export type GetMemberMentionLazyQueryHookResult = ReturnType<typeof useGetMemberMentionLazyQuery>
export type GetMemberMentionQueryResult = Apollo.QueryResult<GetMemberMentionQuery, GetMemberMentionQueryVariables>
export const GetMemberExtraInfoDocument = gql`
  query GetMemberExtraInfo($membershipId_eq: ID!, $workerId_in: [ID!]!) {
    councilMembersConnection(where: { member: { id_eq: $membershipId_eq } }) {
      totalCount
    }
    forumPostsConnection(where: { author: { id_eq: $membershipId_eq } }) {
      totalCount
    }
    workingGroupApplicationsConnection(where: { applicant: { id_eq: $membershipId_eq } }) {
      totalCount
    }
    stakeSlashedEventsConnection(where: { worker: { id_in: $workerId_in } }) {
      totalCount
    }
    terminatedLeaderEventsConnection(where: { worker: { id_in: $workerId_in } }) {
      totalCount
    }
    terminatedWorkerEventsConnection(where: { worker: { id_in: $workerId_in } }) {
      totalCount
    }
    workerStartedLeavingEventsConnection(where: { worker: { id_in: $workerId_in } }) {
      totalCount
    }
  }
`

/**
 * __useGetMemberExtraInfoQuery__
 *
 * To run a query within a React component, call `useGetMemberExtraInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemberExtraInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemberExtraInfoQuery({
 *   variables: {
 *      membershipId_eq: // value for 'membershipId_eq'
 *      workerId_in: // value for 'workerId_in'
 *   },
 * });
 */
export function useGetMemberExtraInfoQuery(
  baseOptions: Apollo.QueryHookOptions<GetMemberExtraInfoQuery, GetMemberExtraInfoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMemberExtraInfoQuery, GetMemberExtraInfoQueryVariables>(GetMemberExtraInfoDocument, options)
}
export function useGetMemberExtraInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMemberExtraInfoQuery, GetMemberExtraInfoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMemberExtraInfoQuery, GetMemberExtraInfoQueryVariables>(
    GetMemberExtraInfoDocument,
    options
  )
}
export type GetMemberExtraInfoQueryHookResult = ReturnType<typeof useGetMemberExtraInfoQuery>
export type GetMemberExtraInfoLazyQueryHookResult = ReturnType<typeof useGetMemberExtraInfoLazyQuery>
export type GetMemberExtraInfoQueryResult = Apollo.QueryResult<
  GetMemberExtraInfoQuery,
  GetMemberExtraInfoQueryVariables
>
export const GetMemberRowDetailsDocument = gql`
  query GetMemberRowDetails($workerId_in: [ID!]!) {
    stakeSlashedEventsConnection(where: { worker: { id_in: $workerId_in } }) {
      totalCount
    }
    terminatedLeaderEventsConnection(where: { worker: { id_in: $workerId_in } }) {
      totalCount
    }
    terminatedWorkerEventsConnection(where: { worker: { id_in: $workerId_in } }) {
      totalCount
    }
  }
`

/**
 * __useGetMemberRowDetailsQuery__
 *
 * To run a query within a React component, call `useGetMemberRowDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemberRowDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemberRowDetailsQuery({
 *   variables: {
 *      workerId_in: // value for 'workerId_in'
 *   },
 * });
 */
export function useGetMemberRowDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<GetMemberRowDetailsQuery, GetMemberRowDetailsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMemberRowDetailsQuery, GetMemberRowDetailsQueryVariables>(
    GetMemberRowDetailsDocument,
    options
  )
}
export function useGetMemberRowDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMemberRowDetailsQuery, GetMemberRowDetailsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMemberRowDetailsQuery, GetMemberRowDetailsQueryVariables>(
    GetMemberRowDetailsDocument,
    options
  )
}
export type GetMemberRowDetailsQueryHookResult = ReturnType<typeof useGetMemberRowDetailsQuery>
export type GetMemberRowDetailsLazyQueryHookResult = ReturnType<typeof useGetMemberRowDetailsLazyQuery>
export type GetMemberRowDetailsQueryResult = Apollo.QueryResult<
  GetMemberRowDetailsQuery,
  GetMemberRowDetailsQueryVariables
>
export const GetMemberActionDetailsDocument = gql`
  query GetMemberActionDetails($workerId_in: [ID!]!) {
    stakeSlashedEventsConnection(where: { worker: { id_in: $workerId_in } }) {
      totalCount
    }
    terminatedLeaderEventsConnection(where: { worker: { id_in: $workerId_in } }) {
      totalCount
    }
    terminatedWorkerEventsConnection(where: { worker: { id_in: $workerId_in } }) {
      totalCount
    }
    memberInvitedEventsConnection(where: { invitingMember: { id_in: $workerId_in } }) {
      totalCount
    }
  }
`

/**
 * __useGetMemberActionDetailsQuery__
 *
 * To run a query within a React component, call `useGetMemberActionDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemberActionDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemberActionDetailsQuery({
 *   variables: {
 *      workerId_in: // value for 'workerId_in'
 *   },
 * });
 */
export function useGetMemberActionDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<GetMemberActionDetailsQuery, GetMemberActionDetailsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMemberActionDetailsQuery, GetMemberActionDetailsQueryVariables>(
    GetMemberActionDetailsDocument,
    options
  )
}
export function useGetMemberActionDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMemberActionDetailsQuery, GetMemberActionDetailsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMemberActionDetailsQuery, GetMemberActionDetailsQueryVariables>(
    GetMemberActionDetailsDocument,
    options
  )
}
export type GetMemberActionDetailsQueryHookResult = ReturnType<typeof useGetMemberActionDetailsQuery>
export type GetMemberActionDetailsLazyQueryHookResult = ReturnType<typeof useGetMemberActionDetailsLazyQuery>
export type GetMemberActionDetailsQueryResult = Apollo.QueryResult<
  GetMemberActionDetailsQuery,
  GetMemberActionDetailsQueryVariables
>
export const GetMemberInvitedEventsDocument = gql`
  query GetMemberInvitedEvents($lockAccount: String) {
    memberInvitedEvents(where: { controllerAccount_eq: $lockAccount }, orderBy: [createdAt_DESC], limit: 1) {
      createdAt
      inBlock
      network
    }
  }
`

/**
 * __useGetMemberInvitedEventsQuery__
 *
 * To run a query within a React component, call `useGetMemberInvitedEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMemberInvitedEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMemberInvitedEventsQuery({
 *   variables: {
 *      lockAccount: // value for 'lockAccount'
 *   },
 * });
 */
export function useGetMemberInvitedEventsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMemberInvitedEventsQuery, GetMemberInvitedEventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMemberInvitedEventsQuery, GetMemberInvitedEventsQueryVariables>(
    GetMemberInvitedEventsDocument,
    options
  )
}
export function useGetMemberInvitedEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMemberInvitedEventsQuery, GetMemberInvitedEventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMemberInvitedEventsQuery, GetMemberInvitedEventsQueryVariables>(
    GetMemberInvitedEventsDocument,
    options
  )
}
export type GetMemberInvitedEventsQueryHookResult = ReturnType<typeof useGetMemberInvitedEventsQuery>
export type GetMemberInvitedEventsLazyQueryHookResult = ReturnType<typeof useGetMemberInvitedEventsLazyQuery>
export type GetMemberInvitedEventsQueryResult = Apollo.QueryResult<
  GetMemberInvitedEventsQuery,
  GetMemberInvitedEventsQueryVariables
>
