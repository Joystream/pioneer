import React from 'react'

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
import { useModal } from '@/common/hooks/useModal'
import { ModalCall } from '@/common/providers/modal/types'

export type RationaleModalCall = ModalCall<'RationaleModal'>

export const RationaleModal = React.memo(() => {
  const { hideModal } = useModal<RationaleModalCall>()

  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      hideModal()
    }
  }

  return (
    <SidePaneGlass onClick={onBackgroundClick}>
      <SidePane topSize="s">
        <SidePaneHeader>
          <SidePanelTop>
            <SidePaneTitle>How to write a good rationale?</SidePaneTitle>
            <CloseButton onClick={hideModal} />
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
})
