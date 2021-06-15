import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { CloseButton } from '@/common/components/buttons'
import { Colors } from '@/common/constants'
import { useToggle } from '@/common/hooks/useToggle'
import { size, spacing } from '@/common/utils/styles'

import { RowGapBlock } from './page/PageContent'
import { TextMedium } from './typography'

export interface WarningProps {
  title: string
  content: ReactNode
  isClosable?: boolean
}

export const Warning = ({ title, content, isClosable }: WarningProps) => {
  const [isOpened, toggleOpen] = useToggle(true)

  if (!isOpened) {
    return null
  }

  return (
    <WarningBlock gap={8}>
      {isClosable !== false && <StyledCloseButton onClick={toggleOpen} />}
      <h5>{title}</h5>
      <TextMedium light>{content}</TextMedium>
    </WarningBlock>
  )
}

const WarningBlock = styled(RowGapBlock)`
  background-color: ${Colors.Red[50]};
  position: relative;
  padding: ${spacing(2)};
`

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  top: 8px;
  right: 8px;
  ${size('16px')};
`
