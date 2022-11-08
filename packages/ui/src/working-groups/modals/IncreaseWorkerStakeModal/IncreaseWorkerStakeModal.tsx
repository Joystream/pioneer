import BN from 'bn.js'
import React, { useEffect } from 'react'
import * as Yup from 'yup'

import { useBalance } from '@/accounts/hooks/useBalance'
import { useApi } from '@/api/hooks/useApi'
import { CurrencyName } from '@/app/constants/currency'
import { ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { InputComponent, TokenInput } from '@/common/components/forms'
import { getErrorMessage, hasError } from '@/common/components/forms/FieldError'
import { Modal, ModalBody, ModalFooter, ModalHeader } from '@/common/components/Modal'
import { TextMedium, TokenValue } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { useSchema } from '@/common/hooks/useSchema'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { formatTokenValue } from '@/common/model/formatters'
import { BNSchema, maxContext, minContext } from '@/common/utils/validation'
import { increaseStakeMachine } from '@/working-groups/modals/IncreaseWorkerStakeModal/machine'
import { SuccessModal } from '@/working-groups/modals/IncreaseWorkerStakeModal/SuccessModal'
import { IncreaseWorkerStakeModalCall } from '@/working-groups/modals/IncreaseWorkerStakeModal/types'
import { getGroup } from '@/working-groups/model/getGroup'

export interface IncreaseStakeFormFields {
  stake: BN
}

const StakeFormSchema = Yup.object().shape({
  stake: BNSchema.test(minContext('You need at least ${min} stake', 'minAddStake'))
    .test(
      maxContext(
        `Given amount exceed your transferable balance of \${max} ${CurrencyName.integerValue}`,
        'totalBalance'
      )
    )
    .required(),
})

export const IncreaseWorkerStakeModal = () => {
  const { api } = useApi()
  const { hideModal, modalData } = useModal<IncreaseWorkerStakeModalCall>()
  const [state, send] = useMachine(increaseStakeMachine)
  const { minStake, stake, group, runtimeId, roleAccount } = modalData.worker
  const minAddStake = minStake.sub(stake)
  const balance = useBalance(roleAccount)
  const { isValid, setContext, errors } = useSchema({ ...state?.context }, StakeFormSchema)
  useEffect(() => {
    setContext({ minAddStake, totalBalance: balance?.transferable })
  }, [balance?.transferable.toString()])

  useEffect(() => {
    send('SET_STAKE', { stake: new BN(minAddStake) })
  }, [])

  const onSubmit = () => {
    send({ type: 'PASS' })
  }
  if (state.matches('transaction')) {
    const workerGroup = api && getGroup(api, group.id)
    const transaction = workerGroup?.increaseStake(runtimeId, new BN(state.context.stake || 0))
    return (
      <SignTransactionModal
        buttonText="Sign transaction and Stake"
        transaction={transaction}
        signer={modalData.worker.roleAccount}
        service={state.children.transaction}
      >
        <TextMedium>You intend to increase the stake of worker with ID: {modalData.worker.id}</TextMedium>
        <TextMedium>
          Amount of increase: <TokenValue value={new BN(state.context.stake || 0)} />
        </TextMedium>
      </SignTransactionModal>
    )
  }

  if (state.matches('success')) {
    return <SuccessModal onClose={hideModal} amount={state.context.stake ?? BN_ZERO} />
  }

  return (
    <Modal onClose={hideModal} modalSize="m" modalHeight="s">
      <ModalHeader title="Increase stake" onClick={hideModal} />
      <ModalBody>
        <InputComponent
          id="amount-input"
          label="Select amount for Staking"
          units={CurrencyName.integerValue}
          validation={state.context.stake && hasError('stake', errors) ? 'invalid' : undefined}
          message={
            (state.context.stake && hasError('stake', errors) ? getErrorMessage('stake', errors) : undefined) || ' '
          }
          required
        >
          <TokenInput
            id="amount-input"
            value={state.context.stake}
            placeholder={formatTokenValue(modalData.worker?.minStake)}
            onChange={(_, value) => send('SET_STAKE', { stake: new BN(value) })}
          />
        </InputComponent>
      </ModalBody>
      <ModalFooter>
        <ButtonsGroup align="right">
          <ButtonPrimary disabled={!isValid} size="medium" onClick={onSubmit}>
            Increase Stake
          </ButtonPrimary>
        </ButtonsGroup>
      </ModalFooter>
    </Modal>
  )
}
