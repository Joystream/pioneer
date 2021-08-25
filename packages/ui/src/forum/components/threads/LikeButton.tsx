import React, { memo, useState } from 'react'
import styled from 'styled-components'

import { ButtonGhost, ButtonInnerWrapper } from '@/common/components/buttons'
import { HeartIcon } from '@/common/components/icons'
import { Colors, Transitions } from '@/common/constants'

export interface LikeButtonProps {
  liked?: boolean
  counter: number
}

export const LikeButton = memo(({ liked, counter }: LikeButtonProps) => {
  const [isLiked, setLiked] = useState(liked ?? false)

  return (
    <LikeButtonStyles size="small" isLiked={isLiked} onClick={() => setLiked(!isLiked)}>
      <HeartIcon className="heartIcon" />
      {counter > 0 ? counter : ''}
    </LikeButtonStyles>
  )
})

const LikeButtonStyles = styled(ButtonGhost)<{ isLiked?: boolean }>`
  ${ButtonInnerWrapper} > .heartIcon {
    color: ${({ isLiked }) => isLiked && Colors.Blue[500]};
  }

  .heartInnerFill {
    transition: ${Transitions.all};
    fill: ${({ isLiked }) => (isLiked ? Colors.Blue[500] : 'transparent')};
  }

  &:hover,
  &:focus {
    .heartInnerFill {
      fill: ${({ isLiked }) => (isLiked ? Colors.Blue[500] : Colors.Blue[200])};
    }
  }
`
