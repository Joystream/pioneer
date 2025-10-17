import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

import { encodeAddress } from '@/accounts/model/encodeAddress'
import { BadgeStatus } from '@/common/components/BadgeStatus'
import { ButtonGhost } from '@/common/components/buttons'
import { TableListItemAsLinkHover } from '@/common/components/List'
import { Skeleton } from '@/common/components/Skeleton'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { BorderRad, Colors, Sizes, Transitions } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { whenDefined } from '@/common/utils'
import { KebabMenuIcon } from '@/common/components/icons'

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
  openDropdownId: string | null
  setOpenDropdownId: (id: string | null) => void
}
export const ValidatorItem = ({ validator, onClick, openDropdownId, setOpenDropdownId }: ValidatorItemProps) => {
  const { stashAccount, membership, isVerifiedValidator, isActive, commission, APR, staking } = validator
  const { showModal } = useModal<NominatingRedirectModalCall>()
  const { showModal: showNominateModal } = useModal<NominateValidatorModalCall>()
  const { showModal: showStakeModal } = useModal<StakeModalCall>()
  const { showModal: showBondModal } = useModal<BondModalCall>()
  const { showModal: showUnbondModal } = useModal<UnbondModalCall>()
  const { showModal: showPayoutModal } = useModal<PayoutModalCall>()
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const validatorId = encodeAddress(stashAccount)
  const isThisDropdownOpen = openDropdownId === validatorId

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (isThisDropdownOpen) {
          setOpenDropdownId(null)
        }
      }
    }

    if (isThisDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isThisDropdownOpen, setOpenDropdownId])

  const handleActionClick = (action: string) => {
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
    setOpenDropdownId(null)
  }

  return (
    <ValidatorItemWrapper 
      onClick={onClick}
      onMouseEnter={() => {
        if (openDropdownId !== null && openDropdownId !== validatorId) {
          setOpenDropdownId(null)
        }
      }}
    >
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
        <ActionsContainer ref={dropdownRef}>
          <ActionButton
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              setOpenDropdownId(isThisDropdownOpen ? null : validatorId)
            }}
          > 
            Actions ▼
            <KebabMenuIcon />
          </ActionButton>
          {isThisDropdownOpen && (
            <DropdownMenuContainer onClick={(e) => e.stopPropagation()}>
              <DropdownItem onClick={(e) => {
                e.stopPropagation()
                handleActionClick('Nominate')
              }}>
                Nominate
              </DropdownItem>
              <DropdownItem onClick={(e) => {
                e.stopPropagation()
                handleActionClick('Stake')
              }}>
                Stake
              </DropdownItem>
              <DropdownItem onClick={(e) => {
                e.stopPropagation()
                handleActionClick('Bond')
              }}>
                Bond
              </DropdownItem>
              <DropdownItem onClick={(e) => {
                e.stopPropagation()
                handleActionClick('Unbond')
              }}>
                Unbond
              </DropdownItem>
              <DropdownItem onClick={(e) => {
                e.stopPropagation()
                handleActionClick('Payout')
              }}>
                Payout
              </DropdownItem>
            </DropdownMenuContainer>
          )}
        </ActionsContainer>
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

  ${TableListItemAsLinkHover}
  
  &:hover {
    z-index: 10;
  }
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

const ActionsContainer = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  position: relative;
  z-index: 1;
`

const ActionButton = styled(ButtonGhost)`
  padding: 4px 12px;
  min-width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${Colors.Blue[600]};
  color: ${Colors.White};
`

const DropdownMenuContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: ${Colors.White};
  border: 1px solid ${Colors.Black[200]};
  border-radius: ${BorderRad.s};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 9999;
  width: 100%;
  margin-top: 4px;
`

const DropdownItem = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  font-size: 14px;
  color: ${Colors.Black[900]};
  border-bottom: 1px solid ${Colors.Black[100]};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: ${Colors.Black[50]};
  }
`
