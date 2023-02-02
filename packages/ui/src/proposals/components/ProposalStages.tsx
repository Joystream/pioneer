import React, { useMemo } from 'react'

import { ControlProps } from '@/common/components/forms'
import { CheckboxIcon, CrossIcon } from '@/common/components/icons'
import { TabContainer, TabsContainer } from '@/common/components/Tabs'
import { Tooltip } from '@/common/components/Tooltip'
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

    const totalRoundCount = typeof constitutionality === 'string' ? undefined : constitutionality

    const lastUpdate = last(updates).status
    const onGoing = lastUpdate === status
    const approved = lastUpdate === 'gracing'
    const rejected = !onGoing && !approved
    const isDeciding = onGoing && status === 'deciding'
    const isDormant = onGoing && status === 'dormant'

    return [
      ...repeat((round) => ({ icon: <CheckboxIcon />, onClick: () => onChange(round) }), decidingCount - 1),
      {
        icon: !isDeciding && (rejected ? <CrossIcon /> : <CheckboxIcon />),
        onClick: () => onChange(decidingCount - 1),
      },
      ...(isDormant
        ? repeat(
          () => ({ icon: false, onClick: undefined }),
          totalRoundCount !== undefined ? totalRoundCount - decidingCount - 1 : 1
        )
        : []),
    ]
  }, [updates.length, status, constitutionality])


  return (
    <TabsContainer>
      {rounds.map(({ icon, onClick }, round) => (
        <Tooltip
          tooltipText={
            round !== value
              ? 'This proposal must undergo the voting of multiple consequent councils. The result of each council vote will be displayed in the separate tabs. For the proposal to be approved, each of the councils must approve it.'
              : 'The number of councils in that must approve the proposal in a row before it has its intended effect is more than one. The overall execution of proposal will be triggered after the last council completes the voting. Outcomes of each council voting is displayed in a separate tab.'
          }
        >
          <TabContainer key={round} active={round === value} disabled={!onClick} onClick={onClick}>
            {icon}
            <span>
              Council approvals {round + 1}/{constitutionality}
            </span>
          </TabContainer>
        </Tooltip>
      ))}
    </TabsContainer>
  )
}
