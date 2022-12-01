import { generateJsonPayloadFromPayoutsVector, generateSerializedPayload } from '@joystream/js/content'
import * as multihash from 'multihashes'
import React, { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import { useApi } from '@/api/hooks/useApi'
import { CurrencyName } from '@/app/constants/currency'
import { FileDropzone } from '@/common/components/FileDropzone/FileDropzone'
import { InlineToggleWrap, InputComponent, Label, ToggleCheckbox, TokenInput } from '@/common/components/forms'
import { Loading } from '@/common/components/Loading'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { useObservable } from '@/common/hooks/useObservable'
import {
  channelPayoutsFileValidator,
  getChannelPayoutsValidatedFiles,
} from '@/proposals/modals/AddNewProposal/components/SpecificParameters/ChannelIncentivesPayout/helpers'

const MAX_FILE_SIZE = 3 * 1024 * 1024

export const ChannelIncentivesPayout = () => {
  const { api } = useApi()
  const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false)
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
        setIsProcessingFile(true)
        const json = JSON.parse(await acceptedFiles[0].text())
        const [commitment, channelPayouts] = generateJsonPayloadFromPayoutsVector(json)
        const serializedPayload = generateSerializedPayload(channelPayouts)
        setValue('channelIncentivesPayout.objectCreationParamsSize', serializedPayload.length, { shouldValidate: true })
        setValue('channelIncentivesPayout.commitment', commitment, { shouldValidate: true })
        setValue(
          'channelIncentivesPayout.objectCreationParamsContent',
          multihash.toB58String(multihash.encode(serializedPayload, 'blake3')),
          { shouldValidate: true }
        )
        setIsProcessingFile(false)
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
          accept="application/json"
          maxFiles={1}
          maxSize={MAX_FILE_SIZE}
          multiple={false}
          getFilesFromEvent={getChannelPayoutsValidatedFiles}
          onDrop={onDrop}
          validator={channelPayoutsFileValidator}
        />
        {!isProcessingFile && (
          <Box>
            <Loading text="Processing your file..." withoutMargin />
          </Box>
        )}
      </Row>

      {/*<Row>*/}
      {/*  <InputComponent*/}
      {/*    label="Link to Incentives Details"*/}
      {/*    sublabel="Add the link to the Payout Incentives Payload details from the external tool"*/}
      {/*    tight*/}
      {/*    name="channelIncentivesPayout.link"*/}
      {/*  >*/}
      {/*    <InputText id="amount-input" name="channelIncentivesPayout.link" placeholder="Add link" />*/}
      {/*  </InputComponent>*/}
      {/*</Row>*/}

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

      {/*<Row>*/}
      {/*  <InputComponent*/}
      {/*    label="Credit Content WG Budget by"*/}
      {/*    tight*/}
      {/*    units={CurrencyName.integerValue}*/}
      {/*    name="channelIncentivesPayout.creditContentBudgetBy"*/}
      {/*  >*/}
      {/*    <TokenInput id="amount-input" name="channelIncentivesPayout.creditContentBudgetBy" placeholder="0" />*/}
      {/*  </InputComponent>*/}
      {/*</Row>*/}
    </RowGapBlock>
  )
}

const Box = styled.div`
  > div {
    width: 100%;
    margin: 10px 0;
  }
`
