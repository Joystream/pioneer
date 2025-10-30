import { Subscription } from '@prisma/client'

import { Notification, NotificationEvent, PotentialNotif } from '@/notifier/types'

import { isGeneralPotentialNotif } from './event'

interface PotentialNotifByMember {
  data: PotentialNotif
  memberId: number
  shouldNotify: boolean
}

export const notificationsFromEvent = (
  subscriptions: Subscription[],
  allMembers: { id: number; receiveEmails: boolean }[]
) => {
  const membersEmailPreferences = allMembers.reduce<Record<number, boolean>>(
    (acc, { id, receiveEmails }) => ({ ...acc, [id]: receiveEmails }),
    {}
  )
  const allMemberIds = Object.keys(membersEmailPreferences).map(Number)
  return (event: NotificationEvent): Notification[] => {
    const notifsByMembers = event.potentialNotifications.flatMap<PotentialNotifByMember>(
      getEventsByMember(subscriptions, allMemberIds)
    )
    return pickNotifs(notifsByMembers).map<Notification>((notif) => ({
      kind: notif.data.kind,
      eventId: event.id,
      entityId: event.entityId,
      memberId: notif.memberId,
      emailStatus: membersEmailPreferences[notif.memberId] ? 'PENDING' : 'IGNORED',
    }))
  }
}

const getEventsByMember =
  (subscriptions: Subscription[], allMemberIds: number[]) =>
  (potentialNotif: PotentialNotif): PotentialNotifByMember[] => {
    const relatedSubscripions = subscriptions.filter(isEventRelatedToSubscription(potentialNotif))
    const isSubscriptionOptional = isGeneralPotentialNotif(potentialNotif) && potentialNotif.isDefault

    if (!isSubscriptionOptional) {
      return relatedSubscripions.map(({ memberId, shouldNotify }) => ({ data: potentialNotif, memberId, shouldNotify }))
    }

    if (potentialNotif.relatedMembers === 'ANY') {
      return allMemberIds.map((memberId) => {
        const subscription = subscriptions.find((subscription) => subscription.memberId === memberId)
        const shouldNotify = subscription?.shouldNotify ?? true
        return { data: potentialNotif, memberId, shouldNotify }
      })
    }

    return potentialNotif.relatedMembers.ids.flatMap((relatedMemberId) =>
      allMemberIds.flatMap((memberId) => {
        if (memberId !== relatedMemberId) return []
        const subscription = subscriptions.find((subscription) => subscription.memberId === memberId)
        const shouldNotify = subscription?.shouldNotify ?? true
        return { data: potentialNotif, memberId, shouldNotify }
      })
    )
  }

const isEventRelatedToSubscription =
  (potentialNotif: PotentialNotif) =>
  ({ kind, memberId, entityId }: Subscription): boolean => {
    if (kind !== potentialNotif.kind) {
      return false
    } else if (isGeneralPotentialNotif(potentialNotif)) {
      return potentialNotif.relatedMembers === 'ANY' || potentialNotif.relatedMembers.ids.includes(memberId)
    } else {
      return entityId === potentialNotif.relatedEntityId
    }
  }

const pickNotifs = (notifs: PotentialNotifByMember[]): PotentialNotifByMember[] =>
  notifs.filter(
    (A, indexA) =>
      A.shouldNotify &&
      notifs.every(
        (B, indexB) =>
          B === A ||
          B.memberId !== A.memberId ||
          // Ignore `shouldNotify: false` events on general potential notification.
          (!B.shouldNotify && isGeneralPotentialNotif(B.data)) ||
          // Regardless of priority, events with a related entity and `shouldNotify: false` should prevent
          // other notifications from the same qn event and member id, except for other events with both
          // a related entity and a higher priority.
          ((B.shouldNotify || !isGeneralPotentialNotif(A.data)) &&
            (B.data.priority < A.data.priority || (B.data.priority === A.data.priority && indexB > indexA)))
      )
  )
