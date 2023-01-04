import * as Types from '../../../common/api/queries/__generated__/baseTypes.generated'

import { gql } from '@apollo/client'
import { MemberFieldsFragmentDoc } from '../../../memberships/queries/__generated__/members.generated'
import * as Apollo from '@apollo/client'
const defaultOptions = {} as const
export type ForumBaseCategoryFieldsFragment = {
  __typename: 'ForumCategory'
  id: string
  title: string
  description: string
  status:
    | { __typename: 'CategoryStatusActive' }
    | {
        __typename: 'CategoryStatusArchived'
        categoryArchivalStatusUpdatedEvent?: {
          __typename: 'CategoryArchivalStatusUpdatedEvent'
          createdAt: any
          inBlock: number
          network: Types.Network
        } | null
      }
    | { __typename: 'CategoryStatusRemoved' }
}

export type ForumCategoryFieldsFragment = {
  __typename: 'ForumCategory'
  id: string
  title: string
  description: string
  moderators: Array<{
    __typename: 'Worker'
    id: string
    membership: { __typename: 'Membership'; id: string; handle: string }
  }>
  forumcategoryparent?: Array<{
    __typename: 'ForumCategory'
    id: string
    title: string
    status:
      | { __typename: 'CategoryStatusActive' }
      | { __typename: 'CategoryStatusArchived' }
      | { __typename: 'CategoryStatusRemoved' }
  }> | null
  status:
    | { __typename: 'CategoryStatusActive' }
    | {
        __typename: 'CategoryStatusArchived'
        categoryArchivalStatusUpdatedEvent?: {
          __typename: 'CategoryArchivalStatusUpdatedEvent'
          createdAt: any
          inBlock: number
          network: Types.Network
        } | null
      }
    | { __typename: 'CategoryStatusRemoved' }
}

export type ArchivedForumCategoryFieldsFragment = {
  __typename: 'ForumCategory'
  id: string
  title: string
  description: string
  forumcategoryparent?: Array<{
    __typename: 'ForumCategory'
    id: string
    title: string
    status:
      | { __typename: 'CategoryStatusActive' }
      | { __typename: 'CategoryStatusArchived' }
      | { __typename: 'CategoryStatusRemoved' }
  }> | null
  status:
    | { __typename: 'CategoryStatusActive' }
    | {
        __typename: 'CategoryStatusArchived'
        categoryArchivalStatusUpdatedEvent?: {
          __typename: 'CategoryArchivalStatusUpdatedEvent'
          createdAt: any
          inBlock: number
          network: Types.Network
        } | null
      }
    | { __typename: 'CategoryStatusRemoved' }
}

export type ForumCategoryWithDetailsFieldsFragment = {
  __typename: 'ForumCategory'
  id: string
  title: string
  description: string
  forumcategoryparent?: Array<{
    __typename: 'ForumCategory'
    id: string
    title: string
    description: string
    moderators: Array<{
      __typename: 'Worker'
      id: string
      membership: { __typename: 'Membership'; id: string; handle: string }
    }>
    forumcategoryparent?: Array<{
      __typename: 'ForumCategory'
      id: string
      title: string
      status:
        | { __typename: 'CategoryStatusActive' }
        | { __typename: 'CategoryStatusArchived' }
        | { __typename: 'CategoryStatusRemoved' }
    }> | null
    status:
      | { __typename: 'CategoryStatusActive' }
      | {
          __typename: 'CategoryStatusArchived'
          categoryArchivalStatusUpdatedEvent?: {
            __typename: 'CategoryArchivalStatusUpdatedEvent'
            createdAt: any
            inBlock: number
            network: Types.Network
          } | null
        }
      | { __typename: 'CategoryStatusRemoved' }
  }> | null
  moderators: Array<{
    __typename: 'Worker'
    id: string
    membership: { __typename: 'Membership'; id: string; handle: string }
  }>
  status:
    | { __typename: 'CategoryStatusActive' }
    | {
        __typename: 'CategoryStatusArchived'
        categoryArchivalStatusUpdatedEvent?: {
          __typename: 'CategoryArchivalStatusUpdatedEvent'
          createdAt: any
          inBlock: number
          network: Types.Network
        } | null
      }
    | { __typename: 'CategoryStatusRemoved' }
}

export type ForumModeratorFieldsFragment = {
  __typename: 'Worker'
  id: string
  membership: { __typename: 'Membership'; id: string; handle: string }
}

export type ForumSubCategoryFieldsFragment = { __typename: 'ForumCategory'; id: string; title: string }

export type ForumCategoryBreadcrumbsFieldsFragment = {
  __typename: 'ForumCategory'
  id: string
  title: string
  parent?: {
    __typename: 'ForumCategory'
    id: string
    title: string
    parent?: {
      __typename: 'ForumCategory'
      id: string
      title: string
      parent?: {
        __typename: 'ForumCategory'
        id: string
        title: string
        parent?: {
          __typename: 'ForumCategory'
          id: string
          title: string
          parent?: {
            __typename: 'ForumCategory'
            id: string
            title: string
            parent?: { __typename: 'ForumCategory'; id: string; title: string } | null
          } | null
        } | null
      } | null
    } | null
  } | null
}

export type ForumThreadBreadcrumbsFieldsFragment = {
  __typename: 'ForumThread'
  id: string
  title: string
  category: {
    __typename: 'ForumCategory'
    id: string
    title: string
    parent?: {
      __typename: 'ForumCategory'
      id: string
      title: string
      parent?: {
        __typename: 'ForumCategory'
        id: string
        title: string
        parent?: {
          __typename: 'ForumCategory'
          id: string
          title: string
          parent?: {
            __typename: 'ForumCategory'
            id: string
            title: string
            parent?: {
              __typename: 'ForumCategory'
              id: string
              title: string
              parent?: { __typename: 'ForumCategory'; id: string; title: string } | null
            } | null
          } | null
        } | null
      } | null
    } | null
  }
}

