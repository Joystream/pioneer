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
import { MentionType } from '@/common/hooks/useMentions'
import { CouncilRoutes } from '@/council/constants'
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
import { groupIdToURLParam } from '@/working-groups/model/workingGroupName'
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
      case MentionType.Proposal: {
        document = GetProposalMentionDocument
        break
      }
      case MentionType.ProposalPost: {
        document = GetProposalDiscussionPostMentionDocument
        break
      }
      case MentionType.ForumThread: {
        document = GetForumThreadMentionDocument
        break
      }
      case MentionType.ForumPost: {
        document = GetForumPostMentionDocument
        break
      }
      case MentionType.Opening: {
        document = GetWorkingGroupOpeningMentionDocument
        break
      }
      case MentionType.Application: {
        document = GetWorkingGroupApplicationMentionDocument
        break
      }
      case MentionType.Member: {
        document = GetMemberMentionDocument
        break
      }
      default: {
        return
      }
    }
    return query(document)(itemId)
  }, [query, type])

  const onMount = useCallback(async () => {
    const data = (await getData())?.data
    switch (type) {
      case MentionType.Proposal: {
        const { proposal } = data as GetProposalMentionQuery
        return proposal && setData(asProposalMention(proposal))
      }
      case MentionType.ProposalPost: {
        const { proposalPost } = data as GetProposalDiscussionPostMentionQuery
        return proposalPost && setData(asProposalDiscussionPostMention(proposalPost))
      }
      case MentionType.ForumThread: {
        const { forumThread } = data as GetForumThreadMentionQuery
        return forumThread && setData(asForumThreadMention(forumThread))
      }
      case MentionType.ForumPost: {
        const { forumPost } = data as GetForumPostMentionQuery
        return forumPost && setData(asForumPostMention(forumPost))
      }
      case MentionType.Opening: {
        const { opening } = data as GetWorkingGroupOpeningMentionQuery
        return opening && setData(asWorkingGroupOpeningMention(opening))
      }
      case MentionType.Application: {
        const { application } = data as GetWorkingGroupApplicationMentionQuery
        return application && setData(asWorkingGroupApplicationMention(application))
      }
      case MentionType.Member: {
        const { membership } = data as GetMemberMentionQuery
        return membership && setData(asMember(membership))
      }
    }
  }, [query, type])

  const Icon = useMemo(() => {
    switch (type) {
      case MentionType.ProposalPost:
      case MentionType.Proposal: {
        return <ProposalsIcon />
      }
      case MentionType.ForumPost:
      case MentionType.ForumThread: {
        return <ForumIcon />
      }
      case MentionType.Member:
      case MentionType.Role: {
        return <MyProfileIcon />
      }
      case MentionType.Opening: {
        return <WorkingGroupsIcon />
      }
      case MentionType.Application: {
        return <ApplicationIcon />
      }
    }
  }, [type])

  const UrlAddress = useMemo(() => {
    switch (type) {
      case MentionType.ProposalPost:
      case MentionType.Proposal: {
        return `${generatePath(ProposalsRoutes.preview, { id: itemId })}`
      }
      case MentionType.ForumPost:
      case MentionType.ForumThread: {
        return `${generatePath(ForumRoutes.thread, { id: itemId })}`
      }
      case MentionType.Member: {
        return 'members'
      }
      case MentionType.Role: {
        const [role, groupId] = itemId.split('_')
        if (groupId) {
          return generatePath(WorkingGroupsRoutes.group, { name: groupIdToURLParam(groupId) })
        }
        switch (role) {
          case 'council':
            return generatePath(CouncilRoutes.council)

          case 'leads':
            return generatePath(WorkingGroupsRoutes.groups)

          default:
            return
        }
      }
      case MentionType.Opening: {
        return `${generatePath(WorkingGroupsRoutes.openingById, { id: itemId })}`
      }
      case MentionType.Application: {
        return `${generatePath(WorkingGroupsRoutes.upcomingOpenings, { id: itemId })}`
      }
    }
  }, [type])

  const Popup = useMemo(() => {
    switch (type) {
      case MentionType.Proposal: {
        return <ProposalTooltip onMount={onMount} mention={data as ProposalMention} urlAddress={'#' + UrlAddress} />
      }
      case MentionType.ProposalPost: {
        return <ProposalDiscussionEntryTooltip onMount={onMount} mention={data as ProposalDiscussionPostMention} />
      }
      case MentionType.ForumThread: {
        return (
          <ForumThreadTooltip onMount={onMount} mention={data as ForumThreadMention} urlAddress={'#' + UrlAddress} />
        )
      }
      case MentionType.ForumPost: {
        return <ForumPostTooltip onMount={onMount} mention={data as ForumPostMention} />
      }
      case MentionType.Role: {
        return
      }
      case MentionType.Member: {
        return <MemberTooltip onMount={onMount} mention={data as Member} />
      }
      case MentionType.Opening: {
        return (
          <OpeningTooltip
            onMount={onMount}
            mention={data as WorkingGroupOpeningMention}
            urlAddress={'#' + UrlAddress}
          />
        )
      }
      case MentionType.Application: {
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

  const label = useMemo(
    () => (
      <TextMedium as="span" black bold underline>
        {children}
      </TextMedium>
    ),
    [children]
  )

  const content = useMemo(() => {
    switch (type) {
      case MentionType.Member:
        return (
          <Tooltip popupContent={Popup} forBig>
            <a onClick={showMemberModal}>{label}</a>
          </Tooltip>
        )

      case MentionType.Role:
        return <a href={UrlAddress && `#${UrlAddress}`}>{label}</a>

      default:
        return (
          <Tooltip popupContent={Popup} forBig>
            <a href={'#' + UrlAddress}>{label}</a>
          </Tooltip>
        )
    }
  }, [type, Popup, label, showMemberModal])

  return (
    <Container id="mention-container">
      {Icon}
      {content}
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
