import React, { useCallback } from 'react'

import { StatisticItem, Statistics, TokenValueStat } from '../../../common/components/statistics'
import { TextBig } from '../../../common/components/typography'
import { capitalizeFirstLetter } from '../../../common/helpers'
import { useModal } from '../../../common/hooks/useModal'
import { MemberInfo } from '../../../memberships/components'
import { MemberModalCall } from '../../../memberships/components/MemberProfile'
import { SlashLeadDetails } from '../../types/ProposalDetails'

import { ProposalPropertiesContent } from './ProposalDetails'

interface Props {
  details: SlashLeadDetails
}
export const SlashLeadComponent: ProposalPropertiesContent<'slashWorkingGroupLead'> = ({ details }: Props) => {
  const { showModal } = useModal()
  const member = details.member
  const showMemberModal = useCallback(() => {
    member && showModal<MemberModalCall>({ modal: 'Member', data: { id: member.id } })
  }, [member?.id])

  return (
    <Statistics>
      <StatisticItem title="Working Group">
        <TextBig>{capitalizeFirstLetter(details.groupName)}</TextBig>
      </StatisticItem>
      <StatisticItem title="Worker ID">
        {member ? <MemberInfo member={member} onClick={showMemberModal} showGroup /> : <TextBig>Unknown</TextBig>}
      </StatisticItem>
      <TokenValueStat title="Slashing Amount" value={details.amount} />
    </Statistics>
  )
}
