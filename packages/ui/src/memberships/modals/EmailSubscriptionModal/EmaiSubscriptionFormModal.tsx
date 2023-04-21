import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import styled from 'styled-components'
import * as Yup from 'yup'

import { ButtonGhost } from '@/common/components/buttons'
import { InputComponent, InputText } from '@/common/components/forms'
import { Info } from '@/common/components/Info'
import { ModalHeader, ModalTransactionFooter, Row, Modal, ModalBody } from '@/common/components/Modal'
import { TextMedium } from '@/common/components/typography'
import { useLocalStorage } from '@/common/hooks/useLocalStorage'
import { useYupValidationResolver } from '@/common/utils/validation'

import { Member } from '../../types'

import { EmailSubscriptionForm } from './types'

interface Props {
  onClose: () => void
  onSubmit: (params: EmailSubscriptionForm) => void
  member: Member
}

const EmailSubscriptionSchema = Yup.object().shape({
  email: Yup.string().email().required('This field is required.'),
})

export const EmailSubscriptionFormModal = ({ onClose, onSubmit, member }: Props) => {
  const [, setEmail] = useLocalStorage('memberEmail')

  const form = useForm({
    resolver: useYupValidationResolver<EmailSubscriptionForm>(EmailSubscriptionSchema),
    mode: 'onChange',
  })

  const onCancelClick = () => {
    setEmail('')
    onClose()
  }

  const onSubmitClick = () => {
    onSubmit({
      email: form.getValues('email'),
      id: member.id,
      name: member.name,
    })
  }

  const isValid = !form.getValues('email') || form.getFieldState('email').invalid

  return (
    <Modal modalSize="m" modalHeight="m" onClose={onCancelClick}>
      <ModalHeader onClick={onCancelClick} title="Sign up to email notifications" />
      <ModalBody>
        <FormProvider {...form}>
          <Row>
            <InputComponent
              id="email"
              label="Email"
              required
              inputSize="l"
              tooltipText="Add your email address here to receive notifications. It can be the same or different to the one added to the membership profile."
            >
              <InputText id="email" placeholder="Add email for notifications here" required name="email" />
            </InputComponent>
          </Row>
        </FormProvider>
        <Row>
          <Info title="Your email will never be shared and does not go on chain">
            <TextMedium light>
              We use your email only to send you important notifications. You can change this email, opt out from
              notifications and customize what kind of notifications you receive anytime in settings.
            </TextMedium>
          </Info>
        </Row>
      </ModalBody>
      <StyledFooter
        next={{
          disabled: isValid,
          label: 'Sign and Authorize Email',
          onClick: onSubmitClick,
        }}
      >
        <ButtonGhost size="medium" onClick={onCancelClick}>
          cancel
        </ButtonGhost>
      </StyledFooter>
    </Modal>
  )
}

const StyledFooter = styled(ModalTransactionFooter)`
  grid-column-gap: 20px;
`
