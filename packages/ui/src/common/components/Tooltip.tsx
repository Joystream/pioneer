import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { BorderRad, Colors, Transitions } from '../constants'

import { PopupItem } from './animatedComponents/PopupItem'
import { QuestionIcon } from './icons'
import { LinkSymbol, LinkSymbolStyle } from './icons/symbols'

export interface TooltipProps {
  children: React.ReactNode
  position?: DOMRect
}

export interface TooltipPopupProps {
  className?: string
  tooltipText: string
  tooltipTitle?: string
  tooltipLinkText?: React.ReactNode
  tooltipLinkURL?: string
}

export const Tooltip = ({
  children,
  tooltipText,
  tooltipTitle,
  tooltipLinkText,
  tooltipLinkURL,
  className,
}: TooltipProps & TooltipPopupProps) => {
  const tooltipRef = React.useRef() as React.MutableRefObject<HTMLButtonElement>
  const tooltipPopupRef = React.useRef() as React.MutableRefObject<HTMLDivElement>
  const [isTooltipActive, setTooltipActive] = useState(false)
  const tooltipPosition = tooltipRef.current?.getBoundingClientRect()

  const showTooltip = () => {
    if (!isTooltipActive) {
      setTooltipActive(!isTooltipActive)
    }
  }
  const hideTooltip = () => {
    const hideTooltipDelay = setTimeout(() => {
      if (isTooltipActive) {
        setTooltipActive(!isTooltipActive)
      }
    }, Transitions.durationNumericXL)
    return () => clearTimeout(hideTooltipDelay)
  }

  const handlers = {
    onClick: showTooltip,
    onFocus: showTooltip,
    onBlur: hideTooltip,
    onMouseEnter: showTooltip,
    onMouseLeave: hideTooltip,
  }

  return (
    <TooltipContainer>
      <TooltipComponent ref={tooltipRef} {...handlers} z-index={0}>
        {children}
      </TooltipComponent>
      {isTooltipActive &&
        tooltipPosition &&
        ReactDOM.createPortal(
          <TooltipPopupContainer ref={tooltipPopupRef} className={className} position={tooltipPosition} {...handlers}>
            {tooltipTitle && <TooltipPopupTitle>{tooltipTitle}</TooltipPopupTitle>}
            <TooltipText>{tooltipText}</TooltipText>
            {tooltipLinkURL && (
              <TooltipLink href={tooltipLinkURL} target="_blank">
                {tooltipLinkText ?? 'Link'}
                <LinkSymbol />
              </TooltipLink>
            )}
          </TooltipPopupContainer>,
          document.body
        )}
    </TooltipContainer>
  )
}

export const TooltipDefault = () => {
  return (
    <DefaultTooltip>
      <QuestionIcon />
    </DefaultTooltip>
  )
}

const DefaultTooltip = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
  border: 1px solid ${Colors.Black[300]};
  border-radius: ${BorderRad.round};
  background-color: ${Colors.White};
  color: ${Colors.Black[500]};
  cursor: pointer;
  transition: ${Transitions.all};

  &:hover,
  &:focus {
    border-color: ${Colors.Blue[100]};
    color: ${Colors.Blue[500]};
    background-color: ${Colors.Black[100]};
  }
`

const initialPopupPosition = {
  left: 24,
  top: 4,
}

const TooltipPopupContainer = styled(PopupItem)<{ position: DOMRect }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  top: ${({ position }) => position.top + position.height + initialPopupPosition.top + 'px'};
  left: ${({ position }) => position.left + position.width / 2 - initialPopupPosition.left + 'px'};
  width: max-content;
  min-width: 160px;
  max-width: 304px;
  padding: 16px 24px;
  border: 1px solid ${Colors.Black[900]};
  background-color: ${Colors.Black[700]};
  border-radius: ${BorderRad.m};
  transition: ${Transitions.all};
  z-index: 55;

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

export const TooltipPopupTitle = styled.h6`
  color: ${Colors.Black[900]};
  margin-bottom: 10px;
  color: ${Colors.White};
`

export const TooltipText = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  color: ${Colors.Black[500]};
  color: ${Colors.Black[400]};
`

export const TooltipLink = styled.a`
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

export const TooltipComponent = styled.button`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  z-index: 5;

  svg {
    width: 100%;
    height: 100%;
    position: static;
  }
`

export const TooltipContainer = styled.div<{ absolute?: boolean }>`
  display: flex;
  position: ${({ absolute }) => (absolute ? 'absolute' : 'relative')};
  right: ${({ absolute }) => (absolute ? '-24px' : 'auto')};
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
  text-transform: none;
`
