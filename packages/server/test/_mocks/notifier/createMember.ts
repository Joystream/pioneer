import { Prisma } from '@prisma/client'

import { prisma } from '@/common/prisma'

type MockedSubscription = Prisma.SubscriptionCreateManyMemberInput
export const createMember = (id: number, name: string, subscriptions?: MockedSubscription[]) =>
  prisma.member.create({
    data: {
      id,
      name,
      email: `${name}@${name}.com`,
      subscriptions: subscriptions && { createMany: { data: subscriptions } },
    },
    include: { subscriptions: true },
  })
