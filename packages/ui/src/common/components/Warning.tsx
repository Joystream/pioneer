import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { CloseButton } from '@/common/components/buttons'
import { InfoBannerIcon } from '@/common/components/icons/InfoBannerIcon' 
import { Colors } from '@/common/constants'
import { useToggle } from '@/common/hooks/useToggle'

import { RowGapBlock } from './page/PageContent'
import { TextBig, TextMedium } from './typography'

export interface WarningProps {
  withIcon?:boolean
  title?: string
  content?: ReactNode
  button?: ReactNode
  description?: string
  isClosable?: boolean
}

export const Warning = ({ withIcon, title, content, button, description, isClosable }: WarningProps) => {
  const [isOpened, toggleOpen] = useToggle(true)

  if (!isOpened) {
    return null
  }

  return (
    <WarningBlock gap={8}>
      {isClosable !== false && <StyledCloseButton onClick={toggleOpen} />}
      {title && (<TitleWrapper>
        {withIcon && (<InfoBannerIcon />)}
        <TextBig bold>{title}</TextBig>
      </TitleWrapper>)}
      {content && <TextMedium light>{content}</TextMedium>}
      {button && description &&(<DescriptionWrapper>
        {button}
        <TextMedium>{description}</TextMedium>
      </DescriptionWrapper>)}
    </WarningBlock>
  )
}

const WarningBlock = styled(RowGapBlock)`
  background-color: ${Colors.Red[50]};
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

export const DescriptionWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  margin-top:16px;
`
export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  margin-bottom : 8px
`