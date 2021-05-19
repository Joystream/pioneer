import { useEffect, useMemo } from 'react'

import { info } from '@/common/logger'

import { useApi } from '../../common/hooks/useApi'
import { useObservable } from '../../common/hooks/useObservable'
import { useSignAndSendTransaction } from '../../common/hooks/useSignAndSendTransaction'
import { useGetMembersQuery } from '../../memberships/queries'

export function useMockMembers() {
  const { api, isConnected } = useApi()
  const { data, loading } = useGetMembersQuery()
  const members = data?.memberships
  const transaction = useMemo(() => {
    if (!members || !api) {
      return
    }

    const createMembers = members.map((member) => {
      return api?.tx.members.buyMembership({
        handle: member.handle,
        metadata: {
          name: member.metadata.name,
          about: member.metadata.about,
        },
        root_account: member.rootAccount,
        controller_account: member.controllerAccount,
      })
    })
    return api.tx.utility.batch(createMembers)
  }, [api, members, loading])

  const { send } = useSignAndSendTransaction({
    transaction,
    signer: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY',
    onDone: (success) => info(success ? '✅ Members created' : '❗️Error processing batch transaction'),
  })

  const hasCreatedMember = useObservable(api?.query?.members.membershipById.size(0), [isConnected])?.toNumber()

  useEffect(() => {
    if (!IS_DEVELOPMENT || !(api && isConnected && members) || hasCreatedMember === undefined) {
      return
    }

    if (!hasCreatedMember) {
      info('🌱 Creating members on chain using mocks')
      send()
    } else {
      info('✅ Member with id (0) already created')
    }
  }, [isConnected, members, hasCreatedMember])
}
