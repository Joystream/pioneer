import { useEffect, useMemo } from 'react'
import { Account } from '../common/types'
import { useApi } from '../hooks/useApi'
import { useMyMemberships } from '../hooks/useMyMemberships'
import { useSignAndSendTransaction } from '../hooks/useSignAndSendTransaction'

export function useMockMembers() {
  const { api, isConnected } = useApi()
  const { members } = useMyMemberships()
  const transaction = useMemo(() => {
    if (!members.length || !api) {
      return
    }

    const createMembers = members.map((member) => {
      return api?.tx.members.buyMembership({
        handle: member.handle,
        avatar_uri: member.avatarURI,
        name: member.name,
        about: member.about,
        root_account: member.rootAccount,
        controller_account: member.controllerAccount,
      })
    })
    return api.tx.utility.batch(createMembers)
  }, [api, members.length])

  const from: Account = { address: '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY', name: 'signer' }
  const { send } = useSignAndSendTransaction({
    transaction,
    from,
    onDone: (success) => console.log(success ? '✅ Members created' : '❗️Error processing batch transaction'),
  })

  useEffect(() => {
    if (api && members.length) {
      console.log('🌱 Creating members on chain using mocks')
      send()
    }
  }, [isConnected, members.length])
}
