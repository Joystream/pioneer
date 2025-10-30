import { uniq } from 'lodash'

import { GetCurrentRolesQuery } from '@/common/queries'
import { EntityPotentialNotif, GeneralPotentialNotif, PotentialNotif } from '@/notifier/types'
export { getParentCategories } from './getParentCategories'
export { NotifEventFromQNEvent } from './types'

export const isGeneralPotentialNotif = (p: PotentialNotif): p is GeneralPotentialNotif => 'relatedMembers' in p
export const isEntityPotentialNotif = (p: PotentialNotif): p is EntityPotentialNotif => 'relatedEntityId' in p

type Created = { createdAt: any }
export const isOlderThan =
  <A extends Created>(a: A) =>
  <B extends Created>(b: B): boolean =>
    Date.parse(String(a.createdAt)) > Date.parse(String(b.createdAt))

export const getMentionedMemberIds = (text: string, roles: GetCurrentRolesQuery): number[] =>
  uniq(
    Array.from(text.matchAll(/\[@[^\]\n]*\]\(#mention\?(member-id|role)=([^)\n]+?)\)/g)).flatMap((match) => {
      const type = match[1]
      const id = match[2]
      if (!type || !id) return []

      if (type === 'member-id') {
        const memberId = Number(id)
        return isNaN(memberId) ? [] : memberId
      }

      if (type !== 'role') return []

      const councilIds = roles.electedCouncils.at(0)?.councilMembers.map((member) => Number(member.memberId)) ?? []
      const workers = roles.workers
      const leads = workers.filter((worker) => worker.isLead)
      const [role, groupId] = id.split('_')

      switch (role) {
        case 'dao':
          return [...councilIds, ...roles.workers.map((worker) => Number(worker.membershipId))]

        case 'council':
          return councilIds

        case 'workers': {
          if (!groupId) {
            return []
          }
          return workers.filter((worker) => worker.groupId === groupId).map((worker) => Number(worker.membershipId))
        }

        case 'leads':
          return leads.map((lead) => Number(lead.membershipId))

        case 'lead': {
          if (!groupId) {
            return []
          }
          const leadId = leads.find((lead) => lead.groupId === groupId)?.membershipId ?? []
          return leadId ? [Number(leadId)] : []
        }

        default:
          return []
      }
    })
  )
