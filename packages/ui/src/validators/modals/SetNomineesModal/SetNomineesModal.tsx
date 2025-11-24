import React, { useMemo, useState } from 'react'
import { combineLatest, first, map, of } from 'rxjs'
import styled from 'styled-components'

import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { encodeAddress } from '@/accounts/model/encodeAddress'
import { useApi } from '@/api/hooks/useApi'
import { ButtonSecondary } from '@/common/components/buttons'
import { FailureModal } from '@/common/components/FailureModal'
import { Modal, ModalBody, ModalHeader, ModalTransactionFooter } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { FilterTextSelect } from '@/common/components/selects'
import { SuccessModal } from '@/common/components/SuccessModal'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { Colors } from '@/common/constants'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { useObservable } from '@/common/hooks/useObservable'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { transactionMachine } from '@/common/model/machines'
import { useStakingTransactions } from '@/validators/hooks/useStakingSDK'

import { SetNomineesModalCall } from '.'

export const SetNomineesModal = () => {
  const { modalData } = useModal<SetNomineesModalCall>()

  if (!modalData) {
    return null
  }

  return <SetNomineesModalInner stash={modalData.stash} currentNominations={modalData.nominations} />
}

interface SetNomineesModalInnerProps {
  stash: string
  currentNominations: string[]
}

