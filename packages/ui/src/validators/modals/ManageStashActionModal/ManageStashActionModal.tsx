import BN from 'bn.js'
import React, { useEffect, useMemo, useState } from 'react'
import { filter, first, map, of } from 'rxjs'

import { SelectAccount } from '@/accounts/components/SelectAccount'
import { useBalance } from '@/accounts/hooks/useBalance'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { encodeAddress } from '@/accounts/model/encodeAddress'
import { useApi } from '@/api/hooks/useApi'
import { ButtonSecondary } from '@/common/components/buttons'
import { FailureModal } from '@/common/components/FailureModal'
import { InputComponent, InputText } from '@/common/components/forms'
import { Modal, ModalBody, ModalHeader, ModalTransactionFooter } from '@/common/components/Modal'
import { RowGapBlock } from '@/common/components/page/PageContent'
import { FilterTextSelect } from '@/common/components/selects'
import { SuccessModal } from '@/common/components/SuccessModal'
import { TextMedium, TextSmall } from '@/common/components/typography'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { useObservable } from '@/common/hooks/useObservable'
import { useSignAndSendTransaction } from '@/common/hooks/useSignAndSendTransaction'
import { joyStringToPlanckBigInt, planckToJoyString } from '@/common/model/joyValueFromString'
import { transactionMachine } from '@/common/model/machines'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'
import { UsedControllerAccountsInfo } from '@/validators/components/UsedControllerAccountsInfo'
import { useStakingQueries, useStakingTransactions } from '@/validators/hooks/useStakingSDK'
import { useUsedControllerAccounts } from '@/validators/hooks/useUsedControllerAccounts'

import { ManageStashActionModalCall } from '.'

const TITLES: Record<ManageStashActionModalCall['data']['action'], string> = {
  bondRebond: 'Bond more / Rebond',
  withdraw: 'Withdraw unbonded funds',
  changeController: 'Change controller account',
  changeReward: 'Change reward destination',
}

export const ManageStashActionModal = () => {
  const { modalData } = useModal<ManageStashActionModalCall>()

  if (!modalData) {
    return null
  }

  return <ManageStashActionModalInner modalData={modalData} />
}

interface ManageStashActionModalInnerProps {
  modalData: ManageStashActionModalCall['data']
}

