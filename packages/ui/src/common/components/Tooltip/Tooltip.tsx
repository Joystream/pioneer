import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { usePopper } from 'react-popper'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { TextMedium } from '@/common/components/typography'

import { BorderRad, Colors, Fonts, Transitions, ZIndex } from '../../constants'
import { LinkSymbol, LinkSymbolStyle } from '../icons/symbols'

import { DefaultTooltip } from './TooltipDefault'

type TooltipPlacement = 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
export interface TooltipProps extends Omit<TooltipPopupProps, 'popUpHandlers' | 'position'> {
  absolute?: boolean
  maxWidth?: boolean
  placement?: TooltipPlacement
  children: React.ReactNode
}

export interface TooltipContentProp {
  tooltipText?: React.ReactNode
  tooltipTitle?: string
  tooltipLinkText?: React.ReactNode
  tooltipLinkURL?: string
}

export interface TooltipPopupProps extends TooltipContentProp {
  className?: string
  tooltipOpen?: boolean
  popupContent?: React.ReactNode
  offset?: [number, number]
  popUpHandlers: {
    onMouseEnter: () => void
    onMouseLeave: () => void
  }
  forBig?: boolean
  hideOnComponentLeave?: boolean
  boundaryClassName?: string
}

export interface DarkTooltipInnerItemProps {
  isOnDark?: boolean
}

export const Tooltip = ({
  absolute,
  maxWidth,
  placement,
  children,
  tooltipText,
  tooltipOpen = false,
  tooltipTitle,
  tooltipLinkText,
  tooltipLinkURL,
  popupContent,
  className,
  forBig,
  offset,
  hideOnComponentLeave,
  boundaryClassName,
}: TooltipProps) => {
  const [isTooltipActive, setTooltipActive] = useState(tooltipOpen)
  const [referenceElementRef, setReferenceElementRef] = useState<HTMLElement | null>(null)
  const [popperElementRef, setPopperElementRef] = useState<HTMLDivElement | null>(null)
  const [boundaryElement, setBoundaryElement] = useState<HTMLElement | null>(null)

  const { styles, attributes } = usePopper(referenceElementRef, popperElementRef, {
    placement: placement || 'bottom-start',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: offset ?? [0, 0],
        },
      },
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top-start'],
          boundary: boundaryElement ?? 'clippingParents',
        },
      },
    ],
  })

  useEffect(() => {
    if (boundaryClassName) {
      const boundary = Array.from(document.getElementsByClassName(boundaryClassName))
      if (boundary.length) {
        setBoundaryElement(boundary[0] as HTMLDivElement)
      }
    }
  }, [boundaryClassName])

  const mouseIsOver = () => {
    if (!tooltipOpen) {
      setTooltipActive(true)
    }
  }
  const mouseLeft = () => {
    if (!tooltipOpen) {
      setTooltipActive(false)
    }
  }

  const tooltipHandlers = {
    onClick: (event: React.MouseEvent<HTMLElement>) => {
      if (!tooltipOpen) {
        event.stopPropagation()
        setTooltipActive(false)
      }
    },
    onFocus: mouseIsOver,
    onBlur: mouseLeft,
    onPointerEnter: mouseIsOver,
    onPointerLeave: mouseLeft,
  }
  const popUpHandlers = {
    onPointerEnter: hideOnComponentLeave ? mouseLeft : mouseIsOver,
    onPointerLeave: mouseLeft,
  }

  const isExternalLink = () =>
    tooltipLinkURL && (tooltipLinkURL.startsWith('http://') || tooltipLinkURL.startsWith('https://'))

  return (
    <TooltipContainer absolute={absolute} maxWidth={maxWidth}>
      <TooltipComponent ref={setReferenceElementRef} {...tooltipHandlers} z-index={0} tabIndex={0} maxWidth={maxWidth}>
        {children}
      </TooltipComponent>
      {isTooltipActive &&
        (popupContent
          ? ReactDOM.createPortal(
              <TooltipPopupContainer
                ref={setPopperElementRef}
                className={className}
                style={styles.popper}
                {...attributes.popper}
                {...popUpHandlers}
                isTooltipActive={isTooltipActive}
                forBig={forBig}
              >
                {popupContent}
              </TooltipPopupContainer>,
              document.body
            )
          : ReactDOM.createPortal(
              <TooltipPopupContainer
                ref={setPopperElementRef}
                className={className}
                style={styles.popper}
                {...attributes.popper}
                {...popUpHandlers}
                isTooltipActive={isTooltipActive}
                forBig={forBig}
              >
                {tooltipTitle && <TooltipPopupTitle>{tooltipTitle}</TooltipPopupTitle>}
                <TooltipText>
                  {tooltipText}
                  {tooltipLinkURL &&
                    (isExternalLink() ? (
                      <TooltipExternalLink href={tooltipLinkURL} target="_blank">
                        <TextMedium>{tooltipLinkText ?? 'Link'}</TextMedium>
                        <LinkSymbol />
                      </TooltipExternalLink>
                    ) : (
                      <TooltipLink to={tooltipLinkURL} target="_blank">
                        <TextMedium>{tooltipLinkText ?? 'Link'}</TextMedium>
                        <LinkSymbol />
                      </TooltipLink>
                    ))}
                </TooltipText>
              </TooltipPopupContainer>,
              document.body
            ))}
    </TooltipContainer>
  )
}

