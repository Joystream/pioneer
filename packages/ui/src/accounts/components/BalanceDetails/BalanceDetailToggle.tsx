import React from 'react'
import styled from 'styled-components'

import { BalanceLockInfo } from '@/accounts/types'
import { ToggleableItem, ToggleButton } from '@/common/components/buttons/Toggle'
import { TokenValue } from '@/common/components/typography'
import { BorderRad, Colors } from '@/common/constants'
import { capitalizeFirstLetter } from '@/common/helpers'

export interface BalanceDetailToggleProps {
  info: BalanceLockInfo
}

export const BalanceDetailToggle = ({ info }: BalanceDetailToggleProps) => {
  return (
    <DetailToggle absoluteToggle>
      {(isOpen) => {
        return (
          <DetailToggleContainer>
            <DetailTitleContainer>
              <h5>{capitalizeFirstLetter(info.reason.trim())}</h5>
              <TokenValue value={info.amount} />
            </DetailTitleContainer>
            {isOpen && <DetailContainer>Here some info!</DetailContainer>}
          </DetailToggleContainer>
        )
      }}
    </DetailToggle>
  )
}

const DetailToggle = styled(ToggleableItem)`
  position: relative;
  background-color: ${Colors.White};

  ${ToggleButton} {
    top: 12px;
    z-index: 3;
  }
`

const DetailToggleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const DetailTitleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr repeat(2, 352px);
  grid-template-rows: 1fr;
  width: 100%;
  height: 100%;
  min-height: 56px;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid ${Colors.Black[100]};
  border-radius: ${BorderRad.s};
  z-index: 2;
`

const DetailContainer = styled.div`
  border: 1px solid ${Colors.Black[200]};
  border-radius: ${BorderRad.s};
  margin-top: -1px;
`
