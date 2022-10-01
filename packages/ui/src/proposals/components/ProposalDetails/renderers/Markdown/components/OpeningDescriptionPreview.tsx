import { styled } from '@storybook/theming'
import React from 'react'

import { CloseButton } from '@/common/components/buttons'
import { MarkdownPreview } from '@/common/components/MarkdownPreview'
import {
  SidePane,
  SidePaneBody,
  SidePaneGlass,
  SidePaneHeader,
  SidePanelTop,
  SidePaneTitle,
} from '@/common/components/SidePane'
import { useEscape } from '@/common/hooks/useEscape'

interface DescriptionPreviewProps {
  onClose: () => void
  description: string
}

export const OpeningDescriptionPreview = ({ onClose, description }: DescriptionPreviewProps) => {
  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  useEscape(() => onClose())

  return (
    <SidePaneGlass onClick={onBackgroundClick}>
      <SidePane topSize="s">
        <SidePaneHeader>
          <SidePanelTop>
            <SidePaneTitle>Signal Description</SidePaneTitle>
            <CloseButton onClick={onClose} />
          </SidePanelTop>
        </SidePaneHeader>
        <SidePaneBody>
          <DescriptionContainer>
            <MarkdownPreview markdown={description} />
          </DescriptionContainer>
        </SidePaneBody>
      </SidePane>
    </SidePaneGlass>
  )
}

const DescriptionContainer = styled.div`
  padding: 12px 24px;
`
