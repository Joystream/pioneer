import { arg, booleanArg, list, objectType, queryField, stringArg } from 'nexus'
import { NotificationType, Subscription } from 'nexus-prisma'

import { Context } from '@/server/context'
import { authMemberId } from '@/server/utils/token'

export const SubscriptionFields = objectType({
  name: Subscription.$name,
  description: Subscription.$description,
  definition(t) {
    t.field(Subscription.id)
    t.field(Subscription.notificationType)
    t.field(Subscription.entityIds)
    t.field(Subscription.shouldNotify)
    t.field(Subscription.shouldNotifyByEmail)
  },
})

export const subscriptionsQuery = queryField('subscriptions', {
  type: list(Subscription.$name),
  args: {
    notificationType: arg({ type: NotificationType.name }),
    entityIds: stringArg(),
    shouldNotify: booleanArg(),
    shouldNotifyByEmail: booleanArg(),
  },
  resolve(_, args, { prisma, req }: Context) {
    const memberId = authMemberId(req)
    if (!memberId) return null

    return prisma.subscription.findMany({ where: { ...args, memberId } })
  },
})
