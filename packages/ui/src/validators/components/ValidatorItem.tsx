import React from 'react'
import styled from 'styled-components'

import { BadgeStatus } from '@/common/components/BadgeStatus'
import { ButtonPrimary } from '@/common/components/buttons'
import { TableListItemAsLinkHover } from '@/common/components/List'
import { Skeleton } from '@/common/components/Skeleton'
import { TextMedium, TextSmall, TokenValue } from '@/common/components/typography'
import { BorderRad, Colors, Sizes, Transitions } from '@/common/constants'

import { Validator } from '../types/Validator'

import { ValidatorInfo } from './ValidatorInfo'
interface ValidatorItemProps {
  validator: Validator
}
export const ValidatorItem = ({ validator }: ValidatorItemProps) => {
  const { address, verification, state, totalRewards, APR } = validator

  return (
    <ValidatorItemWrapper>
      <ValidatorItemWrap>
        <ValidatorInfo address={address} />
        {verification ? (
          <BadgeStatus inverted size="l">
            verified
          </BadgeStatus>
        ) : (
          <div></div>
        )}
        <BadgeStatus inverted size="l">
          {state ? 'active' : 'waiting'}
        </BadgeStatus>
        <TokenValue size="xs" value={totalRewards} />
        <TextMedium bold> {APR} </TextMedium>
        <TextSmall> Dec 2022 </TextSmall>
        <ButtonPrimary size="small">Nominate</ButtonPrimary>
      </ValidatorItemWrap>
    </ValidatorItemWrapper>
  )
}

const ValidatorItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  cursor: pointer;
  transition: ${Transitions.all};

  ${TableListItemAsLinkHover}
`

export const ValidatorItemWrap = styled.div`
  display: grid;
  grid-template-columns: 200px repeat(2, 80px) 120px 50px 80px 100px;
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: end;
  align-items: center;
  width: 100%;
  height: ${Sizes.accountHeight};
  padding: 16px 8px 16px 16px;
  margin-left: -1px;

  ${Skeleton} {
    min-width: 80%;
    height: 1.2rem;
  }
`
