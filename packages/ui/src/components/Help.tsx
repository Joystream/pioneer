import React from 'react'
import styled from 'styled-components'
import { BorderRad, Colors, Transitions } from '../constants'
import { QuestionIcon } from './icons'

interface HelpNotificationProps {
  helperText: string
}

export function Help({ helperText }: HelpNotificationProps) {
  return (
    <HelpComponent>
      <QuestionIcon />
      <HelpPopup>{helperText}</HelpPopup>
    </HelpComponent>
  )
}

const HelpPopup = styled.p`
  display: none;
  position: absolute;
  left: calc(100% + 8px);
  width: max-content;
  max-width: 250px;
  padding: 12px;
  border: 1px solid ${Colors.Black[100]};
  background-color: ${Colors.White};
  border-radius: ${BorderRad.s};
  font-weight: 400;
  font-size: 10px;
  line-height: 14px;
  color: ${Colors.Black[400]};
  transition: ${Transitions.all};
  visibility: hidden;
  animation: showHelperNotificationText 0.25s ease;
  animation-delay: 0.25s;
  animation-fill-mode: forwards;
  z-index: 10;

  @keyframes showHelperNotificationText {
    from { opacity: 0;
    transform: translateX(-8px);
    visibility: hidden;
  }
  to {
    visibility: visible;
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
  background-color: ${Colors.Blue[50]};
  color: ${Colors.Blue[500]};
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
    color: ${Colors.Blue[400]};

    ${HelpPopup} {
      display: flex;
    }
  }
`
