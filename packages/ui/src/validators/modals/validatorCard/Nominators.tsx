import React from 'react'
import styled from 'styled-components'

import { UnknownAccountInfo } from '@/accounts/components/UnknownAccountInfo'
import { TableListItemAsLinkHover, List, ListItem } from '@/common/components/List'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { SidePaneBody } from '@/common/components/SidePane'
import { TokenValue } from '@/common/components/typography'
import { BorderRad, Colors, Transitions } from '@/common/constants'

import { ValidatorWithDetails } from '../../types'

interface Props {
  validator: ValidatorWithDetails
}

export const Nominators = ({ validator }: Props) => {
  return (
    <SidePaneBody>
      <Details gap={24}>
        <RowGapBlock gap={4}>
          <Title>{`Nominators (${validator.staking?.nominators.length})`}</Title>
        </RowGapBlock>
        <RowGapBlock gap={4}>
          <ListHeaders>
            <ListHeader>Nominator</ListHeader>
            <ListHeader>Total staked</ListHeader>
          </ListHeaders>
          <NominatorList>
            {validator.staking?.nominators?.map(({ address, staking }, index) => (
              <ListItem key={index} borderless>
                <NominatorItemWrap>
                  <UnknownAccountInfo address={address} placeholderName="Nominator account" />
                  <TokenValue size="xs" value={staking} />
                </NominatorItemWrap>
              </ListItem>
            ))}
          </NominatorList>
        </RowGapBlock>
      </Details>
    </SidePaneBody>
  )
}

const Details = styled(RowGapBlock)`
  padding: 24px;
`
const Title = styled.h4`
  word-break: break-word;
`
const NominatorList = styled(List)`
  gap: 8px;
`
const NominatorItemWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  justify-items: end;
  align-items: center;
  width: 100%;
  padding: 16px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  cursor: pointer;
  transition: ${Transitions.all};
  ${TableListItemAsLinkHover}

  @media (max-width: 424px) {
    grid-gap: 8px;
    grid-template-columns: 1fr;
  }
`
const ListHeaders = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  width: 100%;

  justify-content: space-between;
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
`

const ListHeader = styled.span`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  justify-self: end;
  width: fit-content;
  font-size: 10px;
  line-height: 16px;
  font-weight: 700;
  color: ${Colors.Black[400]};
  text-transform: uppercase;
  text-align: right;
  user-select: none;
  cursor: pointer;

  &:first-child {
    text-align: left;
    justify-self: start;
  }
`
