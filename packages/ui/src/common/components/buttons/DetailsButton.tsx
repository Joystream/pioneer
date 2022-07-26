import React from 'react'
import styled from 'styled-components'

import { BorderRad, Colors, Transitions } from '@/common/constants'

import { TextSmall } from '../typography'

export interface DetailsButtonProps {
  onClick: () => void
  icon: React.ReactNode
  disabled?: boolean
  titleText: string
  subtitleText: string
  withoutBackground?: boolean
  dangerText?: boolean
}

export const DetailsButton = ({
  onClick,
  icon,
  disabled,
  titleText,
  subtitleText,
  withoutBackground,
  dangerText,
}: DetailsButtonProps) => {
  return (
    <DetailsButtonWrapper onClick={onClick} disabled={disabled}>
      <ImageWrapper>
        <IconWrapper withoutBackground={withoutBackground}>{icon}</IconWrapper>
      </ImageWrapper>
      <TitleText dangerText={dangerText}>{titleText}</TitleText>
      <SubtitleText>{subtitleText}</SubtitleText>
    </DetailsButtonWrapper>
  )
}

const ImageWrapper = styled.span`
  display: flex;
  grid-area: createicon;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: ${BorderRad.round};
  background-color: ${Colors.Black[700]};
  color: ${Colors.Black[75]};
  transition: ${Transitions.all};

  .nav-icon {
    .whitePart {
      transition: ${Transitions.all};
    }
    .primaryPart {
      fill: ${Colors.Blue[500]};
      transition: ${Transitions.all};
    }
  }
`
const IconWrapper = styled.div<{ withoutBackground?: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: ${BorderRad.round};
  background-color: ${({ withoutBackground }) => (withoutBackground ? '' : Colors.Black[75])};
`

const TitleText = styled.h6<{ dangerText?: boolean }>`
  grid-area: createtitle;
  color: ${({ dangerText }) => (dangerText ? Colors.Red[400] : Colors.Black[75])};
  transition: ${Transitions.all};
`

const SubtitleText = styled(TextSmall)`
  grid-area: createtext;
  color: ${Colors.Black[400]};
  transition: ${Transitions.all};
`

const DetailsButtonWrapper = styled.button`
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-template-rows: 20px 18px;
  grid-template-areas:
    'createicon createtitle'
    'createicon createtext';
  grid-column-gap: 8px;
  grid-row-gap: 4px;
  justify-content: start;
  justify-items: start;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  border-radius: ${BorderRad.s};
  transition: ${Transitions.all};
  cursor: pointer;

  &:hover,
  &:focus {
    outline: none;
    background-color: ${Colors.Black[600]};

    ${ImageWrapper} {
      background-color: ${Colors.Black[500]};
      color: ${Colors.Black[50]};
    }
    ${TitleText} {
      color: ${Colors.Black[50]};
    }
    ${SubtitleText} {
      color: ${Colors.Black[300]};
    }
  }
`
