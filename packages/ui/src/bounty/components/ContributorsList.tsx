import BN from 'bn.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'

import { CountBadge } from '@/common/components/CountBadge'
import { ArrowUpExpandedIcon } from '@/common/components/icons'
import { ArrowDownIcon } from '@/common/components/icons/ArrowDownIcon'
import { TokenValue, TextSmall, TextExtraSmall } from '@/common/components/typography'
import { Colors, Fonts } from '@/common/constants'
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
        <TitleText lighter bold>
          CONTRIBUTORS{' '}
        </TitleText>
        <CountBadge count={contributions.length} />
        <ArrowWrapper onClick={handleOnClick}>{show ? <ArrowUpExpandedIcon /> : <ArrowDownIcon />}</ArrowWrapper>
      </Header>
      {show
        ? contributions.map((el, index) => (
            <Wrapper key={index}>
              <MemberInfo member={el.actor} />
              <ValueText lighter>
                Contributed
                <Amount value={el.amount.toNumber()} />
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

const Amount = styled(TokenValue)`
  margin-left: 12px;
  color: ${Colors.Black[700]};
  font-size: 16px;
  font-family: ${Fonts.Grotesk};
`
