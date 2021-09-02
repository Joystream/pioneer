import React, { memo, useState } from 'react'
import styled, { css } from 'styled-components'

import { ButtonGhost, ButtonInnerWrapper } from '@/common/components/buttons'
import { HeartIcon } from '@/common/components/icons'
import { Colors, Transitions } from '@/common/constants'

export interface LikeButtonProps {
  liked?: boolean
  disabled?: boolean
  counter: number
}

export const LikeButton = memo(({ liked, disabled, counter }: LikeButtonProps) => {
  const [isLiked, setLiked] = useState(liked ?? false)

  return (
    <LikeButtonStyles
      title="Like this post"
      size="small"
      isLiked={isLiked}
      disabled={disabled}
      onClick={() => (!disabled ? setLiked(!isLiked) : true)}
    >
      <HeartIcon className="heartIcon" />
      {counter > 0 || disabled ? counter : ''}
    </LikeButtonStyles>
  )
})

const LikeButtonStyles = styled(ButtonGhost)<{ isLiked?: boolean; disabled?: boolean }>`
  ${ButtonInnerWrapper} > .heartIcon {
    color: ${({ isLiked }) => isLiked && Colors.Blue[500]};
  }

  .heartInnerFill {
    transition: ${Transitions.all};
    fill: ${({ isLiked }) => (isLiked ? Colors.Blue[500] : 'transparent')};
  }

  ${({ disabled, isLiked }) =>
    !disabled
      ? css`
          &:hover,
          &:focus {
            .heartInnerFill {
              fill: ${isLiked ? Colors.Blue[500] : Colors.Blue[200]};
            }
          }
        `
      : css`
          pointer-events: none;
        `}
`
