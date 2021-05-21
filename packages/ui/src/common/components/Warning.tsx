import React from 'react'
import styled from 'styled-components'

import { CloseButton } from '@/common/components/buttons'
import { Colors } from '@/common/constants'
import { useToggle } from '@/common/hooks/useToggle'
import { size, spacing } from '@/common/utils/styles'

export interface WarningProps {
  title: string
  content: string
  isClosable?: boolean
}

export const Warning = ({ title, content, isClosable }: WarningProps) => {
  const [isOpened, toggleOpen] = useToggle(true)

  if (!isOpened) {
    return null
  }

  return (
    <WarningBlock>
      {isClosable !== false && <StyledCloseButton onClick={toggleOpen} />}
      <h5>{title}</h5>
      <p>{content}</p>
    </WarningBlock>
  )
}

const WarningBlock = styled.div`
  background-color: ${Colors.Red[50]};
  position: relative;
  padding: ${spacing(2)};
  color: ${Colors.Black[600]};

  h5 {
    margin-bottom: ${spacing(1)};
  }
`

const StyledCloseButton = styled(CloseButton)`
  position: absolute;
  top: 10px;
  right: 10px;
  ${size('16px')}
`
