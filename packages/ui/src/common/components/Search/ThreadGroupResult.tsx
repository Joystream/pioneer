import React, { useState } from 'react'
import { generatePath } from 'react-router-dom'
import styled from 'styled-components'

import { CountBadge } from '@/common/components/CountBadge'
import { BreadcrumbsItem, BreadcrumbsItemLink } from '@/common/components/page/Sidebar/Breadcrumbs/BreadcrumbsItem'
import { BreadcrumbsListComponent } from '@/common/components/page/Sidebar/Breadcrumbs/BreadcrumbsList'
import { SearchResultItem } from '@/common/components/Search/SearchResultItem'
import { Colors, Fonts, Transitions } from '@/common/constants'
import { GroupedForumPost } from '@/common/hooks/useSearch'
import { relativeIfRecent } from '@/common/model/relativeIfRecent'
import { ForumRoutes } from '@/forum/constant'
import { useForumMultiQueryCategoryBreadCrumbs } from '@/forum/hooks/useForumMultiQueryCategoryBreadCrumbs'

interface ThreadGroupResultProps {
  group: GroupedForumPost
  pattern: RegExp | null
  onItemClick: () => void
}

export const ThreadGroupResult = ({ group, pattern, onItemClick }: ThreadGroupResultProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const postCount = group.posts.length
  const { breadcrumbs } = useForumMultiQueryCategoryBreadCrumbs(group.categoryId)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <ThreadGroupContainer>
      <ThreadGroupHeader onClick={toggleExpanded}>
        <ThreadGroupHeaderContent>
          <ExpandIcon isExpanded={isExpanded}>
            <CountBadge count={postCount} />
          </ExpandIcon>
          <ThreadTitle>
            <SearchBreadcrumbs>
              <BreadcrumbsItem url={ForumRoutes.forum} isLink>
                Forum
              </BreadcrumbsItem>
              {breadcrumbs.map(({ id, title }) => (
                <BreadcrumbsItem key={id} url={generatePath(ForumRoutes.category, { id })} isLink>
                  {title}
                </BreadcrumbsItem>
              ))}
              <BreadcrumbsItem url={generatePath(ForumRoutes.thread, { id: group.threadId })} isLink>
                {group.threadTitle}
              </BreadcrumbsItem>
            </SearchBreadcrumbs>
            <ThreadTitleText>{group.threadTitle}</ThreadTitleText>
          </ThreadTitle>
        </ThreadGroupHeaderContent>
      </ThreadGroupHeader>
      <ThreadGroupPostsContainer>
        <ThreadGroupPosts>
          {group.posts.map((post, position) =>
            !isExpanded && position > 0 ? null : (
              <SearchResultItem
                key={post.id}
                pattern={pattern}
                author={post.author?.handle || 'Unknown'}
                date={relativeIfRecent(post.createdAt)}
                to={`${generatePath(ForumRoutes.thread, { id: group.threadId })}?post=${post.id}`}
                onClick={onItemClick}
              >
                {post.text}
              </SearchResultItem>
            )
          )}
        </ThreadGroupPosts>
      </ThreadGroupPostsContainer>
    </ThreadGroupContainer>
  )
}

const ThreadGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: solid 1px ${Colors.Black[200]};
  transition: ${Transitions.all};
  overflow-x: hidden;
  min-width: 0;

  &:hover {
    border-color: ${Colors.Blue[100]};
  }
`

const ThreadGroupHeader = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: ${Transitions.all};
  width: 100%;
`

const ThreadGroupHeaderContent = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 8px;
  min-width: 0;
`

const ExpandIcon = styled.div<{ isExpanded: boolean }>`
  display: flex;
  align-items: center;
  color: ${Colors.Black[400]};
  transition: ${Transitions.all};
  opacity: ${({ isExpanded }) => (isExpanded ? 0.7 : 1)};
`

const ThreadTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
`

const ThreadTitleText = styled.h5`
  margin: 0;
  color: ${Colors.Black[900]};
  font-weight: 600;
  transition: ${Transitions.all};

  ${ThreadGroupHeader}:hover & {
    color: ${Colors.Blue[500]};
  }
`

const ThreadGroupPostsContainer = styled.div`
  overflow: hidden;
  transition: max-height 250ms ease-in-out;
  will-change: max-height;
`

const ThreadGroupPosts = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 32px;
  gap: 0;
  overflow-x: hidden;
  min-width: 0;
`

const SearchBreadcrumbs = styled(BreadcrumbsListComponent)`
  ${BreadcrumbsItemLink} {
    &,
    &:visited {
      color: ${Colors.Black[400]};
      font-family: ${Fonts.Grotesk};
      &:last-child {
        color: ${Colors.Black[500]};
      }
    }
  }
`
