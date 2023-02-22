import { Member, Prisma } from '@prisma/client'

import { NotificationEvent } from './notificationEvents'

type Notification = Prisma.NotificationCreateManyInput

type Subscription = Prisma.SubscriptionGetPayload<{ include: { member: true } }>

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
  const prioNotif = prioritizeNotifs(eventsByMember)

  return prioNotif.map<Notification>(({ event, memberId }) => ({
    notificationType: event.notificationType,
    eventId: event.eventId,
    entityId: event.entityId,
    memberId,
  }))
}

const getEventsByMember =
  (subscriptions: Subscription[], members: Member[]) =>
  (event: NotificationEvent): EventByMember[] => {
    const relatedSubscripion = subscriptions.filter(isEventRelatedToSubscription(event))
    const doesEventRequiresSub = !event.isDefault && !event.relatedMemberIds

    return doesEventRequiresSub
      ? relatedSubscripion.flatMap(({ member, shouldNotify }) =>
          event.relatedEntityId && !shouldNotify ? [] : { event, memberId: member.id, shouldNotify }
        )
      : event.relatedMemberIds?.flatMap((chainMemberId) => {
          const member = memberToNotify(chainMemberId, relatedSubscripion, members)
          return member ? { event, memberId: member.id, shouldNotify: true } : []
        }) ?? []
  }

const isEventRelatedToSubscription =
  (event: NotificationEvent) =>
  ({ notificationType, member, entityIds }: Subscription): boolean => {
    if (notificationType !== event.notificationType) {
      return false
    } else if (event.relatedMemberIds) {
      return event.relatedMemberIds.includes(member.chainMemberId)
    } else {
      return !event.relatedEntityId || entityIds.includes(event.relatedEntityId)
    }
  }

const memberToNotify = (
  chainMemberId: string,
  subscriptions: Subscription[],
  members: Member[]
): Member | undefined => {
  const subcription = subscriptions.find(({ member }) => member.chainMemberId === chainMemberId)
  if (subcription && !subcription.shouldNotify) return
  return subcription?.member ?? members.find((member) => member.chainMemberId === chainMemberId)
}

const prioritizeNotifs = (notifs: EventByMember[]) =>
  notifs.filter(
    (A, indexA) =>
      A.shouldNotify &&
      notifs.every(
        (B, indexB) =>
          B === A ||
          B.event.eventId !== A.event.eventId ||
          B.memberId !== A.memberId ||
          ((B.shouldNotify || !A.event.relatedEntityId) &&
            (B.event.priority <= A.event.priority || (B.event.priority === A.event.priority && indexB > indexA)))
      )
  )
