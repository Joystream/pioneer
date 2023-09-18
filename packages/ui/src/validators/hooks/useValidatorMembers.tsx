import { useMemo } from 'react'
import { map } from 'rxjs'

import { useApi } from '@/api/hooks/useApi'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { useGetMembersWithDetailsQuery } from '@/memberships/queries'
import { asMemberWithDetails } from '@/memberships/types'

import { ValidatorMembership } from '../types'

export const useValidatorMembers = () => {
  const { api } = useApi()
  const allValidatorAddresses = useFirstObservableValue(
    () =>
      api?.query.staking.validators
        .entries()
        .pipe(map((entries) => entries.map((entry) => entry[0].args[0].toString()))),
    [api?.isConnected]
  )

  const variables = {
    where: { metadata: { validatorAccount_in: allValidatorAddresses } },
  }

  const { data } = useGetMembersWithDetailsQuery({ variables, skip: !!allValidatorAddresses })

  const validatorsWithMembership: ValidatorMembership[] | undefined = useMemo(
    () =>
      data?.memberships?.map((rawMembership) => ({
        membership: asMemberWithDetails(rawMembership),
        validatorAccount: rawMembership.metadata.validatorAccount ?? undefined,
        isVerifiedValidator: rawMembership.metadata.isVerifiedValidator ?? false,
      })),
    [data]
  )

  return validatorsWithMembership
}
