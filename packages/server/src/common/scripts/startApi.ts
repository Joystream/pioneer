import { server } from '@/common/api'
import { APP_SECRET_KEY, PORT } from '@/common/config'

if (!APP_SECRET_KEY) {
  throw Error('APP_SECRET_KEY should be defined')
}

server.listen(PORT).then(({ url }) => {
  process.stdout.write(`🚀 Server ready at ${url}\n`)
})

import './seedMemberships'
