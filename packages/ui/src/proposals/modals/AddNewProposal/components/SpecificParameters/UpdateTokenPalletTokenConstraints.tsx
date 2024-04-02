import React from 'react'

import { useApi } from '@/api/hooks/useApi'
import { CurrencyName } from '@/app/constants/currency'
import { InputComponent, InputNumber, TokenInput } from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium } from '@/common/components/typography'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { formatJoyValue } from '@/common/model/formatters'
import { whenDefined } from '@/common/utils'
import { crtConstraints$ } from '@/proposals/model/crtConstraints'

export const UpdateTokenPalletTokenConstraints = () => {
  const { api } = useApi()
  const current = useFirstObservableValue(() => crtConstraints$(api), [api?.isConnected])

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
            message={`Currently: ${current?.maxYearlyRate ?? '-'}%`}
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
            message={`Currently: ${whenDefined(current?.minAmmSlope, formatJoyValue) ?? '-'} ${
              CurrencyName.integerValue
            }`}
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
            message={`Currently: ${current?.minSaleDuration ?? '-'} blocks`}
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
            message={`Currently: ${current?.minSaleDuration ?? '-'} blocks`}
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
            message={`Currently: ${current?.minSaleDuration ?? '-'} blocks`}
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
            message={`Currently: ${current?.salePlatformFee ?? '-'}%`}
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
            message={`Currently: ${current?.ammBuyTxFees ?? '-'}%`}
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
            message={`Currently: ${current?.ammSellTxFees ?? '-'}%`}
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
            message={`Currently: ${whenDefined(current?.bloatBond, formatJoyValue) ?? '-'} ${
              CurrencyName.integerValue
            }`}
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
