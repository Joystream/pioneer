import React from 'react'
import styled from 'styled-components'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { ButtonPrimary } from '@/common/components/buttons'
import { ConnectIcon } from '@/common/components/icons/ConnectIcon'
import { JoystreamLogo } from '@/common/components/icons/JoystreamLogo'
import { PolkadotIcon } from '@/common/components/icons/PolkadotIcon'
import { List, ListItem } from '@/common/components/List'
import { ModalFooter } from '@/common/components/Modal'
import { TextExtraHuge, TextMedium } from '@/common/components/typography'
import { Colors } from '@/common/constants'

import { AccountsListItem } from './AccountsList/AccountsListItem'

export const SelectAccountStep = () => {
  const { allAccounts } = useMyAccounts()
  const balances = useMyBalances()

  return (
    <>
      <ContentWrapper>
        <IconsWrapper>
          <PolkadotIcon />
          <ConnectIcon />
          <JoystreamLogo />
        </IconsWrapper>
        <TextWrapper>
          <TextExtraHuge bold>Connect accounts</TextExtraHuge>
          <StyledSubtitle>
            Select polkadot account which you want to connect to your new joystream membership.
          </StyledSubtitle>
        </TextWrapper>
        <List>
          {allAccounts.map((account) => (
            <ListItem key={account.address} borderless>
              <AccountsListItem account={account} totalBalance={balances[account.address]?.total} />
            </ListItem>
          ))}
        </List>
      </ContentWrapper>
      <StyledModalFooter>
        <StyledButton size="large">Connect Account</StyledButton>
      </StyledModalFooter>
    </>
  )
}

const StyledModalFooter = styled(ModalFooter)`
  grid-column-gap: 5px;
  justify-items: end;
`
const IconsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > svg {
    margin: 0 10px 0 10px;
  }
`
const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 66px;
`

const TextWrapper = styled.div`
  margin-top: 30px;
  text-align: center;
`
const StyledSubtitle = styled(TextMedium)`
  color: ${Colors.Black[500]};
  display: flex;
  margin: 0 auto;
  width: 50%;
  margin-top: 8px;
`

const StyledButton = styled(ButtonPrimary)`
  justify-content: flex-end;
`
