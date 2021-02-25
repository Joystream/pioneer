import 'jsdom-global/register'
import 'mock-local-storage'
;(global as any).GIT_VERSION = 'test'

require.extensions['.svg'] = () => 'test-image.svg'
require.extensions['.png'] = () => 'test-image.png'
require.extensions['.jpg'] = () => 'test-image.jpg'
require.extensions['.woff2'] = () => 'test-font.woff2'

export default async () => undefined
