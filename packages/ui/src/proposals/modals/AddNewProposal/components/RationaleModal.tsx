import React, { useEffect } from 'react'

import { CloseButton } from '@/common/components/buttons'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import {
  SidePane,
  SidePaneBody,
  SidePaneGlass,
  SidePaneHeader,
  SidePanelTop,
  SidePaneTable,
  SidePaneTitle,
} from '@/common/components/SidePane'
import { TextMedium } from '@/common/components/typography'

interface RationaleModalProps {
  closeModal: () => void
}

export const RationaleModal = ({ closeModal }: RationaleModalProps) => {
  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  useEffect(() => {
    const escapeEvent = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal()
      }
    }
    document.addEventListener('keydown', escapeEvent)

    return () => document.removeEventListener('keydown', escapeEvent)
  }, [])
  return (
    <SidePaneGlass onClick={onBackgroundClick}>
      <SidePane topSize="s">
        <SidePaneHeader>
          <SidePanelTop>
            <SidePaneTitle>How to write a good rationale?</SidePaneTitle>
            <CloseButton onClick={closeModal} />
          </SidePanelTop>
        </SidePaneHeader>
        <SidePaneBody>
          <SidePaneTable>
            <RowGapBlock gap={24}>
              <Row>
                <h4>1. Header Big</h4>
                <TextMedium lighter>
                  Paragraph big. Will one day be essential for ensuring that the petabytes of media items uploaded to
                  Joystream are formatted correctly and comprehensively monitored and moderated. Our current testnet
                  allows this content monitoring to take place by giving users who are selected for the role
                  administrative access to the Joystream content directory to make changes where necessary.
                </TextMedium>
              </Row>
              <Row>
                <h4>2. Header Big</h4>
                <TextMedium lighter>
                  Paragraph big. Will one day be essential for ensuring that the petabytes of media items uploaded to
                  Joystream are formatted correctly and comprehensively monitored and moderated. Our current testnet
                  allows this content monitoring to take place by giving users who are selected for the role
                  administrative access to the Joystream content directory to make changes where necessary.
                </TextMedium>
              </Row>
            </RowGapBlock>
          </SidePaneTable>
        </SidePaneBody>
      </SidePane>
    </SidePaneGlass>
  )
}
