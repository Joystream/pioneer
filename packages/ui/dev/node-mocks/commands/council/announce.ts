import { flatMapP, mapP } from '../../../../src/common/utils'
import memberData from '../../../../src/mocks/data/raw/members.json'
import { accountsMap } from '../../data/addresses'
import { signAndSend, withApi } from '../../lib/api'
import { createMembersCommand } from '../members/create'

const announceCandidacies = () => {
  withApi(async (api) => {
    const candidateCount = api.consts.council.councilSize.toNumber() + 1
    const members = memberData.slice(0, candidateCount)

    // Create accounts
    const nextId = await api.query.members.nextMemberId()
    if (Number(nextId) < candidateCount) {
      await createMembersCommand()
    }

    // Fund the empty accounts
    const accountToFund = ['charlie', 'dave', 'eve'] as const
    const fundingTx = await flatMapP(accountToFund, async (name) => {
      const address = accountsMap[name]
      const { data } = await api.query.system.account(address)
      return data.free.toNumber() < 30_000 ? [api.tx.balances.transfer(address, 100_000)] : []
    })

    if (fundingTx.length > 0) {
      await signAndSend(api.tx.utility.batch(fundingTx), accountsMap.alice)
    }

    // Announce candidacies
    await mapP(members, async ({ id, controllerAccount: address }) => {
      const stakingAccountInfoSize = await api.query.members.stakingAccountIdMemberStatus.size(address)

      if (stakingAccountInfoSize.isEmpty) {
        // Bind staking account
        await signAndSend(api.tx.members.addStakingAccountCandidate(id), address)
        // Confirm staking account
        await signAndSend(api.tx.members.confirmStakingAccount(id, address), address)
      } else {
        // Release stakes
        await signAndSend(api.tx.council.releaseCandidacyStake(id), address)
      }

      // Announce candidacy
      await signAndSend(api.tx.council.announceCandidacy(id, address, address, 15_000), address)
    })
  })
}

export const announceCandidaciesModule = {
  command: 'council:announce',
  describe: 'Announce council candidates',
  handler: announceCandidacies,
}
