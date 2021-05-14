import React, { useRef } from 'react'
import styled from 'styled-components'

interface SidePanelProps extends SidePanelStylesProps {
  className?: string
  children?: React.ReactNode
}

interface SidePanelStylesProps {
  neighborHeight?: number
  ownHeight?: number
  neighbor?: React.MutableRefObject<HTMLDivElement | null>
}

export const SidePanel = ({ neighbor, className, children }: SidePanelProps) => {
  const ownRef = useRef<HTMLDivElement>(null)
  return (
    <SidePanelStyles
      ref={ownRef}
      neighbor={neighbor}
      neighborHeight={neighbor?.current?.getBoundingClientRect().height}
      ownHeight={ownRef.current ? ownRef?.current?.getBoundingClientRect()?.top : 0}
      className={className}
    >
      {children}
    </SidePanelStyles>
  )
}

export const SidePanelStyles = styled.aside<SidePanelStylesProps>`
  display: grid;
  position: absolute;
  top: 0;
  right: 0;
  grid-template-columns: 1fr;
  width: 100%;
  max-width: 280px;
  height: fit-content;
  max-height: max(100%, ${(props) => (props.ownHeight ? screen.height - props.ownHeight + 24 + 'px' : '0')});
  padding-left: 24px;
  overflow: hidden;
  overflow-y: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  &:after {
    content: '';
    height: 24px;
  }
`
