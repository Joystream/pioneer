import React from 'react'
import styled from 'styled-components'

import { ProgressBar } from '@/common/components/Progress'
import { TextBig, TextSmall } from '@/common/components/typography'
import { BorderRad, Overflow, Shadows } from '@/common/constants'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'

interface Props {
  member: Member
  label?: string
  stakePercent?: number
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
      {stakePercent && (
        <ProgressWrapper>
          <ProgressBar end={stakePercent} size="big" />
          <TextSmall bold>{`${Math.floor(stakePercent * 100)}%`}</TextSmall>
        </ProgressWrapper>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 215px;
  height: 145px;
  padding: 16px;
  border-radius: ${BorderRad.m};
  box-shadow: ${Shadows.light};
`

const Label = styled(TextBig)`
  margin-top: 20px;
  ${Overflow.DotsTwoLine};
`

const ProgressWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 36px;
  column-gap: 6px;
`
