import { Member, Prisma, Subscription } from '@prisma/client'

import { NotificationEvent } from './notificationEvents'

type Notification = Prisma.NotificationCreateManyInput

interface EventByMember {
  event: NotificationEvent
  memberId: number
  shouldNotify: boolean
}

export const createNotifications = (
  subscriptions: Subscription[],
  members: Member[],
  events: NotificationEvent[]
): Notification[] => {
  const eventsByMember = events.flatMap<EventByMember>(getEventsByMember(subscriptions, members))

  return pickNotifs(eventsByMember).map<Notification>(({ event, memberId }) => ({
    notificationType: event.notificationType,
    eventId: event.eventId,
    entityId: event.entityId,
    memberId,
  }))
}

const getEventsByMember =
  (subscriptions: Subscription[], members: Member[]) =>
  (event: NotificationEvent): EventByMember[] => {
    const relatedSubscripions = subscriptions.filter(isEventRelatedToSubscription(event))
    const doesEventRequiresSub = !event.isDefault && !event.relatedMemberIds

    return doesEventRequiresSub
      ? relatedSubscripions.map(({ memberId, shouldNotify }) => ({ event, memberId, shouldNotify }))
      : (event.relatedMemberIds ?? []).flatMap((relatedMemberId) =>
          members.flatMap((member) => {
            if (member.id !== relatedMemberId) return []
            const subscription = subscriptions.find((subscription) => subscription.memberId === member.id)
            return { event, memberId: member.id, shouldNotify: subscription?.shouldNotify ?? true }
          })
        )
  }

const isEventRelatedToSubscription =
  (event: NotificationEvent) =>
  ({ notificationType, memberId, entityIds }: Subscription): boolean => {
    if (notificationType !== event.notificationType) {
      return false
    } else if (event.relatedMemberIds) {
      return event.relatedMemberIds.includes(memberId)
    } else {
      return !event.relatedEntityId || entityIds.includes(event.relatedEntityId)
    }
  }

const pickNotifs = (notifs: EventByMember[]) =>
  notifs.filter(
    (A, indexA) =>
      A.shouldNotify &&
      notifs.every(
        (B, indexB) =>
          B === A ||
          B.event.eventId !== A.event.eventId ||
          B.memberId !== A.memberId ||
          // Ignore `shouldNotify: false` events except for those with a related entity.
          (!B.shouldNotify && !B.event.relatedEntityId) ||
          // Regardless of priority, events with a related entity and `shouldNotify: false` should prevent
          // other notifications from the same qn event and member id, except for other events with a related entity
          // and a higher priority.
          ((B.shouldNotify || A.event.relatedEntityId) &&
            (B.event.priority < A.event.priority || (B.event.priority === A.event.priority && indexB > indexA)))
      )
  )
