import React, { useMemo, useState } from 'react'

import { useApi } from '@/api/hooks/useApi'
import { TextMedium } from '@/common/components/typography'
import { useMachine } from '@/common/hooks/useMachine'
import { useModal } from '@/common/hooks/useModal'
import { SignTransactionModal } from '@/common/modals/SignTransactionModal/SignTransactionModal'
import { UpdateMembershipModalCall } from '@/memberships/modals/UpdateMembershipModal/index'
import { createBatch } from '@/memberships/modals/UpdateMembershipModal/utils'

import { useMyMemberships } from '../../hooks/useMyMemberships'

import { updateMembershipMachine } from './machine'
import { UpdateMembershipFormModal } from './UpdateMembershipFormModal'
import { UpdateMembershipSuccessModal } from './UpdateMembershipSuccessModal'

export const isURL = (str: string) => {
  try {
    const newUrl = new URL(str)
    return newUrl.protocol === 'http:' || newUrl.protocol === 'https:'
  } catch (err) {
    return false
  }
}

export const UpdateMembershipModal = () => {
  const { api } = useApi()
  const { active } = useMyMemberships()
  const [hasControllerChange, setChangeController] = useState(false)

  const {
    hideModal,
    modalData: { member },
  } = useModal<UpdateMembershipModalCall>()
  const [state, send] = useMachine(updateMembershipMachine)

  const unbondValidatorAccTransaction = useMemo(
    () => api?.tx.members.removeStakingAccount(member.id),
    [api?.isConnected]
  )

  const bondValidatorAccTransaction = useMemo(
    () => api?.tx.members.addStakingAccountCandidate(member.id),
    [api?.isConnected]
  )

  const conFirmTransaction = useMemo(() => {
    const validatorAccounts = state.context.form?.validatorAccounts

    if (!api || !validatorAccounts) return

    const confirmTxs = validatorAccounts.map((address) => api.tx.members.confirmStakingAccount(member.id, address))

    return confirmTxs.length > 1 ? api.tx.utility.batch(confirmTxs) : confirmTxs[0]
  }, [api?.isConnected, state.context.form?.validatorAccounts])

  const updateMembershipTransaction = useMemo(
    () => state.context.form && createBatch(state.context.form, api, member, setChangeController),
    [api?.isConnected, state.context.form]
  )

  if (state.matches('prepare')) {
    return (
      <UpdateMembershipFormModal
        onClose={hideModal}
        onSubmit={(params) => {
          if (params.externalResources?.TWITTER && params.externalResources?.TWITTER) {
            params.externalResources?.TWITTER.match(/@/g)
              ? (params.externalResources.TWITTER = params.externalResources.TWITTER.split('@')[1])
              : params.externalResources.TWITTER
            isURL(params.externalResources?.TWITTER)
              ? (params.externalResources.TWITTER = params.externalResources.TWITTER.split('twitter.com/')[1])
              : params.externalResources?.TWITTER
          }
          if (params.externalResources?.GITHUB && params.externalResources?.GITHUB) {
            params.externalResources?.GITHUB.match(/@/g)
              ? (params.externalResources.GITHUB = params.externalResources.GITHUB.split('@')[1])
              : params.externalResources.GITHUB
            isURL(params.externalResources?.GITHUB)
              ? (params.externalResources.GITHUB = params.externalResources.GITHUB.split('github.com/')[1])
              : params.externalResources?.GITHUB
          }
          if (params.externalResources?.TELEGRAM && params.externalResources?.TELEGRAM) {
            params.externalResources?.TELEGRAM.match(/@/g)
              ? (params.externalResources.TELEGRAM = params.externalResources.TELEGRAM.split('@')[1])
              : params.externalResources.TELEGRAM
          }

          if (params.externalResources?.YOUTUBE && params.externalResources?.YOUTUBE) {
            params.externalResources?.YOUTUBE.match(/@/g)
              ? (params.externalResources.YOUTUBE = params.externalResources.YOUTUBE.split('@')[1])
              : params.externalResources.YOUTUBE
          }

          if (params.externalResources?.FACEBOOK && params.externalResources?.FACEBOOK) {
            params.externalResources?.FACEBOOK.match(/@/g)
              ? (params.externalResources.FACEBOOK = params.externalResources.FACEBOOK.split('@')[1])
              : params.externalResources.FACEBOOK
            isURL(params.externalResources?.FACEBOOK)
              ? (params.externalResources.FACEBOOK = params.externalResources.FACEBOOK.split('facebook.com/')[1])
              : params.externalResources?.FACEBOOK
          }

          if (params.externalResources?.LINKEDIN && params.externalResources?.LINKEDIN) {
            params.externalResources?.LINKEDIN.match(/@/g)
              ? (params.externalResources.LINKEDIN = params.externalResources.LINKEDIN.split('@')[1])
              : params.externalResources.LINKEDIN
            isURL(params.externalResources?.LINKEDIN)
              ? (params.externalResources.LINKEDIN = params.externalResources?.LINKEDIN.split('/in/')[1])
              : params.externalResources?.LINKEDIN
          }
          send('DONE', { form: params })
        }}
        member={member}
      />
    )
  }

  if (state.matches('removeStakingAccTx') && unbondValidatorAccTransaction) {
    if (
      !state.context.form.validatorAccountsToBeRemoved ||
      state.context.form.validatorAccountsToBeRemoved.length === 0
    ) {
      send('SKIP_UNBONDING')
      return null
    }
    return (
      <SignTransactionModal
        buttonText="Sign and unbond"
        transaction={unbondValidatorAccTransaction}
        signer={state.context.form.validatorAccountsToBeRemoved[state.context.unbondingValidatorAccStep ?? 0]}
        service={state.children.removeStakingAcc}
      >
        <TextMedium>You intend to remove the validator account from your membership.</TextMedium>
      </SignTransactionModal>
    )
  }

  if (state.matches('addStakingAccCandidateTx') && bondValidatorAccTransaction) {
    if (!state.context.form.validatorAccounts || state.context.form.validatorAccounts.length === 0) {
      send('SKIP_BONDING')
      return null
    }
    return (
      <SignTransactionModal
        buttonText="Sign and bond"
        transaction={bondValidatorAccTransaction}
        signer={state.context.form.validatorAccounts[state.context.bondingValidatorAccStep ?? 0]}
        service={state.children.addStakingAccCandidate}
      >
        <TextMedium>You intend to to bond new validator account with your membership.</TextMedium>
      </SignTransactionModal>
    )
  }

  if (state.matches('confirmStakingAccTx') && conFirmTransaction) {
    return (
      <SignTransactionModal
        buttonText="Sign and confirm"
        transaction={conFirmTransaction}
        signer={member.controllerAccount}
        service={state.children.confirmStakingAcc}
      >
        <TextMedium>You intend to confirm your validator account to be bound with your membership.</TextMedium>
      </SignTransactionModal>
    )
  }

  if (state.matches('updateMembershipTx')) {
    if (!updateMembershipTransaction) {
      send('SKIP_UPDATE_MEMBERSHIP')
      return null
    }
    return (
      <SignTransactionModal
        buttonText="Sign and update a member"
        transaction={updateMembershipTransaction}
        signer={hasControllerChange ? member.rootAccount : member.controllerAccount}
        service={state.children.updateMembership}
      >
        <TextMedium>You intend to update your membership.</TextMedium>
      </SignTransactionModal>
    )
  }

  if (active && state.matches('success')) {
    return <UpdateMembershipSuccessModal onClose={hideModal} member={active} />
  }

  return null
}
