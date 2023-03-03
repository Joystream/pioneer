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
  constitutionality?: number
}

type RoundState = 'approved' | 'rejected' | 'deciding' | 'disabled'
const iconMap = { approved: <CheckboxIcon />, rejected: <CrossIcon />, deciding: undefined, disabled: undefined }

export const ProposalStages = ({ status, updates, constitutionality, value, onChange }: ProposalStagesProps) => {
  const roundStates: RoundState[] = useMemo(() => {
    // `decidingCount` is ("deciding updates" + 1) because the first deciding stage isn't included in updates
    const decidingCount = updates.filter(({ status }) => status === 'deciding').length + 1

    const lastUpdate = last(updates).status
    const onGoing = lastUpdate === status
    const approved = lastUpdate === 'gracing'
    const rejected = !onGoing && !approved
    const isDormant = onGoing && status === 'dormant'

    return repeat((round) => {
      if (round < decidingCount - 1) {
        return 'approved'
      } else if (round > decidingCount - 1) {
        return 'disabled'
      } else if (isDormant || approved) {
        return 'approved'
      } else if (rejected) {
        return 'rejected'
      } else {
        return 'deciding'
      }
    }, constitutionality ?? 1)
  }, [updates.length, status, constitutionality])

  return (
    <TabsContainer>
      {roundStates.map((roundState, round) => {
        const isDisabled = roundState === 'disabled'
        const isActive = round === value
        const onClick = isDisabled
          ? undefined
          : () => {
              return onChange(round)
            }
        const icon = iconMap[roundState]
        return (
          <Tooltip
            key={round}
            tooltipText={
              !isDisabled
                ? 'This proposal must undergo the voting of multiple consequent councils. The result of each council vote will be displayed in the separate tabs. For the proposal to be approved, each of the councils must approve it.'
                : 'The number of councils in that must approve the proposal in a row before it has its intended effect is more than one. The overall execution of proposal will be triggered after the last council completes the voting. Outcomes of each council voting is displayed in a separate tab.'
            }
          >
            <TabContainer key={round} active={isActive} disabled={isDisabled} onClick={onClick}>
              {icon}
              <span>
                Council approvals {round + 1}/{constitutionality}
              </span>
            </TabContainer>
          </Tooltip>
        )
      })}
    </TabsContainer>
  )
}
