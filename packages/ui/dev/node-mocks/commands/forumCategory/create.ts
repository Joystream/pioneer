import members from '../../../../src/mocks/data/raw/members.json'
import { signAndSend, withApi } from '../../lib/api'
import { setLeadCommand } from '../setLead'

const handler = async ({ title = 'Bounties', description = 'Lorem ipsum' }) => {
  // Make Alice the forum group leader
  await setLeadCommand({ group: 'forumWorkingGroup' })

  // Alice creates a category
  await withApi(async (api) => {
    const alice = members[0]
    const tx = api.tx.forum.createCategory(null, title, description)
    await signAndSend(tx, alice.controllerAccount)
  })
}

export const createForumCategoryModule = {
  command: 'forumCategory:create',
  describe: 'Create new forum category',
  handler,
}
