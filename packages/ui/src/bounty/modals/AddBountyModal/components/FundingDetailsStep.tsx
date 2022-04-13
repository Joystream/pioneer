import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import { ValidationHelpers } from '@/bounty/modals/AddBountyModal'
import { AddBountyStates } from '@/bounty/modals/AddBountyModal/machine'
import { InputNumber, InputComponent, Label, ToggleCheckbox } from '@/common/components/forms'
import { LinkSymbol } from '@/common/components/icons/symbols'
import { ColumnGapBlock, RowGapBlock } from '@/common/components/page/PageContent'
import { Tooltip, TooltipContainer, TooltipDefault, TooltipExternalLink } from '@/common/components/Tooltip'
import { TextMedium } from '@/common/components/typography'
import { BN_ZERO, Colors } from '@/common/constants'
import { inBlocksDate } from '@/common/model/inBlocksDate'

export interface FundingDetailsStepProps extends ValidationHelpers {
  minCherryLimit: number
}

export const FundingDetailsStep = ({ minCherryLimit, errorMessageGetter, errorChecker }: FundingDetailsStepProps) => {
  const form = useFormContext()
  const [isPerpetual, fundingPeriodLength, maximalRange] = form.watch([
    `${AddBountyStates.fundingPeriodDetails}.isPerpetual`,
    `${AddBountyStates.fundingPeriodDetails}.fundingPeriodLength`,
    `${AddBountyStates.fundingPeriodDetails}.fundingMaximalRange`,
  ])

  useEffect(() => {
    if (isPerpetual) {
      form.setValue('fundingPeriodDetails.fundingMinimalRange', BN_ZERO)
      form.trigger('fundingPeriodDetails.fundingMinimalRange')
    }
  }, [isPerpetual])

  useEffect(() => {
    form.trigger('fundingPeriodDetails.fundingMinimalRange')
  }, [maximalRange])

  return (
    <RowGapBlock gap={24}>
      <RowGapBlock gap={8}>
        <h4>Funding Period Details</h4>
      </RowGapBlock>
      <RowGapBlock gap={20}>
        <InputComponent
          id="field-cherry"
          label="Cherry"
          tight
          units="tJOY"
          required
          tooltipText="Funding period tooltip"
          message={errorChecker('cherry') ? errorMessageGetter('cherry') : `Minimum Cherry - ${minCherryLimit} tJOY`}
          validation={errorChecker('cherry') ? 'invalid' : undefined}
        >
          <InputNumber isInBN id="field-cherry" isTokenValue placeholder="0" name="fundingPeriodDetails.cherry" />
        </InputComponent>
      </RowGapBlock>
      <RowGapBlock gap={20}>
        <InlineToggleWrap>
          <Label>Funding period :</Label>
          <ToggleCheckbox
            trueLabel={
              <CheckBoxLabelWrapper>
                Perpetual
                <Tooltip
                  tooltipText={
                    <>
                      The funding period type refers to how funds are collected for the benefit of a bounty, and there
                      are fundamentally two types: Perpetual: new contributors can join on an ongoing basis before a
                      target which sets the upper bound for how much can be contributed. Limited: The funding lasts for
                      no longer than a given number of blocks, called the funding period. There is a lower bound and
                      upper bound for how much must be contributed.{' '}
                      <TooltipExternalLink
                        href="https://joystream.gitbook.io/testnet-workspace/system/bounties#funding-period-type"
                        target="_blank"
                      >
                        <TextMedium>Learn more</TextMedium> <LinkSymbol />
                      </TooltipExternalLink>
                    </>
                  }
                >
                  <TooltipDefault />
                </Tooltip>
              </CheckBoxLabelWrapper>
            }
            falseLabel={
              <CheckBoxLabelWrapper>
                <StyledParagraph>Limited</StyledParagraph>
              </CheckBoxLabelWrapper>
            }
            name="fundingPeriodDetails.isPerpetual"
          />
        </InlineToggleWrap>
      </RowGapBlock>
      {!isPerpetual && (
        <RowGapBlock gap={20}>
          <InputComponent
            label="Funding period length"
            required
            units="block"
            tight
            id="field-periodLength"
            message={fundingPeriodLength ? `≈ ${inBlocksDate(fundingPeriodLength)}` : ''}
          >
            <InputNumber
              isInBN
              id="field-periodLength"
              name="fundingPeriodDetails.fundingPeriodLength"
              placeholder="0"
              isTokenValue
            />
          </InputComponent>
        </RowGapBlock>
      )}
      <RowGapBlock gap={20}>
        <TextMedium bold>Funding target range *</TextMedium>
        <Subtitle>
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim
          velit mollit. Exercitation veniam consequat sunt nostrud amet.
        </Subtitle>
      </RowGapBlock>
      <ColumnGapBlock gap={20}>
        <InputComponent
          id="field-minRange"
          tight
          units="tJOY"
          required
          disabled={isPerpetual}
          message={
            !isPerpetual && errorChecker('fundingMinimalRange') ? errorMessageGetter('fundingMinimalRange') : ' '
          }
          validation={!isPerpetual && errorChecker('fundingMinimalRange') ? 'invalid' : undefined}
          label="Minimal range"
        >
          <InputNumber
            isInBN
            id="field-minRange"
            name="fundingPeriodDetails.fundingMinimalRange"
            disabled={isPerpetual}
            placeholder="0"
            isTokenValue
          />
        </InputComponent>
        <InputComponent id="field-maxRange" tight units="tJOY" required label="Maximal range">
          <InputNumber
            isInBN
            id="field-maxRange"
            name="fundingPeriodDetails.fundingMaximalRange"
            placeholder="0"
            isTokenValue
          />
        </InputComponent>
      </ColumnGapBlock>
    </RowGapBlock>
  )
}

export const InlineToggleWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;

  ${Label} {
    line-height: 20px;
    margin-bottom: 0;
  }

  ${TooltipContainer} {
    margin-left: 12px;
  }
`
const Subtitle = styled(TextMedium)`
  color: ${Colors.Black[600]};
`

export const CheckBoxLabelWrapper = styled.div`
  display: flex;
  column-gap: 4px;
`

export const StyledParagraph = styled.p`
  margin-left: 5px;
`