export type ForumThreadFieldsFragment = {
  __typename: 'ForumThread'
  id: string
  isSticky: boolean
  categoryId: string
  title: string
  visiblePostsCount: number
  category: { __typename: 'ForumCategory'; title: string }
  initialPost?: { __typename: 'ForumPost'; text: string } | null
  author: {
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
  createdInEvent: { __typename: 'ThreadCreatedEvent'; createdAt: any; inBlock: number; network: Types.Network }
  status:
    | { __typename: 'ThreadStatusActive' }
    | {
        __typename: 'ThreadStatusLocked'
        threadDeletedEvent?: {
          __typename: 'ThreadDeletedEvent'
          createdAt: any
          inBlock: number
          network: Types.Network
        } | null
      }
    | { __typename: 'ThreadStatusModerated' }
    | { __typename: 'ThreadStatusRemoved' }
}

export type ForumPostFieldsFragment = {
  __typename: 'ForumPost'
  id: string
  createdAt: any
  updatedAt?: any | null
  text: string
  authorId: string
  threadId: string
  repliesTo?: {
    __typename: 'ForumPost'
    id: string
    createdAt: any
    updatedAt?: any | null
    text: string
    authorId: string
    threadId: string
    author: {
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
    forumthreadinitialPost?: Array<{
      __typename: 'ForumThread'
      createdInEvent: { __typename: 'ThreadCreatedEvent'; createdAt: any; inBlock: number; network: Types.Network }
    }> | null
    postaddedeventpost?: Array<{
      __typename: 'PostAddedEvent'
      createdAt: any
      inBlock: number
      network: Types.Network
    }> | null
    postmoderatedeventpost?: Array<{
      __typename: 'PostModeratedEvent'
      actor: {
        __typename: 'Worker'
        membership: {
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
      }
    }> | null
    status:
      | { __typename: 'PostStatusActive' }
      | { __typename: 'PostStatusLocked' }
      | { __typename: 'PostStatusModerated' }
      | { __typename: 'PostStatusRemoved' }
    edits: Array<{ __typename: 'PostTextUpdatedEvent'; createdAt: any }>
    thread: { __typename: 'ForumThread'; categoryId: string }
  } | null
  author: {
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
  forumthreadinitialPost?: Array<{
    __typename: 'ForumThread'
    createdInEvent: { __typename: 'ThreadCreatedEvent'; createdAt: any; inBlock: number; network: Types.Network }
  }> | null
  postaddedeventpost?: Array<{
    __typename: 'PostAddedEvent'
    createdAt: any
    inBlock: number
    network: Types.Network
  }> | null
  postmoderatedeventpost?: Array<{
    __typename: 'PostModeratedEvent'
    actor: {
      __typename: 'Worker'
      membership: {
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
    }
  }> | null
  status:
    | { __typename: 'PostStatusActive' }
    | { __typename: 'PostStatusLocked' }
    | { __typename: 'PostStatusModerated' }
    | { __typename: 'PostStatusRemoved' }
  edits: Array<{ __typename: 'PostTextUpdatedEvent'; createdAt: any }>
  thread: { __typename: 'ForumThread'; categoryId: string }
}

export type ForumPostWithoutReplyFieldsFragment = {
  __typename: 'ForumPost'
  id: string
  createdAt: any
  updatedAt?: any | null
  text: string
  authorId: string
  threadId: string
  author: {
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
  forumthreadinitialPost?: Array<{
    __typename: 'ForumThread'
    createdInEvent: { __typename: 'ThreadCreatedEvent'; createdAt: any; inBlock: number; network: Types.Network }
  }> | null
  postaddedeventpost?: Array<{
    __typename: 'PostAddedEvent'
    createdAt: any
    inBlock: number
    network: Types.Network
  }> | null
  postmoderatedeventpost?: Array<{
    __typename: 'PostModeratedEvent'
    actor: {
      __typename: 'Worker'
      membership: {
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
    }
  }> | null
  status:
    | { __typename: 'PostStatusActive' }
    | { __typename: 'PostStatusLocked' }
    | { __typename: 'PostStatusModerated' }
    | { __typename: 'PostStatusRemoved' }
  edits: Array<{ __typename: 'PostTextUpdatedEvent'; createdAt: any }>
  thread: { __typename: 'ForumThread'; categoryId: string }
}

export type ForumThreadDetailedFieldsFragment = {
  __typename: 'ForumThread'
  id: string
  isSticky: boolean
  categoryId: string
  title: string
  visiblePostsCount: number
  category: { __typename: 'ForumCategory'; title: string }
  initialPost?: { __typename: 'ForumPost'; text: string } | null
  author: {
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
  createdInEvent: { __typename: 'ThreadCreatedEvent'; createdAt: any; inBlock: number; network: Types.Network }
  status:
    | { __typename: 'ThreadStatusActive' }
    | {
        __typename: 'ThreadStatusLocked'
        threadDeletedEvent?: {
          __typename: 'ThreadDeletedEvent'
          createdAt: any
          inBlock: number
          network: Types.Network
        } | null
      }
    | { __typename: 'ThreadStatusModerated' }
    | { __typename: 'ThreadStatusRemoved' }
}

export type ForumPostParentsFragment = {
  __typename: 'ForumPost'
  thread: { __typename: 'ForumThread'; id: string; category: { __typename: 'ForumCategory'; id: string } }
}

export type ForumThreadMentionFieldsFragment = {
  __typename: 'ForumThread'
  id: string
  title: string
  visiblePostsCount: number
  author: {
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
  initialPost?: { __typename: 'ForumPost'; text: string } | null
}

export type ForumPostMentionFieldsFragment = {
  __typename: 'ForumPost'
  id: string
  text: string
  createdAt: any
  author: {
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
}

export type GetForumCategoriesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ForumCategoryWhereInput>
  orderBy?: Types.InputMaybe<Array<Types.ForumCategoryOrderByInput> | Types.ForumCategoryOrderByInput>
  offset?: Types.InputMaybe<Types.Scalars['Int']>
  limit?: Types.InputMaybe<Types.Scalars['Int']>
}>

export type GetForumCategoriesQuery = {
  __typename: 'Query'
  forumCategories: Array<{
    __typename: 'ForumCategory'
    id: string
    title: string
    description: string
    moderators: Array<{
      __typename: 'Worker'
      id: string
      membership: { __typename: 'Membership'; id: string; handle: string }
    }>
    forumcategoryparent?: Array<{
      __typename: 'ForumCategory'
      id: string
      title: string
      status:
        | { __typename: 'CategoryStatusActive' }
        | { __typename: 'CategoryStatusArchived' }
        | { __typename: 'CategoryStatusRemoved' }
    }> | null
    status:
      | { __typename: 'CategoryStatusActive' }
      | {
          __typename: 'CategoryStatusArchived'
          categoryArchivalStatusUpdatedEvent?: {
            __typename: 'CategoryArchivalStatusUpdatedEvent'
            createdAt: any
            inBlock: number
            network: Types.Network
          } | null
        }
      | { __typename: 'CategoryStatusRemoved' }
  }>
}

export type GetArchivedForumCategoriesQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ForumCategoryWhereInput>
}>

export type GetArchivedForumCategoriesQuery = {
  __typename: 'Query'
  forumCategories: Array<{
    __typename: 'ForumCategory'
    id: string
    title: string
    description: string
    forumcategoryparent?: Array<{
      __typename: 'ForumCategory'
      id: string
      title: string
      status:
        | { __typename: 'CategoryStatusActive' }
        | { __typename: 'CategoryStatusArchived' }
        | { __typename: 'CategoryStatusRemoved' }
    }> | null
    status:
      | { __typename: 'CategoryStatusActive' }
      | {
          __typename: 'CategoryStatusArchived'
          categoryArchivalStatusUpdatedEvent?: {
            __typename: 'CategoryArchivalStatusUpdatedEvent'
            createdAt: any
            inBlock: number
            network: Types.Network
          } | null
        }
      | { __typename: 'CategoryStatusRemoved' }
  }>
}

export type GetForumCategoryQueryVariables = Types.Exact<{
  where: Types.ForumCategoryWhereUniqueInput
}>

export type GetForumCategoryQuery = {
  __typename: 'Query'
  forumCategoryByUniqueInput?: {
    __typename: 'ForumCategory'
    id: string
    title: string
    description: string
    forumcategoryparent?: Array<{
      __typename: 'ForumCategory'
      id: string
      title: string
      description: string
      moderators: Array<{
        __typename: 'Worker'
        id: string
        membership: { __typename: 'Membership'; id: string; handle: string }
      }>
      forumcategoryparent?: Array<{
        __typename: 'ForumCategory'
        id: string
        title: string
        status:
          | { __typename: 'CategoryStatusActive' }
          | { __typename: 'CategoryStatusArchived' }
          | { __typename: 'CategoryStatusRemoved' }
      }> | null
      status:
        | { __typename: 'CategoryStatusActive' }
        | {
            __typename: 'CategoryStatusArchived'
            categoryArchivalStatusUpdatedEvent?: {
              __typename: 'CategoryArchivalStatusUpdatedEvent'
              createdAt: any
              inBlock: number
              network: Types.Network
            } | null
          }
        | { __typename: 'CategoryStatusRemoved' }
    }> | null
    moderators: Array<{
      __typename: 'Worker'
      id: string
      membership: { __typename: 'Membership'; id: string; handle: string }
    }>
    status:
      | { __typename: 'CategoryStatusActive' }
      | {
          __typename: 'CategoryStatusArchived'
          categoryArchivalStatusUpdatedEvent?: {
            __typename: 'CategoryArchivalStatusUpdatedEvent'
            createdAt: any
            inBlock: number
            network: Types.Network
          } | null
        }
      | { __typename: 'CategoryStatusRemoved' }
  } | null
}

export type GetForumCategoryBreadcrumbsQueryVariables = Types.Exact<{
  where: Types.ForumCategoryWhereUniqueInput
}>

export type GetForumCategoryBreadcrumbsQuery = {
  __typename: 'Query'
  forumCategoryByUniqueInput?: {
    __typename: 'ForumCategory'
    id: string
    title: string
    parent?: {
      __typename: 'ForumCategory'
      id: string
      title: string
      parent?: {
        __typename: 'ForumCategory'
        id: string
        title: string
        parent?: {
          __typename: 'ForumCategory'
          id: string
          title: string
          parent?: {
            __typename: 'ForumCategory'
            id: string
            title: string
            parent?: {
              __typename: 'ForumCategory'
              id: string
              title: string
              parent?: { __typename: 'ForumCategory'; id: string; title: string } | null
            } | null
          } | null
        } | null
      } | null
    } | null
  } | null
}

export type GetForumCategoryBreadcrumbQueryVariables = Types.Exact<{
  where: Types.ForumCategoryWhereUniqueInput
}>

export type GetForumCategoryBreadcrumbQuery = {
  __typename: 'Query'
  forumCategoryByUniqueInput?: {
    __typename: 'ForumCategory'
    parentId?: string | null
    id: string
    title: string
  } | null
}

export type GetForumThreadBreadcrumbsQueryVariables = Types.Exact<{
  where: Types.ForumThreadWhereUniqueInput
}>

export type GetForumThreadBreadcrumbsQuery = {
  __typename: 'Query'
  forumThreadByUniqueInput?: {
    __typename: 'ForumThread'
    id: string
    title: string
    category: {
      __typename: 'ForumCategory'
      id: string
      title: string
      parent?: {
        __typename: 'ForumCategory'
        id: string
        title: string
        parent?: {
          __typename: 'ForumCategory'
          id: string
          title: string
          parent?: {
            __typename: 'ForumCategory'
            id: string
            title: string
            parent?: {
              __typename: 'ForumCategory'
              id: string
              title: string
              parent?: {
                __typename: 'ForumCategory'
                id: string
                title: string
                parent?: { __typename: 'ForumCategory'; id: string; title: string } | null
              } | null
            } | null
          } | null
        } | null
      } | null
    }
  } | null
}

export type GetForumThreadsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ForumThreadWhereInput>
  orderBy?: Types.InputMaybe<Array<Types.ForumThreadOrderByInput> | Types.ForumThreadOrderByInput>
  offset?: Types.InputMaybe<Types.Scalars['Int']>
  limit?: Types.InputMaybe<Types.Scalars['Int']>
}>

export type GetForumThreadsQuery = {
  __typename: 'Query'
  forumThreads: Array<{
    __typename: 'ForumThread'
    id: string
    isSticky: boolean
    categoryId: string
    title: string
    visiblePostsCount: number
    category: { __typename: 'ForumCategory'; title: string }
    initialPost?: { __typename: 'ForumPost'; text: string } | null
    author: {
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
    createdInEvent: { __typename: 'ThreadCreatedEvent'; createdAt: any; inBlock: number; network: Types.Network }
    status:
      | { __typename: 'ThreadStatusActive' }
      | {
          __typename: 'ThreadStatusLocked'
          threadDeletedEvent?: {
            __typename: 'ThreadDeletedEvent'
            createdAt: any
            inBlock: number
            network: Types.Network
          } | null
        }
      | { __typename: 'ThreadStatusModerated' }
      | { __typename: 'ThreadStatusRemoved' }
  }>
}

export type GetForumThreadsCountQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.ForumThreadWhereInput>
}>

export type GetForumThreadsCountQuery = {
  __typename: 'Query'
  forumThreadsConnection: { __typename: 'ForumThreadConnection'; totalCount: number }
}

export type GetForumThreadsIDsQueryVariables = Types.Exact<{ [key: string]: never }>

export type GetForumThreadsIDsQuery = {
  __typename: 'Query'
  forumThreads: Array<{ __typename: 'ForumThread'; id: string }>
}

export type GetForumThreadQueryVariables = Types.Exact<{
  where: Types.ForumThreadWhereUniqueInput
}>

export type GetForumThreadQuery = {
  __typename: 'Query'
  thread?: {
    __typename: 'ForumThread'
    id: string
    isSticky: boolean
    categoryId: string
    title: string
    visiblePostsCount: number
    category: { __typename: 'ForumCategory'; title: string }
    initialPost?: { __typename: 'ForumPost'; text: string } | null
    author: {
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
    createdInEvent: { __typename: 'ThreadCreatedEvent'; createdAt: any; inBlock: number; network: Types.Network }
    status:
      | { __typename: 'ThreadStatusActive' }
      | {
          __typename: 'ThreadStatusLocked'
          threadDeletedEvent?: {
            __typename: 'ThreadDeletedEvent'
            createdAt: any
            inBlock: number
            network: Types.Network
          } | null
        }
      | { __typename: 'ThreadStatusModerated' }
      | { __typename: 'ThreadStatusRemoved' }
  } | null
}

export type GetForumPostsQueryVariables = Types.Exact<{
  where: Types.ForumPostWhereInput
  orderBy?: Types.InputMaybe<Array<Types.ForumPostOrderByInput> | Types.ForumPostOrderByInput>
  offset?: Types.InputMaybe<Types.Scalars['Int']>
  limit?: Types.InputMaybe<Types.Scalars['Int']>
}>

export type GetForumPostsQuery = {
  __typename: 'Query'
  forumPosts: Array<{
    __typename: 'ForumPost'
    id: string
    createdAt: any
    updatedAt?: any | null
    text: string
    authorId: string
    threadId: string
    repliesTo?: {
      __typename: 'ForumPost'
      id: string
      createdAt: any
      updatedAt?: any | null
      text: string
      authorId: string
      threadId: string
      author: {
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
      forumthreadinitialPost?: Array<{
        __typename: 'ForumThread'
        createdInEvent: { __typename: 'ThreadCreatedEvent'; createdAt: any; inBlock: number; network: Types.Network }
      }> | null
      postaddedeventpost?: Array<{
        __typename: 'PostAddedEvent'
        createdAt: any
        inBlock: number
        network: Types.Network
      }> | null
      postmoderatedeventpost?: Array<{
        __typename: 'PostModeratedEvent'
        actor: {
          __typename: 'Worker'
          membership: {
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
        }
      }> | null
      status:
        | { __typename: 'PostStatusActive' }
        | { __typename: 'PostStatusLocked' }
        | { __typename: 'PostStatusModerated' }
        | { __typename: 'PostStatusRemoved' }
      edits: Array<{ __typename: 'PostTextUpdatedEvent'; createdAt: any }>
      thread: { __typename: 'ForumThread'; categoryId: string }
    } | null
    author: {
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
    forumthreadinitialPost?: Array<{
      __typename: 'ForumThread'
      createdInEvent: { __typename: 'ThreadCreatedEvent'; createdAt: any; inBlock: number; network: Types.Network }
    }> | null
    postaddedeventpost?: Array<{
      __typename: 'PostAddedEvent'
      createdAt: any
      inBlock: number
      network: Types.Network
    }> | null
    postmoderatedeventpost?: Array<{
      __typename: 'PostModeratedEvent'
      actor: {
        __typename: 'Worker'
        membership: {
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
      }
    }> | null
    status:
      | { __typename: 'PostStatusActive' }
      | { __typename: 'PostStatusLocked' }
      | { __typename: 'PostStatusModerated' }
      | { __typename: 'PostStatusRemoved' }
    edits: Array<{ __typename: 'PostTextUpdatedEvent'; createdAt: any }>
    thread: { __typename: 'ForumThread'; categoryId: string }
  }>
}

export type GetForumPostEditsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetForumPostEditsQuery = {
  __typename: 'Query'
  edits: Array<{
    __typename: 'PostTextUpdatedEvent'
    newText: string
    network: Types.Network
    createdAt: any
    inBlock: number
  }>
  initial: Array<{
    __typename: 'PostAddedEvent'
    createdAt: any
    network: Types.Network
    inBlock: number
    text: string
  }>
}

export type GetForumPostsCountQueryVariables = Types.Exact<{
  where: Types.ForumPostWhereInput
}>

export type GetForumPostsCountQuery = {
  __typename: 'Query'
  forumPostsConnection: { __typename: 'ForumPostConnection'; totalCount: number }
}

export type GetForumPostsIdsQueryVariables = Types.Exact<{
  where: Types.ForumPostWhereInput
  orderBy?: Types.InputMaybe<Array<Types.ForumPostOrderByInput> | Types.ForumPostOrderByInput>
  limit?: Types.InputMaybe<Types.Scalars['Int']>
}>

export type GetForumPostsIdsQuery = { __typename: 'Query'; forumPosts: Array<{ __typename: 'ForumPost'; id: string }> }

export type GetForumPostParentsQueryVariables = Types.Exact<{
  where: Types.ForumPostWhereUniqueInput
}>

export type GetForumPostParentsQuery = {
  __typename: 'Query'
  forumPostByUniqueInput?: {
    __typename: 'ForumPost'
    thread: { __typename: 'ForumThread'; id: string; category: { __typename: 'ForumCategory'; id: string } }
  } | null
}

export type SearchForumPostQueryVariables = Types.Exact<{
  where: Types.ForumPostWhereInput
  orderBy?: Types.InputMaybe<Array<Types.ForumPostOrderByInput> | Types.ForumPostOrderByInput>
  offset?: Types.InputMaybe<Types.Scalars['Int']>
  limit?: Types.InputMaybe<Types.Scalars['Int']>
}>

export type SearchForumPostQuery = {
  __typename: 'Query'
  forumPosts: Array<{
    __typename: 'ForumPost'
    id: string
    text: string
    thread: { __typename: 'ForumThread'; id: string; title: string; categoryId: string }
  }>
}

export type SimpleSearchForumPostQueryVariables = Types.Exact<{
  text: Types.Scalars['String']
  limit?: Types.InputMaybe<Types.Scalars['Int']>
}>

export type SimpleSearchForumPostQuery = {
  __typename: 'Query'
  forumPosts: Array<{
    __typename: 'ForumPost'
    id: string
    text: string
    thread: { __typename: 'ForumThread'; id: string }
  }>
}

export type SimpleSearchForumThreadsQueryVariables = Types.Exact<{
  text: Types.Scalars['String']
  limit?: Types.InputMaybe<Types.Scalars['Int']>
}>

export type SimpleSearchForumThreadsQuery = {
  __typename: 'Query'
  forumThreads: Array<{ __typename: 'ForumThread'; id: string; title: string }>
}

export type GetForumPostMentionQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetForumPostMentionQuery = {
  __typename: 'Query'
  forumPost?: {
    __typename: 'ForumPost'
    id: string
    text: string
    createdAt: any
    author: {
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
  } | null
}

export type GetForumThreadMentionQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']
}>

export type GetForumThreadMentionQuery = {
  __typename: 'Query'
  forumThread?: {
    __typename: 'ForumThread'
    id: string
    title: string
    visiblePostsCount: number
    author: {
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
    initialPost?: { __typename: 'ForumPost'; text: string } | null
  } | null
}

export const ForumBaseCategoryFieldsFragmentDoc = gql`
  fragment ForumBaseCategoryFields on ForumCategory {
    id
    title
    description
    status {
      __typename
      ... on CategoryStatusArchived {
        categoryArchivalStatusUpdatedEvent {
          createdAt
          inBlock
          network
        }
      }
    }
  }
`
export const ForumSubCategoryFieldsFragmentDoc = gql`
  fragment ForumSubCategoryFields on ForumCategory {
    id
    title
  }
`
export const ArchivedForumCategoryFieldsFragmentDoc = gql`
  fragment ArchivedForumCategoryFields on ForumCategory {
    ...ForumBaseCategoryFields
    forumcategoryparent {
      ...ForumSubCategoryFields
      status {
        __typename
      }
    }
  }
  ${ForumBaseCategoryFieldsFragmentDoc}
  ${ForumSubCategoryFieldsFragmentDoc}
`
export const ForumModeratorFieldsFragmentDoc = gql`
  fragment ForumModeratorFields on Worker {
    id
    membership {
      id
      handle
    }
  }
`
export const ForumCategoryFieldsFragmentDoc = gql`
  fragment ForumCategoryFields on ForumCategory {
    ...ForumBaseCategoryFields
    moderators {
      ...ForumModeratorFields
    }
    forumcategoryparent {
      ...ForumSubCategoryFields
      status {
        __typename
      }
    }
  }
  ${ForumBaseCategoryFieldsFragmentDoc}
  ${ForumModeratorFieldsFragmentDoc}
  ${ForumSubCategoryFieldsFragmentDoc}
`
export const ForumCategoryWithDetailsFieldsFragmentDoc = gql`
  fragment ForumCategoryWithDetailsFields on ForumCategory {
    ...ForumBaseCategoryFields
    forumcategoryparent {
      ...ForumCategoryFields
    }
    moderators {
      ...ForumModeratorFields
    }
  }
  ${ForumBaseCategoryFieldsFragmentDoc}
  ${ForumCategoryFieldsFragmentDoc}
  ${ForumModeratorFieldsFragmentDoc}
`
export const ForumCategoryBreadcrumbsFieldsFragmentDoc = gql`
  fragment ForumCategoryBreadcrumbsFields on ForumCategory {
    ...ForumSubCategoryFields
    parent {
      ...ForumSubCategoryFields
      parent {
        ...ForumSubCategoryFields
        parent {
          ...ForumSubCategoryFields
          parent {
            ...ForumSubCategoryFields
            parent {
              ...ForumSubCategoryFields
              parent {
                ...ForumSubCategoryFields
              }
            }
          }
        }
      }
    }
  }
  ${ForumSubCategoryFieldsFragmentDoc}
`
export const ForumThreadBreadcrumbsFieldsFragmentDoc = gql`
  fragment ForumThreadBreadcrumbsFields on ForumThread {
    id
    title
    category {
      ...ForumCategoryBreadcrumbsFields
    }
  }
  ${ForumCategoryBreadcrumbsFieldsFragmentDoc}
`
export const ForumPostWithoutReplyFieldsFragmentDoc = gql`
  fragment ForumPostWithoutReplyFields on ForumPost {
    id
    createdAt
    updatedAt
    author {
      ...MemberFields
    }
    text
    authorId
    forumthreadinitialPost {
      createdInEvent {
        createdAt
        inBlock
        network
      }
    }
    postaddedeventpost {
      createdAt
      inBlock
      network
    }
    postmoderatedeventpost {
      actor {
        membership {
          ...MemberFields
        }
      }
    }
    status {
      __typename
    }
    edits {
      createdAt
    }
    threadId
    thread {
      categoryId
    }
  }
  ${MemberFieldsFragmentDoc}
`
export const ForumPostFieldsFragmentDoc = gql`
  fragment ForumPostFields on ForumPost {
    ...ForumPostWithoutReplyFields
    repliesTo {
      ...ForumPostWithoutReplyFields
    }
  }
  ${ForumPostWithoutReplyFieldsFragmentDoc}
`
export const ForumThreadFieldsFragmentDoc = gql`
  fragment ForumThreadFields on ForumThread {
    id
    isSticky
    categoryId
    category {
      title
    }
    title
    initialPost {
      text
    }
    author {
      ...MemberFields
    }
    createdInEvent {
      createdAt
      inBlock
      network
    }
    status {
      __typename
      ... on ThreadStatusLocked {
        threadDeletedEvent {
          createdAt
          inBlock
          network
        }
      }
    }
    visiblePostsCount
  }
  ${MemberFieldsFragmentDoc}
`
export const ForumThreadDetailedFieldsFragmentDoc = gql`
  fragment ForumThreadDetailedFields on ForumThread {
    ...ForumThreadFields
  }
  ${ForumThreadFieldsFragmentDoc}
`
export const ForumPostParentsFragmentDoc = gql`
  fragment ForumPostParents on ForumPost {
    thread {
      id
      category {
        id
      }
    }
  }
`
export const ForumThreadMentionFieldsFragmentDoc = gql`
  fragment ForumThreadMentionFields on ForumThread {
    id
    title
    visiblePostsCount
    author {
      ...MemberFields
    }
    initialPost {
      text
    }
  }
  ${MemberFieldsFragmentDoc}
`
export const ForumPostMentionFieldsFragmentDoc = gql`
  fragment ForumPostMentionFields on ForumPost {
    id
    text
    createdAt
    author {
      ...MemberFields
    }
  }
  ${MemberFieldsFragmentDoc}
`
export const GetForumCategoriesDocument = gql`
  query GetForumCategories(
    $where: ForumCategoryWhereInput
    $orderBy: [ForumCategoryOrderByInput!]
    $offset: Int
    $limit: Int
  ) {
    forumCategories(where: $where, orderBy: $orderBy, offset: $offset, limit: $limit) {
      ...ForumCategoryFields
    }
  }
  ${ForumCategoryFieldsFragmentDoc}
`

/**
 * __useGetForumCategoriesQuery__
 *
 * To run a query within a React component, call `useGetForumCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumCategoriesQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetForumCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetForumCategoriesQuery, GetForumCategoriesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumCategoriesQuery, GetForumCategoriesQueryVariables>(GetForumCategoriesDocument, options)
}
export function useGetForumCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumCategoriesQuery, GetForumCategoriesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumCategoriesQuery, GetForumCategoriesQueryVariables>(
    GetForumCategoriesDocument,
    options
  )
}
export type GetForumCategoriesQueryHookResult = ReturnType<typeof useGetForumCategoriesQuery>
export type GetForumCategoriesLazyQueryHookResult = ReturnType<typeof useGetForumCategoriesLazyQuery>
export type GetForumCategoriesQueryResult = Apollo.QueryResult<
  GetForumCategoriesQuery,
  GetForumCategoriesQueryVariables
>
export const GetArchivedForumCategoriesDocument = gql`
  query GetArchivedForumCategories($where: ForumCategoryWhereInput) {
    forumCategories(where: $where) {
      ...ArchivedForumCategoryFields
    }
  }
  ${ArchivedForumCategoryFieldsFragmentDoc}
`

/**
 * __useGetArchivedForumCategoriesQuery__
 *
 * To run a query within a React component, call `useGetArchivedForumCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetArchivedForumCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetArchivedForumCategoriesQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetArchivedForumCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<GetArchivedForumCategoriesQuery, GetArchivedForumCategoriesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetArchivedForumCategoriesQuery, GetArchivedForumCategoriesQueryVariables>(
    GetArchivedForumCategoriesDocument,
    options
  )
}
export function useGetArchivedForumCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetArchivedForumCategoriesQuery, GetArchivedForumCategoriesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetArchivedForumCategoriesQuery, GetArchivedForumCategoriesQueryVariables>(
    GetArchivedForumCategoriesDocument,
    options
  )
}
export type GetArchivedForumCategoriesQueryHookResult = ReturnType<typeof useGetArchivedForumCategoriesQuery>
export type GetArchivedForumCategoriesLazyQueryHookResult = ReturnType<typeof useGetArchivedForumCategoriesLazyQuery>
export type GetArchivedForumCategoriesQueryResult = Apollo.QueryResult<
  GetArchivedForumCategoriesQuery,
  GetArchivedForumCategoriesQueryVariables
>
export const GetForumCategoryDocument = gql`
  query GetForumCategory($where: ForumCategoryWhereUniqueInput!) {
    forumCategoryByUniqueInput(where: $where) {
      ...ForumCategoryWithDetailsFields
    }
  }
  ${ForumCategoryWithDetailsFieldsFragmentDoc}
`

/**
 * __useGetForumCategoryQuery__
 *
 * To run a query within a React component, call `useGetForumCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumCategoryQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetForumCategoryQuery(
  baseOptions: Apollo.QueryHookOptions<GetForumCategoryQuery, GetForumCategoryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumCategoryQuery, GetForumCategoryQueryVariables>(GetForumCategoryDocument, options)
}
export function useGetForumCategoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumCategoryQuery, GetForumCategoryQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumCategoryQuery, GetForumCategoryQueryVariables>(GetForumCategoryDocument, options)
}
export type GetForumCategoryQueryHookResult = ReturnType<typeof useGetForumCategoryQuery>
export type GetForumCategoryLazyQueryHookResult = ReturnType<typeof useGetForumCategoryLazyQuery>
export type GetForumCategoryQueryResult = Apollo.QueryResult<GetForumCategoryQuery, GetForumCategoryQueryVariables>
export const GetForumCategoryBreadcrumbsDocument = gql`
  query GetForumCategoryBreadcrumbs($where: ForumCategoryWhereUniqueInput!) {
    forumCategoryByUniqueInput(where: $where) {
      ...ForumCategoryBreadcrumbsFields
    }
  }
  ${ForumCategoryBreadcrumbsFieldsFragmentDoc}
`

/**
 * __useGetForumCategoryBreadcrumbsQuery__
 *
 * To run a query within a React component, call `useGetForumCategoryBreadcrumbsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumCategoryBreadcrumbsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumCategoryBreadcrumbsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetForumCategoryBreadcrumbsQuery(
  baseOptions: Apollo.QueryHookOptions<GetForumCategoryBreadcrumbsQuery, GetForumCategoryBreadcrumbsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumCategoryBreadcrumbsQuery, GetForumCategoryBreadcrumbsQueryVariables>(
    GetForumCategoryBreadcrumbsDocument,
    options
  )
}
export function useGetForumCategoryBreadcrumbsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumCategoryBreadcrumbsQuery, GetForumCategoryBreadcrumbsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumCategoryBreadcrumbsQuery, GetForumCategoryBreadcrumbsQueryVariables>(
    GetForumCategoryBreadcrumbsDocument,
    options
  )
}
export type GetForumCategoryBreadcrumbsQueryHookResult = ReturnType<typeof useGetForumCategoryBreadcrumbsQuery>
export type GetForumCategoryBreadcrumbsLazyQueryHookResult = ReturnType<typeof useGetForumCategoryBreadcrumbsLazyQuery>
export type GetForumCategoryBreadcrumbsQueryResult = Apollo.QueryResult<
  GetForumCategoryBreadcrumbsQuery,
  GetForumCategoryBreadcrumbsQueryVariables
>
export const GetForumCategoryBreadcrumbDocument = gql`
  query GetForumCategoryBreadcrumb($where: ForumCategoryWhereUniqueInput!) {
    forumCategoryByUniqueInput(where: $where) {
      ...ForumSubCategoryFields
      parentId
    }
  }
  ${ForumSubCategoryFieldsFragmentDoc}
`

/**
 * __useGetForumCategoryBreadcrumbQuery__
 *
 * To run a query within a React component, call `useGetForumCategoryBreadcrumbQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumCategoryBreadcrumbQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumCategoryBreadcrumbQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetForumCategoryBreadcrumbQuery(
  baseOptions: Apollo.QueryHookOptions<GetForumCategoryBreadcrumbQuery, GetForumCategoryBreadcrumbQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumCategoryBreadcrumbQuery, GetForumCategoryBreadcrumbQueryVariables>(
    GetForumCategoryBreadcrumbDocument,
    options
  )
}
export function useGetForumCategoryBreadcrumbLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumCategoryBreadcrumbQuery, GetForumCategoryBreadcrumbQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumCategoryBreadcrumbQuery, GetForumCategoryBreadcrumbQueryVariables>(
    GetForumCategoryBreadcrumbDocument,
    options
  )
}
export type GetForumCategoryBreadcrumbQueryHookResult = ReturnType<typeof useGetForumCategoryBreadcrumbQuery>
export type GetForumCategoryBreadcrumbLazyQueryHookResult = ReturnType<typeof useGetForumCategoryBreadcrumbLazyQuery>
export type GetForumCategoryBreadcrumbQueryResult = Apollo.QueryResult<
  GetForumCategoryBreadcrumbQuery,
  GetForumCategoryBreadcrumbQueryVariables
>
export const GetForumThreadBreadcrumbsDocument = gql`
  query GetForumThreadBreadcrumbs($where: ForumThreadWhereUniqueInput!) {
    forumThreadByUniqueInput(where: $where) {
      ...ForumThreadBreadcrumbsFields
    }
  }
  ${ForumThreadBreadcrumbsFieldsFragmentDoc}
`

/**
 * __useGetForumThreadBreadcrumbsQuery__
 *
 * To run a query within a React component, call `useGetForumThreadBreadcrumbsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumThreadBreadcrumbsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumThreadBreadcrumbsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetForumThreadBreadcrumbsQuery(
  baseOptions: Apollo.QueryHookOptions<GetForumThreadBreadcrumbsQuery, GetForumThreadBreadcrumbsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumThreadBreadcrumbsQuery, GetForumThreadBreadcrumbsQueryVariables>(
    GetForumThreadBreadcrumbsDocument,
    options
  )
}
export function useGetForumThreadBreadcrumbsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumThreadBreadcrumbsQuery, GetForumThreadBreadcrumbsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumThreadBreadcrumbsQuery, GetForumThreadBreadcrumbsQueryVariables>(
    GetForumThreadBreadcrumbsDocument,
    options
  )
}
export type GetForumThreadBreadcrumbsQueryHookResult = ReturnType<typeof useGetForumThreadBreadcrumbsQuery>
export type GetForumThreadBreadcrumbsLazyQueryHookResult = ReturnType<typeof useGetForumThreadBreadcrumbsLazyQuery>
export type GetForumThreadBreadcrumbsQueryResult = Apollo.QueryResult<
  GetForumThreadBreadcrumbsQuery,
  GetForumThreadBreadcrumbsQueryVariables
>
export const GetForumThreadsDocument = gql`
  query GetForumThreads(
    $where: ForumThreadWhereInput
    $orderBy: [ForumThreadOrderByInput!]
    $offset: Int
    $limit: Int
  ) {
    forumThreads(where: $where, orderBy: $orderBy, limit: $limit, offset: $offset) {
      ...ForumThreadFields
    }
  }
  ${ForumThreadFieldsFragmentDoc}
`

/**
 * __useGetForumThreadsQuery__
 *
 * To run a query within a React component, call `useGetForumThreadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumThreadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumThreadsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetForumThreadsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetForumThreadsQuery, GetForumThreadsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumThreadsQuery, GetForumThreadsQueryVariables>(GetForumThreadsDocument, options)
}
export function useGetForumThreadsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumThreadsQuery, GetForumThreadsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumThreadsQuery, GetForumThreadsQueryVariables>(GetForumThreadsDocument, options)
}
export type GetForumThreadsQueryHookResult = ReturnType<typeof useGetForumThreadsQuery>
export type GetForumThreadsLazyQueryHookResult = ReturnType<typeof useGetForumThreadsLazyQuery>
export type GetForumThreadsQueryResult = Apollo.QueryResult<GetForumThreadsQuery, GetForumThreadsQueryVariables>
export const GetForumThreadsCountDocument = gql`
  query GetForumThreadsCount($where: ForumThreadWhereInput) {
    forumThreadsConnection(where: $where) {
      totalCount
    }
  }
`

/**
 * __useGetForumThreadsCountQuery__
 *
 * To run a query within a React component, call `useGetForumThreadsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumThreadsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumThreadsCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetForumThreadsCountQuery(
  baseOptions?: Apollo.QueryHookOptions<GetForumThreadsCountQuery, GetForumThreadsCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumThreadsCountQuery, GetForumThreadsCountQueryVariables>(
    GetForumThreadsCountDocument,
    options
  )
}
export function useGetForumThreadsCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumThreadsCountQuery, GetForumThreadsCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumThreadsCountQuery, GetForumThreadsCountQueryVariables>(
    GetForumThreadsCountDocument,
    options
  )
}
export type GetForumThreadsCountQueryHookResult = ReturnType<typeof useGetForumThreadsCountQuery>
export type GetForumThreadsCountLazyQueryHookResult = ReturnType<typeof useGetForumThreadsCountLazyQuery>
export type GetForumThreadsCountQueryResult = Apollo.QueryResult<
  GetForumThreadsCountQuery,
  GetForumThreadsCountQueryVariables
>
export const GetForumThreadsIDsDocument = gql`
  query GetForumThreadsIDs {
    forumThreads {
      id
    }
  }
`

/**
 * __useGetForumThreadsIDsQuery__
 *
 * To run a query within a React component, call `useGetForumThreadsIDsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumThreadsIDsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumThreadsIDsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetForumThreadsIDsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetForumThreadsIDsQuery, GetForumThreadsIDsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumThreadsIDsQuery, GetForumThreadsIDsQueryVariables>(GetForumThreadsIDsDocument, options)
}
export function useGetForumThreadsIDsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumThreadsIDsQuery, GetForumThreadsIDsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumThreadsIDsQuery, GetForumThreadsIDsQueryVariables>(
    GetForumThreadsIDsDocument,
    options
  )
}
export type GetForumThreadsIDsQueryHookResult = ReturnType<typeof useGetForumThreadsIDsQuery>
export type GetForumThreadsIDsLazyQueryHookResult = ReturnType<typeof useGetForumThreadsIDsLazyQuery>
export type GetForumThreadsIDsQueryResult = Apollo.QueryResult<
  GetForumThreadsIDsQuery,
  GetForumThreadsIDsQueryVariables
>
export const GetForumThreadDocument = gql`
  query GetForumThread($where: ForumThreadWhereUniqueInput!) {
    thread: forumThreadByUniqueInput(where: $where) {
      ...ForumThreadDetailedFields
    }
  }
  ${ForumThreadDetailedFieldsFragmentDoc}
`

/**
 * __useGetForumThreadQuery__
 *
 * To run a query within a React component, call `useGetForumThreadQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumThreadQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumThreadQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetForumThreadQuery(
  baseOptions: Apollo.QueryHookOptions<GetForumThreadQuery, GetForumThreadQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumThreadQuery, GetForumThreadQueryVariables>(GetForumThreadDocument, options)
}
export function useGetForumThreadLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumThreadQuery, GetForumThreadQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumThreadQuery, GetForumThreadQueryVariables>(GetForumThreadDocument, options)
}
export type GetForumThreadQueryHookResult = ReturnType<typeof useGetForumThreadQuery>
export type GetForumThreadLazyQueryHookResult = ReturnType<typeof useGetForumThreadLazyQuery>
export type GetForumThreadQueryResult = Apollo.QueryResult<GetForumThreadQuery, GetForumThreadQueryVariables>
export const GetForumPostsDocument = gql`
  query GetForumPosts($where: ForumPostWhereInput!, $orderBy: [ForumPostOrderByInput!], $offset: Int, $limit: Int) {
    forumPosts(where: $where, orderBy: $orderBy, offset: $offset, limit: $limit) {
      ...ForumPostFields
    }
  }
  ${ForumPostFieldsFragmentDoc}
`

/**
 * __useGetForumPostsQuery__
 *
 * To run a query within a React component, call `useGetForumPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumPostsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetForumPostsQuery(
  baseOptions: Apollo.QueryHookOptions<GetForumPostsQuery, GetForumPostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumPostsQuery, GetForumPostsQueryVariables>(GetForumPostsDocument, options)
}
export function useGetForumPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumPostsQuery, GetForumPostsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumPostsQuery, GetForumPostsQueryVariables>(GetForumPostsDocument, options)
}
export type GetForumPostsQueryHookResult = ReturnType<typeof useGetForumPostsQuery>
export type GetForumPostsLazyQueryHookResult = ReturnType<typeof useGetForumPostsLazyQuery>
export type GetForumPostsQueryResult = Apollo.QueryResult<GetForumPostsQuery, GetForumPostsQueryVariables>
export const GetForumPostEditsDocument = gql`
  query GetForumPostEdits($id: ID!) {
    edits: postTextUpdatedEvents(where: { post: { id_eq: $id } }, orderBy: [createdAt_ASC]) {
      newText
      network
      createdAt
      inBlock
    }
    initial: postAddedEvents(where: { post: { id_eq: $id } }) {
      createdAt
      network
      inBlock
      text
    }
  }
`

/**
 * __useGetForumPostEditsQuery__
 *
 * To run a query within a React component, call `useGetForumPostEditsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumPostEditsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumPostEditsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetForumPostEditsQuery(
  baseOptions: Apollo.QueryHookOptions<GetForumPostEditsQuery, GetForumPostEditsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumPostEditsQuery, GetForumPostEditsQueryVariables>(GetForumPostEditsDocument, options)
}
export function useGetForumPostEditsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumPostEditsQuery, GetForumPostEditsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumPostEditsQuery, GetForumPostEditsQueryVariables>(
    GetForumPostEditsDocument,
    options
  )
}
export type GetForumPostEditsQueryHookResult = ReturnType<typeof useGetForumPostEditsQuery>
export type GetForumPostEditsLazyQueryHookResult = ReturnType<typeof useGetForumPostEditsLazyQuery>
export type GetForumPostEditsQueryResult = Apollo.QueryResult<GetForumPostEditsQuery, GetForumPostEditsQueryVariables>
export const GetForumPostsCountDocument = gql`
  query GetForumPostsCount($where: ForumPostWhereInput!) {
    forumPostsConnection(where: $where) {
      totalCount
    }
  }
`

/**
 * __useGetForumPostsCountQuery__
 *
 * To run a query within a React component, call `useGetForumPostsCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumPostsCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumPostsCountQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetForumPostsCountQuery(
  baseOptions: Apollo.QueryHookOptions<GetForumPostsCountQuery, GetForumPostsCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumPostsCountQuery, GetForumPostsCountQueryVariables>(GetForumPostsCountDocument, options)
}
export function useGetForumPostsCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumPostsCountQuery, GetForumPostsCountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumPostsCountQuery, GetForumPostsCountQueryVariables>(
    GetForumPostsCountDocument,
    options
  )
}
export type GetForumPostsCountQueryHookResult = ReturnType<typeof useGetForumPostsCountQuery>
export type GetForumPostsCountLazyQueryHookResult = ReturnType<typeof useGetForumPostsCountLazyQuery>
export type GetForumPostsCountQueryResult = Apollo.QueryResult<
  GetForumPostsCountQuery,
  GetForumPostsCountQueryVariables
>
export const GetForumPostsIdsDocument = gql`
  query GetForumPostsIds($where: ForumPostWhereInput!, $orderBy: [ForumPostOrderByInput!], $limit: Int) {
    forumPosts(where: $where, orderBy: $orderBy, limit: $limit) {
      id
    }
  }
`

/**
 * __useGetForumPostsIdsQuery__
 *
 * To run a query within a React component, call `useGetForumPostsIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumPostsIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumPostsIdsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetForumPostsIdsQuery(
  baseOptions: Apollo.QueryHookOptions<GetForumPostsIdsQuery, GetForumPostsIdsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumPostsIdsQuery, GetForumPostsIdsQueryVariables>(GetForumPostsIdsDocument, options)
}
export function useGetForumPostsIdsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumPostsIdsQuery, GetForumPostsIdsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumPostsIdsQuery, GetForumPostsIdsQueryVariables>(GetForumPostsIdsDocument, options)
}
export type GetForumPostsIdsQueryHookResult = ReturnType<typeof useGetForumPostsIdsQuery>
export type GetForumPostsIdsLazyQueryHookResult = ReturnType<typeof useGetForumPostsIdsLazyQuery>
export type GetForumPostsIdsQueryResult = Apollo.QueryResult<GetForumPostsIdsQuery, GetForumPostsIdsQueryVariables>
export const GetForumPostParentsDocument = gql`
  query GetForumPostParents($where: ForumPostWhereUniqueInput!) {
    forumPostByUniqueInput(where: $where) {
      ...ForumPostParents
    }
  }
  ${ForumPostParentsFragmentDoc}
`

/**
 * __useGetForumPostParentsQuery__
 *
 * To run a query within a React component, call `useGetForumPostParentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumPostParentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumPostParentsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetForumPostParentsQuery(
  baseOptions: Apollo.QueryHookOptions<GetForumPostParentsQuery, GetForumPostParentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumPostParentsQuery, GetForumPostParentsQueryVariables>(
    GetForumPostParentsDocument,
    options
  )
}
export function useGetForumPostParentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumPostParentsQuery, GetForumPostParentsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumPostParentsQuery, GetForumPostParentsQueryVariables>(
    GetForumPostParentsDocument,
    options
  )
}
export type GetForumPostParentsQueryHookResult = ReturnType<typeof useGetForumPostParentsQuery>
export type GetForumPostParentsLazyQueryHookResult = ReturnType<typeof useGetForumPostParentsLazyQuery>
export type GetForumPostParentsQueryResult = Apollo.QueryResult<
  GetForumPostParentsQuery,
  GetForumPostParentsQueryVariables
>
export const SearchForumPostDocument = gql`
  query SearchForumPost($where: ForumPostWhereInput!, $orderBy: [ForumPostOrderByInput!], $offset: Int, $limit: Int) {
    forumPosts(where: $where, orderBy: $orderBy, offset: $offset, limit: $limit) {
      id
      text
      thread {
        id
        title
        categoryId
      }
    }
  }
`

/**
 * __useSearchForumPostQuery__
 *
 * To run a query within a React component, call `useSearchForumPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchForumPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchForumPostQuery({
 *   variables: {
 *      where: // value for 'where'
 *      orderBy: // value for 'orderBy'
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSearchForumPostQuery(
  baseOptions: Apollo.QueryHookOptions<SearchForumPostQuery, SearchForumPostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SearchForumPostQuery, SearchForumPostQueryVariables>(SearchForumPostDocument, options)
}
export function useSearchForumPostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SearchForumPostQuery, SearchForumPostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SearchForumPostQuery, SearchForumPostQueryVariables>(SearchForumPostDocument, options)
}
export type SearchForumPostQueryHookResult = ReturnType<typeof useSearchForumPostQuery>
export type SearchForumPostLazyQueryHookResult = ReturnType<typeof useSearchForumPostLazyQuery>
export type SearchForumPostQueryResult = Apollo.QueryResult<SearchForumPostQuery, SearchForumPostQueryVariables>
export const SimpleSearchForumPostDocument = gql`
  query SimpleSearchForumPost($text: String!, $limit: Int) {
    forumPosts(where: { text_contains: $text }, limit: $limit) {
      id
      text
      thread {
        id
      }
    }
  }
`

/**
 * __useSimpleSearchForumPostQuery__
 *
 * To run a query within a React component, call `useSimpleSearchForumPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useSimpleSearchForumPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSimpleSearchForumPostQuery({
 *   variables: {
 *      text: // value for 'text'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSimpleSearchForumPostQuery(
  baseOptions: Apollo.QueryHookOptions<SimpleSearchForumPostQuery, SimpleSearchForumPostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SimpleSearchForumPostQuery, SimpleSearchForumPostQueryVariables>(
    SimpleSearchForumPostDocument,
    options
  )
}
export function useSimpleSearchForumPostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SimpleSearchForumPostQuery, SimpleSearchForumPostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SimpleSearchForumPostQuery, SimpleSearchForumPostQueryVariables>(
    SimpleSearchForumPostDocument,
    options
  )
}
export type SimpleSearchForumPostQueryHookResult = ReturnType<typeof useSimpleSearchForumPostQuery>
export type SimpleSearchForumPostLazyQueryHookResult = ReturnType<typeof useSimpleSearchForumPostLazyQuery>
export type SimpleSearchForumPostQueryResult = Apollo.QueryResult<
  SimpleSearchForumPostQuery,
  SimpleSearchForumPostQueryVariables
>
export const SimpleSearchForumThreadsDocument = gql`
  query SimpleSearchForumThreads($text: String!, $limit: Int) {
    forumThreads(where: { title_contains: $text }, limit: $limit) {
      id
      title
    }
  }
`

/**
 * __useSimpleSearchForumThreadsQuery__
 *
 * To run a query within a React component, call `useSimpleSearchForumThreadsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSimpleSearchForumThreadsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSimpleSearchForumThreadsQuery({
 *   variables: {
 *      text: // value for 'text'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSimpleSearchForumThreadsQuery(
  baseOptions: Apollo.QueryHookOptions<SimpleSearchForumThreadsQuery, SimpleSearchForumThreadsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SimpleSearchForumThreadsQuery, SimpleSearchForumThreadsQueryVariables>(
    SimpleSearchForumThreadsDocument,
    options
  )
}
export function useSimpleSearchForumThreadsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SimpleSearchForumThreadsQuery, SimpleSearchForumThreadsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SimpleSearchForumThreadsQuery, SimpleSearchForumThreadsQueryVariables>(
    SimpleSearchForumThreadsDocument,
    options
  )
}
export type SimpleSearchForumThreadsQueryHookResult = ReturnType<typeof useSimpleSearchForumThreadsQuery>
export type SimpleSearchForumThreadsLazyQueryHookResult = ReturnType<typeof useSimpleSearchForumThreadsLazyQuery>
export type SimpleSearchForumThreadsQueryResult = Apollo.QueryResult<
  SimpleSearchForumThreadsQuery,
  SimpleSearchForumThreadsQueryVariables
>
export const GetForumPostMentionDocument = gql`
  query GetForumPostMention($id: ID!) {
    forumPost: forumPostByUniqueInput(where: { id: $id }) {
      ...ForumPostMentionFields
    }
  }
  ${ForumPostMentionFieldsFragmentDoc}
`

/**
 * __useGetForumPostMentionQuery__
 *
 * To run a query within a React component, call `useGetForumPostMentionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumPostMentionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumPostMentionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetForumPostMentionQuery(
  baseOptions: Apollo.QueryHookOptions<GetForumPostMentionQuery, GetForumPostMentionQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumPostMentionQuery, GetForumPostMentionQueryVariables>(
    GetForumPostMentionDocument,
    options
  )
}
export function useGetForumPostMentionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumPostMentionQuery, GetForumPostMentionQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumPostMentionQuery, GetForumPostMentionQueryVariables>(
    GetForumPostMentionDocument,
    options
  )
}
export type GetForumPostMentionQueryHookResult = ReturnType<typeof useGetForumPostMentionQuery>
export type GetForumPostMentionLazyQueryHookResult = ReturnType<typeof useGetForumPostMentionLazyQuery>
export type GetForumPostMentionQueryResult = Apollo.QueryResult<
  GetForumPostMentionQuery,
  GetForumPostMentionQueryVariables
>
export const GetForumThreadMentionDocument = gql`
  query GetForumThreadMention($id: ID!) {
    forumThread: forumThreadByUniqueInput(where: { id: $id }) {
      ...ForumThreadMentionFields
    }
  }
  ${ForumThreadMentionFieldsFragmentDoc}
`

/**
 * __useGetForumThreadMentionQuery__
 *
 * To run a query within a React component, call `useGetForumThreadMentionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetForumThreadMentionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetForumThreadMentionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetForumThreadMentionQuery(
  baseOptions: Apollo.QueryHookOptions<GetForumThreadMentionQuery, GetForumThreadMentionQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetForumThreadMentionQuery, GetForumThreadMentionQueryVariables>(
    GetForumThreadMentionDocument,
    options
  )
}
export function useGetForumThreadMentionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetForumThreadMentionQuery, GetForumThreadMentionQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetForumThreadMentionQuery, GetForumThreadMentionQueryVariables>(
    GetForumThreadMentionDocument,
    options
  )
}
export type GetForumThreadMentionQueryHookResult = ReturnType<typeof useGetForumThreadMentionQuery>
export type GetForumThreadMentionLazyQueryHookResult = ReturnType<typeof useGetForumThreadMentionLazyQuery>
export type GetForumThreadMentionQueryResult = Apollo.QueryResult<
  GetForumThreadMentionQuery,
  GetForumThreadMentionQueryVariables
>
