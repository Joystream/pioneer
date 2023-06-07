import React, { useCallback, useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import styled from 'styled-components'
import * as Yup from 'yup'
import { AnySchema } from 'yup'

import { filterAccount, SelectAccount, SelectedAccount } from '@/accounts/components/SelectAccount'
import { useMyAccounts } from '@/accounts/hooks/useMyAccounts'
import { accountOrNamed } from '@/accounts/model/accountOrNamed'
import { Account } from '@/accounts/types'
import { ButtonPrimary, ButtonGhost } from '@/common/components/buttons'
import { InlineToggleWrap, InputComponent, InputText, InputTextarea, ToggleCheckbox } from '@/common/components/forms'
import { CrossIcon } from '@/common/components/icons'
import { PlusIcon } from '@/common/components/icons/PlusIcon'
import { AlertSymbol } from '@/common/components/icons/symbols'
import { Loading } from '@/common/components/Loading'
import {
  ModalHeader,
  ModalTransactionFooter,
  Row,
  RowInline,
  ScrolledModal,
  ScrolledModalBody,
  ScrolledModalContainer,
} from '@/common/components/Modal'
import { Tooltip, TooltipDefault } from '@/common/components/Tooltip'
import { Label, TextMedium, TextSmall } from '@/common/components/typography'
import { WithNullableValues } from '@/common/types/form'
import { definedValues } from '@/common/utils'
import { useYupValidationResolver } from '@/common/utils/validation'
import { AvatarInput } from '@/memberships/components/AvatarInput'
import { SocialMediaSelector } from '@/memberships/components/SocialMediaSelector/SocialMediaSelector'
import { useUploadAvatarAndSubmit } from '@/memberships/hooks/useUploadAvatarAndSubmit'
import { useGetMembersCountQuery } from '@/memberships/queries'

import { AvatarURISchema, ExternalResourcesSchema, HandleSchema } from '../../model/validation'
import { MemberWithDetails } from '../../types'

import { UpdateMemberForm } from './types'
import { changedOrNull, hasAnyEdits, membershipExternalResourceToObject } from './utils'


interface Props {
  onClose: () => void
  onSubmit: (params: WithNullableValues<UpdateMemberForm>) => void
  member: MemberWithDetails
}

const UpdateMemberSchema = Yup.object().shape({
  avatarUri: AvatarURISchema.nullable(),
  handle: Yup.string().when('$isHandleChanged', (isHandleChanged: boolean, schema: AnySchema) => {
    return isHandleChanged ? HandleSchema : schema
  }),
  externalResources: ExternalResourcesSchema,
})

const getUpdateMemberFormInitial = (member: MemberWithDetails) => ({
  id: member.id,
  name: member.name || '',
  handle: member.handle || '',
  about: member.about || '',
  avatarUri: process.env.REACT_APP_AVATAR_UPLOAD_URL ? '' : typeof member.avatar === 'string' ? member.avatar : '',
  rootAccount: member.rootAccount,
  controllerAccount: member.controllerAccount,
  externalResources: membershipExternalResourceToObject(member.externalResources) ?? {},
})

export const UpdateMembershipFormModal = ({ onClose, onSubmit, member }: Props) => {
  const { allAccounts } = useMyAccounts()
  const [handleMap, setHandleMap] = useState<string>(member.handle)
  const { data } = useGetMembersCountQuery({ variables: { where: { handle_eq: handleMap } } })
  const context = { size: data?.membershipsConnection.totalCount, isHandleChanged: handleMap !== member.handle }
  const { uploadAvatarAndSubmit, isUploading } = useUploadAvatarAndSubmit<UpdateMemberForm>((fields) =>
    onSubmit(
      changedOrNull(
        { ...fields, externalResources: { ...definedValues(fields.externalResources) } },
        getUpdateMemberFormInitial(member)
      )
    )
  )
  // isValidator, stashAccounts should be read from member
  // const isValidator = member.isValidator ?? false
  // const stashAccounts = member.stashAccounts ?? []
  const [stashAccounts, setStashAccounts] = useState([{}])
  const [isAccountAdded, setIsAccountAdded] = useState(true)
  
  const form = useForm({
    resolver: useYupValidationResolver<UpdateMemberForm>(UpdateMemberSchema),
    defaultValues: {
      ...getUpdateMemberFormInitial(member),
      rootAccount: accountOrNamed(allAccounts, member.rootAccount, 'Root Account'),
      controllerAccount: accountOrNamed(allAccounts, member.controllerAccount, 'Controller Account'),
    },
    context,
    mode: 'onChange',
  })
  
  const [controllerAccount, rootAccount, handle, stashAccountSelect, isValidator] = form.watch(['controllerAccount', 'rootAccount', 'handle', 'stashAccountSelect', 'isValidator'])

  useEffect(() => {
    form.trigger('handle')
  }, [JSON.stringify(context)])

  useEffect(() => {
    handle && setHandleMap(handle)
  }, [handle])

  const filterRoot = useCallback(filterAccount(controllerAccount), [controllerAccount])
  const filterController = useCallback(filterAccount(rootAccount), [rootAccount])

  const canUpdate = form.formState.isValid && hasAnyEdits(form.getValues(), getUpdateMemberFormInitial(member)) && ( !isValidator || stashAccounts?.length > 1 )

  const addStashAccount = () => {
    const accountSelection = stashAccountSelect as Account;
    setStashAccounts((prevStashAccounts)=>[...prevStashAccounts,accountSelection])
    form?.setValue('stashAccountSelect' as keyof UpdateMemberForm, undefined)
  }

  const removeStashAccount = (index:number) => {
    setStashAccounts((prevAccounts)=>prevAccounts.filter((account,ind)=>ind!==index))
  }

  useEffect(()=>{
    const accountSelection = stashAccountSelect as Account;
    if (stashAccounts.some((account)=>account === accountSelection)) {
      setIsAccountAdded(true)
    } else {
      setIsAccountAdded(false)
    }
  },[stashAccountSelect])
  return (
    <ScrolledModal modalSize="m" modalHeight="m" onClose={onClose}>
      <ModalHeader onClick={onClose} title="Edit membership" />
      <ScrolledModalBody>
        <ScrolledModalContainer>
          <FormProvider {...form}>
            <Row>
              <TextMedium dark>Please fill in all the details below.</TextMedium>
            </Row>

            <Row>
              <InputComponent
                label="Root account"
                tooltipText="Root account is used to create membership and sign membership updates. All other transactions on the network are signed with controller account."
                required
                inputSize="l"
              >
                <SelectAccount filter={filterRoot} name="rootAccount" />
              </InputComponent>
            </Row>

            <Row>
              <InputComponent
                label="Controller account"
                tooltipText="Controller account is used to sign transactions."
                required
                inputSize="l"
              >
                <SelectAccount filter={filterController} name="controllerAccount" />
              </InputComponent>
            </Row>

            <Row>
              <InputComponent id="member-name" label="Member Name" required>
                <InputText id="member-name" placeholder="Type" name="name" />
              </InputComponent>
            </Row>

            <Row>
              <InputComponent id="member-handle" label="Membership handle" name="handle" required>
                <InputText id="member-handle" placeholder="Type" name="handle" />
              </InputComponent>
            </Row>

            <Row>
              <InputComponent id="member-about" label="About member" inputSize="l">
                <InputTextarea id="member-about" placeholder="Type" name="about" />
              </InputComponent>
            </Row>

            <AvatarInput initialPreview={member.avatar} />

            <SocialMediaSelector
              initialSocials={
                member.externalResources ? member.externalResources.map((resource) => resource.source) : []
              }
            />

            <Row>
              <InlineToggleWrap>
                <Label>I am a validator: </Label>
                <ToggleCheckbox trueLabel="Yes" falseLabel="No" name="isValidator"/>
              </InlineToggleWrap>
            </Row>
            {isValidator && (
            <>
            <Row>
              <RowInline>
                <InputComponent
                  id="select-stashAccount"
                  label="Stash account"
                  inputSize="l"
                  tooltipText="Stash account is ... TOOLTIP MUST BE PROVIDED"
                >
                  <SelectAccount id="select-stashAccount" name="stashAccountSelect"/>
                </InputComponent>
                <BtnWrapper pt={30} width={65}>
                <ButtonPrimary size="medium" onClick={addStashAccount}
                  disabled={isAccountAdded || stashAccountSelect === undefined}
                  >
                  <PlusIcon />
                </ButtonPrimary>
                </BtnWrapper>
              </RowInline>
              {isAccountAdded && (
                <RowInline>
                  <TextSmall error><InputNotificationIcon><AlertSymbol/></InputNotificationIcon></TextSmall>
                  <TextSmall error>
                    This stash account is already added to the list.
                  </TextSmall>
                </RowInline>
                )
              }
              {stashAccounts.length < 2 && (
                <RowInline>
                  <TextSmall error><InputNotificationIcon><AlertSymbol/></InputNotificationIcon></TextSmall>
                  <TextSmall error>
                    You should add at least 1 stash account.
                  </TextSmall>
                </RowInline>
                )
              }
            </Row>

            {stashAccounts.map((stashAccount, index)=>{
              if(index !== 0){
                return(
                  <Row>
                    <RowInline>
                        <SelectedAccount account={stashAccount as Account} key={'selected'+index}/>
                      <BtnWrapper width={65}>
                      <ButtonGhost size="medium" onClick={()=>{removeStashAccount(index)}
                      }>
                        <CrossIcon />
                      </ButtonGhost>
                      </BtnWrapper>
                    </RowInline>
                  </Row>)
              }
            })}
            <Row>
              <RowInline>
              <Label>Status</Label>
              <Tooltip
                tooltipText="This is the status which indicates the selected account is actually a validator account."
              >
                <TooltipDefault />
              </Tooltip>
                <TextSmall dark> : {'Unverified'} ! </TextSmall>
              </RowInline>
            </Row>
            </>
            )}


          </FormProvider>
        </ScrolledModalContainer>
      </ScrolledModalBody>
      <ModalTransactionFooter
        next={{
          disabled: !canUpdate || isUploading,
          label: isUploading ? <Loading text="Uploading avatar" /> : 'Save changes',
          onClick: () => {
            stashAccounts.length > 1 && (
              stashAccounts.map((account, index)=>{
                if(index !== 0){
                  form?.register('stashAccounts[' + (index - 1) + ']' as keyof UpdateMemberForm)
                  form?.setValue('stashAccounts[' + (index - 1) + ']' as keyof UpdateMemberForm, account as Account)
                }
              })
            )
            uploadAvatarAndSubmit(form.getValues())
          },
        }}
      />
    </ScrolledModal>
  )
}

const InputNotificationIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 12px;
  height: 12px;
  color: inherit;
  padding-right: 2px;

  .blackPart,
  .primaryPart {
    fill: currentColor;
  }
`
interface PaddingProps {
  pl?: number
  pr?: number
  pt?: number
  pb?: number
  width?: number
}

const BtnWrapper = styled.div<PaddingProps>`
 padding-right : ${({ pr }) => ( pr ? pr + 'px' : '0px')};
 padding-left  : ${({ pl }) => ( pl ? pl + 'px' : '0px')};
 padding-top   : ${({ pt }) => ( pt ? pt + 'px' : '0px')};
 padding-bottom: ${({ pb }) => ( pb ? pb + 'px' : '0px')};
 width         : ${({ width }) => ( width ? width + 'px' : '0px')};
 display : flex;
 justify-content : end;
`