const SetNomineesModalInner = ({ stash, currentNominations }: SetNomineesModalInnerProps) => {
  const { hideModal } = useModal<SetNomineesModalCall>()
  const { api } = useApi()
  const { allAccounts } = useMyAccounts()
  const { nominate } = useStakingTransactions()
  const [state, , service] = useMachine(transactionMachine)

  const [selectedValidators, setSelectedValidators] = useState<string[]>(currentNominations)
  const [selectedValidatorToAdd, setSelectedValidatorToAdd] = useState<string | null>(null)

  // Get all validators from the chain
  const allValidators = useObservable(() => {
    if (!api) return of([] as string[])
    return api.query.session.validators().pipe(
      map((validators) => validators.map((v) => v.toString())),
      first()
    )
  }, [api?.isConnected])

  // Get validator preferences (commission) for all validators
  const validatorsWithDetails = useObservable(() => {
    if (!api || !allValidators || allValidators.length === 0)
      return of([] as Array<{ account: string; commission?: number }>)

    return combineLatest(
      allValidators.map((validator) =>
        api.query.staking.validators(validator).pipe(
          map((prefs: any) => {
            if (prefs.isEmpty) return { account: validator, commission: undefined }
            const prefsData = prefs.unwrap ? prefs.unwrap() : prefs
            return {
              account: validator,
              commission: prefsData.commission ? prefsData.commission.toNumber() / 10_000_000 : undefined,
            }
          }),
          first()
        )
      )
    )
  }, [api?.isConnected, allValidators])

  const availableValidators = validatorsWithDetails || []
  const isLoadingValidators = allValidators === undefined || validatorsWithDetails === undefined

  // Get validator options for the select dropdown
  const validatorOptions = useMemo(() => {
    return availableValidators
      .filter((v) => !selectedValidators.includes(encodeAddress(v.account)))
      .map((v) => {
        const address = encodeAddress(v.account)
        const commission = v.commission !== undefined ? ` (${v.commission.toFixed(2)}%)` : ''
        return `${address}${commission}`
      })
  }, [availableValidators, selectedValidators])

  // Handle adding a validator from the select
  const handleAddValidator = (value: string | null) => {
    if (!value) return
    setSelectedValidatorToAdd(null)

    // Extract the address from the option (format: "address (commission%)")
    const addressMatch = value.match(/^(j4[a-zA-Z0-9]+)/)
    if (!addressMatch) return

    const validatorAddress = availableValidators.find((v) => encodeAddress(v.account) === addressMatch[1])?.account
    if (!validatorAddress) return

    if (!selectedValidators.includes(validatorAddress) && selectedValidators.length < 16) {
      setSelectedValidators((prev) => [...prev, validatorAddress])
    }
  }

  const transaction = useMemo(() => {
    if (!api) return undefined
    return nominate(selectedValidators)
  }, [api, nominate, selectedValidators])

  const controllerAccount = useObservable(() => {
    if (!api) return of(undefined)
    return api.query.staking.bonded(stash).pipe(
      map((bonded) => {
        if (bonded.isNone) return undefined
        return bonded.unwrap().toString()
      }),
      first()
    )
  }, [api?.isConnected, stash])

  const signerAccount = useMemo(() => {
    if (controllerAccount) {
      return allAccounts.find((acc) => acc.address === controllerAccount) || allAccounts[0]
    }
    return allAccounts.find((acc) => acc.address === stash) || allAccounts[0]
  }, [allAccounts, controllerAccount, stash])

  const { isReady, sign, paymentInfo, canAfford } = useSignAndSendTransaction({
    transaction,
    signer: signerAccount?.address ?? '',
    service: service as any,
    skipQueryNode: true,
  })

  const handleValidatorToggle = (validatorAddress: string) => {
    setSelectedValidators((prev) => {
      if (prev.includes(validatorAddress)) {
        return prev.filter((addr) => addr !== validatorAddress)
      } else {
        if (prev.length >= 16) {
          return prev
        }
        return [...prev, validatorAddress]
      }
    })
  }

  if (state.matches('canceled')) {
    return (
      <Modal onClose={hideModal} modalSize="m" modalHeight="m">
        <ModalHeader title="Transaction Canceled" onClick={hideModal} />
        <ModalBody>
          <TextMedium>
            The transaction was canceled. Please try again if you want to update your nominations.
          </TextMedium>
        </ModalBody>
        <ModalTransactionFooter next={{ onClick: hideModal, label: 'Close' }} />
      </Modal>
    )
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal} events={state.context.events}>
        There was a problem with updating nominations
      </FailureModal>
    )
  }

  if (state.matches('success')) {
    return (
      <SuccessModal
        onClose={hideModal}
        text={`You have successfully updated your nominations. You are now nominating ${
          selectedValidators.length
        } validator${selectedValidators.length === 1 ? '' : 's'}.`}
      />
    )
  }

  const signDisabled = !isReady || !canAfford || isLoadingValidators

  return (
    <Modal modalSize="l" modalHeight="l" onClose={hideModal}>
      <ModalHeader title="Set Nominees" onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={16}>
          <TextMedium>
            Select validators to nominate for stash <strong>{encodeAddress(stash)}</strong>. You can nominate up to 16{' '}
            validators.
          </TextMedium>

          <TextMedium>
            <strong>Select Validator</strong>
          </TextMedium>
          {isLoadingValidators ? (
            <TextSmall lighter>Loading validators...</TextSmall>
          ) : validatorOptions.length === 0 ? (
            <TextSmall lighter>No validators available</TextSmall>
          ) : (
            <FilterTextSelect
              options={validatorOptions}
              value={selectedValidatorToAdd}
              onChange={handleAddValidator}
              emptyOption="Select a validator to add..."
              placeholder="Type to filter validators or select from list below..."
              selectSize="l"
            />
          )}

          <div>
            <TextMedium>
              <strong>Selected Validators:</strong> {selectedValidators.length} / 16
            </TextMedium>
            {selectedValidators.length >= 16 && (
              <TextSmall style={{ color: 'orange' }}>
                Maximum number of nominations reached. Remove a validator to add another.
              </TextSmall>
            )}
          </div>

          {selectedValidators.length > 0 && (
            <SelectedValidatorsList>
              <TextMedium>
                <strong>All Selected Nominees:</strong>
              </TextMedium>
              {selectedValidators.map((validatorAddress) => {
                const validator = availableValidators.find((v) => v.account === validatorAddress)
                const isCurrentlyNominated = currentNominations.includes(validatorAddress)
                return (
                  <SelectedValidatorItem key={validatorAddress}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <TextMedium>{encodeAddress(validatorAddress)}</TextMedium>
                        {isCurrentlyNominated && (
                          <TextSmall style={{ color: '#2196F3', fontWeight: 'bold' }}>(Currently Nominated)</TextSmall>
                        )}
                      </div>
                      {validator?.commission !== undefined && (
                        <TextSmall>Commission: {validator.commission.toFixed(2)}%</TextSmall>
                      )}
                    </div>
                    <RemoveButton size="small" onClick={() => handleValidatorToggle(validatorAddress)}>
                      Remove
                    </RemoveButton>
                  </SelectedValidatorItem>
                )
              })}
            </SelectedValidatorsList>
          )}

          {!canAfford && paymentInfo?.partialFee && (
            <TextSmall style={{ color: 'red' }}>
              <strong>Error:</strong> Insufficient funds to cover transaction costs
            </TextSmall>
          )}

          <TextSmall>
            <strong>Note:</strong> Your nominations will take effect in the next era. You can change nominations at any{' '}
            time without unbonding.
          </TextSmall>
        </RowGapBlock>
      </ModalBody>
      <ModalTransactionFooter
        transactionFee={paymentInfo?.partialFee?.toBn()}
        next={{
          disabled: signDisabled,
          label: 'Update Nominations',
          onClick: sign,
        }}
      >
        <ButtonSecondary size="medium" onClick={hideModal}>
          Cancel
        </ButtonSecondary>
      </ModalTransactionFooter>
    </Modal>
  )
}

const SelectedValidatorsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border: 1px solid ${Colors.Black[200]};
  border-radius: 4px;
  background-color: ${Colors.Black[50]};
`

const SelectedValidatorItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: ${Colors.White};
  border: 1px solid ${Colors.Black[200]};
  border-radius: 4px;
`

const RemoveButton = styled(ButtonSecondary)`
  margin-left: 8px;
`
