import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { CloseButton } from '@/common/components/buttons'
import { Colors } from '@/common/constants'
import { useToggle } from '@/common/hooks/useToggle'

import { AlertSymbol, InfoSymbol } from './icons/symbols'
import { RowGapBlock } from './page/PageContent'
import { TextMedium } from './typography'

export interface WarningProps {
  title?: string
  content?: ReactNode
  isClosable?: boolean
  additionalContent?: ReactNode
  icon?: 'alert' | 'info'
  isYellow?: boolean
}

export const Warning = ({ title, content, isClosable, additionalContent, icon, isYellow }: WarningProps) => {
  const [isOpened, toggleOpen] = useToggle(true)

  if (!isOpened) {
    return null
  }

  return (
    <WarningBlock gap={8} isYellow={isYellow}>
      {isClosable !== false && <StyledCloseButton onClick={toggleOpen} />}
      {(icon || title) && (
        <HeaderWrapper>
          {icon === 'alert' && <AlertSymbol />}
          {icon === 'info' && <InfoSymbol />}
          {title ? <h5>{title}</h5> : content}
        </HeaderWrapper>
      )}
      {title && content && (
        <TextMedium as="div" inter light>
          {content}
        </TextMedium>
      )}
      {additionalContent}
    </WarningBlock>
  )
}

const WarningBlock = styled(RowGapBlock)<{ isYellow?: boolean }>`
  background-color: ${({ isYellow }) => (isYellow ? Colors.Warning[50] : Colors.Red[50])};
  position: relative;
  padding: 16px;
`

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 16px;
  height: 16px;
`

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`
