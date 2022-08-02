import BN from 'bn.js'
import React, { ReactElement, useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { ButtonPrimary } from '@/common/components/buttons'
import { InputComponent, InputNumber } from '@/common/components/forms'
import { Modal, ModalBody, ModalFooter, ModalHeader, Row, TransactionAmount } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { maxContext, useYupValidationResolver } from '@/common/utils/validation'
import { InviteMembershipFormFields } from '@/memberships/modals/BuyMembershipModal/BuyMembershipFormModal'
import { AccountSchema } from '@/memberships/model/validation'

import { filterMember, SelectedMember, SelectMember } from '../../components/SelectMember'
import { Member } from '../../types'

interface Props {
  onClose: () => void
  onAccept: (amount: BN, from: Member, to: Member) => void
  icon: ReactElement
  member?: Member
}

const formDefaultValues = {
  from: undefined,
  amount: undefined,
  to: undefined,
}

const TransferInviteSchema = Yup.object().shape({
  from: AccountSchema.required('This field is required'),
  amount: Yup.number()
    .min(1, 'Number of invitation has to be greater than 0')
    .test(maxContext('You only have ${max} invites left.', 'inviteCount', false))
    .required('This field is required'),
  to: AccountSchema.required('This field is required'),
})

export function TransferInviteFormModal({ onClose, onAccept, icon, member }: Props) {
  const filterRecipient = useCallback(filterMember(member), [member])

  const form = useForm<InviteMembershipFormFields>({
    resolver: useYupValidationResolver(TransferInviteSchema),
    mode: 'onChange',
    context: {
      inviteCount: member?.inviteCount ?? 0,
    },
    defaultValues: { ...formDefaultValues, from: member },
  })

  const [from, to] = form.watch(['from', 'to'])

  const onSubmit = () => {
    const values = form.getValues()
    onAccept(new BN(values.amount), values.from as Member, values.to)
  }

  return (
    <Modal onClose={onClose} modalSize="m">
      <ModalHeader onClick={onClose} title="Transfer invites" icon={icon} />
      <ModalBody>
        <Row>
          <TextMedium margin="s">Transfer Invites to a member.</TextMedium>
        </Row>
        <FormProvider {...form}>
          <InputComponent label="From" inputSize="l" disabled={!!member}>
            <SelectedMember disabled member={from} />
          </InputComponent>
          <TransactionAmount>
            <InputComponent
              id="amount-input"
              label="Number of Invites"
              required
              name="amount"
              message={`You have ${member?.inviteCount} invites.`}
              inputWidth="s"
            >
              <InputNumber id="amount-input" placeholder="0" name="amount" />
            </InputComponent>
          </TransactionAmount>
          <InputComponent label="To" inputSize="l" required name="to">
            <SelectMember
              onChange={(receiverAccount) => form.setValue('to', receiverAccount, { shouldValidate: true })}
              filter={filterRecipient}
              selected={to}
            />
          </InputComponent>
        </FormProvider>
      </ModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium" onClick={onSubmit} disabled={!form.formState.isValid}>
          Transfer Invites
        </ButtonPrimary>
      </ModalFooter>
    </Modal>
  )
}
