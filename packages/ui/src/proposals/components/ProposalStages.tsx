import React, { useMemo } from 'react'

import { ControlProps } from '@/common/components/forms'
import { CheckboxIcon, CrossIcon } from '@/common/components/icons'
import { TabContainer, TabsContainer } from '@/common/components/Tabs'
import { last, repeat } from '@/common/utils'
import { ProposalStatus, ProposalStatusUpdates } from '@/proposals/types'

import { Tooltip } from ''

import styled, { css } from 'styled-components'

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

    console.log(status);

    return [
      ...repeat((round) => ({ icon: <CheckboxIcon />, onClick: () => onChange(round) }), decidingCount - 1),
      {
        icon: !isDeciding && (rejected ? <CrossIcon /> : <CheckboxIcon />),
        onClick: () => onChange(decidingCount - 1),
      },
      ...(isDormant ? [{ icon: false, onClick: undefined }] : []),
    ]
  }, [updates.length, status])

  return (
    <TabsContainer>
      {rounds.map(({ icon, onClick }, round) => (
        <Tooltip tooltipText={ round !==value ? "This proposal must undergo the voting of multiple consequent councils. The result of each council vote will be displayed in the separate tabs. For the proposal to be approved, each of the councils must approve it.":""}>
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

