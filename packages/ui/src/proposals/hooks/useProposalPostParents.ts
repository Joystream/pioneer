import { createType } from '@joystream/types'
import { useMemo } from 'react'

import { ProposalPostParentsFragment, useGetProposalPostParentQuery } from '@/proposals/queries'

export const useProposalPostParents = (id: string) => {
  const { data, loading } = useGetProposalPostParentQuery({ variables: { where: { id } } })
  const { threadId } = useMemo(() => asProposalPostParents(data?.proposalDiscussionPostByUniqueInput), [data, loading])
  return { threadId, isLoading: loading }
}

const asProposalPostParents = (fields?: ProposalPostParentsFragment | null | undefined) =>
  fields
    ? {
        threadId: createType('ThreadId', Number.parseInt(fields.threadId)),
      }
    : {}
