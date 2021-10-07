import BN from 'bn.js'
import React, { useCallback, useEffect, useMemo } from 'react'
import * as Yup from 'yup'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { filterByRequiredStake } from '@/accounts/components/SelectAccount/helpers'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { Account } from '@/accounts/types'
import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextInlineSmall, TextMedium, ValueInJoys } from '@/common/components/typography'
import { useForm } from '@/common/hooks/useForm'
import { useNumberInput } from '@/common/hooks/useNumberInput'
import { formatTokenValue } from '@/common/model/formatters'
import { SelectMember } from '@/memberships/components/SelectMember'
import { AccountSchema } from '@/memberships/model/validation'
import { Member } from '@/memberships/types'

interface StakingStepProps {
  candidacyMember: Member
  minStake: BN
  stake?: BN
  setStake: (stake?: BN) => void
  account?: Account
  setAccount: (account?: Account) => void
}

type StakeStepFormFields = Pick<StakingStepProps, 'stake'>

const StakeStepFormSchema = Yup.object().shape({
  account: AccountSchema.required(),
  amount: Yup.number().required(),
})

export const StakeStep = ({ candidacyMember, minStake, stake, setStake, account, setAccount }: StakingStepProps) => {
  const balances = useMyBalances()
  const schema = useMemo(() => {
    StakeStepFormSchema.fields.amount = StakeStepFormSchema.fields.amount.min(
      minStake.toNumber(),
      'You need at least ${min} stake'
    )
    return StakeStepFormSchema
  }, [minStake.toString()])
  const [amount, setAmount] = useNumberInput(0, stake ?? minStake)

  const formInitializer: StakeStepFormFields = {
    stake: new BN(amount),
  }
  const { changeField, fields } = useForm<StakeStepFormFields>(formInitializer, schema)

  const isSomeBalanceGteStake = useMemo(() => {
    return Object.entries(balances).some(([, balance]) => balance.transferable.gte(fields.stake ?? minStake))
  }, [fields.stake?.toString(), JSON.stringify(balances)])

  const isValidStake = useMemo(() => {
    return fields.stake?.gte(minStake) && isSomeBalanceGteStake
  }, [fields.stake?.toString(), isSomeBalanceGteStake])

  useEffect(() => {
    const stakeValue = new BN(amount)
    setStake(isValidStake ? stakeValue : undefined)
    changeField('stake', stakeValue)

    if (!isSomeBalanceGteStake || (account && balances[account.address].transferable.lt(stakeValue))) {
      setAccount()
    }
  }, [amount, isValidStake])

  const getStakeFieldMessage = () => {
    if (!fields.stake || isValidStake) {
      return
    }

    return isSomeBalanceGteStake ? (
      <>
        Minimum stake amount is <TextInlineSmall bold>{formatTokenValue(minStake)} JOY</TextInlineSmall>
      </>
    ) : (
      <>
        You have no <TextInlineSmall bold>{formatTokenValue(fields.stake)} JOY</TextInlineSmall> on any of your
        accounts.
      </>
    )
  }

  const accountsFilter = useCallback(
    (account: Account) =>
      filterByRequiredStake(fields.stake ?? minStake, 'Council Candidate', balances[account.address]),
    [(fields.stake ?? minStake).toString(), JSON.stringify(balances)]
  )

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent label="You are announcing candidacy using membership" inputSize="l" disabled>
            <SelectMember onChange={() => true} disabled selected={candidacyMember} />
          </InputComponent>
          <RowGapBlock gap={8}>
            <h4>1. Select an Account</h4>
            <TextMedium>First please select an account for staking.</TextMedium>
          </RowGapBlock>
          <InputComponent label="Select account for Staking" required inputSize="l" disabled={!isSomeBalanceGteStake}>
            <SelectAccount
              onChange={(account) => setAccount(account)}
              selected={account}
              minBalance={stake}
              filter={accountsFilter}
              disabled={!isSomeBalanceGteStake}
            />
          </InputComponent>
          <RowGapBlock gap={8}>
            <h4>2. Stake</h4>
            <TextMedium>
              You must stake <ValueInJoys>{formatTokenValue(minStake)}</ValueInJoys> to announce candidacy. This stake
              will be returned to you when the lorem ipsum dolor sit amet.
            </TextMedium>
          </RowGapBlock>
          <InputComponent
            id="amount-input"
            label="Select amount for Staking"
            units="JOY"
            required
            validation={fields.stake && !isValidStake ? 'invalid' : undefined}
            message={getStakeFieldMessage()}
            inputSize="s"
          >
            <InputNumber
              id="amount-input"
              value={formatTokenValue(fields.stake)}
              placeholder={minStake.toString()}
              onChange={(event) => setAmount(event.target.value)}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
