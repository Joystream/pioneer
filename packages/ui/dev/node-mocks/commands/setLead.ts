import { GROUP, GroupIdName } from '../consts'

import { applyOnOpeningCommand } from './opening/apply'
import { addOpeningCommand } from './opening/create'
import { fillOpeningCommand } from './opening/fill'

interface Params {
  group?: GroupIdName
}

export const setLeadCommand = async ({ group = GROUP }: Params = {}) => {
  // Make Alice the group leader
  await addOpeningCommand({ group })
  const openingId = '0' // TODO find out the opening id somehow
  const applicationId = await applyOnOpeningCommand({ group, openingId })
  await fillOpeningCommand({ group, openingId, applicationId })
}
