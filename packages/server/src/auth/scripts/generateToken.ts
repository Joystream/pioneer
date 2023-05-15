import { createAuthToken } from '@/auth/model/token'
import { prisma } from '@/common/prisma'

const memberId = process.argv[2] ? Number(process.argv[2]) : 1

if (!prisma.member.findUnique({ where: { id: memberId } })) {
  process.stderr.write(`There is no member with the id ${memberId}\n`)
}

process.stdout.write(createAuthToken(Number(memberId)) + '\n')
