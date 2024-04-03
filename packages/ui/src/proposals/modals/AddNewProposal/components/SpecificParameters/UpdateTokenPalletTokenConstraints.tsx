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
            sublabel={`Currently: ${current?.maxYearlyRate ?? '-'}%`}
            units="%"
            inputWidth="s"
            tight
          >
            <InputNumber
              id="maxYearlyRate"
              name="updateTokenPalletTokenConstraints.maxYearlyRate"
              decimalScale={4}
              placeholder="100"
            />
          </InputComponent>

          <InputComponent
            id="minAmmSlope"
            name="updateTokenPalletTokenConstraints.minAmmSlope"
            label="Minimum AMM slope"
            sublabel={`Currently: ${whenDefined(current?.minAmmSlope, formatJoyValue) ?? '-'} ${
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
            sublabel={`Currently: ${current?.minSaleDuration ?? '-'} blocks`}
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
            sublabel={`Currently: ${current?.minRevenueSplitDuration ?? '-'} blocks`}
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
            sublabel={`Currently: ${current?.minRevenueSplitTimeToStart ?? '-'} blocks`}
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
            sublabel={`Currently: ${current?.salePlatformFee ?? '-'}%`}
            units="%"
            inputWidth="s"
            tight
          >
            <InputNumber
              id="salePlatformFee"
              name="updateTokenPalletTokenConstraints.salePlatformFee"
              decimalScale={4}
              placeholder="0"
            />
          </InputComponent>

          <InputComponent
            id="ammBuyTxFees"
            name="updateTokenPalletTokenConstraints.ammBuyTxFees"
            label="AMM buy transaction fees"
            sublabel={`Currently: ${current?.ammBuyTxFees ?? '-'}%`}
            units="%"
            inputWidth="s"
            tight
          >
            <InputNumber
              id="ammBuyTxFees"
              name="updateTokenPalletTokenConstraints.ammBuyTxFees"
              decimalScale={4}
              placeholder="0"
            />
          </InputComponent>

          <InputComponent
            id="ammSellTxFees"
            name="updateTokenPalletTokenConstraints.ammSellTxFees"
            label="AMM sell transaction fees"
            sublabel={`Currently: ${current?.ammSellTxFees ?? '-'}%`}
            units="%"
            inputWidth="s"
            tight
          >
            <InputNumber
              id="ammSellTxFees"
              name="updateTokenPalletTokenConstraints.ammSellTxFees"
              placeholder="0"
              decimalScale={4}
              isInBN={false}
            />
          </InputComponent>

          <InputComponent
            id="bloatBond"
            name="updateTokenPalletTokenConstraints.bloatBond"
            label="Bloat bond"
            sublabel={`Currently: ${whenDefined(current?.bloatBond, formatJoyValue) ?? '-'} ${
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
