import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import { Animations, BorderRad, Colors, Transitions } from '../../constants'
import { PopupItem } from '../animatedComponents/PopupItem'
import { LinkSymbol, LinkSymbolStyle } from '../icons/symbols'

import { DefaultTooltip } from './TooltipDefault'

export interface TooltipProps extends Omit<TooltipPopupProps, 'popUpHandlers' | 'position'> {
  absolute?: boolean
  children: React.ReactNode
}

export interface TooltipPopupProps {
  className?: string
  tooltipText?: string
  tooltipTitle?: string
  tooltipLinkText?: React.ReactNode
  tooltipLinkURL?: string
  popupContent?: React.ReactNode
  position: DOMRect
  popUpHandlers: {
    onMouseEnter: () => void
    onMouseLeave: () => void
  }
}

export interface DarkTooltipInnerItemProps {
  isOnDark?: boolean
}

const { setTimeout, clearTimeout } = window

export const Tooltip = ({
  absolute,
  children,
  tooltipText,
  tooltipTitle,
  tooltipLinkText,
  tooltipLinkURL,
  popupContent,
  className,
}: TooltipProps) => {
  const tooltipRef = useRef<HTMLButtonElement>(null)
  const timeoutRef = useRef<number>()
  const [isTooltipActive, setTooltipActive] = useState(false)
  const [isForceActive, setForceActive] = useState(false)
  const [isOver, setOver] = useState(false)

  useEffect(() => {
    clearTimeout(timeoutRef.current)

    if (isOver) {
      timeoutRef.current = setTimeout(() => setTooltipActive(true), Transitions.durationNumericS)
    } else {
      timeoutRef.current = setTimeout(() => setTooltipActive(false), Transitions.durationNumericS)
    }

    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [isOver])

  const tooltipPosition = tooltipRef.current?.getBoundingClientRect()
  const isTooltipVisible = isForceActive || isTooltipActive

  const mouseIsOver = () => setOver(true)
  const mouseLeft = () => setOver(false)

  const tooltipHandlers = {
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation()
      setTooltipActive(false)
      setForceActive((active) => !active)
    },
    onFocus: mouseIsOver,
    onBlur: mouseLeft,
    onMouseEnter: mouseIsOver,
    onMouseLeave: mouseLeft,
  }
  const popUpHandlers = {
    onMouseEnter: mouseIsOver,
    onMouseLeave: mouseLeft,
  }

  return (
    <TooltipContainer absolute={absolute}>
      <TooltipComponent ref={tooltipRef} {...tooltipHandlers} z-index={0}>
        {children}
      </TooltipComponent>
      {isTooltipVisible && tooltipPosition && (
        <TooltipPopup
          className={className}
          position={tooltipPosition}
          popUpHandlers={popUpHandlers}
          tooltipTitle={tooltipTitle}
          tooltipText={tooltipText}
          tooltipLinkURL={tooltipLinkURL}
          tooltipLinkText={tooltipLinkText}
          popupContent={popupContent}
        />
      )}
    </TooltipContainer>
  )
}

const TooltipPopup = (props: TooltipPopupProps) => {
  const {
    tooltipLinkText,
    tooltipText,
    position,
    tooltipLinkURL,
    tooltipTitle,
    className,
    popUpHandlers,
    popupContent,
  } = props

  if (popupContent) {
    return ReactDOM.createPortal(
      <TooltipPopupContainer className={className} position={position} {...popUpHandlers}>
        {popupContent}
      </TooltipPopupContainer>,
      document.body
    )
  }

  return ReactDOM.createPortal(
    <TooltipPopupContainer className={className} position={position} {...popUpHandlers}>
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
  )
}

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
  ${Animations.showTooltip};

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
  z-index: 50;

  &:hover,
  &:focus {
    ${DefaultTooltip} {
      color: ${Colors.Blue[500]};
      border-color: ${Colors.Blue[100]};
      background-color: ${Colors.Black[100]};
    }
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
