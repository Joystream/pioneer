import React from 'react'
import styled from 'styled-components'

import { TableListItem } from '@/common/components/List'
import { TextBig, TokenValue } from '@/common/components/typography'
import { CouncilColLayout } from '@/council/constants/styles'
import { Councilor } from '@/council/types'
import { MemberInfo } from '@/memberships/components'
import { useShowMemberModal } from '@/memberships/hooks/useShowMemberModal'

export interface CouncilListItemProps {
  councilor: Pick<Councilor, 'unpaidReward' | 'stake' | 'member' | 'numberOfTerms' | 'voterStake'>
}
export const CouncilListItem = ({ councilor }: CouncilListItemProps) => {
  const showMemberModal = useShowMemberModal(councilor.member.id)
  return (
    <CouncilListItemStyles onClick={showMemberModal}>
      <MemberInfo member={councilor.member} />

      <TextBig as="h5" bold>
        <TokenValue value={councilor.unpaidReward} />
      </TextBig>

      <TextBig as="h5" bold>
        <TokenValue value={councilor.voterStake} />
      </TextBig>

      <TextBig as="h5" bold>
        {councilor.numberOfTerms}
      </TextBig>
    </CouncilListItemStyles>
  )
}

const CouncilListItemStyles = styled(TableListItem).attrs({ $colLayout: CouncilColLayout })`
  cursor: pointer;
  height: 72px;
  padding: 16px 58px 16px 24px;

  & > :nth-child(n + 2) {
    justify-self: end;
  }
`
