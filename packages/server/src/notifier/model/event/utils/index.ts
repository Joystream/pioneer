import { uniq } from 'lodash'

import { EntitiyPotentialNotif, GeneralPotentialNotif, PotentialNotif } from './types'

export { getParentCategories } from './getParentCategories'
export { NotifEventFromQNEvent, NotificationEvent, PotentialNotif } from './types'

export const isGeneralPotentialNotif = (p: PotentialNotif): p is GeneralPotentialNotif => 'relatedMembers' in p
export const isEntityPotentialNotif = (p: PotentialNotif): p is EntitiyPotentialNotif => 'relatedEntityId' in p

type Created = { createdAt: any }
export const isOlderThan =
  <A extends Created>(a: A) =>
  <B extends Created>(b: B): boolean =>
    Date.parse(String(a)) > Date.parse(String(b))

export const getMentionedMemberIds = (text: string): number[] =>
  uniq(
    Array.from(text.matchAll(/\[@[-.0-9A-Z\\_a-z]+\]\(#mention\?member-id=(\d+)\)/g)).flatMap((match) => {
      const id = match[1] && Number(match[1])
      return !id || isNaN(id) ? [] : Number(id)
    })
  )
