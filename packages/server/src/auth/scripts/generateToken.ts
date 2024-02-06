import readline from 'readline'

import { createAuthToken } from '@/auth/model/token'
import { APP_SECRET_KEY } from '@/common/config'

run()

async function run() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false,
  })

  const memberId: number = await new Promise((res) => rl.question('Member id [1]:', (a) => res((a && Number(a)) || 1)))
  const secret: string = await new Promise((res) =>
    rl.question(`App secret key [${APP_SECRET_KEY}]:`, (a) => res(a || APP_SECRET_KEY))
  )

  rl.close()

  const token = createAuthToken(Number(memberId), secret) + '\n'
  const httpHeaders = { Authorization: `Bearer ${token}` }

  process.stdout.write(JSON.stringify(httpHeaders, null, 2) + '\n')
}
