import { arg, booleanArg, objectType, queryField, stringArg } from 'nexus'
import { Notification, NotificationType } from 'nexus-prisma'

import { Context } from '@/server/context'
import { authMemberId } from '@/server/utils/token'

// const NotificationTypeInput =

export const NotificationFields = objectType({
  name: Notification.$name,
  description: Notification.$description,
  definition(t) {
    t.field(Notification.id)
    t.field(Notification.notificationType)
    t.field(Notification.eventId)
    t.field(Notification.entityId)
    t.field(Notification.isSent)
    t.field(Notification.isRead)
  },
})
export const notificationsQuery = queryField('notifications', {
  type: Notification.$name,
  args: {
    notificationType: arg({ type: NotificationType.name }),
    eventId: stringArg(),
    entityId: stringArg(),
    isSent: booleanArg(),
    isRead: booleanArg(),
  },
  resolve: async (_, args, { prisma, req }: Context) => {
    const memberId = authMemberId(req)
    if (!memberId) return null

    return prisma.notification.findMany({ where: { ...args, memberId } })
  },
})
