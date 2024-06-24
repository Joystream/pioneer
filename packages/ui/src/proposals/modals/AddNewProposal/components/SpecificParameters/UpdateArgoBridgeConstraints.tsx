import { uniq } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { useApi } from '@/api/hooks/useApi'
import { CurrencyName } from '@/app/constants/currency'
import { InputComponent, InputNumber, Label, TokenInput } from '@/common/components/forms'
import { FieldList } from '@/common/components/forms/FieldList'
import { Loading } from '@/common/components/Loading'
import { Row } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { formatJoyValue } from '@/common/model/formatters'
import { whenDefined } from '@/common/utils'
import { argoConstraints$ } from '@/proposals/model/argoConstraints'

import { AddNewProposalForm } from '../../helpers'

export const UpdateArgoBridgeConstraints = () => {
  const { api } = useApi()
  const current = useFirstObservableValue(() => argoConstraints$(api), [api?.isConnected])
  const form = useFormContext<AddNewProposalForm>()

  const [isReady, setIsReady] = useState(false)
  const { allAccounts } = useMyAccounts()
  useEffect(() => {
    if (!current) return

    form.setValue(
      'updateArgoBridgeConstraints.operatorAccount',
      whenDefined(current.operatorAccount, (address) => accountOrNamed(allAccounts, address, 'Unsaved account'))
    )
    form.setValue(
      'updateArgoBridgeConstraints.pauserAccounts',
      current.pauserAccounts.map((address) => accountOrNamed(allAccounts, address, 'Unsaved account'))
    )
    form.setValue('updateArgoBridgeConstraints.bridgingFee', current.bridgingFee)
    form.setValue('updateArgoBridgeConstraints.thawnDuration', current.thawnDuration)
    form.setValue('updateArgoBridgeConstraints.remoteChains', current.remoteChains)

    setIsReady(true)
  }, [current])

  const pauserAccounts = form.watch('updateArgoBridgeConstraints.pauserAccounts')
  const pauserAddresses = uniq(pauserAccounts?.flatMap((account) => account?.address ?? []) ?? [])

  return (
    <RowGapBlock gap={24}>
      <Row>
        <RowGapBlock gap={8}>
          <h4>Specific parameters</h4>
          <TextMedium lighter>Update Argo Bridge pallet constraints</TextMedium>
        </RowGapBlock>
      </Row>
      <Row>
        {!isReady ? (
          <Loading />
        ) : (
          <RowGapBlock gap={20}>
            <InputComponent
              id="operatorAccount-input"
              name="updateArgoBridgeConstraints.operatorAccount"
              label="Operator account"
              sublabel={`Currently: ${current?.operatorAccount ?? '-'}`}
              inputSize="l"
            >
              <SelectAccount id="operatorAccount" name="updateArgoBridgeConstraints.operatorAccount" />
            </InputComponent>

            <RowGapBlock gap={4}>
              <Label noMargin>Pauser accounts</Label>
              <TextSmall light>Currently {current?.pauserAccounts.join(', ') ?? '-'}</TextSmall>
              <FieldList
                id="pauserAccounts"
                name="updateArgoBridgeConstraints.pauserAccounts"
                render={({ name, id }) => (
                  <InputComponent name={name} inputSize="l">
                    <SelectAccount
                      id={id}
                      name={name}
                      filter={(account) => !pauserAddresses.includes(account.address)}
                    />
                  </InputComponent>
                )}
                unmount={({ name }) => form.unregister(name)}
                addLabel="Add account"
                initialSize={current?.pauserAccounts.length}
              />
            </RowGapBlock>

            <InputComponent
              id="bridgingFee"
              name="updateArgoBridgeConstraints.bridgingFee"
              label="Bridging fee"
              sublabel={`Currently: ${whenDefined(current?.bridgingFee, formatJoyValue) ?? '-'} ${
                CurrencyName.integerValue
              }`}
              units={CurrencyName.integerValue}
              inputWidth="s"
              tight
            >
              <TokenInput id="bridgingFee" name="updateArgoBridgeConstraints.bridgingFee" placeholder="0" />
            </InputComponent>

            <InputComponent
              id="thawnDuration"
              name="updateArgoBridgeConstraints.thawnDuration"
              label="Thawn duration"
              sublabel={`Currently: ${current?.thawnDuration ?? '-'} blocks`}
              units="blocks"
              inputWidth="s"
              tight
            >
              <InputNumber id="thawnDuration" name="updateArgoBridgeConstraints.thawnDuration" placeholder="0" />
            </InputComponent>

            <RowGapBlock gap={4}>
              <Label noMargin>Remote chains</Label>
              <TextSmall light>Currently {current?.remoteChains.join(', ') ?? '-'}</TextSmall>
              <FieldList
                id="remoteChains"
                name="updateArgoBridgeConstraints.remoteChains"
                render={({ name, id }) => (
                  <InputComponent name={name}>
                    <InputNumber id={id} name={name} placeholder="0" />
                  </InputComponent>
                )}
                unmount={({ name }) => form.unregister(name)}
                addLabel="Add chain"
                inputWidth="s"
                initialSize={current?.remoteChains.length}
              />
            </RowGapBlock>
          </RowGapBlock>
        )}
      </Row>
    </RowGapBlock>
  )
}
