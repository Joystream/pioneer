import { blake2AsHex } from '@polkadot/util-crypto'
import React, { useEffect, useReducer, useState } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'
import { Animations, Colors } from '../../../constants'
import { useFormValidation } from '../../../hooks/useFormValidation'
import { useMyMemberships } from '../../../hooks/useMyMemberships'
import { useFormValidation } from '../../../modals/AddMembershipModal/useFormValidation'
import { Button } from '../../buttons'
import { EditSymbol } from '../../icons/symbols/EditSymbol'
import { CloseSmallModalButton } from '../../Modal'
import { PageTab, PageTabsNav } from '../../page/PageTabs'
import { MemberInfo } from '../MemberInfo'
import { EditMemberInfo } from './EditMemberInfo'
import { MemberAccounts } from './MemberAccounts'
import { MemberDetails } from './MemberDetails'
import { WithMember } from './types'

type Props = WithMember & {
  onClose: () => void
}

type Tabs = 'DETAILS' | 'ACCOUNTS' | 'ROLES'

export interface MemberUpdateFormData {
  memberId: string
  name?: string | null
  handle?: string | null
  avatarURI?: string | null
  about?: string | null
}

export type Action = {
  type: keyof MemberUpdateFormData
  value: string | undefined
}

const UpdateMemberSchema = Yup.object().shape({
  avatarURI: Yup.string().url(),
  handle: Yup.string()
    .test('handle', 'This handle is already taken', (value, testContext) => {
      const existingMember = testContext?.options?.context?.existingMember
      return existingMember?.handle_hash.toJSON() !== blake2AsHex(value || '')
    })
    .required(),
})

const updateReducer = (state: MemberUpdateFormData, action: Action): MemberUpdateFormData => {
  return {
    ...state,
    [action.type]: action.value as string,
  }
}

export const MemberProfile = React.memo(({ onClose, member }: Props) => {
  const [activeTab, setActiveTab] = useState<Tabs>('DETAILS')
  const [isEdit, setIsEdit] = useState(false)
  const { members, isLoading } = useMyMemberships()
  const isMyMember = !isLoading && !!members.find((m) => m.id == member.id)
  const { isValid, validate } = useFormValidation(UpdateMemberSchema)
  useEffect(() => {
    validate(state, {})
  })
  const saveChanges = () => {
    setIsEdit(false)
  }

  const [state, dispatch] = useReducer(updateReducer, {
    memberId: member.id,
    name: member.name,
    handle: member.handle,
    avatarURI: member.avatarURI,
    about: member.about,
  })

  const onBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <SidePaneGlass onClick={onBackgroundClick} onClose={onClose}>
      <SidePane>
        <SidePaneHeader>
          <CloseSmallModalButton onClick={onClose} />
          <SidePaneTitle>My Profile</SidePaneTitle>
          {isEdit ? (
            <EditMemberInfo member={member} formData={state} dispatch={dispatch} memberSize="l" />
          ) : (
            <MemberInfo member={member} memberSize="l" />
          )}
          <PageTabsNav>
            <PageTab active={activeTab === 'DETAILS'} onClick={() => setActiveTab('DETAILS')}>
              Member details
            </PageTab>
            <PageTab active={activeTab === 'ACCOUNTS'} onClick={() => setActiveTab('ACCOUNTS')}>
              Accounts
            </PageTab>
            <PageTab active={activeTab === 'ROLES'} onClick={() => setActiveTab('ROLES')}>
              Roles
            </PageTab>
          </PageTabsNav>
        </SidePaneHeader>
        <SidePaneBody>
          {activeTab === 'DETAILS' && (
            <MemberDetails member={member} isEdit={isEdit} formData={state} dispatch={dispatch} />
          )}
          {activeTab === 'ACCOUNTS' && <MemberAccounts member={member} />}
          {activeTab === 'ROLES' && <EmptyBody>Roles</EmptyBody>}
        </SidePaneBody>
        <SidePaneFooter>
          {isMyMember &&
            activeTab === 'DETAILS' &&
            (isEdit ? (
              <Button variant="primary" size="medium" onClick={saveChanges} disabled={!isValid}>
                Save changes
              </Button>
            ) : (
              <Button variant="ghost" size="medium" onClick={() => setIsEdit(true)}>
                <EditSymbol />
                Edit My Profile
              </Button>
            ))}
        </SidePaneFooter>
      </SidePane>
    </SidePaneGlass>
  )
})

export const SidePaneGlass = styled.div<Omit<Props, 'member'>>`
  display: flex;
  justify-content: flex-end;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${Colors.Black[700.85]};
  color: ${Colors.Black[900]};
  z-index: 100000;
  ${Animations.showModalBackground};
`

const SidePane = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(auto, 200px) 1fr 72px;
  grid-template-areas:
    'sidepaneheader'
    'sidepanebody'
    'sidepanefooter';
  grid-area: modal;
  position: relative;
  background-color: ${Colors.White};
  width: 100%;
  max-width: 552px;
  height: 100vh;
  overflow: hidden;
  ${Animations.showSidePane};
`

const SidePaneHeader = styled.div`
  display: grid;
  grid-area: sidepaneheader;
  grid-row-gap: 24px;
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 200px;
  padding: 24px 24px 0;
  background-color: ${Colors.White};
`

const SidePaneTitle = styled.h4`
  line-height: 24px;
`

const SidePaneBody = styled.div`
  display: flex;
  grid-area: sidepanebody;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-height: 100%;
  background-color: ${Colors.Black[50]};
  border-top: 1px solid ${Colors.Black[200]};
  border-bottom: 1px solid ${Colors.Black[200]};
  overflow-y: scroll;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const EmptyBody = styled.div`
  padding: 24px;
`

const SidePaneFooter = styled.div`
  display: grid;
  grid-area: sidepanefooter;
  position: relative;
  justify-items: end;
  align-items: center;
  width: 100%;
  height: 100%;
  max-height: 72px;
  padding: 16px 24px;
  background-color: ${Colors.White};
`
