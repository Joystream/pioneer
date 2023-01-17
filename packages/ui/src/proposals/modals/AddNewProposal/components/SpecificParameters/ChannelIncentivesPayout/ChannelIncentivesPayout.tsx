import { blake2AsHex } from '@polkadot/util-crypto'
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
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { channelPayoutsComitmentFromPayload } from '@/proposals/helpers/channelPayoutsComitmentFromPayload'
import {
  channelPayoutsFileValidator,
  getChannelPayoutsValidatedFiles,
} from '@/proposals/modals/AddNewProposal/components/SpecificParameters/ChannelIncentivesPayout/helpers'

export const ChannelIncentivesPayout = () => {
  const { api } = useApi()
  const { active } = useMyMemberships()
  const { setValue, watch } = useFormContext()
  const [payloadSize, payloadHash] = watch([
    'channelIncentivesPayout.payloadSize',
    'channelIncentivesPayout.payloadHash',
  ])
  const expectedDataSizeFee = useObservable(() => api?.query.storage.dataObjectPerMegabyteFee(), [api?.isConnected])
  const expectedDataObjectStateBloatBond = useObservable(
    () => api?.query.storage.dataObjectStateBloatBondValue(),
    [api?.isConnected]
  )

  useEffect(() => {
    if (!active || !payloadHash || !expectedDataSizeFee || !expectedDataObjectStateBloatBond) return
    setValue('channelIncentivesPayout.payload', {
      uploaderAccount: active.controllerAccount,
      objectCreationParams: { size_: payloadSize, ipfsContentId: payloadHash },
      expectedDataSizeFee: expectedDataSizeFee,
      expectedDataObjectStateBloatBond: expectedDataObjectStateBloatBond,
    })
  }, [active, payloadHash, !expectedDataObjectStateBloatBond && !expectedDataSizeFee])

  const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false)
  const onDrop = useCallback(
    async ([file]: File[]) => {
      if (!file) return
      setIsProcessingFile(true)
      const [commitment, payload] = await Promise.all([channelPayoutsComitmentFromPayload(file), file.arrayBuffer()])
      setValue('channelIncentivesPayout.payloadSize', payload.byteLength, { shouldValidate: true })
      setValue('channelIncentivesPayout.payloadHash', blake2AsHex(new Uint8Array(payload)), { shouldValidate: true })
      setValue('channelIncentivesPayout.commitment', commitment, { shouldValidate: true })
      setIsProcessingFile(false)
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
          accept="application/octet-stream"
          maxFiles={1}
          multiple={false}
          getFilesFromEvent={getChannelPayoutsValidatedFiles}
          onDrop={onDrop}
          validator={channelPayoutsFileValidator}
        />
        {isProcessingFile && (
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
