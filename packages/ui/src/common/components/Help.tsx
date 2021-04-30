import React from 'react'
import styled from 'styled-components'

import { Animations, BorderRad, Colors, Transitions, Fonts } from '../constants'

import { QuestionIcon } from './icons'
import { LinkSymbol, LinkSymbolStyle } from './icons/symbols'

export interface HelpNotificationProps {
  helperText: string
  helperTitle?: string
  helperLinkText?: React.ReactNode
  helperLinkURL?: string
  size?: 'm' | 'l'
  icon?: React.ReactElement
  memberRole?: string
  className?: string
  absolute?: boolean
}

export const Help = React.memo(
  ({
    helperText,
    helperTitle,
    helperLinkText,
    helperLinkURL,
    icon,
    memberRole,
    size,
    className,
    absolute,
  }: HelpNotificationProps) => (
    <HelpContainer absolute={absolute}>
      <HelpComponent size={size} className={className} memberRole={memberRole}>
        {!memberRole && icon && icon}
        {!memberRole && !icon && <QuestionIcon />}
        {memberRole && !icon && memberRole}
      </HelpComponent>
      <HelpPopup size={size}>
        {helperTitle && <HelpPopupTitle>{helperTitle}</HelpPopupTitle>}
        <HelperText>{helperText}</HelperText>
        {helperLinkURL && (
          <HelperLink href={helperLinkURL} target="_blank">
            {helperLinkText ? helperLinkText : 'Link'}
            <LinkSymbol />
          </HelperLink>
        )}
      </HelpPopup>
    </HelpContainer>
  )
)

const HelpPopup = styled.div<{ size?: 'm' | 'l' }>`
  display: none;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  top: ${({ size }) => {
    switch (size) {
      case 'l':
        return '28px'
      case 'm':
      default:
        return '20px'
    }
  }};
  left: ${({ size }) => {
    switch (size) {
      case 'l':
        return '-12px'
      case 'm':
      default:
        return '-16px'
    }
  }};
  width: max-content;
  min-width: 160px;
  max-width: 304px;
  padding: 16px 24px;
  border: 1px solid ${Colors.Black[900]};
  background-color: ${Colors.Black[700]};
  border-radius: ${BorderRad.m};
  transition: ${Transitions.all};
  visibility: hidden;
  z-index: 55;
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
    z-index: 1;
  }
  &:before {
    content: '';
    position: absolute;
    left: -8px;
    top: -8px;
    width: calc(100% + 16px);
    height: calc(100% + 16px);
    z-index: -1;
  }
  &:hover {
    display: flex;
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

export const HelpComponent = styled.span<{ size?: 'm' | 'l'; memberRole?: string }>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: ${({ size }) => {
    switch (size) {
      case 'l':
        return '24px'
      case 'm':
      default:
        return '16px'
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'l':
        return '24px'
      case 'm':
      default:
        return '16px'
    }
  }};
  border: 1px solid ${({ memberRole }) => (memberRole ? 'transparent' : Colors.Black[300])};
  border-radius: ${BorderRad.round};
  background-color: transparent;
  color: ${Colors.Black[500]};
  font-size: ${({ size }) => {
    switch (size) {
      case 'l':
        return '10px'
      case 'm':
      default:
        return '6px'
    }
  }};
  line-height: 1;
  font-family: ${Fonts.Inter};
  font-weight: 700;
  cursor: pointer;
  transition: ${Transitions.all};
  z-index: 5;

  svg {
    width: 100%;
    height: 100%;
    position: static;
  }
`

export const HelpContainer = styled.div<{ absolute?: boolean }>`
  display: flex;
  position: ${({ absolute }) => (absolute ? 'absolute' : 'relative')};
  right: ${({ absolute }) => (absolute ? '-24px' : 'auto')};
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
  text-transform: none;

  &:hover,
  &:focus {
    ${HelpComponent} {
      color: ${Colors.Blue[500]};
      background-color: ${Colors.Black[100]};
    }
    ${HelpPopup} {
      display: flex;
    }
  }
`
