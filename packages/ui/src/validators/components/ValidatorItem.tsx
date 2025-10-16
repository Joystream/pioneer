import React from 'react'
import styled from 'styled-components'

import { encodeAddress } from '@/accounts/model/encodeAddress'
import { BadgeStatus } from '@/common/components/BadgeStatus'
import { ButtonPrimary, ButtonSecondary, ButtonGhost } from '@/common/components/buttons'
import { TableListItemAsLinkHover } from '@/common/components/List'
import { Skeleton } from '@/common/components/Skeleton'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { BorderRad, Colors, Sizes, Transitions } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { whenDefined } from '@/common/utils'

import { BondModalCall } from '@/validators/modals/BondModal'
import { NominateValidatorModalCall } from '@/validators/modals/NominateValidatorModal'
import { NominatingRedirectModalCall } from '@/validators/modals/NominatingRedirectModal'
import { PayoutModalCall } from '@/validators/modals/PayoutModal'
import { StakeModalCall } from '@/validators/modals/StakeModal'
import { UnbondModalCall } from '@/validators/modals/UnbondModal'
import { ValidatorWithDetails } from '@/validators/types/Validator'

import { ValidatorInfo } from './ValidatorInfo'

interface ValidatorItemProps {
  validator: ValidatorWithDetails
  onClick?: () => void
}
export const ValidatorItem = ({ validator, onClick }: ValidatorItemProps) => {
  const { stashAccount, membership, isVerifiedValidator, isActive, commission, APR, staking } = validator
  const { showModal } = useModal<NominatingRedirectModalCall>()
  const { showModal: showNominateModal } = useModal<NominateValidatorModalCall>()
  const { showModal: showStakeModal } = useModal<StakeModalCall>()
  const { showModal: showBondModal } = useModal<BondModalCall>()
  const { showModal: showUnbondModal } = useModal<UnbondModalCall>()
  const { showModal: showPayoutModal } = useModal<PayoutModalCall>()

  const handleActionClick = (e: React.MouseEvent, action: string) => {
    e.stopPropagation()
    const validatorAddress = encodeAddress(stashAccount)
    
    switch (action) {
      case 'Nominate':
        showNominateModal({ modal: 'NominateValidator', data: { validatorAddress } })
        break
      case 'Stake':
        showStakeModal({ modal: 'Stake', data: { validatorAddress } })
        break
      case 'Bond':
        showBondModal({ modal: 'Bond', data: { validatorAddress } })
        break
      case 'Unbond':
        showUnbondModal({ modal: 'Unbond', data: { validatorAddress } })
        break
      case 'Payout':
        showPayoutModal({ modal: 'Payout', data: { validatorAddress } })
        break
      default:
        showModal({ modal: 'NominatingRedirect' })
    }
  }

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
        <ActionButtons>
          <ButtonPrimary
            size="small"
            onClick={(e) => handleActionClick(e, 'Nominate')}
          >
            Nominate
          </ButtonPrimary>
          <ButtonSecondary
            size="small"
            onClick={(e) => handleActionClick(e, 'Stake')}
          >
            Stake
          </ButtonSecondary>
          <ButtonGhost
            size="small"
            onClick={(e) => handleActionClick(e, 'Bond')}
          >
            Bond
          </ButtonGhost>
          <ButtonGhost
            size="small"
            onClick={(e) => handleActionClick(e, 'Unbond')}
          >
            Unbond
          </ButtonGhost>
          <ButtonGhost
            size="small"
            onClick={(e) => handleActionClick(e, 'Payout')}
          >
            Payout
          </ButtonGhost>
        </ActionButtons>
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
  grid-template-columns: 250px 110px 80px 140px 140px 140px 100px 1fr;
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

const ActionButtons = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`
