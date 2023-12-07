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

  const allValidatorsWithCtrlAcc = useFirstObservableValue(
    () =>
      allValidatorAddresses &&
      api &&
      api.query.staking.bonded
        .multi(allValidatorAddresses)
        .pipe(map((entries) => entries.map((entry) => (entry.isSome ? entry.unwrap().toString() : undefined)))),
    [allValidatorAddresses, api?.isConnected]
  )

  const variables = {
    where: {
      boundAccounts_containsAny:
        (allValidatorsWithCtrlAcc?.concat(allValidatorAddresses).filter((element) => !element) as string[]) ?? [],
    },
  }

  const { data } = useGetMembersWithDetailsQuery({ variables, skip: !!allValidatorsWithCtrlAcc })

  const memberships = data?.memberships?.map((rawMembership) => ({
    membership: asMemberWithDetails(rawMembership),
    isVerifiedValidator: rawMembership.metadata.isVerifiedValidator ?? false,
  }))

  const validatorsWithMembership: ValidatorMembership[] | undefined = useMemo(() => {
    return (
      allValidatorAddresses &&
      allValidatorsWithCtrlAcc &&
      memberships &&
      allValidatorAddresses.map((address, index) => {
        const controllerAccount = allValidatorsWithCtrlAcc[index]
        return {
          stashAccount: address,
          controllerAccount,
          ...memberships.find(
            ({ membership }) =>
              membership.boundAccounts.includes(address) ||
              (controllerAccount && membership.boundAccounts.includes(controllerAccount))
          ),
        }
      })
    )
  }, [data, allValidatorAddresses, allValidatorsWithCtrlAcc])

  return validatorsWithMembership
}
