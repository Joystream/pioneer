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
    <>
      {!isEditTitle && <PageTitle>{thread.title}</PageTitle>}
      {isEditTitle && (
        <EditTitleWrapper>
          <EditTitleInputComponent inputSize="m" onSubmit={submitTitle}>
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
              <EditAction onClick={() => submitTitle()} disabled={fields.title === thread.title} size="small" square>
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
