import { getWalletBySource, Wallet } from 'injectweb3-connect'
import React from 'react'
import styled from 'styled-components'

import { CheckboxIcon } from '@/common/components/icons'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextBig, TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { SelectListWrapper } from '@/common/modals/OnBoardingModal/components/ConnectAccountItem'

interface ConnectWalletItemProps {
  wallet: Wallet
  selected?: boolean
  onClick: () => void
}

const defaultIconSrc = getWalletBySource('polkadot-js')?.logo.src

export const ConnectWalletItem = ({ wallet, selected, onClick }: ConnectWalletItemProps) => {
  return (
    <SelectListWrapper selected={selected} onClick={onClick}>
      <InnerWrapper>
        <img src={wallet.logo.src ?? defaultIconSrc} alt={wallet.logo.alt ?? wallet.extensionName} />
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
  gap: 20px;
  width: 100%;
  height: 70px;
  padding: 16px 8px 16px 16px;

  p {
    text-align: left;
  }

  img {
    object-fit: contain;
    width: 40px;
  }

  svg {
    color: ${Colors.LogoPurple};
  }
`
