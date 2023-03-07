import { NotificationType } from '@prisma/client'

import { prisma } from '@/common/prisma'

type MockedSubscription = { notificationType: NotificationType; entityIds?: string[]; shouldNotify?: boolean }
export const createMember = (id: number, name: string, subscriptions?: MockedSubscription[]) =>
  prisma.member.create({
    data: {
      id,
      name,
      email: `${name}@${name}.com`,
      subscriptions: subscriptions && {
        createMany: {
          data: subscriptions.map(({ notificationType, entityIds = [], shouldNotify = true }) => ({
            notificationType,
            entityIds,
            shouldNotify,
            shouldNotifyByEmail: false,
          })),
        },
      },
    },
    include: { subscriptions: true },
  })
