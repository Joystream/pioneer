import React from 'react'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { Account } from '@/accounts/types'
import { InputComponent } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'

interface RewardAccountStepProps {
  account?: Account
  setAccount: (account: Account) => void
}

export const RewardAccountStep = ({ account, setAccount }: RewardAccountStepProps) => {
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Reward account</h4>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            label="Select account receiving councilor rewards in case your candidacy is elected"
            required
            inputSize="l"
          >
            <SelectAccount onChange={(account) => setAccount(account)} selected={account} />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
