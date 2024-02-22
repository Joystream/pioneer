import React, { useState } from 'react'

import { encodeAddress } from '@/accounts/model/encodeAddress'
import { CloseButton, ButtonGhost } from '@/common/components/buttons'
import { Arrow } from '@/common/components/icons'
import {
  SidePane,
  SidePaneGlass,
  SidePaneHeader,
  SidePanelTop,
  SidePaneTitle,
  SidePaneTopButtonsGroup,
} from '@/common/components/SidePane'
import { Tabs } from '@/common/components/Tabs'
import { useEscape } from '@/common/hooks/useEscape'
import { ValidatorInfo } from '@/validators/components/ValidatorInfo'

import { ValidatorWithDetails } from '../../types'

import { Nominators } from './Nominators'
import { ValidatorDetail } from './ValidatorDetail'

export type ValidatorCardTabs = 'Details' | 'Nominators'

interface Props {
  eraIndex: number | undefined
  cardNumber: number
  validator: ValidatorWithDetails
  selectCard: (cardNumber: number | null) => void
  totalCards: number
}

export const ValidatorCard = React.memo(({ cardNumber, validator, eraIndex, selectCard, totalCards }: Props) => {
  const hideModal = () => {
    selectCard(null)
  }
  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      hideModal()
    }
  }
  useEscape(() => hideModal())
  const [activeTab, setActiveTab] = useState<ValidatorCardTabs>('Details')

  const onClickRight = () => {
    selectCard(cardNumber + 1)
  }
  const onClickLeft = () => {
    selectCard(cardNumber - 1)
  }

  const title = `Validor ${cardNumber} of ${totalCards}`
  const tabs = [
    {
      title: 'Validator details',
      active: activeTab === 'Details',
      onClick: () => setActiveTab('Details'),
    },
    { title: 'Nominators', active: activeTab === 'Nominators', onClick: () => setActiveTab('Nominators') },
  ]

  return (
    <SidePaneGlass onClick={onBackgroundClick}>
      <SidePane>
        <SidePaneHeader>
          <SidePanelTop>
            <SidePaneTitle>{title}</SidePaneTitle>
            <SidePaneTopButtonsGroup>
              <ButtonGhost title="Previous validator" size="small" disabled={cardNumber <= 1} onClick={onClickLeft}>
                <Arrow direction="left" />
              </ButtonGhost>
              <ButtonGhost
                title="Next validator"
                size="small"
                disabled={cardNumber >= totalCards}
                onClick={onClickRight}
              >
                <Arrow direction="right" />
              </ButtonGhost>
            </SidePaneTopButtonsGroup>
            <CloseButton onClick={hideModal} />
          </SidePanelTop>
          <ValidatorInfo member={validator.membership} address={encodeAddress(validator.stashAccount)} size="l" />
          <Tabs tabs={tabs} tabsSize="xs" />
        </SidePaneHeader>
        {activeTab === 'Details' && <ValidatorDetail validator={validator} eraIndex={eraIndex} hideModal={hideModal} />}
        {activeTab === 'Nominators' && <Nominators validator={validator} />}
      </SidePane>
    </SidePaneGlass>
  )
})
