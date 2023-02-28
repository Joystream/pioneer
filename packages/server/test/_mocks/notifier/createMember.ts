import { NotificationType } from '@prisma/client'

import { prisma } from '../../../src/common/prisma'

type MockedSubscription = { notificationType: NotificationType; entityIds?: string[]; shouldNotify?: boolean }
export const createMember = (name: string, subscriptions?: MockedSubscription[]) =>
  prisma.member.create({
    data: {
      chainMemberId: `id:${name}`,
      controllerAccount: `account:${name}`,
      name,
      isEmailVerified: true,
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
