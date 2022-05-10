import { blake2AsHex } from '@polkadot/util-crypto'
import React, { useEffect } from 'react'
import * as Yup from 'yup'

import { LinkSymbol } from '@/common/components/icons/symbols'
import { TooltipExternalLink } from '@/common/components/Tooltip'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

import { ButtonPrimary } from '../../../common/components/buttons'
import { InputComponent, InputText, InputTextarea } from '../../../common/components/forms'
import { getErrorMessage, hasError } from '../../../common/components/forms/FieldError'
import {
  ModalFooter,
  ModalHeader,
  ScrolledModal,
  ScrolledModalBody,
  ScrolledModalContainer,
  Row,
} from '../../../common/components/Modal'
import { TextMedium } from '../../../common/components/typography'
import { useApi } from '../../../common/hooks/useApi'
import { useForm } from '../../../common/hooks/useForm'
import { useKeyring } from '../../../common/hooks/useKeyring'
import { useObservable } from '../../../common/hooks/useObservable'
import { SelectMember } from '../../components/SelectMember'
import { AvatarURISchema, HandleSchema, MemberSchema, NewAddressSchema } from '../../model/validation'
import { MemberFormFields } from '../BuyMembershipModal/BuyMembershipFormModal'

interface InviteProps {
  onClose: () => void
  onSubmit: (params: MemberFormFields) => void
}

const InviteMemberSchema = Yup.object().shape({
  invitor: MemberSchema.required(),
  rootAccount: NewAddressSchema('rootAccount'),
  controllerAccount: NewAddressSchema('controllerAccount'),
  avatarUri: AvatarURISchema,
  name: Yup.string(),
  handle: HandleSchema.required('Membership handle is required'),
})

const initializer = {
  name: '',
  handle: '',
  about: '',
  avatarUri: '',
  hasTerms: false,
}

export const InviteMemberFormModal = ({ onClose, onSubmit }: InviteProps) => {
  const { api } = useApi()
  const { active } = useMyMemberships()
  const keyring = useKeyring()

  const { fields, changeField, validation } = useForm<MemberFormFields>(initializer, InviteMemberSchema)
  const { isValid, errors, setContext } = validation

  const { rootAccount, controllerAccount, handle, name, avatarUri, about } = fields

  const onCreate = () => onSubmit(fields)
  const handleHash = blake2AsHex(handle)
  const potentialMemberIdSize = useObservable(api?.query.members.memberIdByHandleHash.size(handleHash), [handle, api])

  useEffect(() => {
    return active && changeField('invitor', active)
  }, [active])

  useEffect(() => {
    setContext({ size: potentialMemberIdSize, keyring })
  }, [potentialMemberIdSize?.toString()])

  return (
    <ScrolledModal modalSize="m" modalHeight="m" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Invite a member" />
      <ScrolledModalBody>
        <ScrolledModalContainer>
          <InputComponent label="Inviting member" inputSize="l">
            <SelectMember selected={fields.invitor} onChange={(member) => changeField('invitor', member)} />
          </InputComponent>

          <Row>
            <TextMedium dark>To invite a member please fill in all the details below.</TextMedium>
          </Row>

          <Row>
            <InputComponent
              label="Root account"
              id="root-account"
              required
              tooltipText="Something about root accounts"
              validation={hasError('rootAccount', errors) ? 'invalid' : undefined}
              message={hasError('rootAccount', errors) ? getErrorMessage('rootAccount', errors) : ' '}
            >
              <InputText
                id="root-account"
                placeholder="Enter the account of the person being invited."
                value={rootAccount?.address ?? ''}
                onChange={(event) => changeField('rootAccount', { name: undefined, address: event.target.value })}
              />
            </InputComponent>
          </Row>

          <Row>
            <InputComponent
              label="Controller account"
              id="controller-account"
              required
              tooltipText="Something about controller accounts"
              validation={hasError('controllerAccount', errors) ? 'invalid' : undefined}
              message={hasError('controllerAccount', errors) ? getErrorMessage('controllerAccount', errors) : ' '}
            >
              <InputText
                id="controller-account"
                placeholder="Enter the account of the person being invited."
                value={controllerAccount?.address ?? ''}
                onChange={(event) => changeField('controllerAccount', { name: undefined, address: event.target.value })}
              />
            </InputComponent>
          </Row>

          <Row>
            <InputComponent
              id="member-handle"
              label="Membership handle"
              required
              tooltipText={
                <>
                  Membership handle is the primary way of how members are displayed throughout all interfaces of the
                  platform. Membership handle can be updated any time by the account holder.
                  <TooltipExternalLink
                    target="_blank"
                    href="https://joystream.gitbook.io/testnet-workspace/system/memberships#membership"
                  >
                    Learn more <LinkSymbol />
                  </TooltipExternalLink>
                </>
              }
              validation={hasError('handle', errors) ? 'invalid' : undefined}
              message={hasError('handle', errors) ? getErrorMessage('handle', errors) : 'Do not use same handles'}
            >
              <InputText
                id="member-handle"
                placeholder="Type"
                value={handle}
                onChange={(event) => changeField('handle', event.target.value)}
              />
            </InputComponent>
          </Row>

          <Row>
            <InputComponent id="member-name" label="Member Name">
              <InputText
                id="member-name"
                placeholder="Type"
                value={name}
                onChange={(event) => changeField('name', event.target.value)}
              />
            </InputComponent>
          </Row>

          <Row>
            <InputComponent id="member-about" label="About member" inputSize="l">
              <InputTextarea
                id="member-about"
                value={about}
                placeholder="Type"
                onChange={(event) => changeField('about', event.target.value)}
              />
            </InputComponent>
          </Row>

          <Row>
            <InputComponent
              id="member-avatar"
              label="Member Avatar"
              value={avatarUri}
              validation={hasError('avatarUri', errors) ? 'invalid' : undefined}
              message={
                hasError('avatarUri', errors)
                  ? getErrorMessage('avatarUri', errors)
                  : 'Paste an URL of your avatar image. Text lorem ipsum.'
              }
              placeholder="Image URL"
            >
              <InputText
                id="member-avatar"
                value={avatarUri}
                onChange={(event) => changeField('avatarUri', event.target.value)}
              />
            </InputComponent>
          </Row>
        </ScrolledModalContainer>
      </ScrolledModalBody>
      <ModalFooter>
        <ButtonPrimary size="medium" onClick={onCreate} disabled={!isValid}>
          Invite a Member
        </ButtonPrimary>
      </ModalFooter>
    </ScrolledModal>
  )
}
