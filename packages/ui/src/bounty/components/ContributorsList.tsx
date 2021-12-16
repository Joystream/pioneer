import BN from 'bn.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { ArrowUpExpandedIcon } from '@/common/components/icons'
import { ArrowDownIcon } from '@/common/components/icons/ArrowDownIcon'
import { Badge, TokenValue, TextSmall, TextExtraSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { MemberInfo } from '@/memberships/components'
import { Member } from '@/memberships/types'

interface Contribution {
  actor: Member
  amount: BN
}

export interface ContributorsListProps {
  contributions: Contribution[]
}

export const ContributorsList = ({ contributions }: ContributorsListProps) => {
  const [show, setShow] = useState(true)
  const handleOnClick = useCallback(() => setShow((show) => !show), [setShow])
  return (
    <div>
      <Header>
        <TitleText bold>CONTRIBUTORS </TitleText>
        <Counter inverted>{contributions.length}</Counter>
        <ArrowWrapper onClick={handleOnClick}>
          {show ? <ArrowUpExpandedIcon /> : <ArrowDownIcon />}
        </ArrowWrapper>
      </Header>
      {show
        ? contributions.map((el, index) => (
            <Wrapper key={index}>
              <MemberInfo member={el.actor} />
              <ValueText>
                Contributed <TokenValue value={el.amount.toNumber()} />
              </ValueText>
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
  color: ${Colors.Black[400]};
`

const ArrowWrapper = styled.span`
  cursor: pointer;
  & path {
    fill: ${Colors.Black[600]};
  }
`

const Counter = styled(BadgeStatus)`
  text-align: center;
  padding: 0;
  margin: 0 10px;
`

const ValueText = styled(TextSmall)`
  margin: 8px 0 0 48px;
  color: ${Colors.Black[400]};
`
