import React from 'react'

import { ControlProps } from '@/common/components/forms'
import { CheckboxIcon } from '@/common/components/icons'
import { TabContainer, TabsContainer } from '@/common/components/Tabs'
import { VotingRound } from '@/proposals/hooks/useVotingRounds'
import { ProposalStatus } from '@/proposals/types'

export interface ProposalStagesProps extends ControlProps<number> {
  rounds: VotingRound[]
  status: ProposalStatus
  constitutionality?: number | string
}

export const ProposalStages = ({ rounds, status, constitutionality = '-', value, onChange }: ProposalStagesProps) => {
  const roundTabs = status === 'dormant' ? [...rounds, { approved: false }] : rounds
  return (
    <TabsContainer>
      {roundTabs.map(({ approved }, round) => {
        const disabled = round >= rounds.length
        const active = round === value
        const onClick = disabled ? () => null : () => onChange(round)
        return (
          <TabContainer key={round} active={active} disabled={disabled} onClick={onClick}>
            {approved && <CheckboxIcon />}
            <span>
              Council approvals {round + 1}/{constitutionality}
            </span>
          </TabContainer>
        )
      })}
    </TabsContainer>
  )
}
