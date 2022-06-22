import { SelectListWrapper } from '@/common/modals/OnBoardingModal/components/ConnectAccountItem'
import styled from 'styled-components'
import { Wallet } from 'injectweb3-connect'
import { CheckboxIcon } from '@/common/components/icons'
import React from 'react'
import { TextBig, TextMedium } from '@/common/components/typography'
import { RowGapBlock } from '@/common/components/page/PageContent'

interface ConnectWalletItemProps {
  wallet: Wallet
  selected?: boolean
  onClick: () => void
}

export const ConnectWalletItem = ({ wallet, selected, onClick }: ConnectWalletItemProps) => {
  const Icon = wallet.logo.src
  return (
    <SelectListWrapper selected={selected} onClick={onClick}>
      <InnerWrapper>
        <div />
        <RowGapBlock>
          <TextBig bold value>
            {wallet.title}
          </TextBig>
          {wallet.installed && <TextMedium>Installed</TextMedium>}
        </RowGapBlock>
        {selected && <CheckboxIcon />}
      </InnerWrapper>
    </SelectListWrapper>
  )
}

const InnerWrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  width: 100%;
  height: 70px;
  padding: 16px 8px 16px 16px;

  p {
    text-align: left;
  }
`
