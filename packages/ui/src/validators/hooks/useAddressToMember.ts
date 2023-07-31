import { error } from '@/common/logger'
import { Address } from '@/common/types'
import { useGetMembersWithDetailsQuery } from '@/memberships/queries'
import { asMemberWithDetails } from '@/memberships/types'

export const useAddressToMember = (address: Address) => {
  const variables = {
    where: {
      OR: [{ controllerAccount_eq: address }, { rootAccount_eq: address }, { boundAccounts_containsAny: [address] }],
    },
  }

  const { data, loading, error: err } = useGetMembersWithDetailsQuery({ variables })

  if (err) {
    error(err)
  }

  return {
    isLoading: loading,
    member: data?.memberships.map(asMemberWithDetails)[0],
  }
}
