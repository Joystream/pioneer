import React, { useCallback, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

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
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { useObservable } from '@/common/hooks/useObservable'
import { merkleRootFromBinary, hashFile } from '@/common/utils/crypto/worker'

export const UpdateChannelPayouts = () => {
  const { api } = useApi()
  const { setValue, watch } = useFormContext()

  const [minCashout, maxCashout, payloadSize, payloadHash, commitment] = watch([
    'updateChannelPayouts.minimumCashoutAllowed',
    'updateChannelPayouts.maximumCashoutAllowed',
    'updateChannelPayouts.payloadSize',
    'updateChannelPayouts.payloadHash',
    'updateChannelPayouts.commitment',
  ])

  // Prepopulate the cashout limits with their current chain values
  const minimumCashoutAllowed = useFirstObservableValue(
    () => api?.query.content.minCashoutAllowed(),
    [api?.isConnected]
  )
  const maximumCashoutAllowed = useFirstObservableValue(
    () => api?.query.content.maxCashoutAllowed(),
    [api?.isConnected]
  )
  useEffect(() => {
    if (!minCashout) {
      setValue('updateChannelPayouts.minimumCashoutAllowed', minimumCashoutAllowed)
    }
    if (!maxCashout) {
      setValue('updateChannelPayouts.maximumCashoutAllowed', maximumCashoutAllowed)
    }
  }, [minCashout, maxCashout, minimumCashoutAllowed, maximumCashoutAllowed])

  // Set the payload
  const expectedDataSizeFee = useObservable(() => api?.query.storage.dataObjectPerMegabyteFee(), [api?.isConnected])
  const expectedDataObjectStateBloatBond = useObservable(
    () => api?.query.storage.dataObjectStateBloatBondValue(),
    [api?.isConnected]
  )
  useEffect(() => {
    if (!payloadHash || !expectedDataSizeFee || !expectedDataObjectStateBloatBond) return
    const payload = {
      objectCreationParams: { size_: payloadSize, ipfsContentId: payloadHash },
      expectedDataSizeFee: expectedDataSizeFee,
      expectedDataObjectStateBloatBond: expectedDataObjectStateBloatBond,
    }
    setValue('updateChannelPayouts.payload', payload)
  }, [payloadHash, !expectedDataObjectStateBloatBond && !expectedDataSizeFee])

  const processPayload = useCallback(
    async ([file]: File[]): Promise<File[]> => {
      if (!file) return []
      setValue('updateChannelPayouts.payload', undefined)
      setValue('updateChannelPayouts.payloadSize', file.size, { shouldValidate: true }) // Set it first for when no file was set before
      setValue('updateChannelPayouts.payloadHash', undefined, { shouldValidate: true })
      setValue('updateChannelPayouts.commitment', undefined, { shouldValidate: true })
      setValue('updateChannelPayouts.payloadSize', file.size, { shouldValidate: true }) // Set it again for when a valid file was set before

      const errors: string[] = []

      const hash = hashFile(file).then(
        (hash) => {
          setValue('updateChannelPayouts.payloadHash', hash, { shouldValidate: true })
        },
        () => errors.push('Failure while generating hash')
      )

      const commitment = merkleRootFromBinary(file).then(
        (commitment) => {
          setValue('updateChannelPayouts.commitment', commitment, { shouldValidate: true })
        },
        () => errors.push('Failure while generating commitment')
      )

      await Promise.all([commitment, hash])

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
      {/*    name="updateChannelPayouts.link"*/}
      {/*  >*/}
      {/*    <InputText id="amount-input" name="updateChannelPayouts.link" placeholder="Add link" />*/}
      {/*  </InputComponent>*/}
      {/*</Row>*/}

      <Row>
        <InlineToggleWrap>
          <Label>Block all cashouts: </Label>
          <ToggleCheckbox
            trueLabel="Cashouts enabled"
            falseLabel="Cashouts blocked"
            name="updateChannelPayouts.cashoutEnabled"
          />
        </InlineToggleWrap>
      </Row>

      <Row>
        <InputComponent
          label="Minimum Cashout Allowed"
          tight
          units={CurrencyName.integerValue}
          name="updateChannelPayouts.minimumCashoutAllowed"
        >
          <TokenInput id="amount-input" name="updateChannelPayouts.minimumCashoutAllowed" placeholder="0" />
        </InputComponent>
      </Row>

      <Row>
        <InputComponent
          label="Maximum Cashout Allowed"
          tight
          units={CurrencyName.integerValue}
          name="updateChannelPayouts.maximumCashoutAllowed"
        >
          <TokenInput id="amount-input" name="updateChannelPayouts.maximumCashoutAllowed" placeholder="0" />
        </InputComponent>
      </Row>

      {/*<Row>*/}
      {/*  <InputComponent*/}
      {/*    label="Credit Content WG Budget by"*/}
      {/*    tight*/}
      {/*    units={CurrencyName.integerValue}*/}
      {/*    name="updateChannelPayouts.creditContentBudgetBy"*/}
      {/*  >*/}
      {/*    <TokenInput id="amount-input" name="updateChannelPayouts.creditContentBudgetBy" placeholder="0" />*/}
      {/*  </InputComponent>*/}
      {/*</Row>*/}
    </RowGapBlock>
  )
}
