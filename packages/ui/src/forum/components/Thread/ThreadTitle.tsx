import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'

import { ButtonBareGhost, ButtonInnerWrapper, ButtonPrimary, ButtonsGroup } from '@/common/components/buttons'
import { InputArea, InputComponent, InputText } from '@/common/components/forms'
import { CheckboxIcon, CrossIcon } from '@/common/components/icons'
import { EditSymbol } from '@/common/components/icons/symbols'
import { PageTitle } from '@/common/components/page/PageTitle'
import { Colors } from '@/common/constants'
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
  initialTitle: string
}

const FormSchema = Yup.object().shape({})

export const ThreadTitle = ({ thread }: ThreadTitleProps) => {
  const { members: myMembers } = useMyMemberships()
  const [isEditTitle, setEditTitle] = useState<boolean>(false)
  const { showModal } = useModal<EditThreadTitleModalCall>()

  const isMyThread = thread && myMembers.find((member) => member.id === thread.authorId)

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
    showModal<EditThreadTitleModalCall>({
      modal: 'EditThreadTitleModal',
      data: {
        thread,
        newTitle,
        onSuccessfulEdit,
      },
    })
  }, [])

  const onSuccessfulEdit = useCallback((newTitle: string) => {
    changeField('initialTitle', newTitle)
    setEditTitle(false)
  }, [])

  return (
    <>
      {!isEditTitle && <PageTitle>{fields.initialTitle}</PageTitle>}
      {isEditTitle && (
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
      {isMyThread && !isEditTitle && (
        <StartEditAction onClick={toggleEditTitle} size="small" square>
          <EditSymbol />
        </StartEditAction>
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

const StartEditAction = styled(ButtonBareGhost)``

const EditTitleInputComponent = styled(InputComponent)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;

  ${InputArea} {
    padding-right: 8px;
  }
`
