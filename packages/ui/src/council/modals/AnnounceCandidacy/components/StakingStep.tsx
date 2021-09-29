import { fireEvent } from '@testing-library/react'
import BN from 'bn.js'
import React, { useEffect } from 'react'
import * as Yup from 'yup'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { filterByMinBalance } from '@/accounts/components/SelectAccount/helpers'
import { useMyBalances } from '@/accounts/hooks/useMyBalances'
import { Account } from '@/accounts/types'
import { InputComponent, InputNumber } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, ValueInJoys } from '@/common/components/typography'
import { useForm } from '@/common/hooks/useForm'
import { formatTokenValue } from '@/common/model/formatters'
import { SelectMember } from '@/memberships/components/SelectMember'
import { Member } from '@/memberships/types'

interface StakingStepProps {
  candidacyMember: Member
  minStake: BN
  stake?: BN
  setStake: (stake?: BN) => void
  account?: Account
  setAccount: (account?: Account) => void
}

type FormFields = Pick<StakingStepProps, 'stake'>
const FormSchema = Yup.object().shape({})

export const StakingStep = ({ candidacyMember, minStake, stake, setStake, account, setAccount }: StakingStepProps) => {
  const balances = useMyBalances()

  const formInitializer: FormFields = {
    stake: minStake,
  }
  const { fields, changeField } = useForm<FormFields>(formInitializer, FormSchema)

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
        Minimum stake amount is <ValueInJoys>{formatTokenValue(minStake)}</ValueInJoys>
      </>
    ) : (
      <>
        You have no <ValueInJoys>{formatTokenValue(fields.stake)}</ValueInJoys> on any of your accounts.
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
              filter={(account) => filterByMinBalance(fields.stake ?? minStake, balances[account.address])}
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
            label="Staking amount"
            units="JOY"
            validation={fields.stake && !isValidStake ? 'invalid' : undefined}
            message={getStakeFieldMessage()}
            inputSize="s"
          >
            <InputNumber
              id="stakeAmount"
              value={fields.stake?.toString()}
              onChange={(event) => setStakeValue(event.target.value)}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
