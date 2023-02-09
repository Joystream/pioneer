import BN from 'bn.js'
import React, { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'

import { SelectStakingAccount } from '@/accounts/components/SelectAccount'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { CurrencyName } from '@/app/constants/currency'
import { InputComponent, TokenInput } from '@/common/components/forms'
import { Info } from '@/common/components/Info'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { formatJoyValue } from '@/common/model/formatters'
import { ValidationHelpers } from '@/common/utils/validation'
import { SelectedMember } from '@/memberships/components/SelectMember'
import { Member } from '@/memberships/types'

interface StakingStepProps extends ValidationHelpers {
  candidacyMember: Member
  minStake: BN
}

export const StakeStep = ({ candidacyMember, minStake, errorChecker, errorMessageGetter }: StakingStepProps) => {
  const form = useFormContext()
  const [stake] = form.watch(['staking.amount'])
  const balances = useMyBalances()

  const isSomeBalanceGteStake = useMemo(
    () => Object.values(balances ?? []).some(({ transferable }) => transferable.gte(stake ?? minStake)),
    [stake?.toString(), JSON.stringify(balances)]
  )

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
            tooltipText="The account holding the stake for the candidate. After announcing the staking account will have locked up REQUIRED_CANDIDACY_STAKE under the relevant council lock. If the candidacy fails - either because the election cycle fails or the candidate receives too few votes, then this lock can be removed by the candidate, otherwise it remains on into the councilorship. Be aware that this stake contributed towards the candidacy does not contribute towards the final election outcome, hence exceeding the minimum bound would only be done for signaling or other social purposes."
            tooltipLinkText="Learn more"
            tooltipLinkURL="https://handbook.joystream.org/system/council#candidacy"
          >
            <SelectStakingAccount name="staking.account" minBalance={minStake} lockType="Council Candidate" />
          </InputComponent>
          <RowGapBlock gap={8}>
            <h4>2. Stake</h4>
            <TextMedium>
              You must stake <TokenValue value={minStake} /> to announce candidacy. His stake will be return to you if
              your candidacy fails as a result of the council voting.
            </TextMedium>
          </RowGapBlock>
          <InputComponent
            id="amount-input"
            label="Select amount for Staking"
            units={CurrencyName.integerValue}
            required
            message={errorChecker('amount') ? errorMessageGetter('amount') : undefined}
            validation={errorChecker('amount') ? 'invalid' : undefined}
            inputSize="s"
          >
            <TokenInput id="amount-input" name="staking.amount" placeholder={formatJoyValue(minStake)} />
          </InputComponent>
          {isSomeBalanceGteStake && errorMessageGetter('amount')?.startsWith('Insufficient') && (
            <Info>
              <TextMedium>
                You have sufficient funds on other account to cover {<TokenValue value={stake ?? minStake} />} stake.
              </TextMedium>
            </Info>
          )}
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
