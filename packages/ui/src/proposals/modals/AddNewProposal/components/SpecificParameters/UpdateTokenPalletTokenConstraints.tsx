import React from 'react'

import { CurrencyName } from '@/app/constants/currency'
import { InputComponent, InputNumber, TokenInput } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'

export const UpdateTokenPalletTokenConstraints = () => {
  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Update CRT pallet constraints</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        <RowGapBlock gap={20}>
          <InputComponent
            id="maxYearlyRate"
            name="updateTokenPalletTokenConstraints.maxYearlyRate"
            label="Maximum yearly rate"
            units="%"
            inputWidth="s"
            tight
          >
            <InputNumber id="maxYearlyRate" name="updateTokenPalletTokenConstraints.maxYearlyRate" placeholder="100" />
          </InputComponent>

          <InputComponent
            id="minAmmSlope"
            name="updateTokenPalletTokenConstraints.minAmmSlope"
            label="Minimum AMM slope"
            units={CurrencyName.integerValue}
            inputWidth="s"
            tight
          >
            <TokenInput id="minAmmSlope" name="updateTokenPalletTokenConstraints.minAmmSlope" placeholder="0" />
          </InputComponent>

          <InputComponent
            id="minSaleDuration"
            name="updateTokenPalletTokenConstraints.minSaleDuration"
            label="Minimum sale duration"
            units="blocks"
            inputWidth="s"
            tight
          >
            <InputNumber
              id="minSaleDuration"
              name="updateTokenPalletTokenConstraints.minSaleDuration"
              placeholder="0"
            />
          </InputComponent>

          <InputComponent
            id="minRevenueSplitDuration"
            name="updateTokenPalletTokenConstraints.minRevenueSplitDuration"
            label="Minimum revenue split duration"
            units="blocks"
            inputWidth="s"
            tight
          >
            <InputNumber
              id="minRevenueSplitDuration"
              name="updateTokenPalletTokenConstraints.minRevenueSplitDuration"
              placeholder="0"
            />
          </InputComponent>

          <InputComponent
            id="minRevenueSplitTimeToStart"
            name="updateTokenPalletTokenConstraints.minRevenueSplitTimeToStart"
            label="Minimum revenue split time to start"
            units="blocks"
            inputWidth="s"
            tight
          >
            <InputNumber
              id="minRevenueSplitTimeToStart"
              name="updateTokenPalletTokenConstraints.minRevenueSplitTimeToStart"
              placeholder="0"
            />
          </InputComponent>

          <InputComponent
            id="salePlatformFee"
            name="updateTokenPalletTokenConstraints.salePlatformFee"
            label="Sale platform fee"
            units="%"
            inputWidth="s"
            tight
          >
            <InputNumber
              id="salePlatformFee"
              name="updateTokenPalletTokenConstraints.salePlatformFee"
              placeholder="0"
            />
          </InputComponent>

          <InputComponent
            id="ammBuyTxFees"
            name="updateTokenPalletTokenConstraints.ammBuyTxFees"
            label="AMM buy transaction fees"
            units="%"
            inputWidth="s"
            tight
          >
            <InputNumber id="ammBuyTxFees" name="updateTokenPalletTokenConstraints.ammBuyTxFees" placeholder="0" />
          </InputComponent>

          <InputComponent
            id="ammSellTxFees"
            name="updateTokenPalletTokenConstraints.ammSellTxFees"
            label="AMM sell transaction fees"
            units="%"
            inputWidth="s"
            tight
          >
            <InputNumber id="ammSellTxFees" name="updateTokenPalletTokenConstraints.ammSellTxFees" placeholder="0" />
          </InputComponent>

          <InputComponent
            id="bloatBond"
            name="updateTokenPalletTokenConstraints.bloatBond"
            label="Bloat bond"
            units={CurrencyName.integerValue}
            inputWidth="s"
            tight
          >
            <TokenInput id="bloatBond" name="updateTokenPalletTokenConstraints.bloatBond" placeholder="0" />
          </InputComponent>
        </RowGapBlock>
      </Row>
    </RowGapBlock>
  )
}
