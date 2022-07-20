import BN from 'bn.js'
import React, { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { SelectStakingAccount } from '@/accounts/components/SelectAccount'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { InputComponent, InputNumber } from '@/common/components/forms'
import { Info } from '@/common/components/Info'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TokenValue, ValueInJoys } from '@/common/components/typography'
import { formatTokenValue } from '@/common/model/formatters'
import { ValidationHelpers } from '@/common/utils/validation'
import { SelectedMember } from '@/memberships/components/SelectMember'
import { Member } from '@/memberships/types'

interface StakingStepProps extends ValidationHelpers {
  candidacyMember: Member
  minStake: BN
}

export const StakeStep = ({ candidacyMember, minStake, errorChecker, errorMessageGetter }: StakingStepProps) => {
  const form = useFormContext()
  const [stake] = form.watch(['staking.account', 'staking.amount'])
  const balances = useMyBalances()

  const isSomeBalanceGteStake = useMemo(() => {
    return Object.entries(balances).some(([, balance]) => balance.transferable.gte(stake ?? minStake))
  }, [stake?.toString(), JSON.stringify(balances)])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={20}>
          <SelectedMember
            label="You are announcing your candidacy using the membership"
            member={candidacyMember}
            disabled
          />
          <RowGapBlock gap={8}>
            <h4>1. Select an Account</h4>
            <TextMedium>First please select an account for staking.</TextMedium>
          </RowGapBlock>
          <InputComponent
            label="Select account for Staking"
            required
            inputSize="l"
            disabled={!isSomeBalanceGteStake}
            message={errorChecker('account') ? errorMessageGetter('account') : undefined}
            validation={errorChecker('account') ? 'invalid' : undefined}
            tooltipText={
              <>
                When losing an election, your candidacy lock is removed and your steak becomes immediately recoverable.
                If you win and get elected, your candidacy lock will be automatically removed, and a council specific
                lock will be applied, with the same amount locked. When that council is replaced, this lock is removed,
                if you did not get re-elected
              </>
            }
          >
            <SelectStakingAccount name="staking.account" minBalance={minStake} lockType="Council Candidate" />
          </InputComponent>
          <RowGapBlock gap={8}>
            <h4>2. Stake</h4>
            <TextMedium>
              You must stake <ValueInJoys>{formatTokenValue(minStake)}</ValueInJoys> to announce candidacy. his stake
              will be return to you if your candidacy fails as a result of the council voting.
            </TextMedium>
          </RowGapBlock>
          <InputComponent
            id="amount-input"
            label="Select amount for Staking"
            units="tJOY"
            required
            message={errorChecker('amount') ? errorMessageGetter('amount') : undefined}
            validation={errorChecker('amount') ? 'invalid' : undefined}
            inputSize="s"
          >
            <InputNumber
              id="amount-input"
              name="staking.amount"
              isInBN
              isTokenValue
              placeholder={minStake.toString()}
            />
          </InputComponent>
          {isSomeBalanceGteStake && errorMessageGetter('amount')?.startsWith('Insufficient') && (
            <Info>
              <TextMedium>
                You have sufficient funds on other account to cover
                {<TokenValue value={minStake} />} stake.
              </TextMedium>
            </Info>
          )}
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
