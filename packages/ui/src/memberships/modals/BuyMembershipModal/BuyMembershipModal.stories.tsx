import React, { Meta, StoryFn } from '@storybook/react'

import { ModalHeader, ScrolledModal } from '@/common/components/Modal'
import { joy } from '@/mocks/helpers'
import { asChainData } from '@/mocks/helpers/asChainData'

import { BuyMembershipForm, BuyMembershipFormProps } from './BuyMembershipFormModal'

export default {
  title: 'Member/Modals/BuyMembershipModal',
  component: BuyMembershipForm,

  argTypes: {
    type: {
      options: ['onBoarding', 'general'],
      control: { type: 'radio' },
    },
    onClose: { action: 'Close modal' },
  },

  args: {
    type: 'general',
    membershipPrice: 16.6666666666,
  },
} as Meta

export const Default: StoryFn = ({ onClose, ...args }) => {
  const props = {
    ...args,
    membershipPrice: asChainData(joy(args.membershipPrice)),
  } as BuyMembershipFormProps

  return (
    <ScrolledModal modalSize="m" modalHeight="m" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Add membership" />
      <BuyMembershipForm {...props} />
    </ScrolledModal>
  )
}
