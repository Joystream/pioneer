import React from 'react'
import { useFormContext } from 'react-hook-form'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { CurrencyName } from '@/app/constants/currency'
import { InlineToggleWrap, InputComponent, Label, ToggleCheckbox, TokenInput } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextMedium, TextSmall, TextInlineSmall } from '@/common/components/typography'
import { Prompt } from './Prompt'

export const FundingRequest = () => {
  const { watch, setValue } = useFormContext()
  const [payMultiple] = watch(['fundingRequest.payMultiple'])
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Funding Request</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={24}>
          <Row>
            <InlineToggleWrap>
              <Label>Pay multiple</Label>
              <Tooltip
                tooltipTitle="Pay multiple"
                tooltipText="For multiple accounts and amounts, follow this CSV pattern:<br/> 
              account1, amount1<br/> 
              account2, amount2<br/> 
              ...<br/> 
              account20, amount20"
              >
                <TooltipDefault />
              </Tooltip>
            </InlineToggleWrap>
            <ToggleCheckbox falseLabel="No" trueLabel="Yes" name="fundingRequest.payMultiple" />
          </Row>
          {payMultiple && (
            <Row>
              <Prompt>
                <TextSmall>
                  For <TextInlineSmall bold>multiple accounts and amounts</TextInlineSmall>, follow this CSV pattern:
                  <br />
                  account1, amount1
                  <br />
                  account2, amount2
                  <br />
                  ...
                  <br />
                  account20, amount20
                </TextSmall>
              </Prompt>
            </Row>
          )}
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            label="Amount"
            tight
            units={CurrencyName.integerValue}
            required
            message="Amount must be greater than zero"
            name="fundingRequest.amount"
          >
            <TokenInput id="amount-input" placeholder="0" name="fundingRequest.amount" />
          </InputComponent>
          <InputComponent label="Recipient account" required inputSize="l">
            <SelectAccount name="fundingRequest.account" />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
