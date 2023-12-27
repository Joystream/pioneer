import React, { ReactNode, useMemo, useState } from 'react'
import { map } from 'rxjs'

import { useApi } from '@/api/hooks/useApi'
import { useFirstObservableValue } from '@/common/hooks/useFirstObservableValue'
import { Address } from '@/common/types'
import { perbillToPercent } from '@/common/utils'
import { useGetMembersWithDetailsQuery } from '@/memberships/queries'
import { asMemberWithDetails } from '@/memberships/types'

import { ValidatorMembership } from '../types'

import { ValidatorsContext } from './context'

interface Props {
  children: ReactNode
}

export interface UseValidators {
  setShouldFetchValidators: (fetchValidators: boolean) => void
  allValidators?: {
    address: Address
    commission: number
  }[]
  allValidatorsWithCtrlAcc?: (string | undefined)[]
  validatorsWithMembership?: ValidatorMembership[]
}

export const ValidatorContextProvider = (props: Props) => {
  const { api } = useApi()

  const [shouldFetchValidators, setShouldFetchValidators] = useState(false)

  const allValidators = useFirstObservableValue(() => {
    if (!shouldFetchValidators) return undefined
    return api?.query.staking.validators.entries().pipe(
      map((entries) =>
        entries.map((entry) => ({
          address: entry[0].args[0].toString(),
          commission: perbillToPercent(entry[1].commission.toBn()),
        }))
      )
    )
  }, [api?.isConnected, shouldFetchValidators])

  const allValidatorsWithCtrlAcc = useFirstObservableValue(
    () =>
      allValidators &&
      api &&
      api.query.staking.bonded
        .multi(allValidators.map(({ address }) => address))
        .pipe(map((entries) => entries.map((entry) => (entry.isSome ? entry.unwrap().toString() : undefined)))),
    [allValidators, api?.isConnected]
  )

  const variables = {
    where: {
      OR: [
        {
          rootAccount_in:
            (allValidatorsWithCtrlAcc
              ?.concat(allValidators?.map(({ address }) => address))
              .filter((element) => !!element) as string[]) ?? [],
        },
        {
          controllerAccount_in:
            (allValidatorsWithCtrlAcc
              ?.concat(allValidators?.map(({ address }) => address))
              .filter((element) => !!element) as string[]) ?? [],
        },
        {
          boundAccounts_containsAny:
            (allValidatorsWithCtrlAcc
              ?.concat(allValidators?.map(({ address }) => address))
              .filter((element) => !!element) as string[]) ?? [],
        },
      ],
    },
  }

  const { data } = useGetMembersWithDetailsQuery({ variables, skip: !allValidatorsWithCtrlAcc })

  const memberships = data?.memberships?.map((rawMembership) => ({
    membership: asMemberWithDetails(rawMembership),
    isVerifiedValidator: rawMembership.metadata.isVerifiedValidator ?? false,
  }))

  const validatorsWithMembership: ValidatorMembership[] | undefined = useMemo(() => {
    return (
      allValidators &&
      allValidatorsWithCtrlAcc &&
      memberships &&
      allValidators.map(({ address, commission }, index) => {
        const controllerAccount = allValidatorsWithCtrlAcc[index]
        return {
          stashAccount: address,
          controllerAccount,
          commission,
          ...memberships.find(
            ({ membership }) =>
              membership.rootAccount === address ||
              membership.rootAccount === controllerAccount ||
              membership.controllerAccount === address ||
              membership.controllerAccount === controllerAccount ||
              membership.boundAccounts.includes(address) ||
              (controllerAccount && membership.boundAccounts.includes(controllerAccount))
          ),
        }
      })
    )
  }, [data, allValidators, allValidatorsWithCtrlAcc])

  const value = {
    setShouldFetchValidators,
    allValidators,
    allValidatorsWithCtrlAcc,
    validatorsWithMembership,
  }

  return <ValidatorsContext.Provider value={value}>{props.children}</ValidatorsContext.Provider>
}
