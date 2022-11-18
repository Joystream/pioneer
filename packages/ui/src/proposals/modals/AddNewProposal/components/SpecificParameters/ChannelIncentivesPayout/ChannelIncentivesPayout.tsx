import React, { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import { useApi } from '@/api/hooks/useApi'
import { CurrencyName } from '@/app/constants/currency'
import { FileDropzone } from '@/common/components/FileDropzone'
import {
  InlineToggleWrap,
  InputComponent,
  InputText,
  Label,
  ToggleCheckbox,
  TokenInput,
} from '@/common/components/forms'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { useObservable } from '@/common/hooks/useObservable'
import { calculateFileHash } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/ChannelIncentivesPayout/helpers'
import { getValidatedFiles } from '@/proposals/modals/AddNewProposal/components/SpecificParameters/RuntimeUpgrade'

const MAX_FILE_SIZE = 3 * 1024 * 1024

export const ChannelIncentivesPayout = () => {
  const { api } = useApi()
  const { setValue } = useFormContext()
  const expectedDataSizeFee = useObservable(() => api?.query.storage.dataObjectPerMegabyteFee(), [api?.isConnected])
  const expectedDataObjectStateBloatBond = useObservable(
    () => api?.query.storage.dataObjectStateBloatBondValue(),
    [api?.isConnected]
  )

  useEffect(() => {
    if (expectedDataSizeFee && expectedDataObjectStateBloatBond) {
      setValue('channelIncentivesPayout.expectedDataSizeFee', expectedDataSizeFee)
      setValue('channelIncentivesPayout.expectedDataObjectStateBloatBond', expectedDataObjectStateBloatBond)
    }
  }, [!expectedDataObjectStateBloatBond && !expectedDataSizeFee])

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length) {
        const fileHash = await calculateFileHash(acceptedFiles[0])
        setValue('channelIncentivesPayout.objectCreationParamsSize', acceptedFiles[0].size)
        setValue('channelIncentivesPayout.objectCreationParamsContent', fileHash)
        setValue('channelIncentivesPayout.test', acceptedFiles[0])
      }
    },
    [setValue]
  )

  return (
    <RowGapBlock gap={24}>
      <Row>
        <h4>Specific parameters</h4>
      </Row>
      <Row>
        <FileDropzone
          title="Channel Incentives Payout Payload"
          subtitle="Upload Payout Payload document produced by respective CLI service here"
          // accept="application/wasm"
          maxFiles={1}
          maxSize={MAX_FILE_SIZE}
          multiple={false}
          getFilesFromEvent={getValidatedFiles}
          // validator={validator}
          onDrop={onDrop}
        />
      </Row>

      <Row>
        <InputComponent
          label="Link to Incentives Details"
          sublabel="Add the link to the Payout Incentives Payload details from the external tool"
          tight
          name="channelIncentivesPayout.link"
        >
          <InputText id="amount-input" name="channelIncentivesPayout.link" placeholder="Add link" />
        </InputComponent>
      </Row>

      <Row>
        <InputComponent label="Payload Hash String" tight name="channelIncentivesPayout.hash">
          <InputText id="amount-input" name="channelIncentivesPayout.hash" placeholder="Payload Hash String" />
        </InputComponent>
      </Row>

      <Row>
        <InlineToggleWrap>
          <Label>Block all cashouts: </Label>
          <ToggleCheckbox
            trueLabel="Cashouts enabled"
            falseLabel="Cashouts blocked"
            name="channelIncentivesPayout.cashoutEnabled"
          />
        </InlineToggleWrap>
      </Row>

      <Row>
        <InputComponent
          label="Minimum Cashout Allowed"
          tight
          units={CurrencyName.integerValue}
          name="channelIncentivesPayout.minimumCashoutAllowed"
        >
          <TokenInput id="amount-input" name="channelIncentivesPayout.minimumCashoutAllowed" placeholder="0" />
        </InputComponent>
      </Row>

      <Row>
        <InputComponent
          label="Maximum Cashout Allowed"
          tight
          units={CurrencyName.integerValue}
          name="channelIncentivesPayout.maximumCashoutAllowed"
        >
          <TokenInput id="amount-input" name="channelIncentivesPayout.maximumCashoutAllowed" placeholder="0" />
        </InputComponent>
      </Row>

      <Row>
        <InputComponent
          label="Credit Content WG Budget by"
          tight
          units={CurrencyName.integerValue}
          name="channelIncentivesPayout.creditContentBudgetBy"
        >
          <TokenInput id="amount-input" name="channelIncentivesPayout.creditContentBudgetBy" placeholder="0" />
        </InputComponent>
      </Row>
    </RowGapBlock>
  )
}
