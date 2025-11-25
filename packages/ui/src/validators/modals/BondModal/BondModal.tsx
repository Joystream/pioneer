import React, { useEffect, useMemo, useState } from 'react'
import { catchError, first, map, of, switchMap } from 'rxjs'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { useStakingAccountsLocks } from '@/accounts/hooks/useStakingAccountsLocks'
import { useApi } from '@/api/hooks/useApi'
import { ButtonSecondary } from '@/common/components/buttons'
import { FailureModal } from '@/common/components/FailureModal'
import { InputComponent, InputText } from '@/common/components/forms'
import { Modal, ModalBody, ModalHeader, ModalTransactionFooter } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { FilterTextSelect } from '@/common/components/selects'
import { SuccessModal } from '@/common/components/SuccessModal'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { BN_ZERO } from '@/common/constants'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { useObservable } from '@/common/hooks/useObservable'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { joyStringToPlanckBigInt } from '@/common/model/joyValueFromString'
import { transactionMachine } from '@/common/model/machines'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { UsedControllerAccountsInfo } from '@/validators/components/UsedControllerAccountsInfo'
import { useStakingTransactions } from '@/validators/hooks/useStakingSDK'
import { useUsedControllerAccounts } from '@/validators/hooks/useUsedControllerAccounts'
import { BondModalCall } from '@/validators/modals/BondModal/types'

