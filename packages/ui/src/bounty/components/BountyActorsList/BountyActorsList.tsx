import React, { memo } from 'react'
import styled from 'styled-components'

import { BountyActorItem, EntrantResult, isContributor, isEntrant } from '@/bounty/types/Bounty'
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

const actorsMapFunction = (el: BountyActorItem) => {
  if (isContributor(el)) {
    return (
      <ValueText lighter>
        Contributed
        <Amount value={el.amount} />
      </ValueText>
    )
  }
  if (isEntrant(el)) {
    return (
      <ValueText as="div" lighter>
        Works submitted
        <CountValue bold dark>
          {el.count}
        </CountValue>
      </ValueText>
    )
  }
  return <ValueText lighter>Entry withdrawn</ValueText>
}

export const BountyActorsList = memo(({ title, elements, entrantResult, open = true }: BountyActorsListProps) => {
  const [isVisible, toggleVisibility] = useToggle(open)

  return (
    <>
      <Header>
        <TitleText lighter bold>
          {title}{' '}
        </TitleText>
        <CountBadge count={elements.length} />
        <ArrowWrapper id={`${title}-EXPAND`} onClick={toggleVisibility}>
          {isVisible ? <ArrowUpExpandedIcon /> : <ArrowDownIcon />}
        </ArrowWrapper>
      </Header>

      {isVisible && (
        <>
          {entrantResult && <Infobox result={entrantResult} />}
          {elements.map(
            (el, index) =>
              el?.actor && (
                <Wrapper key={el?.actor?.id + '-tile-' + index}>
                  <MemberInfo member={el.actor} />
                  {actorsMapFunction(el)}
                </Wrapper>
              )
          )}
        </>
      )}
    </>
  )
})

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
  text-transform: uppercase;
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
