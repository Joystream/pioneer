import { Prisma } from '@prisma/client'
import { partition } from 'lodash'
import { arg, booleanArg, enumType, inputObjectType, list, mutationField, objectType, queryField } from 'nexus'
import { Subscription } from 'nexus-prisma'

import { Context } from '@/api/context'
import { authMemberId } from '@/api/utils/token'
import { isDefaultNotification } from '@/notifier/model/defaultNotification'
import { GeneralSubscriptionType } from '@/notifier/model/subscriptionTypes'

const generalSubscriptionWhere = (args: Prisma.SubscriptionWhereInput) => ({
  ...args,
  notificationType: { in: Object.keys(GeneralSubscriptionType) as GeneralSubscriptionType[] },
})

export const GQLGeneralSubscriptionType = enumType({
  name: 'GeneralSubscriptionType',
  members: GeneralSubscriptionType,
})

export const GeneralSubscriptionFields = objectType({
  name: 'GeneralSubscription',
  description: Subscription.$description,
  definition(t) {
    t.nonNull.id(Subscription.id.name)
    t.nonNull.field({
      name: Subscription.notificationType.name,
      type: GQLGeneralSubscriptionType.name,
    })
    t.nonNull.boolean(Subscription.shouldNotify.name)
    t.nonNull.boolean(Subscription.shouldNotifyByEmail.name)
  },
})

export const generalSubscriptionsQuery = queryField('generalSubscriptions', {
  type: list('GeneralSubscription'),

  args: {
    notificationType: arg({ type: GQLGeneralSubscriptionType.name }),
    shouldNotify: booleanArg(),
    shouldNotifyByEmail: booleanArg(),
  },

  resolve: async (_, args, { prisma, req }: Context) => {
    const memberId = authMemberId(req)
    if (!memberId) return null

    return prisma.subscription.findMany({ where: generalSubscriptionWhere({ ...args, memberId }) })
  },
})

interface GeneralSubscriptionInput {
  notificationType: GeneralSubscriptionType
  entityIds?: string[]
  shouldNotify?: boolean
  shouldNotifyByEmail?: boolean
}
const generalSubscriptionsInput = inputObjectType({
  name: 'GeneralSubscriptionInput',
  definition(t) {
    t.nonNull.field({
      name: Subscription.notificationType.name,
      type: GQLGeneralSubscriptionType.name,
    })
    t.boolean(Subscription.shouldNotify.name)
    t.boolean(Subscription.shouldNotifyByEmail.name)
  },
})

interface GeneralSubscriptionsMutationInput {
  data: GeneralSubscriptionInput[]
}
export const generalSubscriptionsMutation = mutationField('generalSubscriptions', {
  type: list('GeneralSubscription'),

  args: { data: list(generalSubscriptionsInput) },

  resolve: async (_, { data }: GeneralSubscriptionsMutationInput, { prisma, req }: Context) => {
    const memberId = authMemberId(req)
    if (!memberId) return null

    const currents = await prisma.subscription.findMany({ where: generalSubscriptionWhere({ memberId }) })

    const changes = data.filter(({ notificationType, shouldNotify = true, shouldNotifyByEmail = true }) => {
      const notifyByDefault = isDefaultNotification(notificationType)
      return shouldNotify !== notifyByDefault || shouldNotifyByEmail !== notifyByDefault
    })

    const [toUpdate, toDelete] = partition(currents, (a) =>
      changes.some((b) => b.notificationType === a.notificationType)
    )
    const upserts = changes.flatMap<Prisma.SubscriptionUpsertArgs>((input) => {
      const current = toUpdate.find((sub) => sub.notificationType === input.notificationType)

      const { shouldNotify = true, shouldNotifyByEmail = true } = input
      if (shouldNotify === current?.shouldNotify && shouldNotifyByEmail === current.shouldNotifyByEmail) {
        return []
      }

      const where = current
        ? { id: current.id }
        : { memberId_notificationType: { memberId, notificationType: input.notificationType } }

      return { where, update: { shouldNotify, shouldNotifyByEmail }, create: { ...input, memberId } }
    })

    const deleteIds = toDelete.map(({ id }) => id)

    await prisma.$transaction([
      ...upserts.map((args) => prisma.subscription.upsert(args)),
      prisma.subscription.deleteMany({ where: { id: { in: deleteIds } } }),
    ])

    return prisma.subscription.findMany({ where: generalSubscriptionWhere({ memberId }) })
  },
})
