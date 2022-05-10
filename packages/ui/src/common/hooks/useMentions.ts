import { useApolloClient, DocumentNode } from '@apollo/client'
import { useCallback } from 'react'

import { debounce } from '@/common/utils'
import {
  SimpleSearchForumPostDocument,
  SimpleSearchForumPostQuery,
  SimpleSearchForumThreadsDocument,
  SimpleSearchForumThreadsQuery,
} from '@/forum/queries'
import { SimpleSearchMembersDocument, SimpleSearchMembersQuery } from '@/memberships/queries'
import {
  SimpleSearchProposalsDocument,
  SimpleSearchProposalsQuery,
  SimpleSearchProposalDiscussionDocument,
  SimpleSearchProposalDiscussionQuery,
} from '@/proposals/queries'
import { i18next } from '@/services/i18n'
import {
  SimpleSearchWorkingGroupApplicationsDocument,
  SimpleSearchWorkingGroupApplicationsQuery,
  SimpleSearchWorkingGroupOpeningsDocument,
  SimpleSearchWorkingGroupOpeningsQuery,
} from '@/working-groups/queries'

enum MentionType {
  General = 'general',
  Proposal = 'proposal',
  ProposalPost = 'proposal_post',
  Member = 'member',
  ForumThread = 'forum_thread',
  ForumPost = 'forum_post',
  Opening = 'opening',
  Application = 'application',
}

export interface MentionItem {
  id: string
  itemId: string
  name: string
  type: MentionType
  addon?: unknown
  helper?: string
}

export type MentionFn = (text: string) => Promise<MentionItem[] | undefined>

export interface UseMentions {
  mentionMembersFeed: MentionFn
  mentionFeed: MentionFn
  itemRenderer: (item: MentionItem) => HTMLDivElement
}

export const useMentions = (): UseMentions => {
  const client = useApolloClient()

  const query = useCallback(
    <Query>(query: DocumentNode) =>
      async (text: string) =>
        await client.query<Query>({
          query,
          variables: { text, limit: 10 },
          fetchPolicy: 'cache-first',
        }),
    [client]
  )

  const mentionMembers = useCallback(async (text: string) => {
    const { data } = await query<SimpleSearchMembersQuery>(SimpleSearchMembersDocument)(text)
    return data.memberships.map<MentionItem>(({ id, handle }) => ({
      id: `@${handle}`,
      itemId: id,
      type: MentionType.Member,
      name: handle,
    }))
  }, [])

  const mentionProposals = useCallback(async (text: string) => {
    const { data } = await query<SimpleSearchProposalsQuery>(SimpleSearchProposalsDocument)(text)
    return data.proposals.map<MentionItem>(({ id, title }) => ({
      id: `#${title}`,
      itemId: id,
      type: MentionType.Proposal,
      name: title,
    }))
  }, [])

  const mentionProposalDiscussionPosts = useCallback(async (text: string) => {
    const { data } = await query<SimpleSearchProposalDiscussionQuery>(SimpleSearchProposalDiscussionDocument)(text)
    return data.proposalDiscussionPosts.map<MentionItem>(({ id, text, discussionThreadId }) => {
      const slice = sliceDescription(text)
      return {
        id: `#${slice}`,
        itemId: id,
        type: MentionType.ProposalPost,
        name: slice,
        addon: discussionThreadId,
      }
    })
  }, [])

  const mentionForumThread = useCallback(async (text: string) => {
    const { data } = await query<SimpleSearchForumThreadsQuery>(SimpleSearchForumThreadsDocument)(text)
    return data.forumThreads.map<MentionItem>(({ id, title }) => ({
      id: `#${title}`,
      itemId: id,
      type: MentionType.ForumThread,
      name: title,
    }))
  }, [])

  const mentionForumPost = useCallback(async (text: string) => {
    const { data } = await query<SimpleSearchForumPostQuery>(SimpleSearchForumPostDocument)(text)
    return data.forumPosts.map<MentionItem>(({ id, text, thread }) => {
      const slice = sliceDescription(text)
      return {
        id: `#${slice}`,
        itemId: id,
        type: MentionType.ForumPost,
        name: slice,
        addon: thread.id,
      }
    })
  }, [])

  const mentionOpening = useCallback(async (text: string) => {
    const { data } = await query<SimpleSearchWorkingGroupOpeningsQuery>(SimpleSearchWorkingGroupOpeningsDocument)(text)
    return data.workingGroupOpenings.map<MentionItem>(({ id, metadata }) => {
      const slice = sliceDescription(metadata.shortDescription ?? '')
      return {
        id: `#${slice}`,
        itemId: id,
        type: MentionType.Opening,
        name: slice,
      }
    })
  }, [])

  const mentionApplication = useCallback(async (text: string) => {
    const { data } = await query<SimpleSearchWorkingGroupApplicationsQuery>(
      SimpleSearchWorkingGroupApplicationsDocument
    )(text)
    return data.workingGroupApplications.map<MentionItem>(({ id, applicant }) => ({
      id: `#${applicant.handle}`,
      itemId: id,
      type: MentionType.Application,
      name: applicant.handle,
    }))
  }, [])

  const mentionFeed = useCallback(
    debounce(async (text: string) => {
      const proposal = text.match(/proposal:(.+)$/)
      if (proposal) {
        return await mentionProposals(proposal[1])
      }
      const proposal_post = text.match(/proposal_post:(.+)$/)
      if (proposal_post) {
        return await mentionProposalDiscussionPosts(proposal_post[1])
      }
      const forumThread = text.match(/forum_thread:(.+)$/)
      if (forumThread) {
        return await mentionForumThread(forumThread[1])
      }
      const forumPost = text.match(/forum_post:(.+)$/)
      if (forumPost) {
        return await mentionForumPost(forumPost[1])
      }
      const opening = text.match(/opening:(.+)$/)
      if (opening) {
        return await mentionOpening(opening[1])
      }
      const application = text.match(/application:(.+)$/)
      if (application) {
        return await mentionApplication(application[1])
      }
      return generalItems
    }),
    [mentionProposals]
  )

  return {
    mentionMembersFeed: mentionMembers,
    mentionFeed,
    itemRenderer,
  }
}

