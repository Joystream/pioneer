import { pick } from 'lodash'
import * as Yup from 'yup'

import { createAuthToken } from '@/auth/model/token'
import { INITIAL_MEMBERSHIPS } from '@/common/config'
import { prisma } from '@/common/prisma'

seedMemberships()

type Membership = { id: number; name: string; email: string }

async function seedMemberships() {
  const memberships = INITIAL_MEMBERSHIPS
  if (!isMembership(memberships)) return

  for (const member of memberships) {
    await prisma.member.upsert({ where: pick(member, 'id'), create: member, update: member })
    const token = createAuthToken(member.id)

    process.stdout.write(`\nToken for member ${member.id} (${member.name}):\n${token}\n\n`)
  }
}

function isMembership(member: any): member is Membership[] {
  return Yup.array()
    .of(
      Yup.object({
        id: Yup.number(),
        name: Yup.string(),
        email: Yup.string().email(),
      })
    )
    .isValidSync(member)
}
