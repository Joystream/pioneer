import { GROUP, GroupIdName } from '../consts'

import { createMembersCommand } from './members/create'
import { applyOnOpeningCommand } from './opening/apply'
import { addOpeningCommand } from './opening/create'
import { fillOpeningCommand } from './opening/fill'

interface Params {
  group?: GroupIdName
}

export const setLeadCommand = async ({ group = GROUP }: Params = {}) => {
  // Add members mock data
  await createMembersCommand()

  // Make Alice the group leader
  const openingId = await addOpeningCommand({ group })
  const applicationId = await applyOnOpeningCommand({ group, openingId })
  await fillOpeningCommand({ group, openingId, applicationId })
}
