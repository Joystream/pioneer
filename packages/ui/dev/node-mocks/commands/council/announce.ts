import { ApiPromise } from '@polkadot/api'
import { uniq } from 'lodash'

import { lockLookup } from '@/accounts/model/lockTypes'
import { flatMapP, mapP } from '@/common/utils'
import memberData from '@/mocks/data/raw/members.json'

import { accountsMap } from '../../data/addresses'
import { signAndSend, withApi } from '../../lib/api'
import { createMembersCommand } from '../members/create'

export const announceCandidaciesCommand = async (api: ApiPromise) => {
  await createMembersCommand(api)

  const candidateCount = api.consts.council.councilSize.toNumber() + 1
  const announceStake = api.consts.council.minCandidateStake

  // Get viable accounts / memberships
  const wellKnownMembers = memberData.slice(0, 6)
  const members = (
    await flatMapP(wellKnownMembers, async (member) => {
      const addresses = uniq([member.rootAccount, member.controllerAccount])
      const [data] = await flatMapP(addresses, async (address) => {
        const locks = await api.query.balances.locks(address)
        return locks.some(({ id }) => lockLookup(id) === 'Staking') ? [] : { address, locks }
      })
      if (!data) return []

      const balances = await api.query.balances.account(data.address)
      return { ...data, member, balance: balances.free }
    })
  ).slice(0, candidateCount)

  // Fund the empty accounts
  const requiredBalance = announceStake.add(api.consts.referendum.minimumStake).muln(1.5) // 1.5 extra margin for potential transaction fees
  const accountToFund = members.filter(({ balance }) => balance.lt(requiredBalance))
  const fundingTx = await flatMapP(accountToFund, async ({ address }) => {
    const { data } = await api.query.system.account(address)
    return data.free.lt(requiredBalance) ? [api.tx.balances.transfer(address, requiredBalance)] : []
  })

  if (fundingTx.length > 0) {
    await signAndSend(api.tx.utility.batch(fundingTx), accountsMap.alice)
  }

  // Announce candidacies
  await mapP(members, async ({ locks, address, member }) => {
    const stakingAccountInfoSize = await api.query.members.stakingAccountIdMemberStatus.size(address)

    if (stakingAccountInfoSize.isEmpty) {
      // Bind staking account
      await signAndSend(api.tx.members.addStakingAccountCandidate(member.id), address)
      // Confirm staking account
      await signAndSend(api.tx.members.confirmStakingAccount(member.id, address), member.controllerAccount)
    } else if (locks.some(({ id }) => lockLookup(id) === 'Council Candidate')) {
      // Release stakes
      await signAndSend(api.tx.council.releaseCandidacyStake(member.id), member.controllerAccount)
    }

    // Announce candidacy
    const announceTx = api.tx.council.announceCandidacy(member.id, address, address, announceStake)
    await signAndSend(announceTx, member.controllerAccount)
  })
}

export const announceCandidaciesModule = {
  command: 'council:announce',
  describe: 'Announce council candidates',
  handler: () => withApi(announceCandidaciesCommand),
}
