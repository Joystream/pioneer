import React from 'react'

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

export const isURL = (input: any): boolean => {
  const urlRegex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i
  return urlRegex.test(input)
}

export const UpdateMembershipModal = () => {
  const { api } = useApi()
  const { active } = useMyMemberships()
  const {
    hideModal,
    modalData: { member },
  } = useModal<UpdateMembershipModalCall>()
  const [state, send] = useMachine(updateMembershipMachine)

  if (state.matches('prepare')) {
    return (
      <UpdateMembershipFormModal
        onClose={hideModal}
        onSubmit={(params) => {
          if (params.externalResources?.TWITTER) {
            params.externalResources?.TWITTER.includes('@')
              ? (params.externalResources.TWITTER = params.externalResources.TWITTER.split('@')[1])
              : params.externalResources.TWITTER
            isURL(params.externalResources?.TWITTER)
              ? (params.externalResources.TWITTER = new URL(params.externalResources.TWITTER).pathname.substring(1))
              : params.externalResources?.TWITTER
          }
          if (params.externalResources?.GITHUB) {
            params.externalResources?.GITHUB.includes('@')
              ? (params.externalResources.GITHUB = params.externalResources.GITHUB.split('@')[1])
              : params.externalResources.GITHUB
            isURL(params.externalResources?.GITHUB)
              ? (params.externalResources.GITHUB = new URL(params.externalResources.GITHUB).pathname.substring(1))
              : params.externalResources?.GITHUB
          }
          if (params.externalResources?.TELEGRAM) {
            params.externalResources?.TELEGRAM.includes('@')
              ? (params.externalResources.TELEGRAM = params.externalResources.TELEGRAM.split('@')[1])
              : params.externalResources.TELEGRAM
          }

          if (params.externalResources?.YOUTUBE) {
            params.externalResources?.YOUTUBE.includes('@')
              ? (params.externalResources.YOUTUBE = params.externalResources.YOUTUBE.split('@')[1])
              : params.externalResources.YOUTUBE
          }

          if (params.externalResources?.FACEBOOK) {
            params.externalResources?.FACEBOOK.includes('@')
              ? (params.externalResources.FACEBOOK = params.externalResources.FACEBOOK.split('@')[1])
              : params.externalResources.FACEBOOK
            isURL(params.externalResources?.FACEBOOK)
              ? (params.externalResources.FACEBOOK = new URL(params.externalResources.FACEBOOK).pathname.substring(1))
              : params.externalResources?.FACEBOOK
          }

          if (params.externalResources?.LINKEDIN) {
            params.externalResources?.LINKEDIN.includes('@')
              ? (params.externalResources.LINKEDIN = params.externalResources.LINKEDIN.split('@')[1])
              : params.externalResources.LINKEDIN
            isURL(params.externalResources?.LINKEDIN)
              ? (params.externalResources.LINKEDIN = params.externalResources?.LINKEDIN.split('/')[4])
              : params.externalResources?.LINKEDIN
          }

          send('DONE', { form: params })
        }}
        member={member}
      />
    )
  }

  if (state.matches('transaction')) {
    return (
      <SignTransactionModal
        buttonText="Sign and update a member"
        transaction={createBatch(state.context.form, api, member)}
        signer={member.controllerAccount}
        service={state.children.transaction}
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
