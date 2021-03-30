import { useEffect, useMemo } from 'react'
import { useGetMembersQuery } from '../api/queries'
import { Account } from '../common/types'
import { useApi } from '../hooks/useApi'
import { useObservable } from '../hooks/useObservable'
import { useSignAndSendTransaction } from '../hooks/useSignAndSendTransaction'

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
          avatar_uri: member.avatarUri,
          name: member.name,
          about: member.about,
        },
        root_account: member.rootAccount,
        controller_account: member.controllerAccount,
      })
    })
    return api.tx.utility.batch(createMembers)
  }, [api, members, loading])

  const from: Account = { address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY', name: 'signer' }
  const { send } = useSignAndSendTransaction({
    transaction,
    from,
    onDone: (success) => console.log(success ? '✅ Members created' : '❗️Error processing batch transaction'),
  })

  const hasCreatedMember = useObservable(api?.query?.members.membershipById.size(0), [isConnected])?.toNumber()

  useEffect(() => {
    if (!IS_DEVELOPMENT || !(api && isConnected && members) || hasCreatedMember === undefined) {
      return
    }

    if (!hasCreatedMember) {
      console.log('🌱 Creating members on chain using mocks')
      send()
    } else {
      console.log('✅ Member with id (0) already created')
    }
  }, [isConnected, members, hasCreatedMember])
}
