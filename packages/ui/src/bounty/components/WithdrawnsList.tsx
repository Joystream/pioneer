import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import { CountBadge } from '@/common/components/CountBadge'
import { ArrowUpExpandedIcon } from '@/common/components/icons'
import { ArrowDownIcon } from '@/common/components/icons/ArrowDownIcon'
import { TextSmall, TextExtraSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'

interface Withdrawn {
  actor: Member
}

export interface WithdrawnsListProps {
  withdrawns: Withdrawn[]
}

export const WithdrawnsList = ({ withdrawns }: WithdrawnsListProps) => {
  const [show, setShow] = useState(true)
  const handleOnClick = useCallback(() => setShow((show) => !show), [setShow])
  return (
    <div>
      <Header>
        <TitleText lighter bold>
          WITHDRAWNS{' '}
        </TitleText>
        <CountBadge count={withdrawns.length} />
        <ArrowWrapper onClick={handleOnClick}>{show ? <ArrowUpExpandedIcon /> : <ArrowDownIcon />}</ArrowWrapper>
      </Header>
      {show
        ? withdrawns.map((el, index) => (
            <Wrapper key={index}>
              <MemberInfo member={el.actor} />
              <ValueText lighter>Work withdrawn</ValueText>
            </Wrapper>
          ))
        : null}
    </div>
  )
}

const Wrapper = styled.div`
  margin-bottom: 18px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`

const TitleText = styled(TextExtraSmall)`
  margin-right: 8px;
`

const ArrowWrapper = styled.span`
  margin-left: 10px;
  cursor: pointer;
  & path {
    fill: ${Colors.Black[600]};
  }
`

const ValueText = styled(TextSmall)`
  margin: 8px 0 0 48px;
`
