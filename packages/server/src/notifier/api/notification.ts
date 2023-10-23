import * as Prisma from '@prisma/client'
import { arg, booleanArg, enumType, list, objectType, queryField, stringArg } from 'nexus'
import { Notification, NotificationKind, NotificationEmailStatus } from 'nexus-prisma'

import { Context } from '@/common/api'

export const NotificationKindEnum = enumType(NotificationKind)
export const NotificationEmailStatusEnum = enumType(NotificationEmailStatus)

export const NotificationFields = objectType({
  name: Notification.$name,
  description: Notification.$description,
  definition(t) {
    t.field(Notification.id)
    t.field(Notification.kind)
    t.field(Notification.eventId)
    t.field(Notification.entityId)
    t.field(Notification.emailStatus)
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
    emailStatus: arg({ type: NotificationEmailStatus.name }),
    isRead: booleanArg(),
  },

  resolve: async (_, args: QueryArgs, { prisma, member }: Context): Promise<Prisma.Notification[] | null> => {
    if (!member) {
      throw new Error('Unauthorized')
    }

    return prisma.notification.findMany({ where: { ...args, memberId: member.id } })
  },
})
