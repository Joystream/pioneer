import { isString } from 'lodash'
import React from 'react'
import styled from 'styled-components'

import { Colors, Fonts, Transitions } from '../constants'

import { CopyButton } from './buttons'

export interface CopyComponentProps {
  altText?: React.ReactNode
  copyText?: string
  disabled?: boolean
  className?: any
}

export const CopyComponent = React.memo(({ copyText, altText = copyText, disabled, className }: CopyComponentProps) => {
  return (
    <CopyGroup className={className} disabled={disabled}>
      {isString(altText) ? <CopyText>{altText}</CopyText> : altText}
      <CopyButton textToCopy={copyText} disabled={disabled} />
    </CopyGroup>
  )
})

export const CopyGroup = styled.div<{ disabled?: boolean }>`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-column-gap: 8px;
  width: fit-content;
  height: fit-content;
  font-family: ${Fonts.Inter};
  font-size: 12px;
  line-height: 18px;
  color: ${({ disabled }) => (disabled ? Colors.Black[300] : Colors.Black[400])};
  transition: ${Transitions.all};
`

export const CopyText = styled.span`
  max-width: 100%;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  color: inherit;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-feature-settings: 'tnum';
`
