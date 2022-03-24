import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

import { BountyActorItem, EntrantResult, isContributor, isEntrant } from '@/bounty/types/Bounty'
import { CountBadge } from '@/common/components/CountBadge'
import { ArrowUpExpandedIcon, CrossIcon } from '@/common/components/icons'
import { ArrowDownIcon } from '@/common/components/icons/ArrowDownIcon'
import { TokenValue, TextSmall, TextExtraSmall, TextBig, TextMedium } from '@/common/components/typography'
import { Colors, Fonts } from '@/common/constants'
import { useToggle } from '@/common/hooks/useToggle'
import { MemberInfo } from '@/memberships/components'

import { Infobox } from './Infobox'

export interface BountyActorsListProps {
  title: 'CONTRIBUTORS' | 'ENTRANTS' | 'WITHDRAWN'
  elements: BountyActorItem[]
  entrantResult?: EntrantResult
  open?: boolean
  isSlashed?: boolean
}

const actorsMapFunction = (el: BountyActorItem) => {
  if (isContributor(el)) {
    return (
      <ValueText lighter>
        Contributed
        <Amount value={el.amount?.toNumber?.() ?? Number(el.amount)} />
      </ValueText>
    )
  }
  if (isEntrant(el)) {
    return (
      <ValueText lighter>
        Works submitted
        <CountValue bold dark>
          {el.count}
        </CountValue>
      </ValueText>
    )
  }
  return <ValueText lighter>Work withdrawn</ValueText>
}

export const BountyActorsList = memo(
  ({ title, elements, entrantResult, open = true, isSlashed = false }: BountyActorsListProps) => {
    const { t } = useTranslation('bounty')
    const [isSlashedVisible, toggleSlashedVisible] = useToggle(isSlashed)
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
            {isSlashedVisible && (
              <SlashedBox>
                <StyledCloseIcon onClick={toggleSlashedVisible} />
                <TextBig value bold>
                  {t('slashed.title')}
                </TextBig>
                <TextMedium inter>{t('slashed.description')}</TextMedium>
              </SlashedBox>
            )}
            {entrantResult && <Infobox result={entrantResult} />}
            {elements.map(
              (el) =>
                el?.actor && (
                  <Wrapper key={el?.actor?.id}>
                    <MemberInfo member={el.actor} />
                    {actorsMapFunction(el)}
                  </Wrapper>
                )
            )}
          </>
        )}
      </>
    )
  }
)

const SlashedBox = styled.div`
  width: 100%;
  height: min-content;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 16px;
  background-color: ${Colors.Negative[50]};
  margin-bottom: 10px;
  position: relative;
`

const StyledCloseIcon = styled(CrossIcon)`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  width: 15px;
  height: 15px;
`

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
