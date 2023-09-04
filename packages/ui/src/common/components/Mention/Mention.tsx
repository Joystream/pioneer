import { DocumentNode, useApolloClient } from '@apollo/client'
import React, { useCallback, useMemo, useState } from 'react'
import { generatePath } from 'react-router-dom'
import styled from 'styled-components'

import { ApplicationIcon } from '@/common/components/icons'
import { ApplicationTooltip } from '@/common/components/Mention/ApplicationTooltip'
import { ForumPostTooltip } from '@/common/components/Mention/ForumPostTooltip'
import { ForumThreadTooltip } from '@/common/components/Mention/ForumThreadTooltip'
import { MemberTooltip } from '@/common/components/Mention/MemberTooltip'
import { OpeningTooltip } from '@/common/components/Mention/OpeningTooltip'
import { ProposalTooltip } from '@/common/components/Mention/ProposalTooltip'
import { ProposalDiscussionEntryTooltip } from '@/common/components/Mention/PrposalDiscussionEntryTooltip'
import { ForumIcon, MyProfileIcon, ProposalsIcon, WorkingGroupsIcon } from '@/common/components/page/Sidebar/LinksIcons'
import { Tooltip } from '@/common/components/Tooltip'
import { TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { ForumRoutes } from '@/forum/constant'
import {
  GetForumPostMentionDocument,
  GetForumPostMentionQuery,
  GetForumThreadMentionDocument,
  GetForumThreadMentionQuery,
} from '@/forum/queries'
import { asForumPostMention, asForumThreadMention, ForumPostMention, ForumThreadMention } from '@/forum/types'
import { useShowMemberModal } from '@/memberships/hooks/useShowMemberModal'
import { GetMemberMentionDocument, GetMemberMentionQuery } from '@/memberships/queries'
import { asMember, Member } from '@/memberships/types'
import { ProposalsRoutes } from '@/proposals/constants/routes'
import {
  GetProposalDiscussionPostMentionDocument,
  GetProposalDiscussionPostMentionQuery,
  GetProposalMentionDocument,
  GetProposalMentionQuery,
} from '@/proposals/queries'
import {
  asProposalDiscussionPostMention,
  asProposalMention,
  ProposalDiscussionPostMention,
  ProposalMention,
} from '@/proposals/types'
import { WorkingGroupsRoutes } from '@/working-groups/constants'
import {
  GetWorkingGroupApplicationMentionDocument,
  GetWorkingGroupApplicationMentionQuery,
  GetWorkingGroupOpeningMentionDocument,
  GetWorkingGroupOpeningMentionQuery,
} from '@/working-groups/queries'
import { asWorkingGroupOpeningMention, WorkingGroupOpeningMention } from '@/working-groups/types'
import {
  asWorkingGroupApplicationMention,
  WorkingGroupApplicationMention,
} from '@/working-groups/types/WorkingGroupApplication'

export type MentionType =
  | 'proposal'
  | 'proposalDiscussionEntry'
  | 'forumThread'
  | 'forumPost'
  | 'member'
  | 'opening'
  | 'application'

export interface MentionProps {
  children: React.ReactNode
  type: MentionType
  itemId: string
}

type TState =
  | ProposalMention
  | ProposalDiscussionPostMention
  | ForumThreadMention
  | ForumPostMention
  | WorkingGroupOpeningMention
  | WorkingGroupApplicationMention
  | Member
  | undefined

export const Mention = ({ children, type, itemId }: MentionProps) => {
  const client = useApolloClient()
  const [data, setData] = useState<TState>()
  const showMemberModal = useShowMemberModal((data as Member)?.id)
  const query = useCallback(
    (query: DocumentNode) => async (id: string) =>
      await client.query({
        query,
        variables: { id },
        fetchPolicy: 'cache-first',
      }),
    [client]
  )

  const getData = useCallback(() => {
    let document: DocumentNode
    switch (type) {
      case 'proposal': {
        document = GetProposalMentionDocument
        break
      }
      case 'proposalDiscussionEntry': {
        document = GetProposalDiscussionPostMentionDocument
        break
      }
      case 'forumThread': {
        document = GetForumThreadMentionDocument
        break
      }
      case 'forumPost': {
        document = GetForumPostMentionDocument
        break
      }
      case 'opening': {
        document = GetWorkingGroupOpeningMentionDocument
        break
      }
      case 'application': {
        document = GetWorkingGroupApplicationMentionDocument
        break
      }
      case 'member': {
        document = GetMemberMentionDocument
      }
    }
    return query(document)(itemId)
  }, [query, type])

  const onMount = useCallback(async () => {
    const { data } = await getData()
    switch (type) {
      case 'proposal': {
        const { proposal } = data as GetProposalMentionQuery
        return proposal && setData(asProposalMention(proposal))
      }
      case 'proposalDiscussionEntry': {
        const { proposalPost } = data as GetProposalDiscussionPostMentionQuery
        return proposalPost && setData(asProposalDiscussionPostMention(proposalPost))
      }
      case 'forumThread': {
        const { forumThread } = data as GetForumThreadMentionQuery
        return forumThread && setData(asForumThreadMention(forumThread))
      }
      case 'forumPost': {
        const { forumPost } = data as GetForumPostMentionQuery
        return forumPost && setData(asForumPostMention(forumPost))
      }
      case 'opening': {
        const { opening } = data as GetWorkingGroupOpeningMentionQuery
        return opening && setData(asWorkingGroupOpeningMention(opening))
      }
      case 'application': {
        const { application } = data as GetWorkingGroupApplicationMentionQuery
        return application && setData(asWorkingGroupApplicationMention(application))
      }
      case 'member': {
        const { membership } = data as GetMemberMentionQuery
        return membership && setData(asMember(membership))
      }
    }
  }, [query, type])

  const Icon = useMemo(() => {
    switch (type) {
      case 'proposalDiscussionEntry':
      case 'proposal': {
        return <ProposalsIcon />
      }
      case 'forumPost':
      case 'forumThread': {
        return <ForumIcon />
      }
      case 'member': {
        return <MyProfileIcon />
      }
      case 'opening': {
        return <WorkingGroupsIcon />
      }
      case 'application': {
        return <ApplicationIcon />
      }
    }
  }, [type])

  const UrlAddress = useMemo(() => {
    switch (type) {
      case 'proposalDiscussionEntry':
      case 'proposal': {
        return `${generatePath(ProposalsRoutes.preview, { id: itemId })}`
      }
      case 'forumPost':
      case 'forumThread': {
        return `${generatePath(ForumRoutes.thread, { id: itemId })}`
      }
      case 'member': {
        return 'members'
      }
      case 'opening': {
        return `${generatePath(WorkingGroupsRoutes.openingById, { id: itemId })}`
      }
      case 'application': {
        return `${generatePath(WorkingGroupsRoutes.upcomingOpenings, { id: itemId })}`
      }
    }
  }, [type])

  const Content = useMemo(() => {
    switch (type) {
      case 'proposal': {
        return <ProposalTooltip onMount={onMount} mention={data as ProposalMention} urlAddress={'#' + UrlAddress} />
      }
      case 'proposalDiscussionEntry': {
        return <ProposalDiscussionEntryTooltip onMount={onMount} mention={data as ProposalDiscussionPostMention} />
      }
      case 'forumThread': {
        return (
          <ForumThreadTooltip onMount={onMount} mention={data as ForumThreadMention} urlAddress={'#' + UrlAddress} />
        )
      }
      case 'forumPost': {
        return <ForumPostTooltip onMount={onMount} mention={data as ForumPostMention} />
      }
      case 'member': {
        return <MemberTooltip onMount={onMount} mention={data as Member} />
      }
      case 'opening': {
        return (
          <OpeningTooltip
            onMount={onMount}
            mention={data as WorkingGroupOpeningMention}
            urlAddress={'#' + UrlAddress}
          />
        )
      }
      case 'application': {
        return (
          <ApplicationTooltip
            onMount={onMount}
            mention={data as WorkingGroupApplicationMention}
            urlAddress={'#' + UrlAddress}
          />
        )
      }
    }
  }, [type, onMount, data])

  return (
    <Container id="mention-container">
      {Icon}
      <Tooltip popupContent={Content} forBig>
        {type === 'member' ? (
          <a onClick={showMemberModal}>
            <TextMedium as="span" black bold underline>
              {children}
            </TextMedium>
          </a>
        ) : (
          <a href={'#' + UrlAddress}>
            <TextMedium as="span" black bold underline>
              {children}
            </TextMedium>
          </a>
        )}
      </Tooltip>
    </Container>
  )
}

const Container = styled.div`
  vertical-align: bottom;
  display: inline-flex;
  column-gap: 5.33px;

  svg > path {
    fill: ${Colors.Blue[500]};
  }

  ${TextMedium} {
    cursor: pointer;
    &:hover {
      color: ${Colors.Blue[500]};
    }
  }
`
