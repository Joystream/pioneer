import { server } from '@/common/api'
import { PORT } from '@/common/config'

server.listen(PORT).then(({ url }) => {
  process.stdout.write(`🚀 Server ready at ${url}\n`)
})

import './seedMemberships'