const ManageStashActionModalInner = ({ modalData }: ManageStashActionModalInnerProps) => {
  const { hideModal } = useModal<ManageStashActionModalCall>()
  const { api } = useApi()
  const { allAccounts } = useMyAccounts()
  const { active: activeMembership } = useMyMemberships()
  const { bondExtra, rebond, withdrawUnbonded, setController, setPayee: setPayeeTx } = useStakingTransactions()
  const { getUnbondingInfo, getSlashingSpans } = useStakingQueries()
  const usedControllers = useUsedControllerAccounts()
  const [state, , service] = useMachine(transactionMachine)

  const [amount, setAmount] = useState('')
  const [selectedController, setSelectedController] = useState<string>('')
  const [payee, setPayee] = useState('Stash')
  const [slashingSpans, setSlashingSpans] = useState<number>(0)
  const [isLoadingInfo, setIsLoadingInfo] = useState(true)
  const [bondExtraError, setBondExtraError] = useState<string | null>(null)

  // Get stash balance for bond more/rebond
  const stashBalance = useBalance(modalData.stash)

  const title = TITLES[modalData.action]

  const currentEra = useObservable(() => {
    if (!api) return of(undefined)
    return api.query.staking.activeEra().pipe(
      map((activeEra) => {
        if (activeEra.isNone) return undefined
        return activeEra.unwrap().index.toNumber()
      }),
      filter((era): era is number => era !== undefined),
      first()
    )
  }, [api?.isConnected])

  const UNBONDING_PERIOD_ERAS = 112
  const withdrawableAmount = useMemo(() => {
    if (!currentEra || !modalData.unlocking || modalData.unlocking.length === 0 || modalData.action !== 'withdraw') {
      return new BN(0)
    }

    return modalData.unlocking.reduce((sum, chunk) => {
      if (chunk.era + UNBONDING_PERIOD_ERAS <= currentEra) {
        return sum.add(chunk.value)
      }
      return sum
    }, new BN(0))
  }, [currentEra, modalData.unlocking, modalData.action])

  const hasWithdrawableFunds = withdrawableAmount.gt(new BN(0))

  useEffect(() => {
    const loadInfo = async () => {
      try {
        if (modalData.action === 'withdraw') {
          const spans = await getSlashingSpans(modalData.stash)
          setSlashingSpans(spans?.spanIndex || 0)
        } else if (modalData.action === 'bondRebond') {
          await getUnbondingInfo(modalData.stash)
        } else if (modalData.action === 'changeController' && modalData.controller) {
          setSelectedController(modalData.controller)
        }
      } catch {
        // Handle error silently
      } finally {
        setIsLoadingInfo(false)
      }
    }

    loadInfo()
  }, [modalData.action, modalData.stash, modalData.controller, getSlashingSpans, getUnbondingInfo])

  const transaction = useMemo(() => {
    if (!api) return undefined

    switch (modalData.action) {
      case 'bondRebond': {
        if (!amount || parseFloat(amount) <= 0) return undefined
        const hasUnbonding = modalData.unlocking && modalData.unlocking.length > 0
        if (hasUnbonding) {
          return rebond(joyStringToPlanckBigInt(amount))
        } else {
          try {
            return bondExtra(joyStringToPlanckBigInt(amount))
          } catch (err) {
            return undefined
          }
        }
      }
      case 'withdraw':
        if (!hasWithdrawableFunds) return undefined
        return withdrawUnbonded(slashingSpans)
      case 'changeController':
        if (!selectedController) return undefined
        return setController(selectedController)
      case 'changeReward':
        return setPayeeTx(payee)
      default:
        return undefined
    }
  }, [
    api,
    modalData.action,
    modalData.unlocking,
    amount,
    selectedController,
    payee,
    slashingSpans,
    hasWithdrawableFunds,
    bondExtra,
    rebond,
    withdrawUnbonded,
    setController,
    setPayeeTx,
  ])

  useEffect(() => {
    const hasUnbonding = modalData.unlocking && modalData.unlocking.length > 0
    if (modalData.action !== 'bondRebond' || hasUnbonding) {
      setBondExtraError(null)
    }
  }, [modalData.action, modalData.unlocking])

  const signerAccount = useMemo(() => {
    if (modalData.controller) {
      return allAccounts.find((acc) => acc.address === modalData.controller) || allAccounts[0]
    }
    if (activeMembership?.controllerAccount) {
      return allAccounts.find((acc) => acc.address === activeMembership.controllerAccount) || allAccounts[0]
    }
    return allAccounts[0]
  }, [activeMembership, allAccounts, modalData.controller])

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
          <TextMedium>The transaction was canceled. Please try again if you want to perform this action.</TextMedium>
        </ModalBody>
        <ModalTransactionFooter next={{ onClick: hideModal, label: 'Close' }} />
      </Modal>
    )
  }

  if (state.matches('error')) {
    return (
      <FailureModal onClose={hideModal} events={state.context.events}>
        There was a problem with {title.toLowerCase()}
      </FailureModal>
    )
  }

  if (state.matches('success')) {
    let successText = ''
    switch (modalData.action) {
      case 'bondRebond':
        successText = `You have successfully ${
          modalData.unlocking?.length ? 'rebonded' : 'bonded extra'
        } ${amount} JOY tokens.`
        break
      case 'withdraw':
        successText = 'You have successfully withdrawn your unbonded funds.'
        break
      case 'changeController':
        successText = `You have successfully changed the controller account to ${encodeAddress(selectedController)}.`
        break
      case 'changeReward':
        successText = `You have successfully changed the reward destination to ${payee}.`
        break
    }

    return <SuccessModal onClose={hideModal} text={successText} />
  }

  const signDisabled =
    !isReady ||
    !canAfford ||
    isLoadingInfo ||
    (modalData.action === 'bondRebond' && (!amount || parseFloat(amount) <= 0)) ||
    (modalData.action === 'changeController' && !selectedController) ||
    (modalData.action === 'withdraw' && !hasWithdrawableFunds)

  return (
    <Modal modalSize="m" modalHeight="m" onClose={hideModal}>
      <ModalHeader title={title} onClick={hideModal} />
      <ModalBody>
        <RowGapBlock gap={16}>
          <TextMedium>
            Stash: <strong>{encodeAddress(modalData.stash)}</strong>
          </TextMedium>

          {modalData.action === 'bondRebond' && (
            <>
              <TextMedium>
                {modalData.unlocking && modalData.unlocking.length > 0
                  ? 'Rebond your unbonding tokens back to active staking, or bond additional tokens.'
                  : 'Bond additional tokens to increase your staking amount.'}
              </TextMedium>

              {modalData.unlocking && modalData.unlocking.length > 0 && (
                <TextSmall>
                  <strong>Unbonding:</strong>{' '}
                  {planckToJoyString(
                    BigInt(modalData.unlocking.reduce((sum, chunk) => sum.add(chunk.value), new BN(0)).toString())
                  )}{' '}
                  JOY
                </TextSmall>
              )}

              <TextSmall>
                <strong>Active Stake:</strong> {planckToJoyString(modalData.activeStake)} JOY
              </TextSmall>

              {stashBalance?.transferable && (
                <TextSmall>
                  <strong>Available Balance:</strong> {planckToJoyString(stashBalance.transferable)} JOY
                </TextSmall>
              )}

              <InputComponent label="Amount (JOY)" required inputSize="m" id="bond-amount">
                <InputText
                  id="bond-amount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={handleAmountChange}
                  type="number"
                  step="0.1"
                  min="0"
                />
              </InputComponent>

              {amount && stashBalance?.transferable && parseFloat(amount) > 0 && (
                <>
                  {joyStringToPlanckBigInt(amount) > BigInt(stashBalance.transferable.toString()) && (
                    <TextSmall style={{ color: 'red' }}>
                      <strong>Error:</strong> Amount exceeds available balance
                    </TextSmall>
                  )}
                </>
              )}

              {bondExtraError && (
                <TextSmall style={{ color: 'red' }}>
                  <strong>Error:</strong> {bondExtraError}
                </TextSmall>
              )}
            </>
          )}

          {modalData.action === 'withdraw' && (
            <>
              <TextMedium>
                Withdraw your unbonded funds after the unbonding period has passed. This will make the funds available{' '}
                for transfer.
              </TextMedium>

              {hasWithdrawableFunds ? (
                <TextSmall>
                  <strong>Available to withdraw:</strong> {planckToJoyString(withdrawableAmount)} JOY
                </TextSmall>
              ) : (
                <TextSmall style={{ color: 'orange' }}>
                  <strong>No funds available to withdraw.</strong> All unbonding chunks are still in the 28-day
                  unbonding period.
                </TextSmall>
              )}

              {modalData.unlocking && modalData.unlocking.length > 0 && !hasWithdrawableFunds && (
                <TextSmall>
                  <strong>Total unbonding:</strong>{' '}
                  {planckToJoyString(
                    BigInt(modalData.unlocking.reduce((sum, chunk) => sum.add(chunk.value), new BN(0)).toString())
                  )}{' '}
                  JOY (not yet available)
                </TextSmall>
              )}

              <TextSmall>
                <strong>Note:</strong> You can only withdraw funds that have completed the 28-day unbonding period.
              </TextSmall>
            </>
          )}

          {modalData.action === 'changeController' && (
            <>
              <TextMedium>
                Change the controller account for this stash. The controller account manages nominations and other{' '}
                staking operations.
              </TextMedium>

              <InputComponent label="New Controller Account" required inputSize="l" id="controller-account">
                <SelectAccount
                  onChange={(account) => setSelectedController(account?.address || '')}
                  selected={allAccounts.find((acc) => acc.address === selectedController)}
                  placeholder="Select controller account"
                  filter={(account) => {
                    if (!account.address) return false
                    if (account.address === selectedController) return true
                    const isRestricted = usedControllers?.restrictedAccounts?.has(account.address)
                    return !isRestricted
                  }}
                />
              </InputComponent>

              <TextSmall>
                <strong>Note:</strong> The controller account must be different from the stash account.
              </TextSmall>

              <UsedControllerAccountsInfo allAccounts={allAccounts} usedAccounts={usedControllers} />
            </>
          )}

          {modalData.action === 'changeReward' && (
            <>
              <TextMedium>Change where staking rewards are sent for this stash.</TextMedium>

              <FilterTextSelect
                options={['Stash', 'Controller', 'Account']}
                value={payee}
                onChange={(value) => setPayee(value || 'Stash')}
                selectSize="l"
              />

              <TextSmall>
                <strong>Note:</strong> Rewards will be sent to the selected destination after the next era.
              </TextSmall>
            </>
          )}

          {!canAfford && paymentInfo?.partialFee && (
            <TextSmall style={{ color: 'red' }}>
              <strong>Error:</strong> Insufficient funds to cover transaction costs
            </TextSmall>
          )}
        </RowGapBlock>
      </ModalBody>
      <ModalTransactionFooter
        transactionFee={paymentInfo?.partialFee?.toBn()}
        next={{
          disabled: signDisabled,
          label: title,
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
