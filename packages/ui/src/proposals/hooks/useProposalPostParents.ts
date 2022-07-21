import { useMemo } from 'react'

import { createType } from '@/common/model/createType'
import { ProposalPostParentsFragment, useGetProposalPostParentQuery } from '@/proposals/queries'

export const useProposalPostParents = (id: string) => {
  const { data, loading } = useGetProposalPostParentQuery({ variables: { where: { id } } })
  const { threadId } = useMemo(() => asProposalPostParents(data?.proposalDiscussionPostByUniqueInput), [data, loading])
  return { threadId, isLoading: loading }
}

const asProposalPostParents = (fields?: ProposalPostParentsFragment | null | undefined) => {
  if (!fields) {
    return {}
  }

  return {
    threadId: createType('ThreadId', Number.parseInt(fields.discussionThreadId)),
  }
}
