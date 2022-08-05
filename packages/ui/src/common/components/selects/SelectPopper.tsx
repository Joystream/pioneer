import React, { forwardRef } from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'

import { ZIndex } from '@/common/constants'

interface SelectPopperProps {
  children: React.ReactNode
  anchorRect: DOMRect
}

export const SelectPopper = forwardRef(
  ({ children, anchorRect }: SelectPopperProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    return ReactDOM.createPortal(
      <DropdownPortal
        id="select-popper"
        ref={ref}
        anchorLeft={anchorRect.left}
        anchorBottom={anchorRect.bottom}
        anchorWidth={anchorRect.width}
      >
        {children}
      </DropdownPortal>,
      document.body
    )
  }
)

interface DropdownPortalProps {
  anchorBottom: number
  anchorLeft: number
  anchorWidth: number
}

const DropdownPortal = styled.div<DropdownPortalProps>`
  position: absolute;
  z-index: ${ZIndex.popover};
  ${({ anchorBottom, anchorLeft, anchorWidth }) => css`
    top: ${anchorBottom}px;
    left: ${anchorLeft}px;
    width: ${anchorWidth}px;
  `}
`
