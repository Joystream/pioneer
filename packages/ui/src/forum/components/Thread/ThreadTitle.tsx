import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'

import { InputComponent, InputText } from '@/common/components/forms'
import { CrossIcon, VerifiedMemberIcon } from '@/common/components/icons'
import { EditSymbol } from '@/common/components/icons/symbols'
import { PageTitle } from '@/common/components/page/PageTitle'
import { useForm } from '@/common/hooks/useForm'
import { useModal } from '@/common/hooks/useModal'
import { EditThreadTitleModalCall } from '@/forum/modals/EditThreadTitleModal'
import { ForumThreadWithDetails } from '@/forum/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

interface ThreadTitleProps {
  thread: ForumThreadWithDetails
}

interface TitleFormFields {
  title: string
}

const FormSchema = Yup.object().shape({})

export const ThreadTitle = ({ thread }: ThreadTitleProps) => {
  const { members: myMembers } = useMyMemberships()
  const [isEditTitle, setEditTitle] = useState<boolean>(false)
  const { showModal, hideModal } = useModal<EditThreadTitleModalCall>()

  const isMyThread = thread && myMembers.find((member) => member.id === thread.authorId)

  const formInitializer: TitleFormFields = {
    title: thread.title,
  }
  const { fields, changeField } = useForm<TitleFormFields>(formInitializer, FormSchema)

  const toggleEditTitle = useCallback(() => {
    if (isEditTitle) {
      changeField('title', thread.title)
    }

    setEditTitle(!isEditTitle)
  }, [isEditTitle])

  const submitTitle = useCallback(() => {
    showModal<EditThreadTitleModalCall>({
      modal: 'EditThreadTitleModal',
      data: {
        thread,
        newTitle: fields.title,
        onClose: hideModal,
      },
    })
    toggleEditTitle()
  }, [])

  return (
    <PageTitle>
      {!isEditTitle && thread.title}
      {isEditTitle && (
        <>
          <InputComponent inputSize="s" onSubmit={submitTitle}>
            <InputText
              id="thread-title"
              value={fields.title}
              required
              onChange={(event) => changeField('title', event.target.value)}
            />
          </InputComponent>
          <EditTitle onClick={() => submitTitle()}>
            <VerifiedMemberIcon />
          </EditTitle>
        </>
      )}
      {isMyThread && <EditTitle onClick={toggleEditTitle}>{!isEditTitle ? <EditSymbol /> : <CrossIcon />}</EditTitle>}
    </PageTitle>
  )
}

const EditTitle = styled.span`
  cursor: pointer;
  margin-left: 3px;

  &:hover {
    opacity: 0.7;
  }
`
