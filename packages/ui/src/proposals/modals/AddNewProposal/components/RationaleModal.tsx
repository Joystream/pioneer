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
import { useEscape } from '@/common/hooks/useEscape'

interface RationaleModalProps {
  closeModal: () => void
}

export const RationaleModal = ({ closeModal }: RationaleModalProps) => {
  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      closeModal()
    }
  }

  useEscape(() => closeModal())

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
                <TextMedium lighter>
                  The purpose of rationale is for council and community to understand the implications on the platform,
                  reasons behind the proposals and actions to be taken. Keep it short and snappy. Write in short
                  sentences and stick to 2-3 sentences per section.{' '}
                </TextMedium>
              </Row>
              <Row>
                <h4>1. Concrete Desired Outcome</h4>
                <TextMedium lighter>
                  Start with the desired outcomes of this proposal. What are you trying to achieve? How exactly and in
                  what way will this impact the platform and the community?
                </TextMedium>
              </Row>
              <Row>
                <h4>2. Reason</h4>
                <TextMedium lighter>
                  Good to set the background, specify the reason for this proposal. What problem does it solve? Why did
                  this become a problem?
                </TextMedium>
              </Row>
              <Row>
                <h4>3. Action Plan</h4>
                <TextMedium lighter>
                  Explain how you suggest to solve the problem and achieved desired outcomes. What resources, timing and
                  community effort is required to solve it?
                </TextMedium>
              </Row>
              <Row>
                <h4>4. Alternative Solutions</h4>
                <TextMedium lighter>
                  Have you considered any alternative solutions? How to solve this problem if this proposal is rejected?
                </TextMedium>
              </Row>
              <Row>
                <h4>5. What can go wrong</h4>
                <TextMedium lighter>
                  List possible issues and risks to achieve the desired outcomes, if this proposal is accepted.
                </TextMedium>
              </Row>
            </RowGapBlock>
          </SidePaneTable>
        </SidePaneBody>
      </SidePane>
    </SidePaneGlass>
  )
}
