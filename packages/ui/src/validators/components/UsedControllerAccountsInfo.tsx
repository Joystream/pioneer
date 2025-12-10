import React from 'react'
import styled from 'styled-components'

import { encodeAddress } from '@/accounts/model/encodeAddress'
import { Account } from '@/accounts/types'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextSmall } from '@/common/components/typography'
import { UsedControllerAccounts } from '@/validators/hooks/useUsedControllerAccounts'

interface Props {
  allAccounts: Account[]
  usedAccounts?: UsedControllerAccounts
}

export const UsedControllerAccountsInfo = ({ allAccounts, usedAccounts }: Props) => {
  const stashAccounts = usedAccounts ? Array.from(usedAccounts.stashAccounts) : []
  const controllerAccounts = (() => {
    if (!usedAccounts) return []
    const stashSet = usedAccounts.stashAccounts
    return Array.from(usedAccounts.controllerAccounts).filter((address) => !stashSet.has(address))
  })()

  if (!stashAccounts.length && !controllerAccounts.length) {
    return null
  }

  const formatAccount = (address: string) => {
    const account = allAccounts.find((acc) => acc.address === address)
    if (account?.name) {
      return `${account.name} (${encodeAddress(address)})`
    }
    return encodeAddress(address)
  }

  const formattedStashAccounts = stashAccounts.map(formatAccount)
  const formattedControllerAccounts = controllerAccounts.map(formatAccount)

  return (
    <RowGapBlock gap={4}>
      <InfoText>
        <strong>Unavailable accounts:</strong> Already used as stash or controller.
      </InfoText>
      <Columns>
        {!!formattedStashAccounts.length && (
          <Column>
            <InfoText>
              <strong>Stash:</strong>
            </InfoText>
            <AccountList>
              {formattedStashAccounts.map((account) => (
                <InfoText key={`stash-${account}`}>{account}</InfoText>
              ))}
            </AccountList>
          </Column>
        )}
        {!!formattedControllerAccounts.length && (
          <Column>
            <InfoText>
              <strong>Controller</strong>
            </InfoText>
            <AccountList>
              {formattedControllerAccounts.map((account) => (
                <InfoText key={`controller-${account}`}>{account}</InfoText>
              ))}
            </AccountList>
          </Column>
        )}
      </Columns>
    </RowGapBlock>
  )
}

const InfoText = styled(TextSmall)`
  word-break: break-word;
`

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const AccountList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 24px;
`
