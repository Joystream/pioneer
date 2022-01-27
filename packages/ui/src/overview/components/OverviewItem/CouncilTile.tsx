import BN from 'bn.js'
import React from 'react'
import styled from 'styled-components'

import { ProgressBar } from '@/common/components/Progress'
import { TextBig } from '@/common/components/typography'
import { BorderRad, Shadows } from '@/common/constants'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'

interface Props {
  member: Member
  label?: string
  stakePercent?: BN
}

export const CouncilTile = ({ member, label, stakePercent }: Props) => {
  return (
    <Wrapper>
      <MemberInfo member={member} />
      {label && (
        <Label bold black value>
          {label}
        </Label>
      )}
      {stakePercent && <ProgressBar end={stakePercent.toNumber()} size="big" />}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 16px 60px 16px 16px;
  border-radius: ${BorderRad.m};
  box-shadow: ${Shadows.light};
`

const Label = styled(TextBig)`
  margin-top: 20px;
  white-space: nowrap;
`
