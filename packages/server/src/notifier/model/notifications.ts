import { Member, Prisma, Subscription } from '@prisma/client'

import { EntitiyPotentialNotif, NotificationEvent, PotentialNotif } from './notificationEvents'

type Notification = Prisma.NotificationCreateManyInput

interface PotentialNotifByMember {
  data: PotentialNotif
  memberId: number
  shouldNotify: boolean
}

export const notificationsFromEvent =
  (subscriptions: Subscription[], members: Member[]) =>
  (event: NotificationEvent): Notification[] => {
    const notifsByMembers = event.potentialNotifications.flatMap<PotentialNotifByMember>(
      getEventsByMember(subscriptions, members)
    )
    return pickNotifs(notifsByMembers).map<Notification>((notif) => ({
      notificationType: notif.data.notificationType,
      eventId: event.id,
      entityId: event.entityId,
      memberId: notif.memberId,
    }))
  }

const getEventsByMember =
  (subscriptions: Subscription[], members: Member[]) =>
  (potentialNotif: PotentialNotif): PotentialNotifByMember[] => {
    const relatedSubscripions = subscriptions.filter(isEventRelatedToSubscription(potentialNotif))
    const doesEventRequiresSub =
      !potentialNotif.isDefault && !('relatedMemberIds' in potentialNotif && potentialNotif.relatedMemberIds)

    return doesEventRequiresSub
      ? relatedSubscripions.map(({ memberId, shouldNotify }) => ({ data: potentialNotif, memberId, shouldNotify }))
      : (potentialNotif.relatedMemberIds ?? []).flatMap((relatedMemberId) =>
          members.flatMap((member) => {
            if (member.id !== relatedMemberId) return []
            const subscription = subscriptions.find((subscription) => subscription.memberId === member.id)
            const shouldNotify = subscription?.shouldNotify ?? true
            return { data: potentialNotif, memberId: member.id, shouldNotify: shouldNotify }
          })
        )
  }

const isEventRelatedToSubscription =
  (potentialNotif: PotentialNotif) =>
  ({ notificationType, memberId, entityIds }: Subscription): boolean => {
    if (notificationType !== potentialNotif.notificationType) {
      return false
    } else if (isEntityPotentialNotif(potentialNotif)) {
      return entityIds.includes(potentialNotif.relatedEntityId)
    } else {
      return potentialNotif.relatedMemberIds?.includes(memberId) ?? true
    }
  }

const pickNotifs = (notifs: PotentialNotifByMember[]) =>
  notifs.filter(
    (A, indexA) =>
      A.shouldNotify &&
      notifs.every(
        (B, indexB) =>
          B === A ||
          B.memberId !== A.memberId ||
          // Ignore `shouldNotify: false` events except for those with a related entity.
          (!B.shouldNotify && !isEntityPotentialNotif(B.data)) ||
          // Regardless of priority, events with a related entity and `shouldNotify: false` should prevent
          // other notifications from the same qn event and member id, except for other events with both
          // a related entity and a higher priority.
          ((B.shouldNotify || isEntityPotentialNotif(A.data)) &&
            (B.data.priority < A.data.priority || (B.data.priority === A.data.priority && indexB > indexA)))
      )
  )

const isEntityPotentialNotif = (p: PotentialNotif): p is EntitiyPotentialNotif => 'relatedEntityId' in p
