import React, { useState } from 'react'
import styled from 'styled-components'

import { InputText } from '@/common/components/forms'
import { CrossIcon } from '@/common/components/icons'
import { EditSymbol } from '@/common/components/icons/symbols'
import { PageTitle } from '@/common/components/page/PageTitle'
import { ForumThreadWithDetails } from '@/forum/types'
import { useMyMemberships } from '@/memberships/hooks/useMyMemberships'

interface ThreadTitleProps {
  thread: ForumThreadWithDetails
}

export const ThreadTitle = ({ thread }: ThreadTitleProps) => {
  const { members: myMembers } = useMyMemberships()
  const [isEditTitle, setEditTitle] = useState<boolean>(false)

  const isMyThread = thread && myMembers.find((member) => member.id === thread.id)

  return (
    <PageTitle>
      {!isEditTitle && thread.title}
      {isEditTitle && <InputText id="thread-title" value={thread.title} required />}
      {isMyThread && (
        <EditTitle onClick={() => setEditTitle(!isEditTitle)}>
          {!isEditTitle ? <EditSymbol /> : <CrossIcon />}
        </EditTitle>
      )}
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
