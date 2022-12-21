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
  eventType?: 'StakeIncreasedEvent' | 'StakeDecreasedEvent' | 'StakeSlashedEvent'
  id?: string
}

const actions = {
  StakeIncreasedEvent: { past: 'increased', badge: 'increase' },
  StakeDecreasedEvent: { past: 'decreased', badge: 'decrease' },
  StakeSlashedEvent: { past: 'slashed', badge: 'slash' },
}

export const StakeChangedModal = ({ onClose, amount, eventType, id }: StakeChangedModalProps) => {
  useEscape(() => onClose())
  const slashingRationaleInfo = '' // hidden until needed
  const action = eventType ? actions[eventType] : { past: 'changes', badge: 'change' }

  return (
    <SidePaneGlass onClick={onClose}>
      <SidePane topSize="xs">
        <SidePaneHeader>
          <SidePanelTop>
            <SidePaneTitle>Stake has been {action.past}</SidePaneTitle>
            <CloseButton onClick={onClose} />
          </SidePanelTop>
        </SidePaneHeader>
        <SidePaneBody>
          {eventType && id ? (
            <SidePaneTable>
              <SidePaneRow>
                <SidePaneLabel text="action" />
                <StatusBadge>{action.badge}</StatusBadge>
              </SidePaneRow>
              {amount && (
                <SidePaneRow>
                  <SidePaneLabel text="amount" />
                  <SidePaneText>
                    <TokenValue value={amount} />
                  </SidePaneText>
                </SidePaneRow>
              )}
              {slashingRationaleInfo.length > 0 && (
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
