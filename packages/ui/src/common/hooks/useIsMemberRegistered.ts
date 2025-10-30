import { gql } from '@apollo/client'
import { isUndefined } from 'lodash'

import { useBackend } from './useBackend'

const query = gql`
  query MemberExist($id: Int) {
    memberExist(id: $id)
  }
`

type UseIsMemberRegistered = { isRegistered?: boolean; error?: Error }

export const useIsMemberRegistered = (memberId: number | undefined): UseIsMemberRegistered => {
  const { data, error } = useBackend<{ memberExist: boolean | null }>({
    query,
    variables: { id: memberId },
    skip: isUndefined(memberId),
  })

  return { isRegistered: data?.memberExist ?? undefined, error }
}