export const BondModal = () => {
  const { hideModal } = useModal<BondModalCall>()
  const { api } = useApi()
  const { allAccounts } = useMyAccounts()
  const { active: activeMembership } = useMyMemberships()
  const { bond } = useStakingTransactions()
  const [state, , service] = useMachine(transactionMachine)

  const [amount, setAmount] = useState('')
  const [stash, setStash] = useState('')
  const [controller, setController] = useState('')
  const [payee, setPayee] = useState('Stash')
  const [controllerError, setControllerError] = useState<string | null>(null)

  useEffect(() => {
    if (!stash && allAccounts.length > 0) {
      if (activeMembership?.boundAccounts && activeMembership.boundAccounts.length > 0) {
        const boundAccount = allAccounts.find((acc) => activeMembership.boundAccounts?.includes(acc.address))
        if (boundAccount) {
          setStash(boundAccount.address)
          return
        }
      }
      setStash(allAccounts[0].address)
    }
  }, [stash, allAccounts, activeMembership])

  useEffect(() => {
    if (stash && !controller) {
      setController(stash)
    }
  }, [stash, controller])

  const controllerLedger = useObservable(() => {
    if (!api || !controller) return of(undefined)
    return api.query.staking.bonded(controller).pipe(
      switchMap((bonded) => {
        if (bonded.isNone) return of(null)
        const stashAddress = bonded.unwrap().toString()
        return api.query.staking.ledger(controller).pipe(
          map((ledger) => {
            if (ledger.isNone) return { stash: stashAddress, hasActiveStake: false }
            const ledgerData = ledger.unwrap()
            const activeStake = ledgerData.active.toBn()
            const totalStake = ledgerData.total.toBn()
            const hasUnlocking = ledgerData.unlocking.length > 0
            return {
              stash: stashAddress,
              hasActiveStake: !activeStake.isZero() || !totalStake.isZero() || hasUnlocking,
            }
          }),
          first(),
          catchError(() => of({ stash: stashAddress, hasActiveStake: false }))
        )
      }),
      first(),
      catchError(() => of(null))
    )
  }, [api?.isConnected, controller])

  useEffect(() => {
    if (controller && controllerLedger !== undefined) {
      if (controllerLedger && controllerLedger.stash !== stash && controllerLedger.hasActiveStake) {
        setControllerError('This account is already used as a controller for another stash')
      } else {
        setControllerError(null)
      }
    }
  }, [controller, controllerLedger, stash])

  const accountsWithLocks = useStakingAccountsLocks({
    requiredStake: BN_ZERO,
    lockType: 'Staking',
    filterByBalance: false,
  })

  const usedControllers = useUsedControllerAccounts()

  const transaction = useMemo(() => {
    if (!api || !amount || parseFloat(amount) <= 0 || !controller || !stash) return undefined
    return bond(controller, joyStringToPlanckBigInt(amount), payee)
  }, [api, amount, controller, payee, stash, bond])

  const signerAccount = useMemo(() => {
    if (!stash) return allAccounts[0]
    return allAccounts.find((acc) => acc.address === stash) || allAccounts[0]
  }, [stash, allAccounts])

  const { isReady, sign, paymentInfo, canAfford } = useSignAndSendTransaction({
    transaction,
    signer: signerAccount?.address ?? '',
    service: service as any,
    skipQueryNode: true,
  })

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || (!isNaN(parseFloat(value)) && parseFloat(value) >= 0)) {
      setAmount(value)
    }
  }

  if (state.matches('canceled')) {
    return (
      <Modal onClose={hideModal} modalSize="m" modalHeight="m">
        <ModalHeader title="Transaction Canceled" onClick={hideModal} />
        <ModalBody>
          <TextMedium>The transaction was canceled. Please try again if you want to bond tokens.</TextMedium>
        </ModalBody>
        <ModalTransactionFooter next={{ onClick: hideModal, label: 'Close' }} />
      </Modal>
    )
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal} events={state.context.events}>
        There was a problem with bonding your tokens
      </FailureModal>
    )
  }

  if (state.matches('success')) {
    return (
      <SuccessModal
        onClose={hideModal}
        text={`Bond transaction submitted successfully! You have bonded ${amount} JOY tokens.`}
      />
    )
  }

  const signDisabled =
    !isReady || !canAfford || !amount || parseFloat(amount) <= 0 || !controller || !stash || !!controllerError

  return (
    <Modal modalSize="m" modalHeight="m" onClose={hideModal}>
      <ModalHeader title="Bond Tokens" onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={16}>
          <TextMedium>Bond your tokens for staking. Bonded tokens are locked and can earn rewards.</TextMedium>

          <InputComponent label="Stash Account" required inputSize="l" id="stash-account">
            <SelectAccount
              onChange={(account) => {
                setStash(account?.address || '')
                if (account?.address && controller === stash) {
                  setController(account.address)
                }
              }}
              selected={allAccounts.find((acc) => acc.address === stash)}
              placeholder="Select stash account"
              filter={(account) => {
                const accountWithLocks = accountsWithLocks.find((acc) => acc.address === account.address)
                return !accountWithLocks?.optionLocks?.includes('rivalrousLock')
              }}
            />
          </InputComponent>
          {stash &&
            (() => {
              const stashAccount = accountsWithLocks.find((acc) => acc.address === stash)
              if (stashAccount?.optionLocks?.includes('rivalrousLock')) {
                return (
                  <TextSmall style={{ color: 'orange' }}>
                    <strong>Warning:</strong> This account has external restrictions (Councilor/Worker stake) that may
                    conflict with staking.
                  </TextSmall>
                )
              }
              return null
            })()}

          <InputComponent label="Amount to Bond (JOY)" required inputSize="m" id="bond-amount">
            <InputText
              id="bond-amount"
              placeholder="Enter amount to bond"
              value={amount}
              onChange={handleAmountChange}
              type="number"
              step="0.1"
              min="0"
            />
          </InputComponent>

          <InputComponent label="Controller Account" required inputSize="l" id="controller-account">
            <SelectAccount
              onChange={(account) => setController(account?.address || '')}
              selected={allAccounts.find((acc) => acc.address === controller)}
              placeholder="Select controller account"
              filter={(account) => {
                if (!account.address) return false
                if (account.address === controller) return true
                const isRestricted = usedControllers?.restrictedAccounts?.has(account.address)
                return !isRestricted
              }}
            />
          </InputComponent>

          {controllerError && (
            <TextSmall style={{ color: 'red' }}>
              <strong>Error:</strong> {controllerError}
            </TextSmall>
          )}

          <TextSmall>
            <strong>Note:</strong> The controller account manages nominations and other staking operations. It can be
            the same as the stash account, but cannot be used as a controller for another stash.
          </TextSmall>

          <UsedControllerAccountsInfo allAccounts={allAccounts} usedAccounts={usedControllers} />

          <FilterTextSelect
            options={['Stash', 'Controller', 'Account']}
            value={payee}
            onChange={(value) => setPayee(value || 'Stash')}
            selectSize="l"
          />

          {!canAfford && paymentInfo?.partialFee && (
            <TextSmall style={{ color: 'red' }}>
              <strong>Error:</strong> Insufficient funds to cover transaction costs
            </TextSmall>
          )}

          <TextSmall>
            <strong>Note:</strong> This transaction will bond your tokens to the staking system. Bonded tokens are{' '}
            locked and cannot be transferred until unbonded.
          </TextSmall>
        </RowGapBlock>
      </ModalBody>
      <ModalTransactionFooter
        transactionFee={paymentInfo?.partialFee?.toBn()}
        next={{
          disabled: signDisabled,
          label: 'Bond Tokens',
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
