import React from 'react'
import styled from 'styled-components'

import { encodeAddress } from '@/accounts/model/encodeAddress'
import { BadgeStatus } from '@/common/components/BadgeStatus'
import { ButtonPrimary } from '@/common/components/buttons'
import { TableListItemAsLinkHover } from '@/common/components/List'
import { Skeleton } from '@/common/components/Skeleton'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { BorderRad, Colors, Sizes, Transitions } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { whenDefined } from '@/common/utils'

import { NominatingRedirectModalCall } from '../modals/NominatingRedirectModal'
import { ValidatorWithDetails } from '../types/Validator'

import { ValidatorInfo } from './ValidatorInfo'

interface ValidatorItemProps {
  validator: ValidatorWithDetails
  onClick?: () => void
}
export const ValidatorItem = ({ validator, onClick }: ValidatorItemProps) => {
  const { stashAccount, membership, isVerifiedValidator, isActive, commission, APR, staking } = validator
  const { showModal } = useModal<NominatingRedirectModalCall>()

  return (
    <ValidatorItemWrapper onClick={onClick}>
      <ValidatorItemWrap>
        <ValidatorInfo member={membership} address={encodeAddress(stashAccount)} />
        {isVerifiedValidator ? (
          <BadgeStatus inverted size="l">
            verified
          </BadgeStatus>
        ) : (
          <div></div>
        )}
        <BadgeStatus inverted size="l">
          {isActive ? 'active' : 'waiting'}
        </BadgeStatus>
        <TokenValue size="xs" value={staking?.own} />
        <TokenValue size="xs" value={staking?.total} />
        <TextMedium bold>{whenDefined(APR, (apr) => `${apr}%`) ?? '-'}</TextMedium>
        <TextMedium bold>{commission}%</TextMedium>
        <ButtonPrimary
          size="small"
          onClick={(e) => {
            e.stopPropagation()
            showModal({ modal: 'NominatingRedirect' })
          }}
        >
          Nominate
        </ButtonPrimary>
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
  grid-template-columns: 250px 110px 80px 140px 140px 140px 100px 90px;
  grid-template-rows: 1fr;
  justify-content: space-between;
  justify-items: start;
  align-items: center;
  width: 100%;
  height: ${Sizes.accountHeight};
  padding: 16px;
  margin: -1px;

  ${Skeleton} {
    min-width: 80%;
    height: 1.2rem;
  }
`
