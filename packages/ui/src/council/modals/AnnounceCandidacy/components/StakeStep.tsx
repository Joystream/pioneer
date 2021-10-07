import BN from 'bn.js'
import React, { useEffect, useMemo } from 'react'
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

  const formInitializer: StakeStepFormFields = {
    stake: stake ?? minStake,
  }
  const { changeField, fields } = useForm<StakeStepFormFields>(formInitializer, schema)

  useEffect(() => {
    setStake(fields.stake)
  }, [])

  const isSomeBalanceGteStake = () => {
    return Object.entries(balances).some(([, balance]) => balance.transferable.gte(fields.stake ?? minStake))
  }

  const isValidStake = fields.stake?.gte(minStake) && isSomeBalanceGteStake()
  const getStakeFieldMessage = () => {
    if (!fields.stake || isValidStake) {
      return
    }

    return isSomeBalanceGteStake() ? (
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
  const setStakeValue = (value: any) => {
    value = !isNaN(value) ? new BN(value) : fields.stake

    setStake(value && isValidStake ? value : undefined)
    changeField('stake', value)

    if (!isSomeBalanceGteStake() || (account && balances[account.address].transferable.lt(value))) {
      setAccount()
    }
  }

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Staking</h4>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent label="You are announcing candidacy for membership" inputSize="l" disabled>
            <SelectMember onChange={() => true} disabled selected={candidacyMember} />
          </InputComponent>
          <InputComponent label="Staking account" required inputSize="l" disabled={!isSomeBalanceGteStake()}>
            <SelectAccount
              onChange={(account) => setAccount(account)}
              selected={account}
              minBalance={stake}
              filter={(account) =>
                filterByRequiredStake(fields.stake ?? minStake, 'Council Candidate', balances[account.address])
              }
              disabled={!isSomeBalanceGteStake()}
            />
          </InputComponent>
          <RowGapBlock gap={8}>
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
              value={fields.stake?.toString()}
              placeholder={minStake.toString()}
              onChange={(event) => setStakeValue(event.target.value)}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
