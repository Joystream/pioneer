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
import { useEscape } from '@/common/hooks/useEscape'

interface StakeChangedModalProps {
  onClose: () => void
  amount?: BN
  eventType?: 'StakeIncreasedEvent' | 'StakeDecreasedEvent'
  id?: string
}

export const StakeChangedModal = ({ onClose, amount, eventType, id }: StakeChangedModalProps) => {
  useEscape(() => onClose())
  const slashingRationaleInfo = '' // hidden until needed

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
              {false && (
                <SidePaneRow>
                  <SidePaneLabel text="rationale" />
                  <SidePaneText>{slashingRationaleInfo}</SidePaneText>
                </SidePaneRow>
              )}
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
