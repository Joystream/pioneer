import BN from 'bn.js'
import React from 'react'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { filterByRequiredStake } from '@/accounts/components/SelectAccount/helpers'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { InputComponent } from '@/common/components/forms'
import { LinkSymbol } from '@/common/components/icons/symbols'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TooltipExternalLink } from '@/common/components/Tooltip'
import { TextMedium, TokenValue } from '@/common/components/typography'

interface StakingAccountStepProps {
  requiredStake: BN
}

export const StakingAccountStep = ({ requiredStake }: StakingAccountStepProps) => {
  const balances = useMyBalances()

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>General parameters</h4>
          <TextMedium lighter>Staking account</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <RowGapBlock gap={8}>
            <TextMedium>
              You must stake <TokenValue value={requiredStake} />
              to create this proposal. This stake will be returned to you when the proposal is either rejected or
              accepted via council voting. Please note the duration of the voting period is displayed on the left and
              your funds will be locked for at least the duration of the voting period
            </TextMedium>
          </RowGapBlock>
          <InputComponent
            label="Select account for Staking"
            tooltipText={
              <>
                The budget is the root resource pool for all token minting in the working group, and the size of the
                pool is denoted by budget.
                <TooltipExternalLink
                  href="https://joystream.gitbook.io/joystream-handbook/key-concepts/staking#locks-1"
                  target="_blank"
                >
                  <TextMedium>Link</TextMedium> <LinkSymbol />
                </TooltipExternalLink>
              </>
            }
            inputSize="l"
            required
            name="stakingAccount.stakingAccount"
          >
            <SelectAccount
              name="stakingAccount.stakingAccount"
              minBalance={requiredStake}
              filter={(account) => filterByRequiredStake(requiredStake, 'Proposals', balances[account.address])}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
