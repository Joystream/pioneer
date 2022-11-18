import React, { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'

import { ButtonBareGhost, ButtonInnerWrapper, ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { InputArea, InputComponent, InputText } from '@/common/components/forms'
import { BinIcon, CheckboxIcon, CrossIcon } from '@/common/components/icons'
import { EditSymbol } from '@/common/components/icons/symbols'
import { PageTitle } from '@/common/components/page/PageTitle'
import { Colors } from '@/common/constants'
import { useForm } from '@/common/hooks/useForm'
import { useModal } from '@/common/hooks/useModal'
import { DeleteThreadModalCall } from '@/forum/modals/DeleteThreadModal'
import { EditThreadTitleModalCall } from '@/forum/modals/EditThreadTitleModal'
import { ForumThreadWithDetails } from '@/forum/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

interface ThreadTitleProps {
  thread: ForumThreadWithDetails
}

interface TitleFormFields {
  title: string
  initialTitle: string
}

const FormSchema = Yup.object().shape({})

export const ThreadTitle = ({ thread }: ThreadTitleProps) => {
  const { active } = useMyMemberships()
  const [isEditTitle, setEditTitle] = useState<boolean>(false)
  const { showModal } = useModal<EditThreadTitleModalCall>()

  const isMyThread = useMemo(() => {
    return thread && active && thread.author.id === active.id
  }, [thread, active])

  const isRemovedThread = useMemo(() => {
    return thread.status.__typename === 'ThreadStatusRemoved'
  }, [thread.status.__typename])

  const formInitializer: TitleFormFields = {
    title: thread.title,
    initialTitle: thread.title,
  }
  const { fields, changeField } = useForm<TitleFormFields>(formInitializer, FormSchema)

  const toggleEditTitle = useCallback(() => {
    if (isEditTitle) {
      changeField('title', fields.initialTitle)
    }

    setEditTitle(!isEditTitle)
  }, [isEditTitle, fields.initialTitle])

  const submitTitle = useCallback((newTitle: string) => {
    setEditTitle(false)
    showModal<EditThreadTitleModalCall>({
      modal: 'EditThreadTitleModal',
      data: {
        thread,
        newTitle,
        onSuccess: onSuccessfulEdit,
      },
    })
  }, [])

  const onSuccessfulEdit = useCallback((newTitle: string) => {
    changeField('initialTitle', newTitle)
    setEditTitle(false)
  }, [])

  const deleteThread = useCallback(() => {
    showModal<DeleteThreadModalCall>({
      modal: 'DeleteThreadModal',
      data: { thread },
    })
  }, [])

  return (
    <>
      {!isEditTitle ? (
        <PageTitle $isRemovedThread={isRemovedThread}>{fields.initialTitle}</PageTitle>
      ) : (
        <EditTitleWrapper>
          <EditTitleInputComponent inputSize="m" onSubmit={() => submitTitle(fields.title)}>
            <InputText
              id="thread-title"
              value={fields.title}
              required
              onChange={(event) => changeField('title', event.target.value)}
            />
            <ButtonsGroup>
              <EditAction onClick={toggleEditTitle} size="small" square>
                <CrossIcon />
              </EditAction>
              <EditAction
                onClick={() => submitTitle(fields.title)}
                disabled={fields.title === fields.initialTitle}
                size="small"
                square
              >
                <CheckboxIcon />
              </EditAction>
            </ButtonsGroup>
          </EditTitleInputComponent>
        </EditTitleWrapper>
      )}
      {isMyThread && !isEditTitle && !isRemovedThread && (
        <ActionButtonWrapper onClick={toggleEditTitle} size="small" square>
          <EditSymbol />
        </ActionButtonWrapper>
      )}
      {isMyThread && !isRemovedThread && (
        <ActionButtonWrapper onClick={() => deleteThread()} size="small" square>
          <DeleteIcon />
        </ActionButtonWrapper>
      )}
    </>
  )
}

const EditTitleWrapper = styled.div`
  position: relative;
  width: 420px;
`

const EditAction = styled(ButtonPrimary)`
  &:first-child {
    ${ButtonInnerWrapper} > svg > path {
      stroke: ${Colors.White};
      stroke-width: 1px;
    }
  }

  ${ButtonInnerWrapper} > svg {
    width: 16px;
    height: 16px;
  }
`

const ActionButtonWrapper = styled(ButtonBareGhost)`
  padding-right: 0;
`

const EditTitleInputComponent = styled(InputComponent)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;

  ${InputArea} {
    padding-right: 8px;
  }
`

const DeleteIcon = styled(BinIcon)`
  height: 16px;
  width: 16px;
`