const generalItems: MentionItem[] = [
  {
    id: `#${MentionType.Proposal}:`,
    type: MentionType.General,
    itemId: MentionType.Proposal,
    name: MentionType.Proposal,
    helper: 'proposal_name',
  },
  {
    id: `#${MentionType.ProposalPost}:`,
    type: MentionType.General,
    itemId: MentionType.ProposalPost,
    name: MentionType.ProposalPost,
    helper: 'proposal_post_name',
  },
  {
    id: `#${MentionType.ForumThread}:`,
    type: MentionType.General,
    itemId: MentionType.ForumThread,
    name: MentionType.ForumThread,
    helper: 'forum_thread_name',
  },
  {
    id: `#${MentionType.ForumPost}:`,
    type: MentionType.General,
    itemId: MentionType.ForumPost,
    name: MentionType.ForumPost,
    helper: 'forum_post_name',
  },
  {
    id: `#${MentionType.Opening}:`,
    type: MentionType.General,
    itemId: MentionType.Opening,
    name: MentionType.Opening,
    helper: 'opening_name',
  },
  {
    id: `#${MentionType.Application}:`,
    type: MentionType.General,
    itemId: MentionType.Application,
    name: MentionType.Application,
    helper: 'application_name',
  },
]

const itemRenderer = ({ id, itemId, type, helper }: MentionItem) => {
  const itemElement = document.createElement('div')
  itemElement.classList.add('custom-item')
  itemElement.id = `mention-list-item-id-${itemId}`
  itemElement.textContent = `${id}${type === 'general' ? helper : ''}`

  if (type !== 'general') {
    const typeElement = document.createElement('span')
    typeElement.classList.add('custom-item-type')
    typeElement.textContent = i18next.t(`mentions.type.${type}`)

    itemElement.appendChild(typeElement)
  }

  return itemElement
}

const sliceDescription = (text: string) => text.slice(0, 33) + '...'
