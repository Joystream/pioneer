import * as Prisma from '@prisma/client'
import { pick } from 'lodash'
import { arg, booleanArg, enumType, list, mutationField, nonNull, objectType, queryField, stringArg } from 'nexus'
import { Subscription } from 'nexus-prisma'

import { authMemberId } from '@/auth/model/token'
import { Context } from '@/common/api'
import { EntitySubscriptionKind } from '@/notifier/model/subscriptionKinds'

interface EntitySubscription extends Omit<Prisma.Subscription, 'memberId'> {
  kind: EntitySubscriptionKind
}

const EntitySubscriptionKindKeys: EntitySubscriptionKind[] = Object.values(EntitySubscriptionKind)

export const GQLEntitySubscriptionKind = enumType({
  name: 'EntitySubscriptionKind',
  members: EntitySubscriptionKind,
})

export const EntitySubscriptionFields = objectType({
  name: 'EntitySubscription',
  description: Subscription.$description,
  definition(t) {
    t.nonNull.id(Subscription.id.name)
    t.nonNull.field({
      name: Subscription.kind.name,
      type: GQLEntitySubscriptionKind.name,
    })
    t.nonNull.string(Subscription.entityId.name)
    t.nonNull.boolean(Subscription.shouldNotify.name)
    t.nonNull.boolean(Subscription.shouldNotifyByEmail.name)
  },
})

type QueryArgs = Partial<EntitySubscription>
export const entitySubscriptionsQuery = queryField('entitySubscriptions', {
  type: list('EntitySubscription'),

  args: {
    id: stringArg(),
    kind: arg({ type: GQLEntitySubscriptionKind.name }),
    entityId: stringArg(),
    shouldNotify: booleanArg(),
    shouldNotifyByEmail: booleanArg(),
  },

  resolve: async (_, args: QueryArgs, { prisma, req }: Context): Promise<Prisma.Subscription[] | null> => {
    const memberId = (await authMemberId(req))?.id
    if (!memberId) return null

    const kind = args.kind ?? { in: EntitySubscriptionKindKeys }
    return prisma.subscription.findMany({ where: { ...args, kind, memberId } })
  },
})

type SubscribeToEntityArgs = Omit<
  EntitySubscription & Required<Pick<EntitySubscription, 'kind' | 'entityId'>> & { entityId: string },
  'id'
>
export const subscribeToEntityMutation = mutationField('subscribeToEntity', {
  type: 'EntitySubscription',

  args: {
    kind: nonNull(arg({ type: GQLEntitySubscriptionKind.name })),
    entityId: nonNull(stringArg()),
    shouldNotify: booleanArg(),
    shouldNotifyByEmail: booleanArg(),
  },

  resolve: async (_, args: SubscribeToEntityArgs, { prisma, req }: Context): Promise<Prisma.Subscription | null> => {
    const memberId = (await authMemberId(req))?.id
    if (!memberId) return null

    const where: Prisma.Prisma.SubscriptionWhereUniqueInput = {
      memberId_kind_entityId: { ...pick(args, 'kind', 'entityId'), memberId },
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

type UnsubscribeToEntityArgs = Omit<Pick<EntitySubscription, 'kind' | 'entityId'> & { entityId: string }, 'id'>
export const unsubscribeToEntityMutation = mutationField('unsubscribeToEntity', {
  type: 'EntitySubscription',

  args: {
    kind: nonNull(arg({ type: GQLEntitySubscriptionKind.name })),
    entityId: nonNull(stringArg()),
  },

  resolve: async (_, data: UnsubscribeToEntityArgs, { prisma, req }: Context): Promise<Prisma.Subscription | null> => {
    const memberId = (await authMemberId(req))?.id
    if (!memberId) return null

    const where: Prisma.Prisma.SubscriptionWhereUniqueInput = {
      memberId_kind_entityId: { ...pick(data, 'kind', 'entityId'), memberId },
    }
    return prisma.subscription.delete({ where })
  },
})
