import * as Prisma from '@prisma/client'
import { omit, pick } from 'lodash'
import { arg, enumType, list, mutationField, nonNull, objectType, queryField, stringArg } from 'nexus'
import { Subscription } from 'nexus-prisma'

import { Context } from '@/common/api'
import { EntitySubscriptionKind } from '@/notifier/model/subscriptionKinds'

const EntitySubscriptionKindKeys: EntitySubscriptionKind[] = Object.values(EntitySubscriptionKind)

export const GQLEntitySubscriptionKind = enumType({
  name: 'EntitySubscriptionKind',
  members: EntitySubscriptionKind,
})

const EntitySubscriptionStatusMembers = ['WATCH', 'MUTE', 'DEFAULT'] as const
export const EntitySubscriptionStatus = enumType({
  name: 'EntitySubscriptionStatus',
  members: EntitySubscriptionStatusMembers,
})

interface EntitySubscription extends Omit<Prisma.Subscription, 'shouldNotify' | 'shouldNotifyByEmail'> {
  kind: EntitySubscriptionKind
  entityId: string
  status: (typeof EntitySubscriptionStatusMembers)[number]
}

export const EntitySubscriptionFields = objectType({
  name: 'EntitySubscription',
  description: Subscription.$description,
  definition(t) {
    t.int(Subscription.id.name)
    t.nonNull.field({ name: Subscription.kind.name, type: GQLEntitySubscriptionKind.name })
    t.nonNull.string(Subscription.entityId.name)
    t.nonNull.field({ name: 'status', type: EntitySubscriptionStatus.name })
  },
})

type QueryArgs = Partial<EntitySubscription>
export const entitySubscriptionsQuery = queryField('entitySubscriptions', {
  type: list('EntitySubscription'),

  args: {
    id: stringArg(),
    kind: arg({ type: GQLEntitySubscriptionKind.name }),
    entityId: stringArg(),
    status: arg({ type: EntitySubscriptionStatus.name }),
  },

  resolve: async (_, args: QueryArgs, { prisma, member }: Context): Promise<EntitySubscription[] | null> => {
    if (!member) {
      throw new Error('Unauthorized')
    }

    const where = {
      ...args,
      kind: args.kind ?? { in: EntitySubscriptionKindKeys },
      shouldNotify: args.status && args.status === 'WATCH',
      memberId: member.id,
    }

    return (await prisma.subscription.findMany({ where })).map<EntitySubscription>(({ shouldNotify, ...rest }) => ({
      ...(rest as Prisma.Subscription & { kind: EntitySubscriptionKind; entityId: string }),
      status: shouldNotify ? 'WATCH' : 'MUTE',
    }))
  },
})

type MutationArgs = Omit<EntitySubscription, 'id'>
type MutationResult = Omit<EntitySubscription, 'id'> & { id: EntitySubscription['id'] | null }
export const subscribeToEntityMutation = mutationField('entitySubscription', {
  type: 'EntitySubscription',

  args: {
    kind: nonNull(arg({ type: GQLEntitySubscriptionKind.name })),
    entityId: nonNull(stringArg()),
    status: nonNull(arg({ type: EntitySubscriptionStatus.name })),
  },

  resolve: async (_, args: MutationArgs, { prisma, member }: Context): Promise<MutationResult | null> => {
    if (!member) {
      throw new Error('Unauthorized')
    }

    const where: Prisma.Prisma.SubscriptionWhereUniqueInput = {
      memberId_kind_entityId: { ...pick(args, 'kind', 'entityId'), memberId: member.id },
    }

    const current = await prisma.subscription.findUnique({ where })

    if (args.status === 'DEFAULT') {
      current && (await prisma.subscription.delete({ where }))
      return { ...args, id: current?.id ?? null }
    }

    const data = {
      ...omit(args, 'status'),
      shouldNotify: args.status === 'WATCH',
      shouldNotifyByEmail: args.status === 'WATCH',
      memberId: member.id,
    }

    if (!current) {
      const created = await prisma.subscription.create({ data })
      return { ...args, id: created.id }
    }

    if (data.shouldNotify !== current.shouldNotify || data.shouldNotifyByEmail !== current.shouldNotifyByEmail) {
      await prisma.subscription.update({ where, data })
    }

    return { ...args, id: current.id }
  },
})
