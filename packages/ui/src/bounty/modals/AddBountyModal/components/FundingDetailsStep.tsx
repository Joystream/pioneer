import BN from 'bn.js'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'

import { FundingPeriodDetailsContext, GeneralParametersContext } from '@/bounty/modals/AddBountyModal/machine'
import { InputComponent, InputNumber, Label, ToggleCheckbox } from '@/common/components/forms'
import { getErrorMessage, hasError } from '@/common/components/forms/FieldError'
import { LinkSymbol } from '@/common/components/icons/symbols'
import { ColumnGapBlock, RowGapBlock } from '@/common/components/page/PageContent'
import { Tooltip, TooltipContainer, TooltipDefault, TooltipExternalLink } from '@/common/components/Tooltip'
import { TextMedium } from '@/common/components/typography'
import { BN_ZERO, Colors } from '@/common/constants'
import { useSchema } from '@/common/hooks/useSchema'
import { inBlocksDate } from '@/common/model/inBlocksDate'
import { Address } from '@/common/types'

export interface FundingDetailsStepProps extends Omit<FundingPeriodDetailsContext, keyof GeneralParametersContext> {
  setFundingMaximalRange: (fundingMaximalRange: BN) => void
  setFundingMinimalRange: (fundingMinimalRange: BN) => void
  setCherry: (cherry: BN) => void
  setFundingPeriodLength: (fundingPeriodLength: BN) => void
  setFundingPeriodType: (fundingPeriodType: string) => void
  account?: Address
  maxCherryLimit: number
  minCherryLimit: number
}

const baseSchema = Yup.object().shape({
  cherry: Yup.number(),
  fundingMaximalRange: Yup.number(),
  fundingMinimalRange: Yup.number().lessThan(
    Yup.ref('fundingMaximalRange'),
    'Minimal range cannot be greater than maximal'
  ),
})

export const FundingDetailsStep = ({
  fundingMaximalRange,
  fundingMinimalRange,
  cherry,
  fundingPeriodLength,
  fundingPeriodType,
  setCherry,
  setFundingPeriodType,
  setFundingPeriodLength,
  setFundingMinimalRange,
  setFundingMaximalRange,
  maxCherryLimit,
  minCherryLimit,
}: FundingDetailsStepProps) => {
  const switchCheckbox = (isSet: boolean) => {
    if (isSet) {
      return setFundingPeriodType('limited')
    }
    setFundingPeriodType('perpetual')
    setFundingMinimalRange(BN_ZERO)
  }

  const schema = useMemo(() => {
    baseSchema.fields.cherry = baseSchema.fields.cherry
      .min(minCherryLimit, 'Cherry must be greater than minimum of ${min} JOY')
      .max(maxCherryLimit, 'Cherry of ${max} JOY exceeds your balance')

    return baseSchema
  }, [maxCherryLimit, minCherryLimit])

  const { errors } = useSchema(
    {
      cherry: cherry?.toNumber(),
      fundingMinimalRange: fundingMinimalRange?.toNumber(),
      fundingMaximalRange: fundingMaximalRange?.toNumber(),
    },
    schema
  )

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
          message={
            hasError('cherry', errors) ? getErrorMessage('cherry', errors) : `Minimum Cherry - ${minCherryLimit} JOY`
          }
          validation={hasError('cherry', errors) ? 'invalid' : undefined}
        >
          <InputNumber
            id="field-cherry"
            isTokenValue
            value={cherry?.toString()}
            placeholder="0"
            onChange={(_, value) => setCherry(new BN(value))}
          />
        </InputComponent>
      </RowGapBlock>
      <RowGapBlock gap={20}>
        <InlineToggleWrap>
          <Label>Funding period :</Label>
          <ToggleCheckbox
            falseLabel={
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
            trueLabel={
              <CheckBoxLabelWrapper>
                <StyledParagraph>Limited</StyledParagraph>
              </CheckBoxLabelWrapper>
            }
            checked={fundingPeriodType === 'limited'}
            onChange={switchCheckbox}
          />
        </InlineToggleWrap>
      </RowGapBlock>
      {fundingPeriodType === 'limited' && (
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
              value={fundingPeriodLength?.toString()}
              placeholder="0"
              id="field-periodLength"
              isTokenValue
              onChange={(_, value) => setFundingPeriodLength(new BN(value))}
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
          disabled={fundingPeriodType === 'perpetual'}
          message={hasError('fundingMinimalRange', errors) ? getErrorMessage('fundingMinimalRange', errors) : ' '}
          validation={hasError('fundingMinimalRange', errors) ? 'invalid' : undefined}
          label="Minimal range"
        >
          <InputNumber
            isTokenValue
            id="field-minRange"
            disabled={fundingPeriodType === 'perpetual'}
            value={fundingMinimalRange?.toString()}
            placeholder="0"
            onChange={(_, value) => setFundingMinimalRange(new BN(value))}
          />
        </InputComponent>
        <InputComponent id="field-maxRange" tight units="tJOY" required label="Maximal range">
          <InputNumber
            isTokenValue
            id="field-maxRange"
            value={fundingMaximalRange?.toString()}
            placeholder="0"
            onChange={(_, value) => setFundingMaximalRange(new BN(value))}
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
