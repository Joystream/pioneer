import React, { useState } from 'react'
import styled from 'styled-components'

import { PageHeader } from '@/app/components/PageHeader'
import { PageLayout } from '@/app/components/PageLayout'
import { ButtonPrimary, ButtonGhost, ButtonSecondary } from '@/common/components/buttons'
import { KebabMenuIcon } from '@/common/components/icons'
import { List, ListItem } from '@/common/components/List'
import { ListHeader } from '@/common/components/List/ListHeader'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { BorderRad, Colors, Sizes, Transitions } from '@/common/constants'
import { useModal } from '@/common/hooks/useModal'
import { useBondedAccounts } from '@/validators/hooks/useBondedAccounts'
import { BondModalCall } from '@/validators/modals/BondModal'
import { UnbondModalCall } from '@/validators/modals/UnbondModal'
import { ChangeSessionKeysModalCall } from '@/validators/modals/ChangeSessionKeysModal'
import { StopValidatingModalCall } from '@/validators/modals/StopValidatingModal'
import BN from 'bn.js'

import { ValidatorsTabs } from './components/ValidatorsTabs'

export const BondsList = () => {
  const { bondedAccounts, isLoading } = useBondedAccounts()
  const { showModal: showBondModal } = useModal<BondModalCall>()
  const { showModal: showUnbondModal } = useModal<UnbondModalCall>()
  const { showModal: showChangeKeysModal } = useModal<ChangeSessionKeysModalCall>()
  const { showModal: showStopValidatingModal } = useModal<StopValidatingModalCall>()
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)

  const handleBondMore = () => {
    showBondModal({ modal: 'Bond', data: {} })
  }

  const handleUnbond = (address: string) => {
    showUnbondModal({ modal: 'Unbond', data: { validatorAddress: address } })
    setOpenDropdownId(null)
  }

  const handleChangeSessionKeys = (address: string) => {
    showChangeKeysModal({ modal: 'ChangeSessionKeys', data: { validatorAddress: address } })
    setOpenDropdownId(null)
  }

  const handleStopValidating = (address: string) => {
    showStopValidatingModal({ modal: 'StopValidating', data: { validatorAddress: address } })
    setOpenDropdownId(null)
  }

  return (
    <PageLayout
      header={
        <RowGapBlock gap={24}>
          <PageHeader title="Validators" tabs={<ValidatorsTabs />} />
          <ActionsBar>
            <ButtonPrimary size="medium" onClick={handleBondMore}>
              Bond More Tokens
            </ButtonPrimary>
          </ActionsBar>
        </RowGapBlock>
      }
      main={
        <MainContent>
          <h4>My Bonded Accounts</h4>
          {isLoading ? (
            <TextMedium>Loading bonded accounts...</TextMedium>
          ) : bondedAccounts.length === 0 ? (
            <EmptyState>
              <TextMedium>You don't have any bonded accounts yet.</TextMedium>
              <TextMedium>Bond tokens to start staking and nominating validators.</TextMedium>
              <ButtonPrimary size="medium" onClick={handleBondMore}>
                Bond Tokens Now
              </ButtonPrimary>
            </EmptyState>
          ) : (
            <>
              <ListHeaders>
                <ListHeader>Account Address</ListHeader>
                <ListHeader>Bonded Amount</ListHeader>
                <ListHeader>Status</ListHeader>
                <ListHeader>Actions</ListHeader>
              </ListHeaders>
              <List>
                {bondedAccounts.map((account) => (
                  <ListItem key={account.address}>
                    <BondedAccountRow>
                      <AccountAddress>
                        <TextMedium>{account.address}</TextMedium>
                      </AccountAddress>
                      <BondedAmount>
                        <TokenValue size="m" value={new BN(account.bondedAmount)} />
                      </BondedAmount>
                      <Status>
                        <StatusBadge active={account.hasStakingLock}>
                          {account.hasStakingLock ? 'Active' : 'Inactive'}
                        </StatusBadge>
                      </Status>
                      <ActionsContainer>
                        <ActionButton
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation()
                            setOpenDropdownId(openDropdownId === account.address ? null : account.address)
                          }}
                        >
                          <KebabMenuIcon />
                        </ActionButton>
                        {openDropdownId === account.address && (
                          <DropdownMenuContainer>
                            <DropdownItem onClick={() => handleUnbond(account.address)}>
                              Unbond
                            </DropdownItem>
                            <DropdownItem onClick={() => handleStopValidating(account.address)}>
                              Stop Validating
                            </DropdownItem>
                            <DropdownItem onClick={() => handleChangeSessionKeys(account.address)}>
                              Change Session Keys
                            </DropdownItem>
                          </DropdownMenuContainer>
                        )}
                      </ActionsContainer>
                    </BondedAccountRow>
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </MainContent>
      }
    />
  )
}

const ActionsBar = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 48px;
  text-align: center;
`

const ListHeaders = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px 120px 100px;
  gap: 16px;
  padding: 0 16px;
  margin-bottom: 8px;
`

const BondedAccountRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 200px 120px 100px;
  gap: 16px;
  padding: 16px;
  align-items: center;
  width: 100%;
`

const AccountAddress = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`

const BondedAmount = styled.div`
  display: flex;
  justify-content: flex-start;
`

const Status = styled.div`
  display: flex;
  justify-content: flex-start;
`

const StatusBadge = styled.div<{ active: boolean }>`
  padding: 4px 12px;
  border-radius: ${BorderRad.s};
  background: ${({ active }) => active ? Colors.Green[100] : Colors.Black[200]};
  color: ${({ active }) => active ? Colors.Green[500] : Colors.Black[500]};
  font-size: 14px;
  font-weight: 600;
`

const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const ActionButton = styled(ButtonGhost)`
  padding: 8px;
  min-width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
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
  min-width: 180px;
  margin-top: 4px;
`

const DropdownItem = styled.div`
  padding: 12px 16px;
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
