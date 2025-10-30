import { ApiPromise } from '@polkadot/api'

import memberData from '@/mocks/data/raw/members.json'

import { signAndSend } from '../../lib/api'

export const approveProposal = async (api: ApiPromise, proposalId: number) => {
  const councilors = await api.query.council.councilMembers()
  await Promise.all(
    councilors.map((councilor) => {
      const memberId = councilor.membershipId.toString()
      const member = memberData.find(({ id }) => id === memberId)
      if (!member) throw `Couldn't find the councilor ${memberId} controller account`

      const tx = api.tx.proposalsEngine.vote(councilor.membershipId, proposalId, 'Approve', 'LGTM')

      // Assume councilors stacking account are their controller accounts too
      return signAndSend(tx, member.controllerAccount)
    })
  )
}
