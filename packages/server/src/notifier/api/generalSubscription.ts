import * as Prisma from '@prisma/client'
import { arg, booleanArg, enumType, inputObjectType, list, mutationField, objectType, queryField } from 'nexus'
import { Subscription } from 'nexus-prisma'

import { Context } from '@/common/api'
import { GeneralSubscriptionKind, isDefaultSubscription } from '@/notifier/model/subscriptionKinds'

interface GeneralSubscription extends Omit<Prisma.Subscription, 'id' | 'memberId' | 'entityId'> {
  id?: number
  kind: GeneralSubscriptionKind
}

const GeneralSubscriptionKindKeys: GeneralSubscriptionKind[] = Object.values(GeneralSubscriptionKind)
const defaultSubscription = (kind: GeneralSubscriptionKind): GeneralSubscription => {
  const shouldNotify = isDefaultSubscription(kind)
  return { kind, shouldNotify, shouldNotifyByEmail: shouldNotify }
}

export const GQLGeneralSubscriptionKind = enumType({
  name: 'GeneralSubscriptionKind',
  members: GeneralSubscriptionKind,
})

export const GeneralSubscriptionFields = objectType({
  name: 'GeneralSubscription',
  description: Subscription.$description,
  definition(t) {
    t.int(Subscription.id.name)
    t.nonNull.field({
      name: Subscription.kind.name,
      type: GQLGeneralSubscriptionKind.name,
    })
    t.nonNull.boolean(Subscription.shouldNotify.name)
    t.nonNull.boolean(Subscription.shouldNotifyByEmail.name)
  },
})

type QueryArgs = Partial<GeneralSubscription>
export const generalSubscriptionsQuery = queryField('generalSubscriptions', {
  type: list('GeneralSubscription'),

  args: {
    kind: arg({ type: GQLGeneralSubscriptionKind.name }),
    shouldNotify: booleanArg(),
    shouldNotifyByEmail: booleanArg(),
  },

  resolve: async (_, args: QueryArgs, { prisma, member }: Context): Promise<GeneralSubscription[] | null> => {
    if (!member) {
      throw new Error('Unauthorized')
    }

    const where = { ...args, kind: args.kind ?? { in: GeneralSubscriptionKindKeys }, memberId: member.id }
    const currents = (await prisma.subscription.findMany({ where })) as GeneralSubscription[]

    return GeneralSubscriptionKindKeys.flatMap((kind) => {
      if (args.kind && !args.kind.includes(kind)) {
        return []
      }
      return currents.find((sub) => sub.kind === kind) ?? defaultSubscription(kind) ?? []
    })
  },
})

const generalSubscriptionsInput = inputObjectType({
  name: 'GeneralSubscriptionInput',
  definition(t) {
    t.nonNull.field({
      name: Subscription.kind.name,
      type: GQLGeneralSubscriptionKind.name,
    })
    t.boolean(Subscription.shouldNotify.name)
    t.boolean(Subscription.shouldNotifyByEmail.name)
  },
})

type MutationArgs = { data: GeneralSubscription[] }
export const generalSubscriptionsMutation = mutationField('generalSubscriptions', {
  type: list('GeneralSubscription'),

  args: { data: list(generalSubscriptionsInput) },

  resolve: async (_, { data }: MutationArgs, { prisma, member }: Context): Promise<Prisma.Subscription[] | null> => {
    if (!member) {
      throw new Error('Unauthorized')
    }

    const kind = { in: GeneralSubscriptionKindKeys }
    const currents = await prisma.subscription.findMany({ where: { kind, memberId: member.id } })

    const transactions = data.flatMap((input) => {
      const { shouldNotify = true, shouldNotifyByEmail = true } = input
      const current = currents.find((current) => current.kind === input.kind)

      if (current) {
        return shouldNotify === current.shouldNotify && shouldNotifyByEmail === current.shouldNotifyByEmail
          ? []
          : prisma.subscription.update({ where: { id: current.id }, data: { shouldNotify, shouldNotifyByEmail } })
      } else {
        const notifyByDefault = isDefaultSubscription(input.kind)
        return shouldNotify === notifyByDefault && shouldNotifyByEmail === notifyByDefault
          ? []
          : prisma.subscription.create({ data: { ...input, memberId: member.id } })
      }
    })

    return await prisma.$transaction(transactions)
  },
})
