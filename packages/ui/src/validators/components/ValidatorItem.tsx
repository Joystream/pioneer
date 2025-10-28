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
import { BondModalCall } from '@/validators/modals/BondModal'
import { NominatingRedirectModalCall } from '@/validators/modals/NominatingRedirectModal'
import { PayoutModalCall } from '@/validators/modals/PayoutModal'
// import { RebagModalCall } from '@/validators/modals/RebagModal'
// import { RebondModalCall } from '@/validators/modals/RebondModal'
// import { UnbondModalCall } from '@/validators/modals/UnbondModal'
import { ValidatorWithDetails } from '@/validators/types/Validator'

import { useSelectedValidators } from '../context/SelectedValidatorsContext'

// import { ValidatorActionsDropdown } from './ValidatorActionsDropdown'
import { ValidatorInfo } from './ValidatorInfo'

interface ValidatorItemProps {
  validator: ValidatorWithDetails
  onClick?: () => void
  isNominated?: boolean
}
export const ValidatorItem = ({ validator, onClick, isNominated = false }: ValidatorItemProps) => {
  const { stashAccount, membership, isVerifiedValidator, isActive, commission, APR, staking } = validator
  const { showModal } = useModal<NominatingRedirectModalCall>()
  const { showModal: showBondModal } = useModal<BondModalCall>()
  // const { showModal: showUnbondModal } = useModal<UnbondModalCall>()
  const { showModal: showPayoutModal } = useModal<PayoutModalCall>()
  // const { showModal: showRebagModal } = useModal<RebagModalCall>()
  // const { showModal: showRebondModal } = useModal<RebondModalCall>()
  const { isSelected, toggleSelection, selectedValidators, maxSelection } = useSelectedValidators()
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const handleActionClick = (e: React.MouseEvent, action: string) => {
    e.stopPropagation()
    const validatorAddress = encodeAddress(stashAccount)

    switch (action) {
      case 'Select':
        toggleSelection(validator)
        break
      case 'Bond':
        showBondModal({ modal: 'Bond', data: { validatorAddress } })
        break
      case 'Payout':
        showPayoutModal({ modal: 'Payout', data: { validatorAddress } })
        break

      default:
        showModal({ modal: 'NominatingRedirect' })
    }
  }

  const isValidatorSelected = isSelected(validator)
  const canSelect = !isValidatorSelected && selectedValidators.length < maxSelection

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
          {isNominated ? (
            <ButtonPrimary
              size="small"
              onClick={(e) => handleActionClick(e, 'Nominate')}
              title="Nominate this validator to receive rewards. You can change nominations each era without unbonding."
            >
              Nominate
            </ButtonPrimary>
          ) : isValidatorSelected ? (
            <ButtonPrimary
              size="small"
              onClick={(e) => handleActionClick(e, 'Select')}
              disabled={true}
              title="This validator is already selected for nomination."
            >
              Selected
            </ButtonPrimary>
          ) : (
            <ButtonPrimary
              size="small"
              onClick={(e) => handleActionClick(e, 'Select')}
              disabled={!canSelect}
              title={canSelect ? 'Select this validator for nomination' : 'Maximum number of validators selected'}
            >
              {canSelect ? 'Select' : 'Max Reached'}
            </ButtonPrimary>
          )}
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
  position: relative;
  z-index: 1;

  ${TableListItemAsLinkHover}
`

export const ValidatorItemWrap = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 0.8fr 1.4fr 1.4fr 1.4fr 1fr 1fr;
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
  position: relative;
  z-index: 1;
  display: flex;
  gap: 8px;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 40px;
`
