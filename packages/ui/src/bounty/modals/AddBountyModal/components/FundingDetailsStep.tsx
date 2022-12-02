import BN from 'bn.js'
import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import { CurrencyName } from '@/app/constants/currency'
import { AddBountyStates } from '@/bounty/modals/AddBountyModal/machine'
import { TokenInput, InputComponent, Label, ToggleCheckbox, InputNumber } from '@/common/components/forms'
import { LinkSymbol } from '@/common/components/icons/symbols'
import { ColumnGapBlock, RowGapBlock } from '@/common/components/page/PageContent'
import { Tooltip, TooltipContainer, TooltipDefault, TooltipExternalLink } from '@/common/components/Tooltip'
import { TextMedium } from '@/common/components/typography'
import { BN_ZERO, Colors } from '@/common/constants'
import { inBlocksDate } from '@/common/model/inBlocksDate'
import { ValidationHelpers } from '@/common/utils/validation'

export interface FundingDetailsStepProps extends ValidationHelpers {
  minCherryLimit: BN
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
          units={CurrencyName.integerValue}
          required
          tooltipText="Bounty creator has to put up an initial bounty, called a cherry, which is split among all contributors pro-rata in case bounty fails. This cherry generates an incentive for contributors, as even when the funding fails, they get a benefit. In case bounty succeeds, cherry is returned to the creator in full at the time, when Oracle submits judgement."
          tooltipLinkURL="https://joystream.gitbook.io/testnet-workspace/system/bounties#assurance-contracts-and-dominant-assurance-contracts"
          message={
            errorChecker('cherry')
              ? errorMessageGetter('cherry')
              : `Minimum Cherry - ${minCherryLimit} ${CurrencyName.integerValue}`
          }
          validation={errorChecker('cherry') ? 'invalid' : undefined}
        >
          <TokenInput id="field-cherry" placeholder="0" name="fundingPeriodDetails.cherry" />
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
            />
          </InputComponent>
        </RowGapBlock>
      )}
      <RowGapBlock gap={20}>
        <TextMedium bold>Funding target range *</TextMedium>
        <Subtitle>
          Define funding range. Working Period stage commences when minimal range is funded in limited funding type, and
          maximal range for perpetual funding type.
        </Subtitle>
      </RowGapBlock>
      <ColumnGapBlock gap={20}>
        <InputComponent
          id="field-minRange"
          tight
          units={CurrencyName.integerValue}
          required
          disabled={isPerpetual}
          message={
            !isPerpetual && errorChecker('fundingMinimalRange') ? errorMessageGetter('fundingMinimalRange') : ' '
          }
          validation={!isPerpetual && errorChecker('fundingMinimalRange') ? 'invalid' : undefined}
          label="Minimal range"
          tooltipText="Cumulative funding must be above minimal range for bounty to proceed to Working Stage period in limited funding."
        >
          <TokenInput
            id="field-minRange"
            name="fundingPeriodDetails.fundingMinimalRange"
            disabled={isPerpetual}
            placeholder="0"
          />
        </InputComponent>
        <InputComponent
          id="field-maxRange"
          tight
          units={CurrencyName.integerValue}
          required
          label="Maximal range"
          tooltipText={
            <>
              Cumulative funding must be above maximal range for bounty to proceed to Working Stage period in perpetual
              funding. If a contribution is made that brings the cumulative funding equal to or above the upper bound
              (maximal range), then the difference is returned, and the bounty proceeds to the Working Period stage.
              Lastly, if the funding period is limited and the time passes this time, then the bounty proceeds to the
              Bounty Failed stage if there was at least one contribution made, otherwise it proceeds to the Expired
              Funding Period stage.{' '}
              <TooltipExternalLink
                href="https://joystream.gitbook.io/testnet-workspace/system/bounties#concepts"
                target="_blank"
              >
                <TextMedium>Learn more</TextMedium> <LinkSymbol />
              </TooltipExternalLink>
            </>
          }
        >
          <TokenInput id="field-maxRange" name="fundingPeriodDetails.fundingMaximalRange" placeholder="0" />
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
