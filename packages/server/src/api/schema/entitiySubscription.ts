import * as Prisma from '@prisma/client'
import { isEqual, pick } from 'lodash'
import { arg, booleanArg, enumType, list, mutationField, nonNull, objectType, queryField, stringArg } from 'nexus'
import { Subscription as GQLSubscription } from 'nexus-prisma'

import { Context } from '@/api/context'
import { authMemberId } from '@/api/utils/token'
import { EntitySubscriptionType } from '@/notifier/model/subscriptionTypes'

interface EntitySubscription extends Omit<Prisma.Subscription, 'id' | 'memberId'> {
  notificationType: EntitySubscriptionType
}

const EntitySubscriptionTypeKeys: EntitySubscriptionType[] = Object.values(EntitySubscriptionType)

export const GQLEntitySubscriptionType = enumType({
  name: 'EntitySubscriptionType',
  members: EntitySubscriptionType,
})

export const EntitySubscriptionFields = objectType({
  name: 'EntitySubscription',
  description: GQLSubscription.$description,
  definition(t) {
    t.nonNull.id(GQLSubscription.id.name)
    t.nonNull.field({
      name: GQLSubscription.notificationType.name,
      type: GQLEntitySubscriptionType.name,
    })
    t.nonNull.string(GQLSubscription.entityId.name)
    t.nonNull.boolean(GQLSubscription.shouldNotify.name)
    t.nonNull.boolean(GQLSubscription.shouldNotifyByEmail.name)
  },
})

type QueryArgs = Partial<EntitySubscription>
export const entitySubscriptionsQuery = queryField('entitySubscriptions', {
  type: list('EntitySubscription'),

  args: {
    notificationType: arg({ type: GQLEntitySubscriptionType.name }),
    entityId: stringArg(),
    shouldNotify: booleanArg(),
    shouldNotifyByEmail: booleanArg(),
  },

  resolve: async (_, args: QueryArgs, { prisma, req }: Context): Promise<Prisma.Subscription[] | null> => {
    const memberId = authMemberId(req)
    if (!memberId) return null

    const notificationType = args.notificationType ?? { in: EntitySubscriptionTypeKeys }
    return prisma.subscription.findMany({ where: { ...args, notificationType, memberId } })
  },
})

type SubscribeToEntityArgs = EntitySubscription &
  Required<Pick<EntitySubscription, 'notificationType' | 'entityId'>> & { entityId: string }
export const subscribeToEntityMutation = mutationField('subscribeToEntity', {
  type: 'EntitySubscription',

  args: {
    notificationType: nonNull(arg({ type: GQLEntitySubscriptionType.name })),
    entityId: nonNull(stringArg()),
    shouldNotify: booleanArg(),
    shouldNotifyByEmail: booleanArg(),
  },

  resolve: async (_, args: SubscribeToEntityArgs, { prisma, req }: Context): Promise<Prisma.Subscription | null> => {
    const memberId = authMemberId(req)
    if (!memberId) return null

    const where: Prisma.Prisma.SubscriptionWhereUniqueInput = {
      memberId_notificationType_entityId: { ...pick(args, 'notificationType', 'entityId'), memberId },
    }
    const current = await prisma.subscription.findUnique({ where })

    if (!current) {
      return prisma.subscription.create({ data: { ...args, memberId } })
    }

    const { shouldNotify = true, shouldNotifyByEmail = true } = args
    if (shouldNotify === current.shouldNotify && shouldNotifyByEmail === current.shouldNotifyByEmail) {
      return current
    }

    return prisma.subscription.update({ where, data: { shouldNotify, shouldNotifyByEmail } })
  },
})

type UnsubscribeToEntityArgs = Pick<EntitySubscription, 'notificationType' | 'entityId'> & { entityId: string }
export const unsubscribeToEntityMutation = mutationField('unsubscribeToEntity', {
  type: 'EntitySubscription',

  args: {
    notificationType: nonNull(arg({ type: GQLEntitySubscriptionType.name })),
    entityId: nonNull(stringArg()),
  },

  resolve: async (_, data: UnsubscribeToEntityArgs, { prisma, req }: Context): Promise<Prisma.Subscription | null> => {
    const memberId = authMemberId(req)
    if (!memberId) return null

    const where: Prisma.Prisma.SubscriptionWhereUniqueInput = {
      memberId_notificationType_entityId: { ...pick(data, 'notificationType', 'entityId'), memberId },
    }
    return prisma.subscription.delete({ where })
  },
})