export const TooltipPopupContainer = styled.div<{ isTooltipActive?: boolean; forBig?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  width: max-content;
  min-width: 160px;
  max-width: 304px;
  padding: 16px 24px;
  border: 1px solid ${Colors.Black[900]};
  background-color: ${Colors.Black[700]};
  border-radius: ${BorderRad.m};
  opacity: ${({ isTooltipActive }) => (isTooltipActive ? '1' : '0')};
  transition: opacity ${Transitions.duration} ease;
  z-index: ${ZIndex.tooltip};

  &:after {
    content: '';
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: ${Colors.Black[700]};
    border: 1px solid ${Colors.Black[900]};
    transform: rotate(45deg);
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

  &[data-popper-placement^='top'] {
    &:after {
      bottom: -4px;
      clip-path: polygon(100% 0, 100% 100%, 0 100%);
    }
  }
  &[data-popper-placement^='bottom'] {
    &:after {
      top: -4px;
      clip-path: polygon(100% 0, 0 0, 0 100%);
    }
  }
  &[data-popper-reference-hidden='true'] {
    visibility: hidden;
    pointer-events: none;
  }
  &[data-popper-placement='top-start']:after,
  &[data-popper-placement='bottom-start']:after {
    left: 19px;
  }
  &[data-popper-placement='top-end']:after,
  &[data-popper-placement='bottom-end']:after {
    right: 19px;
  }
  &[data-popper-placement='top-start'] {
    inset: ${({ forBig }) => (forBig ? 'auto auto 5px -13px !important' : 'auto auto 4px -16px !important')};
  }
  &[data-popper-placement='top-end'] {
    inset: ${({ forBig }) => (forBig ? 'auto -12px 5px auto !important' : 'auto -16px 4px auto !important')};
  }
  &[data-popper-placement='bottom-start'] {
    inset: ${({ forBig }) => (forBig ? '5px auto auto -13px !important' : '4px auto auto -16px !important')};
  }
  &[data-popper-placement='bottom-end'] {
    inset: ${({ forBig }) => (forBig ? '5px -12px auto auto !important' : '4px -16px auto auto !important')};
  }
`

export const TooltipPopupTitle = styled.h6`
  color: ${Colors.Black[900]};
  margin-bottom: 10px;
  color: ${Colors.White};
`

export const TooltipText = styled.div`
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  color: ${Colors.Black[500]};
  color: ${Colors.Black[400]};
  /* copied global styles for p: */
  margin: 0;
  padding: 0;
  font-family: ${Fonts.Inter};
`

export const TooltipLink = styled(Link)<{ to: string; target: string }>`
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
  text-transform: capitalize;

  ${LinkSymbolStyle} {
    width: 12px;
    height: 12px;

    path {
      fill: ${Colors.Black[300]};
    }
  }

  &:hover {
    color: ${Colors.Blue[500]};

    ${LinkSymbolStyle} {
      path {
        fill: ${Colors.Blue[500]};
      }
    }
  }
`

export const TooltipExternalLink = styled.a<{
  href: string | undefined
  target: string
}>`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 8px;
  margin-top: 10px;
  align-items: center;
  width: fit-content;
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
  color: ${Colors.Black[400]};
  transition: ${Transitions.all};
  text-transform: capitalize;

  ${LinkSymbolStyle} {
    width: 12px;
    height: 12px;

    path {
      fill: ${Colors.Black[300]};
    }
  }

  &:hover {
    color: ${Colors.Blue[500]};

    ${LinkSymbolStyle} {
      path {
        fill: ${Colors.Blue[500]};
      }
    }
  }
`

export const TooltipComponent = styled.i<{ maxWidth?: boolean }>`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  font-style: normal;
  background-color: transparent;
  padding: 0;
  width: ${({ maxWidth }) => (maxWidth ? '100%' : 'initial')};

  &:hover,
  &:focus {
    ${DefaultTooltip} {
      color: ${Colors.Blue[500]};
      border-color: ${Colors.Blue[100]};
      background-color: ${Colors.Black[100]};
    }
  }
`

export const TooltipContainer = styled.span<{ absolute?: boolean; maxWidth?: boolean }>`
  display: inline-flex;
  position: ${({ absolute }) => (absolute ? 'absolute' : 'relative')};
  right: ${({ absolute }) => (absolute ? '-24px' : 'auto')};
  justify-content: center;
  align-items: center;
  width: ${({ maxWidth }) => (maxWidth ? '100%' : 'fit-content')};
  height: fit-content;
  text-transform: none;
`
