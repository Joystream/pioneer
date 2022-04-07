import React, { useEffect, useMemo } from 'react'
import * as Yup from 'yup'

import { InputComponent, InputNumber } from '@/common/components/forms'
import { getErrorMessage, hasError } from '@/common/components/forms/FieldError'
import { LinkSymbol } from '@/common/components/icons/symbols'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TooltipExternalLink } from '@/common/components/Tooltip'
import { TextMedium } from '@/common/components/typography'
import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'
import { useSchema } from '@/common/hooks/useSchema'
import { ExecutionProps } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/SpecificParametersStep'

export interface SetReferralCutParameters {
  referralCut?: number
}

interface Props extends SetReferralCutParameters, ExecutionProps {
  setReferralCut: (amount: number) => void
}

const baseSchema = Yup.object().shape({
  referralCut: Yup.number(),
})

export const SetReferralCut = ({ referralCut, setReferralCut, setIsExecutionError }: Props) => {
  const { api, connectionState } = useApi()
  const maximumReferralCut = api?.consts.members.referralCutMaximumPercent
  const membershipPrice = useObservable(api?.query.members.membershipPrice(), [connectionState])

  const schema = useMemo(() => {
    if (maximumReferralCut) {
      baseSchema.fields.referralCut = baseSchema.fields.referralCut.max(
        maximumReferralCut.toNumber(),
        'Input must be equal or less than ${max}% for proposal to execute'
      )
    }

    return baseSchema
  }, [maximumReferralCut])

  const { errors } = useSchema({ referralCut }, schema)

  useEffect(() => setIsExecutionError(!!errors.length), [errors.length])

  const onChange = (_: any, value: number) => {
    if (Number(value) > 100) return

    setReferralCut(value)
  }

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>
            {' '}
            Set referral cut as % from price of creating new membership, currently set as {membershipPrice?.toString()}{' '}
            tJOY
          </TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            label="Referral Cut"
            tight
            units="%"
            validation={hasError('referralCut', errors) ? 'invalid' : undefined}
            message={
              hasError('referralCut', errors)
                ? getErrorMessage('referralCut', errors)
                : `Enter value below ${maximumReferralCut ? maximumReferralCut.toNumber() + 1 : 100}%`
            }
            required
            tooltipText={
              <TextMedium>
                When purchasing a membership, another member, called a reference, can be referenced, resulting in a
                portion of the burned funds being credited to the reference. This portion is a mutable parameter denoted
                as referral_cut and defined as the membership fee percentage. Currently, there is a limit of 50% for the
                referral cut.
                <TooltipExternalLink
                  target="_blank"
                  href="https://joystream.gitbook.io/testnet-workspace/system/memberships#buying-a-membership"
                >
                  Learn more <LinkSymbol />
                </TooltipExternalLink>
              </TextMedium>
            }
          >
            <InputNumber
              id="amount-input"
              isTokenValue
              value={referralCut?.toString()}
              placeholder="0"
              onChange={onChange}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
