import React, { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

import { useApi } from '@/api/hooks/useApi'
import { CurrencyName } from '@/app/constants/currency'
import { FileDropzone } from '@/common/components/FileDropzone/FileDropzone'
import {
  InlineToggleWrap,
  Input,
  InputComponent,
  InputNumber,
  Label,
  ToggleCheckbox,
  TokenInput,
} from '@/common/components/forms'
import { Loading } from '@/common/components/Loading'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { useObservable } from '@/common/hooks/useObservable'
import { merkleRootFromBinary, hashFile } from '@/common/utils/crypto/worker'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

export const ChannelIncentivesPayout = () => {
  const { api } = useApi()
  const { active } = useMyMemberships()
  const { setValue, watch } = useFormContext()
  const [payloadSize, payloadHash, commitment] = watch([
    'channelIncentivesPayout.payloadSize',
    'channelIncentivesPayout.payloadHash',
    'channelIncentivesPayout.commitment',
  ])
  const expectedDataSizeFee = useObservable(() => api?.query.storage.dataObjectPerMegabyteFee(), [api?.isConnected])
  const expectedDataObjectStateBloatBond = useObservable(
    () => api?.query.storage.dataObjectStateBloatBondValue(),
    [api?.isConnected]
  )

  useEffect(() => {
    if (!active || !payloadHash || !expectedDataSizeFee || !expectedDataObjectStateBloatBond) return
    const payload = {
      uploaderAccount: active.controllerAccount,
      objectCreationParams: { size_: payloadSize, ipfsContentId: payloadHash },
      expectedDataSizeFee: expectedDataSizeFee,
      expectedDataObjectStateBloatBond: expectedDataObjectStateBloatBond,
    }
    setValue('channelIncentivesPayout.payload', payload)
  }, [active, payloadHash, !expectedDataObjectStateBloatBond && !expectedDataSizeFee])

  const [isProcessingFile, setIsProcessingFile] = useState<boolean>(false)
  const processPayload = useCallback(
    async ([file]: File[]): Promise<File[]> => {
      if (!file) return []

      setIsProcessingFile(true)

      setValue('channelIncentivesPayout.payload', undefined)
      setValue('channelIncentivesPayout.payloadSize', file.size, { shouldValidate: true }) // Set it first for when no file was set before
      setValue('channelIncentivesPayout.payloadHash', undefined, { shouldValidate: true })
      setValue('channelIncentivesPayout.commitment', undefined, { shouldValidate: true })
      setValue('channelIncentivesPayout.payloadSize', file.size, { shouldValidate: true }) // Set it again for when a valid file was set before

      const errors: string[] = []

      const hash = hashFile(file).then(
        (hash) => {
          setValue('channelIncentivesPayout.payloadHash', hash, { shouldValidate: true })
        },
        () => errors.push('Failure while generating hash')
      )

      const commitment = merkleRootFromBinary(file).then(
        (commitment) => {
          setValue('channelIncentivesPayout.commitment', commitment, { shouldValidate: true })
        },
        () => errors.push('Failure while generating commitment')
      )

      await Promise.all([commitment, hash])

      setIsProcessingFile(false)
      if (errors.length > 0) {
        Object.defineProperty(file, 'errors', { value: errors })
      }
      return [file]
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
          maxFiles={1}
          multiple={false}
          getFilesFromEvent={processPayload}
          validator={(file: File & { errors?: string[] }) =>
            file.errors?.length ? { code: 'processing-failure', message: file.errors.join('\n') } : null
          }
        />
        {isProcessingFile && (
          <Box>
            <Loading text="Processing your file..." withoutMargin />
          </Box>
        )}
      </Row>
      {payloadSize && (
        <Row>
          <InputComponent label="Payload size" units="bytes" textToCopy={payloadSize} copy>
            <InputNumber value={payloadSize} disabled />
          </InputComponent>
        </Row>
      )}
      {commitment && (
        <Row>
          <InputComponent label="Commitment" textToCopy={commitment} copy>
            <Input value={commitment} disabled />
          </InputComponent>
        </Row>
      )}
      {payloadHash && (
        <Row>
          <InputComponent label="Payload hash" textToCopy={payloadHash} copy>
            <Input value={payloadHash} disabled />
          </InputComponent>
        </Row>
      )}

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
