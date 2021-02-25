import 'jsdom-global/register'
import 'mock-local-storage'
import { cryptoWaitReady } from '@polkadot/util-crypto'
;(global as any).GIT_VERSION = 'test'

require.extensions['.svg'] = () => 'test-image.svg'
require.extensions['.png'] = () => 'test-image.png'
require.extensions['.jpg'] = () => 'test-image.jpg'
require.extensions['.woff2'] = () => 'test-font.woff2'

const setup = async () => {
  console.log('...wait ready')
  await cryptoWaitReady()
  console.log('...wait ready done')
}

export default setup
