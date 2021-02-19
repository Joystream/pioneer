import { gql, useQuery } from '@apollo/client'

interface UseMembership {
  count: number
}

const query = gql`
  query GetMemberships {
    id
  }
`

export function useMembership(): UseMembership {
  useQuery(query)

  return { count: 0 }
}
