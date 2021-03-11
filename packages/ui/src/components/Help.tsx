import React from 'react'
import styled from 'styled-components'
import { Animations, BorderRad, Colors, Transitions } from '../constants'
import { QuestionIcon } from './icons'
import { LinkSymbol, LinkSymbolStyle } from './icons/symbols/LinkSymbol'

interface HelpNotificationProps {
  helperText: string
  helperTitle?: string
  helperLinkText?: string | React.ReactElement | React.ReactNode
  helperLinkURL?: string
}

export const Help = React.memo(({ helperText, helperTitle, helperLinkText, helperLinkURL }: HelpNotificationProps) => (
  <HelpComponent>
    <QuestionIcon />
    <HelpPopup>
      {helperTitle && <HelpPopupTitle>{helperTitle}</HelpPopupTitle>}
      <HelperText>{helperText}</HelperText>
      {helperLinkURL && (
        <HelperLink href={helperLinkURL} target="_blank">
          {helperLinkText ? helperLinkText : 'Link'}
          <LinkSymbol />
        </HelperLink>
      )}
    </HelpPopup>
  </HelpComponent>
))

const HelpPopup = styled.div`
  display: none;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  top: 24px;
  left: -16px;
  width: max-content;
  min-width: 160px;
  max-width: 304px;
  padding: 16px 24px;
  border: 1px solid ${Colors.Black[900]};
  background-color: ${Colors.Black[700]};
  border-radius: ${BorderRad.m};
  transition: ${Transitions.all};
  visibility: hidden;
  z-index: 10;
  ${Animations.showHelperTooltip};

  &:after {
    content: '';
    position: absolute;
    left: 19px;
    top: -4px;
    width: 8px;
    height: 8px;
    background-color: ${Colors.Black[700]};
    border: 1px solid ${Colors.Black[900]};
    transform: rotate(45deg);
    clip-path: polygon(100% 0, 0 0, 0 100%);
  }
`

export const HelpPopupTitle = styled.h6`
  color: ${Colors.Black[900]};
  margin-bottom: 10px;
  color: ${Colors.White};
`

export const HelperText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  color: ${Colors.Black[500]};
  color: ${Colors.Black[400]};
`

export const HelperLink = styled.a`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  align-items: center;
  width: fit-content;
  margin-top: 10px;
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
  color: ${Colors.Black[400]};
  transition: ${Transitions.all};

  ${LinkSymbolStyle} {
    width: 12px;
    height: 12px;
    .blackPart,
    .primaryPart {
      fill: ${Colors.Black[300]};
    }
  }

  &:hover {
    color: ${Colors.Blue[500]};

    ${LinkSymbolStyle} {
      .blackPart,
      .primaryPart {
        fill: ${Colors.Blue[500]};
      }
    }
  }
`

export const HelpComponent = styled.button`
  display: flex;
  position: absolute;
  right: -8px;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: ${BorderRad.round};
  background-color: ${Colors.Black[75]};
  color: ${Colors.Black[500]};
  cursor: pointer;
  transform: translate(100%);
  transition: ${Transitions.all};
  z-index: 5;

  svg {
    width: 100%;
    height: 100%;
    position: static;
  }

  &:hover,
  &:focus {
    color: ${Colors.Blue[500]};

    ${HelpPopup} {
      display: flex;
    }
  }
`
