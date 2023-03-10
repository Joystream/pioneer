import { createAuthToken } from '@/api/utils/token'
import { prisma } from '@/common/prisma'

const memberId = process.argv[2] ? Number(process.argv[2]) : 1

if (!prisma.member.findFirst({ where: { id: memberId } })) {
  process.stderr.write(`There is no member with the id ${memberId}\n`)
}

process.stdout.write(createAuthToken(Number(memberId)) + '\n')
