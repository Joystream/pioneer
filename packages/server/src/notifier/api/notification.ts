import * as Prisma from '@prisma/client'
import { arg, booleanArg, enumType, list, objectType, queryField, stringArg } from 'nexus'
import { Notification, NotificationKind } from 'nexus-prisma'

import { authMemberId } from '@/auth/model/token'
import { Context } from '@/common/api'

export const NotificationKindEnum = enumType(NotificationKind)

export const NotificationFields = objectType({
  name: Notification.$name,
  description: Notification.$description,
  definition(t) {
    t.field(Notification.id)
    t.field(Notification.kind)
    t.field(Notification.eventId)
    t.field(Notification.entityId)
    t.field(Notification.isSent)
    t.field(Notification.isRead)
  },
})

type QueryArgs = Partial<Omit<Prisma.Notification, 'memberId'>>
export const notificationsQuery = queryField('notifications', {
  type: list(Notification.$name),

  args: {
    id: stringArg(),
    kind: arg({ type: NotificationKind.name }),
    eventId: stringArg(),
    entityId: stringArg(),
    isSent: booleanArg(),
    isRead: booleanArg(),
  },

  resolve: async (_, args: QueryArgs, { prisma, req }: Context): Promise<Prisma.Notification[] | null> => {
    const memberId = (await authMemberId(req))?.id
    if (!memberId) return null

    return prisma.notification.findMany({ where: { ...args, memberId } })
  },
})
