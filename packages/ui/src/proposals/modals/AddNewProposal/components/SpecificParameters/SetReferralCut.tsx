import React from 'react'

import { CurrencyName } from '@/app/constants/currency'
import { InputComponent, InputNumber } from '@/common/components/forms'
import { LinkSymbol } from '@/common/components/icons/symbols'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TooltipExternalLink } from '@/common/components/Tooltip'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { useApi } from '@/common/hooks/useApi'
import { useObservable } from '@/common/hooks/useObservable'

export const SetReferralCut = () => {
  const { api, connectionState } = useApi()
  const maximumReferralCut = api?.consts.members.referralCutMaximumPercent
  const membershipPrice = useObservable(api?.query.members.membershipPrice(), [connectionState])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>
            {' '}
            {/*Set referral cut as % from price of creating new membership, currently set as {membershipPrice?.toString()}{' '}*/}
            {/*{CurrencyName.integerValue} das*/}
            <TokenValue value={membershipPrice} />
          </TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            label="Referral Cut"
            tight
            units="%"
            message={`Enter value below ${maximumReferralCut ? maximumReferralCut.toNumber() + 1 : 100}%`}
            name="setReferralCut.referralCut"
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
              name="setReferralCut.referralCut"
              placeholder="0"
              maxAllowedValue={Math.pow(2, 8)}
            />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
