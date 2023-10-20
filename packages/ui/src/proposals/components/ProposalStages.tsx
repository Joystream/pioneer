import { last } from 'lodash'
import React, { useMemo } from 'react'

import { ControlProps } from '@/common/components/forms'
import { CheckboxIcon, CrossIcon } from '@/common/components/icons'
import { TabContainer, TabsContainer } from '@/common/components/Tabs'
import { Tooltip } from '@/common/components/Tooltip'
import { repeat } from '@/common/utils'
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

    const latestUpdate = last(updates)?.status
    const onGoing = !latestUpdate || latestUpdate === status
    const approved = latestUpdate === 'gracing'
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
        const icon = iconMap[roundState]
        const onClick = isDisabled ? undefined : () => onChange(round)
        const tooltipText = isDisabled
          ? 'This tab will become available with the next elected council. More precisely, when this proposal enters the deciding stage with the next council.'
          : 'This proposal must undergo the voting of multiple consequent councils. The result of each council vote will be displayed in the separate tabs. For the proposal to be approved, each of the councils must approve it.'

        return (
          <Tooltip key={round} tooltipText={tooltipText}>
            <TabContainer key={round} active={isActive} disabled={isDisabled} onClick={onClick}>
              {icon}
              <span>Round {round + 1}</span>
            </TabContainer>
          </Tooltip>
        )
      })}
    </TabsContainer>
  )
}
