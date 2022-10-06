import React, { useState } from 'react'
import styled from 'styled-components'

import { AlertRoundedIcon } from '@/common/components/icons'
import { Colors, Fonts } from '@/common/constants'
import { ForumPost } from '@/forum/types'
import { useShowMemberModal } from '@/memberships/hooks/useShowMemberModal'

interface Props {
  post: ForumPost
  children: React.ReactNode | React.ReactNode[]
}

export const ModeratedPostWrapper = ({ post, children }: Props) => {
  const { status, moderator } = post
  const [showOriginalPost, setShowOriginalPost] = useState(false)
  const showMemberModal = useShowMemberModal(moderator?.id || '')
  if (status !== 'PostStatusModerated') return <>{children}</>

  return (
    <StyledModeratedPostWrapper>
      <InfoContainer>
        <AlertRoundedIcon />
        This post was moderated
      </InfoContainer>
      <Moderated>
        <Moderator onClick={() => showMemberModal()}>{moderator?.handle}:</Moderator>
        <div>This post does not belong in this thread</div>
      </Moderated>
      {showOriginalPost ? children : null}
      <ShowOriginalPostButton type="button" onClick={() => setShowOriginalPost(!showOriginalPost)}>
        {showOriginalPost ? 'Hide' : 'Show'} original post
      </ShowOriginalPostButton>
    </StyledModeratedPostWrapper>
  )
}

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
  font-family: ${Fonts.Grotesk};
`

const Moderator = styled.div`
  &:hover {
    cursor: pointer;
    color: ${Colors.Blue[400]};
  }
`

const Moderated = styled.div`
  font-family: ${Fonts.Inter};
  font-style: normal;
  font-weight: 400;
  div {
    &:first-child {
      font-size: 12px;
      line-height: 18px;
    }

    &:nth-child(2) {
      font-size: 14px;
      line-height: 20px;
      color: ${Colors.Black[600]};
    }
  }
`

const StyledModeratedPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  border-left: 4px solid ${Colors.Orange[500]};
  background: ${Colors.Orange[50]};
  padding: 16px 24px;
`

const ShowOriginalPostButton = styled.button`
  text-decoration-line: underline;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  &:hover {
    cursor: pointer;
  }
`
