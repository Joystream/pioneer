import React, { useCallback, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { CurrencyName } from '@/app/constants/currency'
import { ButtonPrimary } from '@/common/components/buttons'
import {
  InlineToggleWrap,
  InputComponent,
  Label,
  ToggleCheckbox,
  TokenInput,
  InputTextarea,
} from '@/common/components/forms'
import { Arrow } from '@/common/components/icons'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { TextMedium, TextSmall, TextInlineSmall } from '@/common/components/typography'
import { CSV_PATTERN } from '@/proposals/constants/regExp'

import { PreviewAndValidateModal } from './modals/PreviewAndValidate'
import { ErrorPrompt, Prompt } from './Prompt'

export const FundingRequest = () => {
  const { watch, setValue, getValues } = useFormContext()
  const [isPreviewModalShown, setIsPreviewModalShown] = useState(false)
  const [previewModalData, setPreviewModalData] = useState<string[]>([])
  const [payMultiple] = watch(['fundingRequest.payMultiple'])
  const [hasPreviewedInput] = watch(['fundingRequest.hasPreviewedInput'],{'fundingRequest.hasPreviewedInput':true})
  const verifyInput = useCallback((input: string) => {
    setValue('fundingRequest.hasPreviewedInput', false,{shouldValidate: true})
    setValue('fundingRequest.accountsAndAmounts',input, {shouldValidate: true})
  },[])
  const previewInput = useCallback(() => {
    const input = getValues('fundingRequest.accountsAndAmounts')
    if(CSV_PATTERN.test(input)){
      const inputSplit = input.split(';\n')
      setValue('fundingRequest.hasPreviewedInput', true,{shouldValidate: true})
      setIsPreviewModalShown(true)
      setPreviewModalData(inputSplit)
    }
  },[])
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Funding Request</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={payMultiple ? 6 : 24}>
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
                  account1, amount1;
                  <br />
                  account2, amount2;
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
        {payMultiple ? (
          <RowGapBlock gap={12}>
            <InputComponent
              label="Destination accounts and transfer amounts"
              required
              message={'You can select up to 20 recipients'}
              name="fundingRequest.accountsAndAmounts"
              id="accounts-amounts"
              inputSize="xl"
            >
              <InputTextarea
                id="accounts-amounts"
                name="fundingRequest.accountsAndAmounts"
                placeholder="Destination account address and amount"
                onInput={(event) => verifyInput(event.currentTarget.value)}
              />
            </InputComponent>
            <HiddenCheckBox name="fundingRequest.hasPreviewedInput" checked={hasPreviewedInput}/>
            {!hasPreviewedInput && <ErrorPrompt>Please preview and validate the inputs to proceed</ErrorPrompt>}
            <ButtonPrimary
              size="medium"
              onClick={() => previewInput()}
            >
              Preview and Validate <Arrow direction="right" />
            </ButtonPrimary>
          </RowGapBlock>
        ) : (
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
        )}
      </Row>
      {isPreviewModalShown && (
        <PreviewAndValidateModal previewModalData={previewModalData} setIsPreviewModalShown={setIsPreviewModalShown} setValue={setValue}/>
      )}
    </RowGapBlock>
  )
}
const HiddenCheckBox = styled.input.attrs({ type: 'checkbox' })`
margin-top: -12px;
height: 0px;
visibility: hidden;
`