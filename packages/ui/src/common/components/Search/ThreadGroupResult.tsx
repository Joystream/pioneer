import React, { useState } from 'react'
import { generatePath } from 'react-router-dom'
import styled from 'styled-components'

import { CountBadge } from '@/common/components/CountBadge'
import { ArrowDownExpandedIcon, ArrowUpExpandedIcon } from '@/common/components/icons'
import { BreadcrumbsItem, BreadcrumbsItemLink } from '@/common/components/page/Sidebar/Breadcrumbs/BreadcrumbsItem'
import { BreadcrumbsListComponent } from '@/common/components/page/Sidebar/Breadcrumbs/BreadcrumbsList'
import { SearchResultItem } from '@/common/components/Search/SearchResultItem'
import { Colors, Fonts, Transitions } from '@/common/constants'
import { GroupedForumPost } from '@/common/hooks/useSearch'
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
          <ExpandIcon>{isExpanded ? <ArrowUpExpandedIcon /> : <ArrowDownExpandedIcon />}</ExpandIcon>
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
        <CountBadge count={postCount} />
      </ThreadGroupHeader>
      {isExpanded && (
        <ThreadGroupPosts>
          {group.posts.map((post) => (
            <SearchResultItem
              key={post.id}
              pattern={pattern}
              breadcrumbs={
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
              }
              to={`${generatePath(ForumRoutes.thread, { id: group.threadId })}?post=${post.id}`}
              title={group.threadTitle}
              onClick={onItemClick}
            >
              {post.text}
            </SearchResultItem>
          ))}
        </ThreadGroupPosts>
      )}
    </ThreadGroupContainer>
  )
}

const ThreadGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: solid 1px ${Colors.Black[200]};
  transition: ${Transitions.all};

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
`

const ExpandIcon = styled.div`
  display: flex;
  align-items: center;
  color: ${Colors.Black[400]};
  transition: ${Transitions.all};
`

const ThreadTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
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

const ThreadGroupPosts = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 32px;
  gap: 0;
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
