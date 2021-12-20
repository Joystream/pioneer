import React from 'react'
import styled from 'styled-components'

import { BountyActorItem, EntrantResult } from '@/bounty/types/Bounty'
import { CountBadge } from '@/common/components/CountBadge'
import { ArrowUpExpandedIcon } from '@/common/components/icons'
import { ArrowDownIcon } from '@/common/components/icons/ArrowDownIcon'
import { TokenValue, TextSmall, TextExtraSmall, TextBig } from '@/common/components/typography'
import { Colors, Fonts } from '@/common/constants'
import { useToggle } from '@/common/hooks/useToggle'
import { MemberInfo } from '@/memberships/components'

import { Infobox } from './Infobox'

export interface BountyActorsListProps {
  title: 'CONTRIBUTORS' | 'ENTRANTS' | 'WITHDRAWN'
  elements: BountyActorItem[]
  entrantResult?: EntrantResult
  open?: boolean
}

export const BountyActorsList = ({ title, elements, entrantResult, open = true }: BountyActorsListProps) => {
  const [isVisible, toggleVisibility] = useToggle(open)

  return (
    <>
      <Header>
        <TitleText lighter bold>
          {title}{' '}
        </TitleText>
        <CountBadge count={elements.length} />
        <ArrowWrapper data-testid={`${title}-EXPAND`} onClick={toggleVisibility}>
          {isVisible ? <ArrowUpExpandedIcon /> : <ArrowDownIcon />}
        </ArrowWrapper>
      </Header>
      {isVisible && (
        <>
          {entrantResult && <Infobox result={entrantResult} />}
          {elements.map((el, index) => (
            <Wrapper key={index}>
              <MemberInfo member={el.actor} />
              {el.amount && (
                <ValueText lighter>
                  Contributed
                  <Amount value={el.amount.toNumber()} />
                </ValueText>
              )}
              {el.count && (
                <ValueText lighter>
                  Work entries
                  <CountValue bold dark>
                    {el.count}
                  </CountValue>
                </ValueText>
              )}
              {title === 'WITHDRAWN' && <ValueText lighter>Work withdrawn</ValueText>}
            </Wrapper>
          ))}
        </>
      )}
    </>
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
  line-height: 24px;
`

const CountValue = styled(TextBig)`
  display: inline;
  margin-left: 8px;
  font-family: ${Fonts.Grotesk};
`
