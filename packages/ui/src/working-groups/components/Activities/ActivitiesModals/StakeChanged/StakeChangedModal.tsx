import BN from 'bn.js'
import React from 'react'

import { StatusBadge } from '@/app/pages/WorkingGroups/components/StatusBadges'
import { CloseButton } from '@/common/components/buttons'
import { Loading } from '@/common/components/Loading'
import {
  EmptyBody,
  SidePane,
  SidePaneBody,
  SidePaneGlass,
  SidePaneHeader,
  SidePaneLabel,
  SidePanelTop,
  SidePaneRow,
  SidePaneTable,
  SidePaneText,
  SidePaneTitle,
} from '@/common/components/SidePane'
import { TokenValue } from '@/common/components/typography'

interface StakeChangedModalProps {
  onClose: () => void
  amount?: BN
  eventType?: 'StakeIncreasedEvent' | 'StakeDecreasedEvent'
  id?: string
}

export const StakeChangedModal = ({ onClose, amount, eventType, id }: StakeChangedModalProps) => {
  return (
    <SidePaneGlass onClick={onClose}>
      <SidePane topSize="xs">
        <SidePaneHeader>
          <SidePanelTop>
            <SidePaneTitle>
              Stake has been {eventType === 'StakeDecreasedEvent' ? 'reduced' : 'increased'}
            </SidePaneTitle>
            <CloseButton onClick={onClose} />
          </SidePanelTop>
        </SidePaneHeader>
        <SidePaneBody>
          {amount && eventType && id ? (
            <SidePaneTable>
              <SidePaneRow>
                <SidePaneLabel text="status" />
                <StatusBadge>{eventType === 'StakeDecreasedEvent' ? 'reduce' : 'increase'}</StatusBadge>
              </SidePaneRow>
              <SidePaneRow>
                <SidePaneLabel text="slashed by" />
                <SidePaneText>
                  <TokenValue value={amount} />
                </SidePaneText>
              </SidePaneRow>
              <SidePaneRow>
                <SidePaneLabel text="rationale" />
                <SidePaneText>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, deleniti, dolor voluptatibus nisi
                  iusto molestiae quo explicabo illo cum nostrum corrupti suscipit a atque aperiam aliquam nobis quidem,
                  architecto vitae?
                </SidePaneText>
              </SidePaneRow>
            </SidePaneTable>
          ) : (
            <EmptyBody>
              <Loading />
            </EmptyBody>
          )}
        </SidePaneBody>
      </SidePane>
    </SidePaneGlass>
  )
}
