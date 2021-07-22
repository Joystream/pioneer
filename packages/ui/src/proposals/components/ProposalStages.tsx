import React, { useMemo } from 'react'

import { ControlProps } from '@/common/components/forms'
import { CheckboxIcon, CrossIcon } from '@/common/components/icons'
import { TabContainer, TabsContainer } from '@/common/components/Tabs'
import { last, repeat } from '@/common/utils'
import { ProposalStatus, ProposalStatusUpdates } from '@/proposals/types'

export interface ProposalStagesProps extends ControlProps<number> {
  status: ProposalStatus
  updates: ProposalStatusUpdates[]
  constitutionality?: number | string
}

export const ProposalStages = ({ status, updates, constitutionality = '-', value, onChange }: ProposalStagesProps) => {
  const rounds = useMemo(() => {
    const decidingCount = updates.filter(({ status }) => status === 'deciding').length
    const lastUpdate = last(updates).status
    const onGoing = lastUpdate === status
    const approved = lastUpdate === 'gracing'
    const rejected = !onGoing && !approved
    const isDeciding = onGoing && status === 'deciding'
    const isDormant = onGoing && status === 'dormant'
    return [
      ...repeat((round) => ({ icon: <CheckboxIcon />, onClick: () => onChange(round) }), decidingCount - 1),
      ...(approved || isDormant ? [{ icon: <CheckboxIcon />, onClick: () => onChange(decidingCount - 1) }] : []),
      ...(lastUpdate === 'dormant' ? [{ icon: undefined, onClick: undefined }] : []),
      ...(isDeciding ? [{ icon: <CheckboxIcon />, onClick: () => onChange(decidingCount - 1) }] : []),
      ...(rejected ? [{ icon: <CrossIcon />, onClick: () => onChange(decidingCount - 1) }] : []),
    ]
  }, [updates.length, status])

  return (
    <TabsContainer>
      {rounds.map(({ icon, onClick }, round) => (
        <TabContainer key={round} active={round === value} disabled={!onClick} onClick={onClick}>
          {icon}
          <span>
            Council approvals {round + 1}/{constitutionality}
          </span>
        </TabContainer>
      ))}
    </TabsContainer>
  )
}
